import React, { useState, useEffect } from "react";
import ToyCard from "../components/ToyCard";

function AdminPage() {
  const [toyList, setToyList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Bê toàn bộ các hàm useEffect, handleDelete, handleAdd, handleSubmit vào đây...
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
      fetch(`http://localhost:5000/api/toys/${editingID}`, {
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

  return (
    <div>
      <h2>Quản lý kho đồ chơi Thu Quý</h2>

      {/* 1. Phần Form nhập liệu (Dũng bê lại từ App.js sang đây) */}
      <div
        className="add-toy-form"
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên đồ chơi"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Giá"
          type="number"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          style={{ padding: "5px 15px", cursor: "pointer" }}
        >
          {isLoading ? "Đang xử lý..." : editingID ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingID && (
          <button
            onClick={() => {
              setEditingID(null);
              setName("");
              setPrice("");
            }}
            style={{ marginLeft: "10px" }}
          >
            Hủy sửa
          </button>
        )}
      </div>

      {/* 2. Danh sách có nút Sửa/Xóa */}
      {isLoading && toyList.length === 0 ? (
        <p>Đang tải dữ liệu kho...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {toyList.map((item) => (
            <ToyCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={(item) => {
                setEditingID(item.id);
                setName(item.name);
                setPrice(item.price);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
