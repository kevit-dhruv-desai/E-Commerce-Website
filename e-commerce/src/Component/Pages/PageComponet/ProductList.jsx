import { useEffect, useState, useRef, useMemo } from "react";
import styles from "../PageCSS/ProductList.module.css";
import InputControl from "../../SubComponent/Specific Component/inputControl";
import profile from "../../../Images/userprofile.avif";
import loader from "../../../Images/loader.gif";
import menu from "../../../Images/menu.webp";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Featue/CartSlice";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHide, setDataHide] = useState(true);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    async function productDataList() {
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const Data = await response.json();
      setProductData(Data);
      setIsLoading(false);
      console.log(Data);
      return Data;
    }
    productDataList();
    setTimeout(productDataList, 2000);
  }, []);

  let timer = useRef();
  const ChangeHandler = (event) => {
    setDataHide(false);
    setIsLoading(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      console.count();
      setSearch(event.target.value);
      setDataHide(true);
      setIsLoading(false);
    }, 2000);
  };

  const productFilterData = useMemo(() => {
    return productData.filter((data) => {
      if (selectedCategory === "All") {
        return (
          data.category.toLowerCase().includes(search) ||
          data.title.toLowerCase().includes(search)
        );
      } else {
        return (
          data.category.toLowerCase() === selectedCategory.toLowerCase() &&
          (search === "" || data.title.toLowerCase().includes(search))
        );
      }
    });
  }, [productData, search, selectedCategory]);

  function menuShow() {
    return setShowMenu(!showMenu);
  }
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  return (
    <>
      <div>
        <header>
          <nav className={styles.navbar}>
            <img src={menu} alt="" height="40px" onClick={menuShow} />
            <h1 className={styles.header}>The Shop</h1>
            <div className={styles.usermanage}>
              <InputControl
                placeholder="Search"
                className={styles.inputfield}
                onChange={ChangeHandler}
              />
              <img src={profile} alt="" height="50px" />
              <img
                src="https://cdn.iconscout.com/icon/premium/png-512-thumb/cart-41-95778.png?f=avif&w=256"
                alt=""
                height="50px"
              />
            </div>
          </nav>
          <button className={styles.store}>1</button>
        </header>
      </div>

      {dataHide && (
        <div className={styles.mainproductcontent}>
          {productFilterData.length === 0 && (
            <p className={styles.paragraph}>Not Data Found.</p>
          )}
          {productFilterData.map((item) => {
            return (
              <div key={item.id}>
                <section className={styles.itemsection}>
                  <div>
                    <img
                      src={item.image}
                      alt="productimage"
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.productinfo}>
                    <h1 className={styles.category}>{item.category}</h1>
                    <div>{item.title}</div>
                    <span className={styles.price}>$ {item.price}</span>
                    <button
                      className={styles.addcart}
                      onClick={() => {
                        return dispatch(addToCart(item));
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      )}
      {isLoading && <img src={loader} alt="" className={styles.loader} />}
      {showMenu && (
        <div className={styles.menubar}>
          <h1>Category:</h1>
          <ul>
            <li onClick={() => handleCategoryClick("All")}>All Category</li>
            <li onClick={() => handleCategoryClick("men's clothing")}>
              men's clothing
            </li>
            <li onClick={() => handleCategoryClick("jewelery")}>jewelery</li>
            <li onClick={() => handleCategoryClick("electronics")}>
              electronics
            </li>
            <li onClick={() => handleCategoryClick("women's clothing")}>
              women's clothing
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default ProductList;
