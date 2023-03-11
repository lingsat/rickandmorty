import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import "./SignInPage.scss";

interface SingInPageProps {}

const SingInPage: FC<SingInPageProps> = ({}) => {
  const [btnEmailDisabled, setBtnEmailDisabled] = useState<boolean>(true);

  return (
    <Container>
      <form className="signin">
        <h2 className="signin__title">Sign In</h2>
        <Button text="Continue with Google" btnStyle="BLUE" />
        <Button text="Continue with Apple" btnStyle="WHITE" />
        <p className="signin__brake">or</p>
        <Input placeholder="Email" type="email" onChange={() => {}} />
        <Input placeholder="Password" type="password" onChange={() => {}} />
        <Button text="Sign in with Email" disabled={btnEmailDisabled} />
        <p className="signin__footer">
          Don`t have an account? <NavLink to="/sign-up">Sign Up</NavLink>
        </p>
      </form>
    </Container>
  );
};

export default SingInPage;
