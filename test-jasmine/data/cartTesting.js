import { addToCart, cart, loadCartFromStorage } from "../../data/cart.js";

console.log(cart);

describe('test suite: addToCart', () => {


  it('addToCart with existing product in cart', () => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=> {
      return JSON.stringify([]);
    });
  
    loadCartFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart.length).toEqual(1);
  })
})