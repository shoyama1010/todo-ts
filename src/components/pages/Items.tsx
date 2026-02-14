import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
  price: number;
};

export const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div style={{ padding: "30px" }}>
      <h2>商品一覧（API接続）</h2>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ¥{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// // import { useState } from "react";
// import { useEffect, useState } from "react";

// type Item = {
//   id: number;
//   name: string;
// };

// export const Items = () => {
//   const [items, setItems] = useState<Item[]>([
//     { id: 1, name: "りんご" },
//     { id: 2, name: "みかん" },
//     { id: 3, name: "バナナ" },
//   ]);

//   const [newItem, setNewItem] = useState("");

//   const handleAddItem = () => {
//     if (!newItem.trim()) return;

//     const newData: Item = {
//       id: Date.now(),
//       name: newItem,
//     };

//     setItems([...items, newData]);
//     setNewItem("");
//   };

//   const handleDelete = (id: number) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>アイテム一覧</h2>

//       {/* 追加フォーム */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           placeholder='アイテム名を入力'
//           style={{
//             padding: "8px",
//             marginRight: "10px",
//             width: "200px",
//           }}
//         />
//         <button
//           onClick={handleAddItem}
//           style={{
//             padding: "8px 12px",
//             backgroundColor: "#4f46e5",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           追加
//         </button>
//       </div>

//       {/* 一覧表示 */}
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {items.map((item) => (
//           <li
//             key={item.id}
//             style={{
//               marginBottom: "10px",
//               display: "flex",
//               justifyContent: "space-between",
//               maxWidth: "300px",
//               borderBottom: "1px solid #ddd",
//               paddingBottom: "5px",
//             }}
//           >
//             <span>{item.name}</span>
//             <button
//               onClick={() => handleDelete(item.id)}
//               style={{
//                 backgroundColor: "#ef4444",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 padding: "4px 8px",
//                 cursor: "pointer",
//               }}
//             >
//               削除
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
