import React, { useState, useEffect } from "react";
import ToyCard from "./components/ToyCard";
import "./App.css";

function App() {
  const [toyList, setToyList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingID, setEditingID] = useState(null);
  // 1. Thêm biến trạng thái Loading
  const [isLoading, setIsLoading] = useState(false);
  //Dùng để kết nối với be
  useEffect(() => {
    setIsLoading(true); // Bắt đầu lấy dữ liệu thì hiện Loading
    fetch("http://localhost:5000/api/toys")
      .then((res) => res.json())
      .then((data) => {
        setToyList(data);
        setIsLoading(false); // Xong rồi thì tắt Loading
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  //Hàm xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Dũng có chắc muốn xóa món này không?")) {
      setIsLoading(true); // Đang xóa cũng hiện Loading
      fetch(`http://localhost:5000/api/toys/${id}`, { method: "DELETE" }).then(
        (res) => {
          if (res.ok) {
            setToyList(toyList.filter((item) => item.id !== id));
          }
          setIsLoading(false);
        },
      );
    }
  };
  //Hàm thêm sản phẩm
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

  //Hàm xử lý chạm
  const handleClick = (item) => {
    setEditingID(item.id);
    setName(item.name);
    setPrice(item.price);
  };

  //Hàm xử lý nút thêm hoặc xóa sản phẩm
  const handleSubmit = () => {
    if (editingID) {
      fetch("http://localhost:5000/api/toys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price }),
      })
        .then((res) => res.json())
        .then((updateItem) => {
          const newList = toyList.map((item) =>
            item.id === editingID ? updateItem : item,
          );

          setToyList(newList);
          setEditingID(null);
          setName("");
          setPrice("");
        });
    } else {
      handleAdd();
    }
  };

  //Render giao diện người dùng lên trình duyệt
  return (
    <div className="App">
      <h1>Cửa hàng đồ chơi Thu Quý</h1>

      {/* Form nhập liệu */}
      <div className="add-toy-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên đồ chơi"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
        />
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : editingID ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>

      {/* 2. Hiển thị Loading hoặc Danh sách */}
      {isLoading ? (
        <div className="loading-spinner">
          Đang tải dữ liệu, Dũng đợi tí nhé...
        </div>
      ) : (
        <div
          className="toyList"
          style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
        >
          {toyList.map((item) => (
            <ToyCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
