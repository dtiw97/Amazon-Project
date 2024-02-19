import { cart, removeFromCart } from '../data/cart.js'
import { products } from '../data/products.js';

let cartHTML = '';
// console.log('product contains', products);
// console.log('cart contains', cart);

renderCart(cart);

function renderCart(cart) {
  let matchingProduct;
  // all items in cart.
  cart.forEach(item => {
    // getting Data from product.js to match items 
    const matchingId = item.prodId;
    products.forEach(listed =>{
      if (listed.id === matchingId) {
        matchingProduct = listed;
      }});
      let itemHTML = `<div class="cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid" id =${matchingProduct.id}>
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${(matchingProduct.priceCents/100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${item.prodQuantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id= "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-1-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-1-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
    cartHTML += itemHTML;
  })
  document.querySelector('.replaced-contents').innerHTML = cartHTML;
}

document.querySelectorAll('.delete-quantity-link')
  .forEach((span) => {
    span.addEventListener('click', () => {
      const deleteItem = span.dataset.productId;
      removeFromCart(deleteItem);
      //console.log('cart contains', cart);
      document.querySelector(`.cart-item-container-${deleteItem}`).remove();
    })
  })
