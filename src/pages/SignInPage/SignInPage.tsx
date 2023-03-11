import { ChangeEvent, FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import {
  signInWithEmail,
  signInWithFaceBook,
  signInWithGoogle,
} from "../../firebase";
import { IUser } from "../../types/user";
import "./SignInPage.scss";

interface SingInPageProps {
  onSetUser: (user: IUser | null) => void;
}

interface IAuthData {
  email: string;
  password: string;
}

const SingInPage: FC<SingInPageProps> = ({ onSetUser }) => {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [authData, setAuthData] = useState<IAuthData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const data = await signInWithGoogle();
      const newUser: IUser = {
        name: data.user.displayName!,
        email: data.user.email!,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      onSetUser(newUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookAuth = async () => {
    try {
      const data = await signInWithFaceBook();
      const newUser: IUser = {
        name: data.user.displayName!,
        email: data.user.email!,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      onSetUser(newUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailInutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthData((prevData) => {
      return { ...prevData, email: e.target.value };
    });
  };

  const handlePasswordInutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthData((prevData) => {
      return { ...prevData, password: e.target.value };
    });
  };

  const handleFormSubmit = async () => {
    try {
      const data = await signInWithEmail(authData);
      const newUser: IUser = {
        name: "John",
        email: data.user.email!,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      onSetUser(newUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form className="signin">
        <h2 className="signin__title">Sign In</h2>
        <Button
          text="Continue with Google"
          btnStyle="BLUE"
          iconStyle="GOOGLE"
          onClick={handleGoogleAuth}
        />
        <Button
          text="Continue with Facebook"
          btnStyle="WHITE"
          iconStyle="FB"
          onClick={handleFacebookAuth}
        />
        <p className="signin__brake">or</p>
        <Input
          name="email"
          placeholder="Email"
          type="email"
          value={authData.email}
          onChange={(e) => handleEmailInutChange(e)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={authData.password}
          onChange={(e) => handlePasswordInutChange(e)}
        />
        <Button
          text="Sign in with Email"
          disabled={btnDisabled}
          onClick={handleFormSubmit}
        />
        <p className="signin__footer">
          Don`t have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p>
      </form>
    </Container>
  );
};

export default SingInPage;