import { useState } from 'react';
import Header from './components/Header';
import RatingSection from './components/RatingSection';
import ProductsList from './components/ProductsList';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import './App.css';

const DEMO_PRODUCTS = [
  {
    id: 1,
    name: 'Kit de Chaves Combinadas',
    price: 'R$ 89,90',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=500&q=80',
    description: 'Conjunto completo de chaves para manutenção automotiva',
    link: 'https://www.google.com/search?q=kit+chaves+combinadas+auto',
  },
  {
    id: 2,
    name: 'Filtro de Ar Premium',
    price: 'R$ 45,50',
    image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=500&q=80',
    description: 'Filtro de ar de alta performance para motores',
    link: 'https://www.google.com/search?q=filtro+ar+automotivo+premium',
  },
  {
    id: 3,
    name: 'Sensor de Estacionamento',
    price: 'R$ 150,00',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80',
    description: 'Sistema de sensor traseiro para manobragem segura',
    link: 'https://www.google.com/search?q=sensor+estacionamento+carro',
  },
  {
    id: 4,
    name: 'Lanterna LED de Trabalho',
    price: 'R$ 65,00',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=500&q=80',
    description: 'Lanterna LED resistente para uso em oficina',
    link: 'https://www.google.com/search?q=lanterna+led+trabalho',
  },
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [ratings, setRatings] = useState([]);

  const handleAddProduct = (newProduct) => {
    const product = {
      id: Date.now(),
      ...newProduct,
    };
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleRating = (emoji) => {
    const newRating = {
      id: Date.now(),
      emoji,
      timestamp: new Date().toLocaleString('pt-BR'),
    };
    setRatings([...ratings, newRating]);
  };

  if (currentView === 'admin') {
    if (!isAdminAuth) {
      return (
        <AdminPanel
          isAuthenticated={false}
          onAuthenticate={() => setIsAdminAuth(true)}
          onLogout={() => setCurrentView('home')}
          products={products}
          ratings={ratings}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      );
    }

    return (
      <AdminPanel
        isAuthenticated={true}
        onAuthenticate={() => setIsAdminAuth(true)}
        onLogout={() => {
          setIsAdminAuth(false);
          setCurrentView('home');
        }}
        products={products}
        ratings={ratings}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    );
  }

  return (
    <div className="app-container">
      <Header onAdminClick={() => setCurrentView('admin')} />
      <RatingSection onRate={handleRating} />
      <ProductsList products={products} />
      <Footer />
    </div>
  );
}

export default App;
