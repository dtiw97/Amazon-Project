import { loadCartFromStorage, cart } from "../../data/cart.js";
import { renderCart } from "../../script/checkout/orderSummary.js";

describe('test suite: renderCart() shows the item inside the cart for order.', () => {

  const prodId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const prodId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    document.querySelector('.js-replaced-contents').innerHTML =
      `<div class="replaced-contents"> lmao </div>
    <div class="payment-summary"></div>`;

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        prodId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        prodName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        prodQuantity: 10,
        deliverOptionsId: '1',
      },
      {
        prodId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        prodName: "Intermediate Size Basketball",
        prodQuantity: 5,
        deliverOptionsId: '2',
      }])
    })
    loadCartFromStorage();
    renderCart();

  })

  afterEach(() => {
    document.querySelector('.js-replaced-contents').innerHTML = '';
  })

  it('How the page looks & how the page behaves', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${prodId1}`).innerText
    ).toContain('Quantity: 10');

    expect(
      document.querySelector(`.js-product-quantity-${prodId2}`).innerText
    ).toContain('Quantity: 5');

  })

  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${prodId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.cart-item-container-${prodId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.cart-item-container-${prodId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].prodId).toEqual(prodId2);

    

  })
})