import { cart, removeFromCart, cartQuantity, updateQuantity } from '../data/cart.js'
import { products } from '../data/products.js';

let cartHTML = '';
// console.log('product contains', products);
// console.log('cart contains', cart);

renderCart(cart);

function renderCart(cart) {
  renderQuantity();
  let matchingProduct;
  // all items in cart.
  cart.forEach(item => {
    // getting Data from product.js to match items 
    const matchingId = item.prodId;
    products.forEach(listed => {
      if (listed.id === matchingId) {
        matchingProduct = listed;
      }
    });
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
          $${(matchingProduct.priceCents / 100).toFixed(2)}
        </div>
        <div class="product-quantity">
          <span class="update-new-quantity-${matchingProduct.id}">
            Quantity: <span class="quantity-label-${matchingProduct.id}">${item.prodQuantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id = ${matchingProduct.id}>
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
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

function renderQuantity() {
  document.querySelector('.return-to-home-link').innerHTML = cartQuantity + ' items';
  document.querySelector('.cart-quantity-checkout').innerHTML = `Items (${cartQuantity})`;
}

document.querySelectorAll('.delete-quantity-link')
  .forEach((span) => {
    span.addEventListener('click', () => {
      document.createElement("span").innerHTML = "hi";
      const deleteItem = span.dataset.productId;
      //console.log(deleteItem);
      removeFromCart(deleteItem);
      renderQuantity();
      //console.log('cart contains', cart);
      document.querySelector(`.cart-item-container-${deleteItem}`).remove();
    })
  })

document.querySelectorAll('.update-quantity-link')
  .forEach((span) => {
    span.addEventListener('click', () => {
      const updateItem = span.dataset.productId;
      span.classList.add('is-editing-quantity');
      let newQuantity = Number(document.querySelector(`.quantity-label-${updateItem}`).innerText);
      let quantitySpanDOM = document.querySelector(`.update-new-quantity-${updateItem}`);
      


      quantitySpanDOM.innerHTML = ` Quantity: <input type="number" class="quantity-input quantity-input-${updateItem}" value="${newQuantity}"><span class="save-quantity-link link-primary">Save</span>`;

      console.log(quantitySpanDOM);
      console.log('newquantity :', newQuantity);

      document.querySelector(`.save-quantity-link`)
        .addEventListener('click', () => {
          newQuantity = document.querySelector(`.quantity-input-${updateItem}`).value;
          if (newQuantity < 1) {
            alert('Minimum value is 1');
            return;
          }
          updateQuantity(updateItem, newQuantity);
          renderQuantity();
          console.log('cart contains:', cart);
          quantitySpanDOM.innerHTML = ` Quantity: <span class="quantity-label-${updateItem}">${newQuantity}</span>`;
          span.classList.remove('is-editing-quantity');
        })
      
      //console.log('item id:', updateItem);
      //console.log(quantitySpanDOM);
      //updateQuantity(updateItem);
    })
  })

  
console.clear();