import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        fontFamily: "Arial",
        padding: "40px",
      }}
    >
      {/* HERO SECTION */}
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          ⭐ Admin Dashboard
        </h1>

        <p style={{ color: "#555", fontSize: "18px" }}>
          Manage products, edit listings, and control your e-commerce inventory in one place.
        </p>

        <div style={{ marginTop: "20px" }}>
          <Link to="/products">
            <button
              style={{
                padding: "12px 20px",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              View Products
            </button>
          </Link>

          <Link to="/add">
            <button
              style={{
                padding: "12px 20px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              + Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* STATS SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div style={cardStyle}>
          <h2> Products</h2>
          <p>Manage all your items</p>
        </div>

        <div style={cardStyle}>
          <h2>⚡ Fast CRUD</h2>
          <p>Create, edit, delete easily</p>
        </div>

        <div style={cardStyle}>
          <h2>📊 Admin Control</h2>
          <p>Full inventory management</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  textAlign: "center",
};