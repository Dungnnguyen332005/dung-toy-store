import React from "react";

function ToyRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td style={{ fontWeight: "bold" }}>{item.name}</td> {/* Tên trước */}
      <td>
        <img
          src={item.img || "https://via.placeholder.com/50"}
          alt={item.name}
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      </td>{" "}
      {/* Ảnh sau */}
      <td>{Number(item.price).toLocaleString()} VNĐ</td>
      <td>
        <button
          className="btn-edit"
          onClick={() => onEdit(item)}
          style={{ marginRight: "10px" }}
        >
          Sửa
        </button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          Xóa
        </button>
      </td>
    </tr>
  );
}
export default ToyRow;
