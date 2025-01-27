import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();  // Hook to navigate to another page

  const handleViewDetails = () => {
    navigate(`/product/${product.product_id}`);
  };

  const handleAddToCart = () => {
    navigate(`/product/${product.product_id}`);
  };

  return (
    <Card style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <CardMedia
        component="img"
        alt={product.product_title}
        height="200"
        image={product.product_img_url}
        title={product.product_title}
      />
      <CardContent>
        <Typography variant="h6">{product.product_title}</Typography>
        <Typography variant="body2" color="textSecondary">{product.body}</Typography>
        <Typography variant="h5" color="primary">${product.product_price}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddToCart}
          style={{ marginTop: '10px', marginRight: '10px' }}
        >
          Add to Cart
        </Button>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={handleViewDetails}
          style={{ marginTop: '10px' }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
