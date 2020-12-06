import 'assets/scss/main.scss';

import module from './app.module.scss';

import MainForm from './main-form';
import ContactForm from './contact-form/contact-form';

const App = () => {
  return (
    <>
      <div class={module['default-layout']}>
        <picture>
          <source
            media="(min-width: 768px)"
            srcset="images/image.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 767px)"
            srcset="images/image-mobile.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcset="images/image.jpg"
            type="image/jpeg"
          />
          <source
            media="(max-width: 767px)"
            srcset="images/image-mobile.jpg"
            type="image/jpeg"
          />
          <img
            loading="eager"
            class={module['default-layout__background-image']}
            src="images/image.jpg"
            alt="Background"
          />
        </picture>
        <MainForm />
        <ContactForm />
      </div>
      <div class={module.footer}>
        <div class={module.footer__branding}>
          <h2>Kalkulačka Energií</h2>

          <span class={module.footer__branding__email}>
            placeholder@email.com
          </span>
          <p class={module.footer_branding__author}>
            Developed with{' '}
            <span role="img" aria-label="love">
              🧡
            </span>{' '}
            by <a href="https://linkedin.com/in/brebera">Filip Brebera</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
