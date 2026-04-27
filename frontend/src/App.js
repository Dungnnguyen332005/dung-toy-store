import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toyList, setToyList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/toys")
      .then((res) => res.json())
      .then((data) => {
        setToyList(data);
      })
      .catch((err) => console.log(`Lỗi kết nối tại ${err}`));
  }, []);

  const handleDelete = (id) => {
    fetch("http://localhost:5000/api/toys", { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const newToyList = toyList.filter((id) => toyList.id !== id);
        setToyList(newToyList);
      });
  };

  const handleAdd = () => {
    fetch("http://localhost:5000/api/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    })
      .then((res) => res.json())
      .then((newItem) => {
        setToyList([...toyList, newItem]);
        setName("");
        setPrice("");
      });
  };

  return (
    <div>
      <div className="add-toy-form">
        <input
          type="text"
          placeholder="Nhập vào tên sản phẩm "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Nhập vào giá sản phẩm "
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAdd}>Thêm đồ chơi mới</button>
      </div>

      <div
        className="toyList"
        style={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "row",
          gap: "15px",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        {toyList.map((item) => (
          <div
            className="toy-card"
            style={{
              border: "1px solid red",
              width: "200px",
              borderRadius: "8px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img src={item.img} alt={item.name} />
            <h3>Tên sản phẩm:{item.name}</h3>
            <p style={{ color: "red" }}>Giá sản phẩm:{item.price}</p>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => handleDelete(item.id)}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
