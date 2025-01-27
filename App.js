import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { Typography, Container, Grid, Button } from '@mui/material'; 
import ProductCard from './ProductCard';
import ProductDetailsPage from './ProductDetailsPage';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  

  const fetchProducts = () => {
    axios
      .get('http://localhost:5000/api/merch')
      .then((response) => {
        console.log('Fetched products:', response.data);  
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };

  useEffect(() => {
    console.log('App component rendered');
    fetchProducts();
  }, []);

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom textAlign="center" color="primary">
        Charity Merch Page
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGoToHome}
        style={{ marginBottom: '20px' }}
      >
        Go to Home
      </Button>

      <Routes>
        <Route
          path="/"
          element={
            <Grid container spacing={2} justifyContent="center">
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.product_id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="textSecondary">
                  Loading products...
                </Typography>
              )}
            </Grid>
          }
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
    </Container>
  );
};

export default App;
