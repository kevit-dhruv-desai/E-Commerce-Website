import InputControl from "../../SubComponent/Specific Component/inputControl";
import styles from "../PageCSS/SignUP.module.css";
import Button from "../../SubComponent/Specific Component/Button";
import { NavLink } from "react-router-dom";
import { React, useState } from "react";
import city from "../../../city/CityData";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [firstnameValid, setFirstNameValid] = useState(true);
  const [lastname, setLastName] = useState("");
  const [lastnameValid, setLastNameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [mobilenumber, setMobileNumber] = useState("");
  const [mobilenumberValid, setMobileNumberValid] = useState(true);

  const validateFirstName = (firstname) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(firstname);
  };

  const validateLastName = (lastname) => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return nameRegex.test(lastname);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobilenumber) => {
    const mobilenumberRegex =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return mobilenumberRegex.test(mobilenumber);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (firstname.length === 0) {
      setFirstNameValid(false);
    }
    setFirstNameValid(validateFirstName(event.target.value));
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (lastname.length === 0) {
      setLastNameValid(false);
    }
    setLastNameValid(validateLastName(event.target.value));
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
    console.log(password);
    if (password.length === 0) {
      setPasswordValid(false);
    }

    setPasswordValid(validatePassword(event.target.value));
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
    if (mobilenumber.length === 0) {
      setMobileNumberValid(false);
    }

    setMobileNumberValid(validateMobileNumber(event.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      firstnameValid &&
      lastnameValid &&
      emailValid &&
      passwordValid &&
      mobilenumberValid
    ) {
      alert("Your are successfully register");
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = {
        id:Math.random(),
        email: email,
        password:password,
        firstname:firstname,
        lastname:lastname,
        phone:mobilenumber
      };
      const existingUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (existingUser) {
        return;
      } else {
        users.push(user);
      }
      localStorage.setItem("users", JSON.stringify(users));
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
    }
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.flexcontainer}>
        <div className={styles.formcontainer}>
          <form className={styles.signupform} onSubmit={handleSubmit}>
            <h1>SignUP</h1>
            <InputControl
              label="FirstName"
              placeholder="Enter your firstname"
              value={firstname}
              onChange={handleFirstNameChange}
            />
            {!firstnameValid && (
              <div className={styles.error}>Invalid Firstname</div>
            )}
            <InputControl
              label="LastName"
              placeholder="Enter your lastname"
              value={lastname}
              onChange={handleLastNameChange}
            />
            {!lastnameValid && (
              <div className={styles.error}>Invalid Lastname</div>
            )}
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
              type="password"
            />
            {!passwordValid && (
              <div className={styles.error}>Invalid password</div>
            )}

            <InputControl
              label="Mobile"
              placeholder="Enter mobile number"
              value={mobilenumber}
              onChange={handleMobileNumberChange}
            />
            {!mobilenumberValid && (
              <div className={styles.error}>Invalid mobile number</div>
            )}
            <div className={styles.citycontainer}>
              <label for="cars">City</label>
              <select className={styles.city} required>
                {city.map((cities)=>  <option value={cities} >{cities}</option>)}
              </select>
            </div>

            <Button
              content="SignUp"
              type="submit"
              disabled={
                !firstnameValid ||
                !lastnameValid ||
                !emailValid ||
                !passwordValid
              }
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
