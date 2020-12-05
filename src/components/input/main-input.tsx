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
  return (
    <div class={module.inputgroup}>
      <input
        class={module.input}
        type="number"
        id={props.id}
        onKeyUp={(e: any) =>
          validate(e.target.value) ? props.fnc(Number(e.target.value)) : {}
        }
        onChange={(e: any) =>
          validate(e.target.value) ? props.fnc(Number(e.target.value)) : {}
        }
        min="0"
      />
      <div>
        <span class={module.suffix}>kwH</span>
      </div>
    </div>
  );
};
export default MainInput;
