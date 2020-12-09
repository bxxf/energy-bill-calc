package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
	"gopkg.in/ezzarghili/recaptcha-go.v4"
	gomail "gopkg.in/mail.v2"
)

func main() {
	_ = godotenv.Load("../.env")
	err := startServer()
	if err != nil {
		log.Fatal(err)
	}
}

func startServer() error {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"https://kalkulacka-energii.eu", "http://localhost:8080"}, 
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})
	r.Use(cors.Handler)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("."))
	})

	webrpcHandler := NewEmailServiceServer(&EmailServiceRPC{})
	r.Handle("/*", webrpcHandler)

	return http.ListenAndServe(":8080", r)
}

type EmailServiceRPC struct {
}

func (s *EmailServiceRPC) SendEmail(ctx context.Context, email string, name string, body string, price uint64, electricity float32, gas float32, token string) (bool, error) {

	captcha, _ := recaptcha.NewReCAPTCHA(os.Getenv("RECAPTCHA_SECRET"), recaptcha.V3, 10 * time.Second) 
	err := captcha.Verify(token)
	if err != nil {
    log.Fatal(err);
	}

	 m := gomail.NewMessage()

  // Set E-Mail sender
  m.SetHeader("From", "kalkulackaenergii@gmail.com")

  // Set E-Mail receivers
  m.SetHeader("To", os.Getenv("RECIPIENT_EMAIL"))

  // Set E-Mail subject
	m.SetHeader("Subject", "Nová odpověď na formulář")

  // Set E-Mail body. You can set plain text or html with text/html
  m.SetBody("text/plain", "Email: " + email + "\n" + "Cena: " + strconv.FormatUint(price, 10) + " Kč \n" + "Elektřina: " + fmt.Sprintf("%f", electricity) + " kWH \n" + "Plyn: " + fmt.Sprintf("%f", gas) + " kWH \n" + body)
  // Settings for SMTP server
  d := gomail.NewDialer("smtp.gmail.com", 587, "kalkulackaenergii@gmail.com", os.Getenv("GMAIL_TOKEN"))

  // This is only needed when SSL/TLS certificate is not valid on server.
  // In production this should be set to false.
  d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

  // Now send E-Mail
  if err := d.DialAndSend(m); err != nil {
    fmt.Println(err)
	}
	fmt.Println("Sent email to " + os.Getenv("RECIPIENT_EMAIL"))

	return true, nil
}
