import InputControl from "../../SubComponent/Specific Component/inputControl";
import { React, useState, useEffect } from "react";
import styles from "../PageCSS/Login.module.css";
import Button from "../../SubComponent/Specific Component/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailInfo, passwordInfo } from "../../../Featue/loginslice";

const Login = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();
  const email = useSelector((state) => state.logininfo.email);
  const password = useSelector((state) => state.logininfo.password);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (event) => {
    dispatch(emailInfo(event.target.value));
  };
  const handleEmailBlur = () => {
    if (email.length === 0) {
      setEmailValid(false);
    } else {
      setEmailValid(validateEmail(email));
      setError(false);
    }
  };

  const handlePasswordChange = (event) => {
    dispatch(passwordInfo(event.target.value));
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(validatePassword(password));
      setError(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.length === 0 && password.length === 0) {
      setEmailValid(false);
      setPasswordValid(false);
      setError(true);
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        navigate("/productlist");
      } else {
        setError(true);
      }
    }
  };

  useEffect(() => {
    window.history.pushState(null, window.location.pathname);
    window.addEventListener("popstate", BackButton);
    return () => {
      window.removeEventListener("popstate", BackButton);
    };
  }, []);

  const BackButton = (e) => {
    e.preventDefault();
    window.history.pushState(null, window.location.pathname);
  };

  return (
    <>
      <div className={styles.maincontainer}>
        <div className={styles.flexcontainer}>
          <h1 className={styles.title}>WELCOME TO SHOP</h1>
          <div className={styles.formcontainer}>
            <form className={styles.loginform} onSubmit={handleSubmit}>
              <h1>Login</h1>
              <InputControl
                label="Email"
                placeholder="Enter email address"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {!emailValid && <div className={styles.error}>Invalid email</div>}
              <InputControl
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                onBlur={handlePasswordBlur}
              />
              {!passwordValid && (
                <div className={styles.error}>Invalid password</div>
              )}
              {error && (
                <div className={styles.error}>Invalid email or password</div>
              )}
              <Button
                content="Login"
                type="submit"
                disabled={!emailValid || !passwordValid}
              />
              <p>
                Already have an account?{" "}
                <span>
                  <NavLink className={"styles.navlink"} to="/signup">
                    Sign Up
                  </NavLink>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
