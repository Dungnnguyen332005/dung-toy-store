import React, { useState, useEffect } from "react";
import ToyCard from "../components/ToyCard";

function HomePage() {
  const [toyList, setToyList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/toys")
      .then((res) => res.json())
      .then((data) => {
        setToyList(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h2>Danh sách đồ chơi mới nhất</h2>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {toyList.map((item) => (
            <ToyCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
