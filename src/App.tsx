import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/pages/Login";
import { Items } from "./components/pages/Items";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { UserList } from "./components/pages/UserList";
import { Header } from "./components/layout/Header";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { ItemDetail } from "./components/pages/ItemDetail";
import { OrderHistory } from "./components/pages/OrderHistory";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* ログイン */}
          <Route path='/' element={<Login />} />

          {/* ユーザー専用ページ */}
          <Route
            path='/items'
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />

          {/* 管理者ページ */}
          <Route
            path='/admin'
            element={
              <ProtectedRoute role='admin'>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ユーザー一覧（例） */}
          <Route
            path='/users'
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />

          {/* 詳細ページ */}
          <Route
            path='/items/:id'
            element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            }
          />

          <Route path='/orders' element={<OrderHistory />} />

          {/* 存在しないURLはログインへ */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
