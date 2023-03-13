import { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmail,
  signInWithGitHub,
  signInWithGoogle,
  signUpWithEmail,
} from "../../services/auth";
import {
  checkEmailValid,
  checkPasswordValid,
} from "../../utils/formValidation";
import Container from "../../components/Container/Container";
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

  // Authorization with Google and GitHub
  const handleExternalAuth = async (provider: "google" | "github") => {
    try {
      let data: any;
      if (provider === "google") {
        data = await signInWithGoogle();
      } else if (provider === "github") {
        data = await signInWithGitHub();
      } else {
        alert("Wrong authorization provider. Try else!");
        navigate("/sign-in");
        return;
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

  // Form validation - check if input was clicked to show error message, if value invalid
  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "email":
        setFormInputClicked((prev) => ({ ...prev, email: true }));
        break;
      case "password":
        setFormInputClicked((prev) => ({ ...prev, password: true }));
        break;
      default:
        break;
    }
  };

  // Save form values to state and values validation
  const handleInutChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (!checkEmailValid(value)) {
        setFormErrors((prev) => ({ ...prev, email: "Email is invalid" }));
      } else {
        setFormErrors((prev) => ({ ...prev, email: null }));
      }
    }

    if (name === "password") {
      if (!checkPasswordValid(value)) {
        setFormErrors((prev) => ({
          ...prev,
          password: "Password(Min 8 sym, at least 1 letter and 1 number)",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, password: null }));
      }
    }
  };

  // Form submit - signIn or signUp
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

  // Clear form
  const clearForm = () => {
    setAuthData({ email: "", password: "" });
    setFormInputClicked({ email: false, password: false });
    setFormErrors({
      email: "Email can`t be empty",
      password: "Password can`t be empty",
    });
    setFormIsValid(false);
  };

  // Set Form type - SignIn or Sign Up. Clear form data
  useEffect(() => {
    if (pathname === "/sign-in") {
      setSignInMode(true);
    }
    if (pathname === "/sign-up") {
      setSignInMode(false);
    }
    clearForm();
  }, [pathname]);

  return (
    <Container>
      <form className="auth">
        <h2 className="auth__title">{signInMode ? "Sign In" : "Sign Up"}</h2>
        <button
          className="auth__btn auth__btn--google"
          type="button"
          onClick={() => handleExternalAuth("google")}
        >
          <img src={googleIcon} alt="Google icon" />
          Continue with Google
        </button>
        <button
          className="auth__btn auth__btn--git"
          type="button"
          onClick={() => handleExternalAuth("github")}
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
