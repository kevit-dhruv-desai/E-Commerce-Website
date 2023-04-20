import styles from "../SpecificComponentCSS/Button.module.css";
const Button = (props) => {
  return (
    <button className={styles.commonbutton} type={props.type}>
      {props.content}
    </button>
  );
};
export default Button;
