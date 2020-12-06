import module from './main-input.module.scss';

interface IProps {
  fnc: (value: number) => void;
  id: string;
}
const validate = (value: string) => {
  const reg = /^\d*(\.|,)?\d*$/;
  if (!reg.test(value) && value.length !== 0) return false;
  return true;
};
const MainInput = (props: IProps) => {
  const { id, fnc } = props;
  return (
    <div class={module['input-group']}>
      <input
        class={module['input-group__input']}
        type="number"
        id={id}
        onKeyUp={(e: any) =>
          validate(e.target.value) ? fnc(Number(e.target.value)) : {}
        }
        onChange={(e: any) =>
          validate(e.target.value) ? fnc(Number(e.target.value)) : {}
        }
        min="0"
      />
      <div>
        <span class={module['input-group__suffix']}>kwH</span>
      </div>
    </div>
  );
};
export default MainInput;
