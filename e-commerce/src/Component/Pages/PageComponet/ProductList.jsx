import { useEffect, useState, useRef, useMemo } from "react";
import styles from "../PageCSS/ProductList.module.css";
import loader from "../../../Images/loader.gif";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Featue/CartSlice";
import { NavLink, useNavigate } from "react-router-dom";
import InputControl from "../../SubComponent/Specific Component/inputControl";
import Navbar from "../../SubComponent/Specific Component/Navbar";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHide, setDataHide] = useState(true);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function productDataList() {
      setIsLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const Data = await response.json();
      setProductData(Data);
      setIsLoading(false);
      return Data;
    }
    productDataList();
    setTimeout(productDataList, 2000);
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();

      window.location.href = "/";
    };

    window.history.pushState(null, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
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

  function cartShow() {
    return setShowCart(!showCart);
  }

  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }

  function logoutHandler() {
    navigate("/");
  }

  return (
    <>
      <Navbar
        menuShow={menuShow}
        ChangeHandler={ChangeHandler}
        logoutHandler={logoutHandler}
        cartShow={cartShow}
      />
      <div className={styles.maincontainer}>
        <div className={styles.searchcontainer}>
          <InputControl
            placeholder="Search"
            className={styles.inputfield}
            onChange={ChangeHandler}
          />
          <select className={styles.selectbtn}>
            <option
              value="All Category"
              className={styles.optioncontent}
              onClick={() => handleCategoryClick("All")}
            >
              All Category
            </option>
            <option
              value="men's clothing"
              className={styles.optioncontent}
              onClick={() => handleCategoryClick("men's clothing")}
            >
              Men's Clothing
            </option>
            <option
              value="electronics"
              className={styles.optioncontent}
              onClick={() => handleCategoryClick("electronics")}
            >
              Electronics
            </option>
            <option
              value="women's clothing"
              className={styles.optioncontent}
              onClick={() => handleCategoryClick("women's clothing")}
            >
              Women's Clothing
            </option>
            <option
              value="jewelery"
              className={styles.optioncontent}
              onClick={() => handleCategoryClick("jewelery")}
            >
              Jewelery
            </option>
          </select>
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
                      <NavLink to={`/productdetails/${item.id}`}>
                        <img
                          src={item.image}
                          alt="productimage"
                          className={styles.image}
                        />
                      </NavLink>
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
        {/* {showMenu && (
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
        )} */}
      </div>
    </>
  );
};
export default ProductList;
