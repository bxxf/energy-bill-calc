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
      <form name="contact" method="post" class={module.contact__form}>
        <input type="hidden" name="form-name" value="contact" />
        <h2 class={module.contact__form__header}>Zaujala Vás naše nabídka?</h2>
        <p class={module.contact__form__description}>
          Zanechte nám na sebe kontakt a my se Vám ozveme.
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
          <label for="name">*Vaše jméno:</label>
          <input
            class={module['contact__form__input-group__input']}
            type="text"
            name="name"
            placeholder="Karel Novák"
            id="name"
            required
          />
        </div>
        <div class={module['contact__form__input-group']}>
          <label for="email">*Váš email:</label>
          <input
            class={module['contact__form__input-group__input']}
            type="email"
            placeholder="karel.novak@email.cz"
            name="email"
            id="email"
            required
          />
        </div>
        <div class={module['contact__form__input-group']}>
          <label for="message">
            Máte nějaké speciální požadavky? (nepovinné)
          </label>
          <textarea
            name="message"
            id="message"
            class={module['contact__form__input-group__input']}
            placeholder="Dobrý den, chtěl bych se zeptat na..."
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
