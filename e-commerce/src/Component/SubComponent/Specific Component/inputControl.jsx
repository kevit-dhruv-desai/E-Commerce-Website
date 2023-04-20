import React from "react";
import styles from "../SpecificComponentCSS/InputControl.module.css";

const InputControl = (props) => {
  return (
    <div className={styles.inputcontainer}>
      {props.label && <label>{props.label}</label>}
      <input
        type={props.type || "text"}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
      />
    </div>
  );
};

export default InputControl;
