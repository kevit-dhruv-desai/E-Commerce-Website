import InputControl from "../../SubComponent/Specific Component/inputControl";
import styles from "../PageCSS/SignUP.module.css";
import Button from "../../SubComponent/Specific Component/Button";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
  };

  const handleFirstNameBlur = () => {
    if (firstname.length === 0) {
      setFirstNameValid(false);
    } else {
      setFirstNameValid(validateFirstName(firstname));
    }
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleLastNameBlur = () => {
    if (lastname.length === 0) {
      setLastNameValid(false);
    } else {
      setLastNameValid(validateLastName(lastname));
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    if (email.length === 0) {
      setEmailValid(false);
    } else {
      setEmailValid(validateEmail(email));
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handlePasswordBlur = () => {
    if (password.length === 0) {
      setPasswordValid(false);
    } else {
      setPasswordValid(validatePassword(password));
    }
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleMobileNumberBlur = () => {
    if (mobilenumber.length === 0) {
      setMobileNumberValid(false);
    } else {
      setMobileNumberValid(validateMobileNumber(mobilenumber));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      mobilenumber.length === 0
    ) {
      alert("Enter full details");
    } else {
      if (
        firstnameValid &&
        lastnameValid &&
        emailValid &&
        passwordValid &&
        mobilenumberValid
      ) {
        alert("Your are successfully register");
        navigate("/");
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = {
          id: Math.random(),
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          phone: mobilenumber,
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
    }
    var selectValue = document.getElementsByClassName("city").value;
    if (selectValue === "") {
      alert("Please select an option.");
      return false;
    }
    return true;
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
              onBlur={handleFirstNameBlur}
            />
            {!firstnameValid && (
              <div className={styles.error}>Invalid Firstname</div>
            )}
            <InputControl
              label="LastName"
              placeholder="Enter your lastname"
              value={lastname}
              onChange={handleLastNameChange}
              onBlur={handleLastNameBlur}
            />
            {!lastnameValid && (
              <div className={styles.error}>Invalid Lastname</div>
            )}
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

            <InputControl
              label="Mobile"
              placeholder="Enter mobile number"
              value={mobilenumber}
              onChange={handleMobileNumberChange}
              onBlur={handleMobileNumberBlur}
            />
            {!mobilenumberValid && (
              <div className={styles.error}>Invalid mobile number</div>
            )}
            <div className={styles.citycontainer}>
              <label for="cars">City</label>
              <select className={styles.city} required>
                {city.map((cities) => (
                  <option value={cities}>{cities}</option>
                ))}
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
