import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [toyList, setToyList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/toys")
      .then((res) => res.json())
      .then((data) => {
        setToyList(data);
      })
      .catch((err) => console.log(`Lỗi kết nối rồi ${err}`));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/toys/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        const danhSachMoi = toyList.filter((item) => item.id !== id);
        setToyList(danhSachMoi);
      })
      .catch((err) => console.log("Lỗi khi xóa" + err));
  };

  return (
    <div>
      <h1>Cửa hàng đồ chơi Thu Quý</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        {toyList.map((toys) => (
          <div key={toys.id} className="toy-card">
            <img src={toys.img} width="150" />
            <h3>{toys.name}</h3>
            <p>Giá:{toys.price}</p>
            <button
              onClick={() => handleDelete(toys.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                cursor: "pointer",
              }}
            >
              Xóa món này
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
