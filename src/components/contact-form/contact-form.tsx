import module from './contact-form.module.scss';
import { createSignal, useContext } from 'solid-js';
import ConsumptionStore from '../../stores/store';

const ContactForm = () => {
  const { getPrice } = useContext(ConsumptionStore);
  const [price, setPrice] = createSignal(0);

  getPrice.observe_((change) => setPrice(change.newValue));
  return (
    <div class={module.contactform}>
      <form name="contact">
      <input type="hidden" name="form-name" value="contact" />
        <h2>Zaujala Vás naše nabídka?</h2>
        <p>Zanechte nám na sebe kontakt a my se Vám ozveme.</p>

        <textarea name="price" disabled>
          {price} Kč
        </textarea>

        <div class={module.inputgroup}>
          <label>Vaše jméno:</label>
          <input class={module.input} type="text" name="name"></input>
        </div>
        <div class={module.inputgroup}>
          <label>Váš email:</label>
          <input class={module.input} type="email" name="email"></input>
        </div>

        <input class={module.submit} type="submit" value="Odeslat"></input>
      </form>
    </div>
  );
};

export default ContactForm;
