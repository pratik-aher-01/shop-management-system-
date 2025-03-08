// Product Management
const productForm = document.getElementById('add-product-form');
const productList = document.getElementById('product-list');
const salesProductSelect = document.getElementById('sale-product');
let products = [];

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const quantity = parseInt(document.getElementById('product-quantity').value);

  const product = { name, price, quantity };
  products.push(product);
  updateProductList();
  updateSalesProductSelect();
  updateInventorySummary();
  productForm.reset();
});

function updateProductList() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - Price: $${product.price} - Quantity: ${product.quantity}`;
    productList.appendChild(li);
  });
}

// Sales Tracking
const salesForm = document.getElementById('add-sale-form');
const salesList = document.getElementById('sales-list');
let sales = [];

salesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const productIndex = salesProductSelect.selectedIndex;
  const quantity = parseInt(document.getElementById('sale-quantity').value);

  if (products[productIndex].quantity >= quantity) {
    products[productIndex].quantity -= quantity;
    const sale = { product: products[productIndex].name, quantity };
    sales.push(sale);
    updateSalesList();
    updateProductList();
    updateInventorySummary();
    salesForm.reset();
  } else {
    alert('Not enough stock!');
  }
});

function updateSalesList() {
  salesList.innerHTML = '';
  sales.forEach((sale) => {
    const li = document.createElement('li');
    li.textContent = `${sale.product} - Quantity Sold: ${sale.quantity}`;
    salesList.appendChild(li);
  });
}

function updateSalesProductSelect() {
  salesProductSelect.innerHTML = '';
  products.forEach((product) => {
    const option = document.createElement('option');
    option.textContent = product.name;
    salesProductSelect.appendChild(option);
  });
}

// Inventory Summary
const totalProductsSpan = document.getElementById('total-products');
const totalSalesSpan = document.getElementById('total-sales');

function updateInventorySummary() {
  totalProductsSpan.textContent = products.length;
  totalSalesSpan.textContent = sales.length;
}
