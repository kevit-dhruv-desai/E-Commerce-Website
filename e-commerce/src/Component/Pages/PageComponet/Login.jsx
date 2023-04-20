import InputControl from "../../SubComponent/Specific Component/inputControl";
import { React, useState } from "react";
import styles from "../PageCSS/Login.module.css";
import Button from "../../SubComponent/Specific Component/Button";
import { NavLink,useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
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
    if (password.length === 0) {
      setPasswordValid(false);
    }

    setPasswordValid(validatePassword(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let getemail = localStorage.getItem("email")
    console.log(getemail)
    let getpassword = localStorage.getItem("password")
    if (getemail === email && getpassword === password) {
      return navigate("/productlist")
    }
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.flexcontainer}>
        <div className={styles.formcontainer}>
          <form className={styles.loginform} onSubmit={handleSubmit}>
            <h1>Login</h1>
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
              content="Login"
              type="submit"
              disabled={!emailValid || !passwordValid}
            />
            <p>
              Already have an account?{" "}
              <span>
                <NavLink className={styles.navlink} to="/signup">
                  Sign Up
                </NavLink>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
