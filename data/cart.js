export const cart = [];

export function addToCart(prodId, prodName, prodQuantity) {
  let matchItem;
  cart.forEach((item) => {
    if (prodId === item.prodId) {
      matchItem = item;
    }
  })

  if (matchItem) {
    matchItem.quantity += prodQuantity;
  } else {
    cart.push({
      prodId, prodName,
      quantity: prodQuantity
    })
  }

  alert(`${prodQuantity} unit of 
"${prodName}" 
is added to cart`);
}

export function cartCount() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  })
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  //console.log('cartQuantity :', cartQuantity);
}

