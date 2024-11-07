import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/shop"); // Redirect back to shop or landing page
  };

  return (
    <div className="checkout-container">
      <div className="checkout-message">
        <FaCheckCircle className="success-icon" />
        <h2>Order Confirmed!</h2>
        <p>Your order will soon be completed. Your cart has been cleared.</p>
        <button className="back-to-shop-button" onClick={handleGoBack}>
          Back to Shop
        </button>
      </div>
    </div>
  );
}
