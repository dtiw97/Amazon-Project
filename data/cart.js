export let cart = [
  {
    prodId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    prodName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    prodQuantity: 10,
  },
  {
    prodId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    prodName: "Intermediate Size Basketball",
    prodQuantity: 5,
  }
];


export function addToCart(prodId, prodName, prodQuantity) {
  let matchItem;
  cart.forEach((item) => {
    if (prodId === item.prodId) {
      matchItem = item;
    }
  })

  if (matchItem) {
    matchItem.prodQuantity += prodQuantity;
  } else {
    cart.push({
      prodId, prodName,
      prodQuantity
    })
  }

  alert(`${prodQuantity} unit of 
"${prodName}" 
is added to cart`);
}

export function cartCount() {
  let cartQuantity = 0;
  console.log(cart);
  cart.forEach((item) => {
    console.log(item);
    cartQuantity += Number(item.prodQuantity);
  })
  console.log('cartQuantity :', cartQuantity);
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}

export function removeFromCart (deleteItem) {
  const newCart = [];
  cart.forEach(item => {
    if (item.prodId !== deleteItem) {
      newCart.push(item);
    } 
  });
  cart = newCart;
  //console.log('newcart', newCart);
}

