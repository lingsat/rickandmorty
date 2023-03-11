import { ComponentProps, FC } from "react";
import "./Button.scss";

enum ButtonStyle {
  GREEN = "GREEN",
  BLUE = "BLUE",
  WHITE = "WHITE",
}

interface ButtonProps {
  text: string;
  disabled?: ComponentProps<"button">["disabled"];
  type?: ComponentProps<"button">["type"];
  btnStyle?: keyof typeof ButtonStyle;
  onClick?: ComponentProps<"button">["onClick"];
}

const Button: FC<ButtonProps> = ({
  text,
  disabled,
  type = "button",
  btnStyle = ButtonStyle.GREEN,
  onClick,
}) => {
  let buttonStyleClass: string = "";

  switch (btnStyle) {
    case ButtonStyle.GREEN:
      buttonStyleClass = "green";
      break;
    case ButtonStyle.BLUE:
      buttonStyleClass = "blue";
      break;
    case ButtonStyle.WHITE:
      buttonStyleClass = "white";
      break;
    default:
      break;
  }

  return (
    <button
      className={`button button--${buttonStyleClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
