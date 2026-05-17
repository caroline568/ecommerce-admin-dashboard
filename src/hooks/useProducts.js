import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };

    load();
  }, []);

  const reload = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  return { products, loading, reload };
}