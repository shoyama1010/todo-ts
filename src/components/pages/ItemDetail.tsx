import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Season = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  seasons?: Season[];
};

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // 商品取得
  useEffect(() => {
    fetch(`http://localhost/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("取得エラー:", error);
        setLoading(false);
      });
  }, [id]);

  // 購入処理
  const handlePurchase = async () => {
    if (!product) return;

    try {
      // ★ 追加（重要）
      await fetch("http://localhost/sanctum/csrf-cookie", {
        credentials: "include",
      });

      const res = await fetch("http://localhost/api/orders", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user_id: 1,
          product_id: Number(id),
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error("failed");
      // const data = await res.json();
      // console.log("購入結果:", data);

      alert("購入しました！");
    } catch (error) {
      console.error("購入エラー:", error);
      alert("購入に失敗しました");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>読み込み中...</p>;
  if (!product) return <p style={{ padding: "40px" }}>商品が見つかりません</p>;


  return (
    <div style={{ padding: "40px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "none",
          backgroundColor: "#ccc",
          cursor: "pointer",
        }}
      >
        ← 戻る
      </button>

      <h2>{product.name}</h2>

      <img
        src={`http://localhost/storage/${product.image}`}
        alt={product.name}
        style={{ width: "400px", borderRadius: "12px" }}
      />

      <p style={{ fontSize: "20px", marginTop: "20px" }}>¥{product.price}</p>

      <p style={{ marginTop: "10px" }}>{product.description}</p>

      {product.seasons && product.seasons.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <strong>旬の季節：</strong>
          {product.seasons.map((season) => (
            <span
              key={season.id}
              style={{
                marginRight: "10px",
                padding: "4px 10px",
                border: "1px solid #ccc",
                borderRadius: "20px",
              }}
            >
              {season.name}
            </span>
          ))}
        </div>
      )}

      {/* 購入ボタン */}
      <button
        onClick={() => handlePurchase()}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ff9800",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        購入する
      </button>
    </div>
  );
};;
