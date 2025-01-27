import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button, CircularProgress, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetails = (productId) => {
    setLoading(true); // Set loading to true when fetching
    axios
      .get(`http://localhost:5000/api/merch/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error" textAlign="center">
          Product not found!
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={4} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <img
            src={product.product_img_url || 'https://via.placeholder.com/400'}
            alt={product.product_title}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.product_title}</Typography>
          <Typography variant="body1" style={{ margin: '20px 0' }}>
            {product.body}
          </Typography>
          <Typography variant="h6" color="secondary">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2">Stock: {product.stock}</Typography>
          <Typography variant="body2" style={{ margin: '20px 0' }}>
            Likes: {product.liked}
          </Typography>

          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Add to Cart
          </Button>
          <Button variant="contained" color="secondary">
            Buy Now
          </Button>

          <Typography variant="h6" style={{ marginTop: '20px' }}>
            Reviews:
          </Typography>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index}>
                <Typography variant="body2">
                  {review.user}: {review.rating} stars
                </Typography>
                <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                  "{review.comment}"
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No reviews yet.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;
