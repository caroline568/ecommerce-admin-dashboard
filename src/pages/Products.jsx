import { useState } from "react";
import useProducts from "../hooks/useProducts";
import { deleteProduct } from "../utils/api";
import { Link } from "react-router-dom";

export default function Products() {
  const { products, reload, loading } = useProducts();
  const [search, setSearch] = useState("");

  const handleDelete = async (id) => {
    await deleteProduct(id);
    reload();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2> Products</h2>

        <Link to="/add">
          <button
            style={{
              padding: "10px 15px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Product
          </button>
        </Link>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          marginTop: "10px",
          marginBottom: "20px",
          width: "250px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {/* LOADING */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>

          {filtered.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* IMAGE */}
              <img
                src={
                  p.image ||
                  `https://source.unsplash.com/300x200/?${p.name}`
                }
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              {/* TEXT */}
              <h3>{p.name}</h3>
              <p><b>Price:</b> ${p.price}</p>
              <p style={{ color: "#555" }}>{p.description}</p>

              {/* BUTTONS */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{
                    padding: "8px 12px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>

                <Link to={`/edit/${p.id}`}>
                  <button
                    style={{
                      padding: "8px 12px",
                      background: "blue",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}