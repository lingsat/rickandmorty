import { ComponentProps, FC } from "react";
import googleIcon from '../../assets/images/google.svg';
import fbIcon from '../../assets/images/facebook.svg';
import "./Button.scss";

enum ButtonStyle {
  GREEN = "GREEN",
  BLUE = "BLUE",
  WHITE = "WHITE",
}

enum IconStyle {
  GOOGLE = "GOOGLE",
  FB = "FB",
  NONE = "NONE",
}

interface ButtonProps {
  text: string;
  disabled?: ComponentProps<"button">["disabled"];
  type?: ComponentProps<"button">["type"];
  btnStyle?: keyof typeof ButtonStyle;
  iconStyle?: keyof typeof IconStyle;
  onClick?: ComponentProps<"button">["onClick"];
}

const Button: FC<ButtonProps> = ({
  text,
  disabled,
  type = "button",
  btnStyle = ButtonStyle.GREEN,
  iconStyle = IconStyle.NONE,
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

  let icon = null;
  switch (iconStyle) {
    case IconStyle.NONE:
      icon = null;
      break;
    case IconStyle.GOOGLE:
      icon = googleIcon;
      break;
    case IconStyle.FB:
      icon = fbIcon;
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
      {icon && <img className='button__img' src={icon} alt="Google icon" />}
      {text}
    </button>
  );
};

export default Button;
