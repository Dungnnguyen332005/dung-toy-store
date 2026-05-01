import React, { useState, useEffect } from "react";
import ToyCard from "../components/ToyCard/ToyCard";

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
        <div className="toy-grid">
          {toyList.map((toy) => (
            <ToyCard key={toy.id} item={toy} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
