import { ComponentProps, FC } from "react";
import './Input.scss'

interface InputProps {
  placeholder: ComponentProps<"input">["placeholder"];
  onChange: ComponentProps<"input">["onChange"];
  type?: ComponentProps<"input">["type"];
}

const Input: FC<InputProps> = ({ placeholder, onChange, type = "text" }) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
