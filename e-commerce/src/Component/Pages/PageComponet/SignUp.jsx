import InputControl from "../../SubComponent/Specific Component/inputControl";
import styles from "../PageCSS/SignUP.module.css";
import Button from "../../SubComponent/Specific Component/Button";
import { NavLink } from "react-router-dom";
import { React, useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    if (name.length === 0) {
      setNameValid(false);
    }
    setNameValid(validateName(event.target.value));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (email.length === 0) {
      setEmailValid(false);
    }

    setEmailValid(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password)
    if (password.length === 0) {
      setPasswordValid(false);
    }

    setPasswordValid(validatePassword(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nameValid && emailValid && passwordValid) {
      alert("Your are successfully register");
      localStorage.setItem("email", email)
      localStorage.setItem("password", password)
}
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.flexcontainer}>
        <div className={styles.formcontainer}>
          <form className={styles.signupform} onSubmit={handleSubmit}>
            <h1>SignUP</h1>
            <InputControl
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {!nameValid && <div className={styles.error}>Invalid name</div>}
            <InputControl
              label="Email"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmailChange}
            />
            {!emailValid && <div className={styles.error}>Invalid email</div>}
            <InputControl
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!passwordValid && (
              <div className={styles.error}>Invalid password</div>
            )}
            <Button
              content="SignUp"
              type="submit"
              disabled={!nameValid || !emailValid || !passwordValid}
            />
            <p>
              Already have an account?
              <span>
                <NavLink className={styles.navlink} to="/">
                  Login
                </NavLink>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
