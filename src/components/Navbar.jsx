import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link style={{ margin: "10px", color: "#fff" }} to="/">
        Home
      </Link>
      <Link style={{ margin: "10px", color: "#fff" }} to="/products">
        Products
      </Link>
      <Link style={{ margin: "10px", color: "#fff" }} to="/add">
        Add Product
      </Link>
    </nav>
  );
}