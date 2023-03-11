import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import {
  signInWithEmail,
  signInWithFaceBook,
  signInWithGoogle,
  signUpWithEmail,
} from "../../firebase";
import { IUser } from "../../types/user";
import googleIcon from "../../assets/images/google.svg";
import fbIcon from "../../assets/images/facebook.svg";
import "./AuthPage.scss";

interface AuthPageProps {
  onSetUser: (user: IUser | null) => void;
}

interface IAuthData {
  email: string;
  password: string;
}

const AuthPage: FC<AuthPageProps> = ({ onSetUser }) => {
  const [signInMode, setSignInMode] = useState<boolean>(true);
  const { pathname } = useLocation();

  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [authData, setAuthData] = useState<IAuthData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleGoogleAuth = async () => {
    try {
      const data: any = await signInWithGoogle();
      const newUser: IUser = {
        identifier: data.user.displayName,
        token: data.user.accessToken,
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
      const data: any = await signInWithFaceBook();
      const newUser: IUser = {
        identifier: data.user.displayName,
        token: data.user.accessToken,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      onSetUser(newUser);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInutChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      setAuthData((prevData) => {
        return { ...prevData, email: e.target.value };
      });
    }
    if (e.target.name === 'password') {
      setAuthData((prevData) => {
        return { ...prevData, password: e.target.value };
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      let data: any;
      if (signInMode) {
        data = await signInWithEmail(authData);
      } else {
        data = await signUpWithEmail(authData);
      }
      const newUser: IUser = {
        identifier: data.user.email,
        token: data.user.accessToken,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      onSetUser(newUser);
      navigate("/");
    } catch (error: any) {
      alert(`Failed with error code: ${error.code}`);
    }
  };

  useEffect(() => {
    if (pathname === "/sign-in") {
      setSignInMode(true);
    }

    if (pathname === "/sign-up") {
      setSignInMode(false);
    }
    setAuthData({
      email: "",
      password: "",
    });
  }, [pathname]);

  return (
    <Container>
      <form className="auth">
        <h2 className="auth__title">{signInMode ? "Sign In" : "Sign Up"}</h2>
        <button
          className="auth__btn auth__btn--google"
          type="button"
          onClick={handleGoogleAuth}
        >
          <img src={googleIcon} alt="Google icon" />
          Continue with Google
        </button>
        <button
          className="auth__btn auth__btn--fb"
          type="button"
          onClick={handleFacebookAuth}
        >
          <img className="button__img" src={fbIcon} alt="Facebook icon" />
          Continue with Facebook
        </button>
        <p className="auth__brake">or</p>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={authData.email}
          onChange={(e) => handleInutChange(e)}
        />
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={authData.password}
          onChange={(e) => handleInutChange(e)}
        />
        <button
          className="auth__btn auth__btn--submit"
          type="button"
          onClick={handleFormSubmit}
        >
          {signInMode ? "Sign in" : "Sign Up"} with Email
        </button>
        <p className="auth__footer">
          {signInMode ? "Don`t have an account? " : "Already have an account? "}
          <Link to={`/${signInMode ? "sign-up" : "sign-in"}`}>
            {signInMode ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </Container>
  );
};

export default AuthPage;
