/* eslint-disable react/button-has-type */

import {
  useContext,
  Show,
  createSignal,
  createState,
  createEffect,
  createMemo,
} from 'solid-js';
import { fetch as polyfetch } from 'whatwg-fetch';
import { load } from 'recaptcha-v3';
import module from './contact-form.module.scss';
import ConsumptionStore from '../../stores/store';

import * as client from '../../../api/client.gen';

const ContactForm = () => {
  const api = new client.EmailService(
    'https://kalkulacka-energii.ey.r.appspot.com',
    polyfetch,
  );
  const [state, setState] = createState({
    buttonText: 'Odeslat',
    disabled: false,
  });
  const { getPrice, consumption } = useContext(ConsumptionStore);
  function sendEmail(
    data_email: string,
    data_name: string,
    data_price: number,
    data_electricity: number,
    data_gas: number,
    data_body: string,
  ) {
    load('6LeD6P4ZAAAAAH6iGzRL8V7ZzPyeWrWBo_dif7LB', {
      autoHideBadge: true,
    }).then((recaptcha) => {
      recaptcha.execute('contact').then((token) => {
        api
          .sendEmail({
            email: data_email,
            name: data_name,
            price: data_price,
            electricity: data_electricity,
            gas: data_gas,
            body: data_body,
            token,
          })
          .then(() => setState({ buttonText: 'Odesláno, děkujeme.' }));
      });
    });
  }
  function handleSubmit(event: any) {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    setState({ buttonText: 'Odesílá se..', disabled: true });

    const data = new FormData(event.target);
    sendEmail(
      data.get('email') as string,
      data.get('name') as string,
      getPrice.value_,
      consumption.electricity,
      consumption.gas,
      data.get('message') as string,
    );
  }
  return (
    <div class={module.contact}>
      <form
        name="contact"
        method="post"
        onSubmit={handleSubmit}
        class={module.contact__form}
        aria-label="Kontaktní formulář"
      >
        <input type="hidden" name="form-name" value="contact" />
        <h2 class={module.contact__form__header}>Zaujala Vás naše nabídka?</h2>
        <p class={module.contact__form__description}>
          Zanechte nám na sebe kontakt a my se Vám ozveme.
        </p>

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
            Pokud máte nějaké speciální požadavky, napište je zde:
          </label>
          <textarea
            name="message"
            id="message"
            aria-describedby="message-label"
            class={module['contact__form__input-group__input']}
            placeholder="Příklad: Chtěl bych se zeptat na..."
          />
        </div>
        <p class={module.contact__form__disclaimer}>
          Položky označené * jsou <span id="required">povinné</span>.
        </p>
        {createMemo(() => (
          <input
            class={module['contact__form__submit-button']}
            type="submit"
            value={state.buttonText}
            disabled={state.disabled}
          />
        ))}
      </form>
    </div>
  );
};

export default ContactForm;
