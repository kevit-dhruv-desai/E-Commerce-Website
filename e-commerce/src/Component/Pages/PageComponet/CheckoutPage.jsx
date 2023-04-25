import styles from '../PageCSS/CheckoutPage.module.css'

const CheckoutPage = () => {

  function handleBack(){
    window.location.href="/productlist"
  }
  return (
 
    <div className={styles.checkoutcontainer}>
      <section className={styles.checkout}>
        <p>Your order has been placed successfully!</p>
        <button className={styles.backbutton} onClick={handleBack}>Back</button>
      </section>
    </div>
  );
};
export default CheckoutPage;
