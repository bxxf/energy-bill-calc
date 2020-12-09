package sendemail

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"
	"gopkg.in/ezzarghili/recaptcha-go.v4"
	gomail "gopkg.in/mail.v2"

	"github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
)

func main() {
	funcframework.RegisterHTTPFunction("/", SendEmail)
	// Use PORT environment variable, or default to 8080.
	port := "8080"
	if envPort := os.Getenv("PORT"); envPort != "" {
		port = envPort
	}
	if err := funcframework.Start(port); err != nil {
		log.Fatalf("framework.Start: %v\n", err)
	}

}
type Req struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Price uint64 `json:"price"`
	Gas float32 `json:"gas"`
	Electricity float32 `json:"electricity"`
	Body string `json:"body"`
	Token string `json:"token"`
} 

func SendEmail(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
    w.Header().Set("Access-Control-Allow-Origin", "https://kalkulacka-energii.eu, http://localhost")
    w.Header().Set("Access-Control-Allow-Methods", "POST")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var req Req;

	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return 
	}

	captcha, _ := recaptcha.NewReCAPTCHA(os.Getenv("RECAPTCHA_SECRET"), recaptcha.V3, 10 * time.Second) 

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		fmt.Println(err.Error());
		http.Error(w, err.Error(), 400)
		return
	}


	captchaErr := captcha.Verify(req.Token)
	if captchaErr != nil {
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
  m.SetBody("text/plain", "Jméno: " + req.Name + "\n" + "Email: " + req.Email + "\n" + "Cena: " + strconv.FormatUint(req.Price, 10) + " Kč \n" + "Elektřina: " + fmt.Sprintf("%f", req.Electricity) + " kWH \n" + "Plyn: " + fmt.Sprintf("%f", req.Gas) + " kWH \n" + req.Body)
  // Settings for SMTP server
  d := gomail.NewDialer("smtp.gmail.com", 587, "kalkulackaenergii@gmail.com", os.Getenv("GMAIL_TOKEN"))

  // This is only needed when SSL/TLS certificate is not valid on server.
  // In production this should be set to false.
  d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

  // Now send E-Mail
  if err := d.DialAndSend(m); err != nil {
		fmt.Println("send error")
    fmt.Println(err)
	}
	fmt.Println("Email sent.")

	return
		 
		 
}
