import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

type Order = {
  id: number;
  quantity: number;
  created_at: string;
  product: Product;
};

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost/api/orders", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setOrders(data);
      } catch (error) {
        alert("ログインしてください");
        navigate("/login");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div style={{ padding: "40px" }}>
      <h2>購入履歴</h2>

      {orders.length === 0 ? (
        <p>購入履歴がありません。</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <h3>{order.product?.name}</h3>
              <p>価格: ¥{order.product?.price}</p>
              <p>数量: {order.quantity}</p>
              <p>購入日: {new Date(order.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
