import { createSignal, useContext } from 'solid-js';
import { observe } from 'mobx';
import module from './contact-form.module.scss';
import ConsumptionStore from '../../stores/store';

const ContactForm = () => {
  const { getPrice, consumption } = useContext(ConsumptionStore);
  const [price, setPrice] = createSignal(0);
  const [electricity, setElectricity] = createSignal(0);
  const [gas, setGas] = createSignal(0);

  getPrice.observe_((change: any) => setPrice(change.newValue));
  observe(consumption, 'electricity', (change: any) =>
    setElectricity(change.newValue),
  );
  observe(consumption, 'gas', (change: any) => setGas(change.newValue));
  return (
    <div class={module.contact}>
      <form
        name="contact"
        method="post"
        class={module.contact__form}
        aria-label="Kontaktní formulář"
      >
        <input type="hidden" name="form-name" value="contact" />
        <h2 class={module.contact__form__header}>Zaujala Vás naše nabídka?</h2>
        <p class={module.contact__form__description}>
          Zanechte nám na sebe kontakt a my se Vám ozveme.
        </p>
        <p class={module.contact__form__disclaimer}>
          Položky označené * jsou <span id="required">povinné</span>.
        </p>

        <textarea name="electricity" hidden required>
          {electricity} kwH
        </textarea>
        <textarea name="gas" hidden required>
          {gas} kwH
        </textarea>
        <textarea name="price" hidden required>
          {price} Kč
        </textarea>

        <div class={module['contact__form__input-group']}>
          <label for="name" id="name-label">
            <span aria-labelledby="required">*</span>Zadejte Vaše jméno:
          </label>
          <input
            aria-describedby="name-label"
            class={module['contact__form__input-group__input']}
            type="text"
            name="name"
            placeholder="Příklad: Karel Novák"
            id="name"
            required
          />
        </div>
        <div class={module['contact__form__input-group']}>
          <label for="email" id="email-label">
            <span aria-labelledby="required">*</span>Zadejte Váš email:
          </label>
          <input
            class={module['contact__form__input-group__input']}
            type="email"
            aria-describedby="email-label"
            placeholder="Příklad: karel.novak@email.cz"
            name="email"
            id="email"
            required
          />
        </div>
        <div class={module['contact__form__input-group']}>
          <label for="message" id="message-label">
            Pokud máte nějaké speciální požadavky, zadejte je:
          </label>
          <textarea
            name="message"
            id="message"
            aria-describedby="message-label"
            class={module['contact__form__input-group__input']}
            placeholder="Příklad: Dobrý den, chtěl bych se zeptat na..."
          />
        </div>
        <input
          class={module['contact__form__submit-button']}
          type="submit"
          value="Odeslat"
        />
      </form>
    </div>
  );
};

export default ContactForm;
