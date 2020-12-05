import 'assets/scss/main.scss';

import module from './app.module.scss';

import MainForm from './main-form';
import ContactForm from './contact-form/contact-form';


const App = () => {
  return (
    <>
    <div class={module.layout}>
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
          class={module.image}
          srcset="images/image.jpg 1024px,
           images/image-mobile.jpg 767px"
          src="images/image.jpg"
          alt="Background image"
        />
      </picture>
      <MainForm></MainForm>
      <ContactForm/>
      
    </div>
</>
  );
};

export default App;
