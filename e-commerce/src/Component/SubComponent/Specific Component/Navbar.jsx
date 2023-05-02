import styles from "../SpecificComponentCSS/Navbar.module.css";
import InputControl from "./inputControl";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import menu from "../../../Images/menu.webp";
import profile from "../../../Images/userprofile.avif";
import logout from "../../../Images/logout.png";

const Navbar = (props) => {
  const totalQuantity = useSelector((state) => state.allCart.totalQuantity);
  return (
    <div>
      <header>
        <nav className={styles.navbar}>
          <button className={styles.menubtn}>
            <img src={menu} alt="" height="40px" onClick={props.menuShow} />
          </button>
          <h1 className={styles.header}>The Shop</h1>
          <div className={styles.usermanage}>
            <InputControl
              placeholder="Search"
              className={styles.inputfield}
              onChange={props.ChangeHandler}
            />
            <NavLink to="/userprofile">
              <button style={{ height: "54px", cursor: "pointer" }}>
                <img src={profile} alt="" height="50px" />
              </button>
            </NavLink>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/cart-41-95778.png?f=avif&w=256"
              alt=""
              height="50px"
            />
            <button className={styles.logoutbtn} onClick={props.logoutHandler}>
              <img src={logout} alt="" height="40px" />
            </button>
          </div>
        </nav>
        <NavLink to="/cartitem">
          <button className={styles.store} onClick={props.cartShow}>
            {totalQuantity}
          </button>
        </NavLink>
      </header>
    </div>
  );
};
export default Navbar;
