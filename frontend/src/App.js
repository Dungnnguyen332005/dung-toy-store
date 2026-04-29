import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header
          style={{ background: "#282c34", padding: "10px", color: "white" }}
        >
          <h1>Cửa hàng đồ chơi Thu Quý</h1>
          <nav>
            <Link to="/" style={{ color: "white", marginRight: "20px" }}>
              Trang chủ
            </Link>
            <Link to="/admin" style={{ color: "white" }}>
              Quản lý (Admin)
            </Link>
          </nav>
        </header>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
