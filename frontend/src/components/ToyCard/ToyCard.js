import React, { useState } from "react";
import styles from "./ToyCard.module.css";

// Đây là "phễu" đón dữ liệu từ App.js ném sang (gọi là props)
function ToyCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  const likeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <div className={styles["toy-list"]}>
      <div className={styles["toy-card"]}>
        <div className={styles["product-image"]}>
          <img src={item.img} alt={item.name} />
        </div>
        <div className="product-name">
          <h3>Tên: {item.name}</h3>
        </div>
        <div className="product-price">
          <p>Giá: {item.price}đ</p>
        </div>

        <div className={styles["product-button"]}>
          <button className={styles["add-in-cart"]}>Thêm vào giỏ hàng</button>
          <button className={styles["like"]} onClick={likeClick}>
            {isLiked ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToyCard;
