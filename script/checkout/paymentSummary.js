import { cart, cartCount, getProduct } from "../../data/cart.js"
import { deliverOptions, getDeliveryCost } from "../../data/deliverOptions.js"
import { toDollar } from "../utils/conversions.js";

export function renderPaymentSummary () {
  let itemTotal = 0;
  let deliverTotal = 0;

  cart.forEach(item => {
    const quantity = item.prodQuantity;

    const matchingProduct = getProduct(item.prodId);
    const deliverCost = getDeliveryCost(item.deliverOptionsId)
    
    const itemPrice = matchingProduct.priceCents;
    const totalPerItem = quantity*itemPrice;

    //console.log('delivercost is', deliverCost);
    itemTotal += totalPerItem;
    deliverTotal += deliverCost;
  });

  const totalBeforeTax = Number(toDollar(itemTotal + deliverTotal));
  const estimatedTax = Number((totalBeforeTax*0.1).toFixed(2));

  const totalCost = (totalBeforeTax + estimatedTax).toFixed(2);

  const paymentHTML = document.querySelector('.payment-summary');
  paymentHTML.innerHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div class="cart-quantity-checkout">Items (${cartCount(cart)}):</div>
    <div class="payment-summary-money">$${toDollar(itemTotal)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${toDollar(deliverTotal)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${estimatedTax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${totalCost}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `
}
