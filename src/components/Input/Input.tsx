import { ComponentProps, FC } from "react";
import "./Input.scss";

interface InputProps {
  name: ComponentProps<"input">["name"];
  placeholder: ComponentProps<"input">["placeholder"];
  onChange: ComponentProps<"input">["onChange"];
  type?: ComponentProps<"input">["type"];
  value?: ComponentProps<"input">["value"];
}

const Input: FC<InputProps> = ({
  name,
  placeholder,
  onChange,
  type = "text",
  value,
}) => {
  return (
    <input
      className="input"
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
