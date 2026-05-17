import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProducts, updateProduct } from "../utils/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      const product = data.find((p) => p.id.toString() === id);

      if (product) {
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
      }
    };

    load();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProduct(id, { name, price, description });

    navigate("/");
  };

  return (
    <form onSubmit={handleUpdate} style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Update</button>
    </form>
  );
}