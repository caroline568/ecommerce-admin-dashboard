const BASE_URL =
  "https://ecommerce-admin-dashboard-i1i7.onrender.com/products";

// GET PRODUCTS
export const fetchProducts = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

// CREATE PRODUCT
export const createProduct = async (product) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return response.json();
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

// UPDATE PRODUCT
export const updateProduct = async (id, updatedProduct) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  return response.json();
};