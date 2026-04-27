const Express = require("express");
const Cors = require("cors");
require("dotenv").config();

const App = Express();
const PORT = 5000;
App.use(Cors()); //Dùng để giúp fe giao tiếp be
App.use(Express.json()); //Giúp serve hiểu được dữ liệu dạng Json
let toys = [
  {
    id: 1,
    img: "img1",
    name: "Lego Ninjago",
    price: 350000,
  },
  {
    id: 2,
    img: "img2",
    name: "Lego Chima",
    price: 450000,
  },
  {
    id: 3,
    img: "img3",
    name: "Lego Nexo knights",
    price: 550000,
  },
];

App.get("/api/toys", (req, res) => {
  res.json(toys);
});

App.delete("/api/toys", (req, res) => {
  const { id } = req.params;
  toys = toys.filter((item) => item.id != id);
  res.json({ message: "Xóa dữ liệu thành công" + id });
});

App.post("/api/toys", (req, res) => {
  const { name, price } = req.body;

  const newToy = {
    id: Date.now(),
    name: name,
    price: Number(price),
  };
  toys.push(newToy);
  res.json(newToy);
});

App.listen(PORT, () => {
  console.log(`Đang chạy server tại https:localhost:${PORT}`);
});
