import React from "react";

// Đây là "phễu" đón dữ liệu từ App.js ném sang (gọi là props)
function ToyCard({ item, onDelete, onEdit }) {
  return (
    <div
      className="toy-card"
      style={{
        border: "1px solid red",
        width: "200px",
        borderRadius: "8px",
        textAlign: "center",
        cursor: "pointer",
        padding: "10px",
      }}
    >
      <img src={item.img} alt={item.name} style={{ width: "100%" }} />
      <h3>Tên: {item.name}</h3>
      <p style={{ color: "red" }}>Giá: {item.price}đ</p>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          style={{ backgroundColor: "red", color: "white", cursor: "pointer" }}
          onClick={() => onDelete(item.id)}
        >
          Xóa
        </button>
        <button
          style={{
            backgroundColor: "orange",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => onEdit(item)}
        >
          Sửa
        </button>
      </div>
    </div>
  );
}

export default ToyCard;
