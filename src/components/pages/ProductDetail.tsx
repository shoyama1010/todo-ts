import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`http://localhost/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{product.name}</h2>

      <img
        src={`http://localhost/storage/${product.image}`}
        alt={product.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <p>¥{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};
