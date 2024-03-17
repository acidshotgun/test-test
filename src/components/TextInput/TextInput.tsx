import { memo } from "react";

import styles from "./TextInput.module.scss";

interface ITextInput {
  name: string;
  value: string;
  errror?: boolean;
  onChange: any;
}

const TextInput = memo(({ name, value, onChange }: ITextInput) => {
  console.log("РЕНДЕР!!!!!!!!!!!");
  return <input type="text" name={name} value={value} onChange={onChange} />;
});

export default TextInput;
