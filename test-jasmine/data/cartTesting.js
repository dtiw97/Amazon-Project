import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";

console.log(cart);

describe('test suite: addToCart', () => {


  it('addToCart with no existing product in cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=> {
      return JSON.stringify([]);
    });
  
    loadCartFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'Black and Gray Athletic Cotton Socks - 6 Pairs', 1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart.length).toEqual(1);
    expect(cart[0].prodId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].prodQuantity).toEqual(1);
  })

  it('addToCart with existing product in cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=> {
      return JSON.stringify([{
        prodId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
        prodName : 'Black and Gray Athletic Cotton Socks - 6 Pairs',
        prodQuantity: 1
      }]);
    });
    loadCartFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'Black and Gray Athletic Cotton Socks - 6 Pairs', 3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart.length).toEqual(1);
    expect(cart[0].prodId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
    expect(cart[0].prodQuantity).toEqual(4);

  })
})