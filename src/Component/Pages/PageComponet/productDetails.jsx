import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import loader from "../../../Images/loader.gif";
import { addToCart } from "../../../Featue/CartSlice";
import { useDispatch } from "react-redux";
import "../PageCSS/ProductDetails.css";
import Navbar from "../../SubComponent/Specific Component/Navbar";

const ProductDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductDetails() {
      setIsLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      console.log(data);
      setProduct(data);
      setIsLoading(false);
      setImageList([data.image, data.image, data.image]);
    }
    getProductDetails();
  }, [id]);

  function menuShow() {
    navigate("/productlist");
  }
  return (
    <>
      <Navbar menuShow={menuShow} />
      <div className="productcontainer">
        {isLoading && <img src={loader} alt="" className="loading" />}
        {!isLoading && (
          <div className="productdetail">
            <img
              src={imageList[currentImageIndex]}
              alt={product.title}
              className={`main-img ${
                currentImageIndex === 0 || currentImageIndex === 1
                  ? "decorate"
                  : "null"
              }`}
            />
            <div className="productinfo">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h2>${product.price}</h2>
              <div className="image-container">
                {imageList.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={product.title}
                    height="50px"
                    width="50px"
                    className={currentImageIndex === index ? "active" : ""}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="crtbtn"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default ProductDetails;
