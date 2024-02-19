import { products } from '../data/products.js'
import { cart, addToCart, cartCount } from '../data/cart.js'

let prodQuantity = 0;
console.log(typeof prodQuantity);
renderProducts();
function renderProducts() {
  let renderHTML = '';
  products.forEach(prod => {
    let prodContainer = ` 
    <div class="product-container product-container-${prod.id}">
    <div class="product-image-container">
      <img class="product-image"
        src="${prod.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
    ${prod.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-45.png">
      <div class="product-rating-count link-primary">
      ${prod.rating.count}
      </div>
    </div>

    <div class="product-price">
    $${(prod.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="item-quantity-${prod.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="
      add-to-cart-button 
      button-primary"
      data-product-name = "${prod.name}"
      id = ${prod.id}>
      Add to Cart
    </button>
  </div>`
    renderHTML += prodContainer;
  });
  document.querySelector('.products-grid').innerHTML = renderHTML;
}

function renderQuantity(prodId) {
  document.querySelector(`.item-quantity-${prodId}`).innerHTML = `
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      `
  prodQuantity = Number(document.querySelector(`.item-quantity-${prodId}`).value);
}

document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      //specific ID, Name & Quantity based on button
      const prodId = button.id;
      const prodName = button.dataset.productName;
      prodQuantity = Number(document.querySelector(`.item-quantity-${prodId}`).value);
      renderQuantity(prodId);
      addToCart(prodId, prodName, prodQuantity);
      cartCount(cart);
      //console.log('prodQuantity : ', prodQuantity);
      //console.log(cart);
    })
  })