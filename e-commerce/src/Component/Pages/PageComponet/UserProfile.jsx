import React, { useState } from "react";
import InputControl from "../../SubComponent/Specific Component/inputControl";
import userphoto from "../../../Images/user.png";
import "../PageCSS/UserProfile.css";
import Navbar from "../../SubComponent/Specific Component/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emailInfo, passwordInfo } from "../../../Featue/loginslice";

const UserProfile = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem("users"));

  const users = data.find(
    (user) => user.email === email && user.password === password
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: users.firstname,
    lastname: users.lastname,
    email: users.email,
    password: users.password,
    phone: users.phone,
  });

  const firstNameChange = (event) => {
    setFormData({
      ...formData,
      firstname: event.target.value,
    });
  };

  const lastNameChange = (event) => {
    setFormData({
      ...formData,
      lastname: event.target.value,
    });
  };

  const emailChange = (event) => {
    setFormData({
      ...formData,
      email: event.target.value,
    });
  };

  const passwordChange = (event) => {
    setFormData({
      ...formData,
      password: event.target.value,
    });
  };

  const mobileNumberChange = (event) => {
    setFormData({
      ...formData,
      phone: event.target.value,
    });
  };

  function editHandler(event) {
    event.preventDefault();
    setEditMode(true);
  }

  function cancelHandler(event) {
    event.preventDefault();
    setEditMode(false);
    setFormData({
      firstname: users.firstname,
      lastname: users.lastname,
      email: users.email,
      password: users.password,
      phone: users.phone,
    });
  }

  function saveHandler(event) {
    event.preventDefault(false);
    setEditMode(false);
    const updatedData = data.map((user) =>
      user.email === email && user.password === password
        ? {
            ...user,
            ...formData,
            email: formData.email,
            password: formData.password,
          }
        : user
    );
    localStorage.setItem("users", JSON.stringify(updatedData));
    localStorage.setItem("email", formData.email);
    localStorage.setItem("password", formData.password);
  }
  function logoutHandler() {
    navigate("/");
    dispatch(emailInfo(""));
    dispatch(passwordInfo(""));
  }
  function menuShow() {
    navigate("/productlist");
  }

  return (
    <>
      <Navbar logoutHandler={logoutHandler} menuShow={menuShow} />
      <div className="profilecontainer">
        <section className="usersection">
          <div className="userinfo">
            <h1>User Profile</h1>
            <img
              src={userphoto}
              alt="userphoto"
              height="280px"
              width="280px"
            ></img>
            <div>
              <table>
                <tr>
                  <th>
                    <label htmlFor="firstname">FirstName:</label>
                  </th>
                  <td>
                    <span>{users.firstname}</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="lastname">LastName:</label>
                  </th>
                  <td>
                    <span>{users.lastname}</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="email">Email:</label>
                  </th>
                  <td>
                    {editMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={emailChange}
                      />
                    ) : (
                      <span>{users.email}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="password">Password:</label>
                  </th>
                  <td>
                    {editMode ? (
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={passwordChange}
                      />
                    ) : (
                      <span>{users.password}</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor="mobile">mobile:</label>
                  </th>
                  <td>
                    <span>{users.phone}</span>
                  </td>
                </tr>
              </table>
            </div>
            <div className="userbtn">
              <button onClick={editHandler}>Edit</button>
            </div>
          </div>
        </section>

        {editMode && (
          <div className="formcontainer">
            <form className="editform">
              <h2>Edit Form</h2>
              <div className="forminput">
                <InputControl
                  label="FirstName"
                  value={formData.firstname}
                  name="firstname"
                  onChange={firstNameChange}
                />
                <InputControl
                  label="LastName"
                  value={formData.lastname}
                  name="lastname"
                  onChange={lastNameChange}
                />
                <InputControl
                  label="Email"
                  value={formData.email}
                  name="email"
                  onChange={emailChange}
                />
                <InputControl
                  label="Password"
                  value={formData.password}
                  name="password"
                  onChange={passwordChange}
                />
                <InputControl
                  label="Mobile"
                  value={formData.phone}
                  name="mobilenumber"
                  onChange={mobileNumberChange}
                />
              </div>
              <div className="userbtn">
                <button onClick={cancelHandler}>Cancel</button>
                <button onClick={saveHandler}>Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
export default UserProfile;
