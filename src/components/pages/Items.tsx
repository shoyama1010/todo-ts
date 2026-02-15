import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Item = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

export const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/api/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("取得エラー:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px" }}>商品一覧（API接続）</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/items/${item.id}`)}
            style={{
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "0.2s",
            }}
          >
            <img
              src={`http://localhost/storage/${item.image}`}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px" }}>{item.name}</h3>
              <p style={{ margin: 0, fontWeight: "bold" }}>¥{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};


