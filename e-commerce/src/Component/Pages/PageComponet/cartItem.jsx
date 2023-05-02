import { useDispatch, useSelector } from "react-redux";
import styles from "../PageCSS/cartItem.module.css";
import {
  increaseQuantity,
  removeFromCart,
} from "../../../Featue/CartSlice";
import { decreaseQuantity } from "../../../Featue/CartSlice";
import remove from "../../../Images/remove.png";

const CartItem = () => {
  const data = useSelector((state) => state.allCart.cart);
  const totalQuantity = useSelector((state) => state.allCart.totalQuantity);
  const totalPrice = useSelector((state) => state.allCart.totalPrice);
  const dispatch = useDispatch();
  console.log(data);

 function handlePlaceOrder(){
    window.location.href = "/checkout"
  }

  return (
    <>
      <section className={styles.section}>
        <h1 className={styles.heading}>Cart Item</h1>
        {data.map((items) => (
          <div className={styles.container} key={items.id}>
            <div className={styles.cartcontainer}>
              <div className={styles.cartitem}>
                <img
                  src={items.image}
                  alt="productimg"
                  height="340px"
                  width="300px"
                />
                <div className={styles.cartinfo}>
                  <h1>{items.category}</h1>
                  <div>{items.title}</div>
                  <span>Price: ${items.price}</span>
                  <div className={styles.quantitycontent}>
                    <button onClick={() => dispatch(increaseQuantity(items))}>
                      +
                    </button>
                    <span>Quantity: {items.quantity}</span>
                    <button onClick={() => dispatch(decreaseQuantity(items))}>
                      -
                    </button>
                    <button
                      onClick={() => {
                        dispatch(removeFromCart(items));
                      }}
                    >
                      <img
                        src={remove}
                        alt="remove"
                        height="30px"
                        width="30px"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
       {data.length > 0 && (<div className={styles.checkoutinfo}>
          <h1>Summary</h1>
          <div className={styles.btncontent}>
            <p>
              Total Quantity:{" "}
              <span className={styles.btn}>{totalQuantity}</span>
            </p>
            <p>
              Total Amount: <span className={styles.btn}>{totalPrice}</span>
            </p>
            <button className={styles.orderbtn} onClick={handlePlaceOrder}>
              Order Checkout
            </button>
          </div>
        </div>)}
        {data.length === 0 && (<p className={styles.nocart}>No Cart</p>)}
      </section>
    </>
  );
};
export default CartItem;
