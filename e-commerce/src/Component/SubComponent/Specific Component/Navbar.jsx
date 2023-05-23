import styles from "../SpecificComponentCSS/Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import menu from "../../../Images/menu.webp";
import profile from "../../../Images/userprofile.avif";
import logout from "../../../Images/logout.png";
import cartimg from "../../../Images/cart.jpg"

const Navbar = (props) => {
  const totalQuantity = useSelector((state) => state.allCart.totalQuantity);
  return (
    <div>
      <header>
        <div className={styles.navbar}>
          <button className={styles.btn } onClick={props.menuShow}>
            <img src={menu} alt="" className={styles.image} />
          </button>
          <h1 className={styles.header}>The Shop</h1>
          <div className={styles.usermanage}>
            <NavLink to="/userprofile">
              <button className={styles.btn}>
              <img src={profile} alt="" className={styles.image} />
              </button>
            </NavLink>
            <NavLink to="/cartitem">
            <button onClick={props.cartShow} className={styles.cartbtn}>
              
              <img src={cartimg} alt="" height="60px" width="60px"/>
            </button>
            <span className={styles.totalquantity}>{totalQuantity}</span>
            </NavLink>
            <button className={styles.btn} onClick={props.logoutHandler} >
            <img src={logout} alt="" className={styles.image} />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Navbar;
