import module from './contact-form.module.scss';
import { createSignal, useContext } from 'solid-js';
import ConsumptionStore from '../../stores/store';

const ContactForm = () => {
  const { getPrice } = useContext(ConsumptionStore);
  const [price, setPrice] = createSignal(0);

  getPrice.observe_((change) => setPrice(change.newValue));
  return (
    <div class={module.contactform}>
      <form name="contact" method="post">
        <input type="hidden" name="form-name" value="contact" />
        <h2>Zaujala Vás naše nabídka?</h2>
        <p>Zanechte nám na sebe kontakt a my se Vám ozveme.</p>

        <textarea name="price" hidden required>
          {price} Kč
        </textarea>

        <div class={module.inputgroup}>
          <label for="name">Vaše jméno:</label>
          <input class={module.input} type="text" name="name" id="name" required></input>
        </div>
        <div class={module.inputgroup}>
          <label for="email">Váš email:</label>
          <input class={module.input} type="email" name="email" id="email" required></input>
        </div>

        <input class={module.submit} type="submit" value="Odeslat"></input>
      </form>
    </div>
  );
};

export default ContactForm;
