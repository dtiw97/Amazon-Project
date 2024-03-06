import { cart, removeFromCart, cartQuantity, updateQuantity, updateDeliveryOptions, getProduct } from '../../data/cart.js'
import { products } from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliverOptions } from '../../data/deliverOptions.js';
import { toDollar } from '../utils/conversions.js';
import { renderPaymentSummary } from './paymentSummary.js';

// console.log('product contains', products);
// console.log('cart contains', cart);

export function renderCart() {
  let cartHTML = '';
  
  // all items in cart.

  cart.forEach(item => {
    // getting Data from product.js to match items 
    const matchingId = item.prodId;
    const matchingProduct = getProduct(matchingId);
    
    let deliverOption = [];
    deliverOptions.forEach(option => {
      if (option.deliverId === item.deliverOptionsId) {
        deliverOption = option;
        //console.log(deliverOption);
      }
    });

    const dateString = dayjs().add(deliverOption.deliverDays, 'days');

    let itemHTML = `<div class="cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString.format('dddd, MMMM D')}
    </div>

    <div class="cart-item-details-grid" id =${matchingProduct.id}>
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${toDollar(matchingProduct.priceCents)}
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
                ${renderDelivery(matchingProduct, item)}
              </div>
    </div>
  </div>`
    cartHTML += itemHTML;
    updateQuantity();
    renderQuantity();
  })
  document.querySelector('.replaced-contents').innerHTML = cartHTML;

  //Delete Button
  document.querySelectorAll('.delete-quantity-link')
    .forEach((span) => {
      span.addEventListener('click', () => {
        //document.createElement("span").innerHTML = "hi";
        const deleteItem = span.dataset.productId;
        //console.log(deleteItem);
        removeFromCart(deleteItem);
        renderQuantity();
        renderPaymentSummary();
        //console.log('cart contains', cart);
        document.querySelector(`.cart-item-container-${deleteItem}`).remove();
      })
    })


  //Update Button
  document.querySelectorAll('.update-quantity-link')
    .forEach((span) => {
      span.addEventListener('click', () => {

        const updateItem = span.dataset.productId;
        span.classList.add('is-editing-quantity');
        let newQuantity = Number(document.querySelector(`.quantity-label-${updateItem}`).innerText);
        let quantitySpanDOM = document.querySelector(`.update-new-quantity-${updateItem}`);
        quantitySpanDOM.innerHTML =
          ` Quantity: <input type="number" class="quantity-input quantity-input-${updateItem}" value="${newQuantity}">
      <span class="save-quantity-link link-primary">Save</span>`;

        // console.log(quantitySpanDOM);
        // console.log('newquantity :', newQuantity);
        document.querySelector(`.save-quantity-link`)
          .addEventListener('click', () => {
            newQuantity = document.querySelector(`.quantity-input-${updateItem}`).value;
            if (newQuantity < 1) {
              alert('Minimum value is 1');
              return;
            }
            changeQuantity(updateItem, newQuantity, quantitySpanDOM);
            renderPaymentSummary();
            span.classList.remove('is-editing-quantity');
          })

        document.querySelector(`.quantity-input-${updateItem}`)
          .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              newQuantity = document.querySelector(`.quantity-input-${updateItem}`).value;
              if (newQuantity < 1) {
                alert('Minimum value is 1');
                return;
              }
              changeQuantity(updateItem, newQuantity, quantitySpanDOM);
              renderPaymentSummary();
              span.classList.remove('is-editing-quantity');
            }
          })
        //console.log('item id:', updateItem);
        //console.log(quantitySpanDOM);
        //updateQuantity(updateItem);
      })
    })

  //Delivery Options
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        let deliverId = element.dataset.options;
        let prodId = element.dataset.prodId;
        updateDeliveryOptions(prodId, deliverId);
        renderCart();
        renderPaymentSummary();
      })
    }
    )
}


function isWeekend (input) {
  if (input.$W === 6) {
    input.$W = 1;
    input.$D += 2;
  } else if (input.$W === 0){
    input.$W = 1; 
    input.$D += 1;
  }
}

function renderQuantity() {
  document.querySelector('.return-to-home-link').innerHTML = cartQuantity + ' items';
  document.querySelector('.cart-quantity-checkout').innerHTML = `Items (${cartQuantity})`;
}

function changeQuantity(updateItem, newQuantity, quantitySpanDOM) {

  updateQuantity(updateItem, newQuantity);
  renderQuantity();
  console.log('cart contains:', cart);
  quantitySpanDOM.innerHTML = ` Quantity: <span class="quantity-label-${updateItem}">${newQuantity}</span>`;
}


function renderDelivery(matchingProduct, item) {
  let deliverHTML = '';

  deliverOptions.forEach((options) => {
    //console.log(options);

    const dateString = dayjs().add(options.deliverDays, 'days');
    isWeekend(dateString);
    //console.log(dateString);
    const deliverString =
      options.deliverCost === 0 ?
        'FREE' :
        `$${toDollar(options.deliverCost)} -`;

    const checkedOption = item.deliverOptionsId === options.deliverId ? 'checked' : '';

    deliverHTML += `
    <div class="delivery-option js-delivery-option"
    data-options="${options.deliverId}"
    data-prod-id="${matchingProduct.id}">
      <input type="radio" ${checkedOption}
        class="delivery-option-input "
        name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString.format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            ${deliverString} Shipping
          </div>
        </div>
    </div>
    `
  })
  return deliverHTML;
}


