const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);
  let result = newItemPrice + cartTotal;
  res.send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  const discount = (cartTotal * 10) / 100;
  let result;
  if (isMember === 'true') {
    result = cartTotal - discount;
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const tax = (cartTotal * 5) / 100;
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = parseFloat(req.query.distance);
  let result;
  if (shippingMethod === 'express') {
    result = distance / 100;
  } else if (shippingMethod === 'standard') {
    result = distance / 50;
  }
  res.send(result.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
