const express = require("express"); //Dùng thư viện express
const cors = require("cors"); //Dùng để cho phép be và fe giao tiếp truy cập vào nhau
require("dotenv").config();

const app = express();
const PORT = 5000;

//MiddleWare
app.use(cors()); //Giúp React 3000 truy cập được vào Node 5000
app.use(express.json()); //Để server hiểu được dữ liệu Json

// Dữ liệu đồ chơi mẫu cho cửa hàng Thu Quý
let toys = [
  {
    id: 1,
    name: "Siêu nhân Gao",
    price: 250000,
    img: "https://vcdn.tikicdn.com/ts/product/7d/53/56/a87a7493a74996969567956.jpg",
  },
  {
    id: 2,
    name: "Lego City",
    price: 500000,
    img: "https://vcdn.tikicdn.com/ts/product/2c/3e/5b/567895678956789.jpg",
  },
  {
    id: 3,
    name: "Lego Ninjago",
    price: 500000,
    img: "https://vcdn.tikicdn.com/ts/product/2c/3e/5b/567895678956789.jpg",
  },
];
app.get("/api/toys", (req, res) => {
  res.json(toys);
});

app.delete("/api/toys/:id", (req, res) => {
  const { id } = req.params;
  toys = toys.filter((item) => item.id !== parseInt(id));
  res.json({ message: "Xóa dữ liệu thành công " + id });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng http://localhost:${PORT}`);
});
