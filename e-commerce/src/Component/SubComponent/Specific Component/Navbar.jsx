import styles from "../SpecificComponentCSS/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import menu from "../../../Images/menu.webp";
// import profile from "../../../Images/userprofile.avif";
// import logout from "../../../Images/logout.png";

const Navbar = (props) => {
  const totalQuantity = useSelector((state) => state.allCart.totalQuantity);
  return (
    <div>
      <header>
        <div className={styles.navbar}>
          <button className={styles.btn } onClick={props.menuShow}>
            Home
          </button>
          <h1 className={styles.header}>The Shop</h1>
          <div className={styles.usermanage}>
            <NavLink to="/userprofile">
              <button className={styles.btn}>
                Profile
              </button>
            </NavLink>
            <NavLink to="/cartitem">
            <button onClick={props.cartShow} className={styles.cartbtn}>
              <span>Cart</span>
              <span className={styles.totalquantity}>{totalQuantity}</span>
            </button>
            </NavLink>
            <button className={styles.btn} onClick={props.logoutHandler} >
             Logout
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Navbar;
