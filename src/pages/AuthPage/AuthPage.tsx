import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import {
  signInWithEmail,
  signInWithGitHub,
  signInWithGoogle,
  signUpWithEmail,
} from "../../services/auth";
import { IUser } from "../../types/user";
import googleIcon from "../../assets/images/google.svg";
import gitIcon from "../../assets/images/github.svg";
import "./AuthPage.scss";

interface AuthPageProps {
  onSetUser: (user: IUser | null) => void;
}

interface IAuthData {
  email: string;
  password: string;
}

interface IFormValid {
  email: boolean;
  password: boolean;
}

interface IFormError {
  email: string | null;
  password: string | null;
}

const AuthPage: FC<AuthPageProps> = ({ onSetUser }) => {
  const [signInMode, setSignInMode] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [authData, setAuthData] = useState<IAuthData>({
    email: "",
    password: "",
  });
  const [formInputClicked, setFormInputClicked] = useState<IFormValid>({
    email: false,
    password: false,
  });
  const [formErrors, setFormErrors] = useState<IFormError>({
    email: "Email can`t be empty",
    password: "Password can`t be empty",
  });
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const handleExternalAuth = async (provider: "google" | 'github') => {
    try {
      let data: any;
      if (provider === "google") {
        data = await signInWithGoogle();
      }
      if (provider === "github") {
        data = await signInWithGitHub();
      }

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

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "email":
        setFormInputClicked((prevData) => {
          return { ...prevData, email: true };
        });
        break;
      case "password":
        setFormInputClicked((prevData) => {
          return { ...prevData, password: true };
        });
        break;
    }
  };

  const handleInutChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setAuthData((prevData) => {
      return { ...prevData, [name]: value };
    });

    if (name === "email") {
      const isEmailValid: boolean = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(
        value
      );
      if (!isEmailValid) {
        setFormErrors((prevData) => {
          return { ...prevData, email: "Email is invalid" };
        });
      } else {
        setFormErrors((prevData) => {
          return { ...prevData, email: null };
        });
      }
    }

    if (name === "password") {
      const isPasswordValid: boolean =
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      if (!isPasswordValid) {
        setFormErrors((prevData) => {
          return {
            ...prevData,
            password: "Password(Min 8 sym, at least 1 letter and 1 number)",
          };
        });
      } else {
        setFormErrors((prevData) => {
          return { ...prevData, password: null };
        });
      }
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

  // FormData validation - unDisable Submit button
  useEffect(() => {
    if (formErrors.email || formErrors.password) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [formErrors]);

  // Set Form type - SignIn or Sign Up
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
          onClick={() => handleExternalAuth('google')}
        >
          <img src={googleIcon} alt="Google icon" />
          Continue with Google
        </button>
        <button
          className="auth__btn auth__btn--git"
          type="button"
          onClick={() => handleExternalAuth('github')}
        >
          <img className="button__img" src={gitIcon} alt="GutHub icon" />
          Continue with Github
        </button>
        <p className="auth__brake">or</p>
        <input
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={authData.email}
          onBlur={blurHandler}
          onChange={handleInutChange}
        />
        {formInputClicked.email && formErrors.email && (
          <p className="auth__error">{formErrors.email}</p>
        )}
        <input
          className="auth__input"
          type="password"
          name="password"
          placeholder="Password"
          value={authData.password}
          onBlur={blurHandler}
          onChange={handleInutChange}
        />
        {formInputClicked.password && formErrors.password && (
          <p className="auth__error">{formErrors.password}</p>
        )}
        <button
          className="auth__btn auth__btn--submit"
          type="button"
          disabled={!formIsValid}
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
