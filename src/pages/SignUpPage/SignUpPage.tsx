import { ChangeEvent, FC, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithFaceBook,
} from "../../firebase";
import { IUser } from "../../types/user";
import "./SignUpPage.scss";

interface SingUpPageProps {
  onSetUser: (user: IUser | null) => void;
}

interface IAuthData {
  name: string;
  email: string;
  password: string;
}

const SingUpPage: FC<SingUpPageProps> = ({ onSetUser }) => {
  const [btnEmailDisabled, setBtnEmailDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const [authData, setAuthData] = useState<IAuthData>({
    name: "",
    email: "",
    password: "",
  });

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

  const handleNameInutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthData((prevData) => {
      return { ...prevData, name: e.target.value };
    });
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
      const data = await signUpWithEmail(authData);
      const newUser: IUser = {
        name: authData.name,
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
      <form className="signup">
        <h2 className="signup__title">Sign Up</h2>
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
        <p className="signup__brake">or</p>
        <Input
          name="name"
          placeholder="Name"
          onChange={(e) => handleNameInutChange(e)}
        />
        <Input
          name="email"
          placeholder="Email"
          type="email"
          onChange={(e) => handleEmailInutChange(e)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          onChange={(e) => handlePasswordInutChange(e)}
        />
        <Button
          text="Sign Up with Email"
          disabled={btnEmailDisabled}
          onClick={handleFormSubmit}
        />
        <p className="signup__footer">
          Already have an account? <NavLink to="/sign-up">Sign In</NavLink>
        </p>
      </form>
    </Container>
  );
};

export default SingUpPage;
