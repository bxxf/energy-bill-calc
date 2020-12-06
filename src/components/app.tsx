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
            class={module['default-layout__background-image']}
            src="images/image.jpg"
            alt="Background"
          />
        </picture>
        <MainForm />
        <ContactForm />
      </div>
    </>
  );
};

export default App;
