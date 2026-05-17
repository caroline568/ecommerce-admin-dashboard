import { Link } from "react-router-dom"

function ProductCard({ product, handleDelete }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />

      <h2>{product.name}</h2>

      <p><strong>Price:</strong> Ksh {product.price}</p>

      <p><strong>Category:</strong> {product.category}</p>

      <p>{product.description}</p>

      <div className="buttons">
        <Link to={`/products/${product.id}`}>
          <button>Edit</button>
        </Link>

        <button onClick={() => handleDelete(product.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard