import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './AdminPanel.css';

function AdminPanel({
  isAuthenticated,
  onAuthenticate,
  onLogout,
  products,
  ratings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) {
  if (!isAuthenticated) {
    return <AdminLogin onAuthenticate={onAuthenticate} />;
  }

  return (
    <AdminDashboard
      products={products}
      ratings={ratings}
      onLogout={onLogout}
      onAddProduct={onAddProduct}
      onUpdateProduct={onUpdateProduct}
      onDeleteProduct={onDeleteProduct}
    />
  );
}

export default AdminPanel;
