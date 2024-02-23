export let cart = JSON.parse(localStorage.getItem('cart'))
export let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));


if (!cart) {
  cart =[{
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
  }]
};

function saveCart () {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
  //console.log(JSON.stringify(cartQuantity));
}

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
      prodQuantity,
      deliverOptionsId: '1',
    })
  }

  console.log(`${prodQuantity} unit of 
"${prodName}" 
is added to cart`);
cartCount();
saveCart();
}

export function cartCount() {
  cartQuantity = 0;
  //console.log(cart);
  cart.forEach((item) => {
    //console.log(item);
    cartQuantity += Number(item.prodQuantity);
  })
  //console.log('cartQuantity :', cartQuantity);
  saveCart();
}

export function removeFromCart (deleteItem) {
  const newCart = [];
  cart.forEach(item => {
    if (item.prodId !== deleteItem) {
      newCart.push(item);
    } 
  });
  cart = newCart;
  console.log(cart);
  //console.log('newcart', newCart);
  cartCount(cart);
  saveCart()
}

export function updateQuantity (prodId, newQuantity) {
  let matchItem; 

  cart.forEach((item) => {
    if (prodId === item.prodId) {
      matchItem = item;
    }
  })
  //console.log('matchItem', matchItem);
  if (matchItem) {
    matchItem.prodQuantity = newQuantity;
  }
  //console.log('matchItem', matchItem);
  cartCount();
  saveCart();
}

export function updateDeliveryOptions (prodId, deliverId){
  let matchItem;
  cart.forEach((item) => {
    if (prodId === item.prodId) {
      matchItem = item;
    }
  })

  matchItem.deliverOptionsId = deliverId;
  //console.log(cart[0]);
  cartCount();
  saveCart();
}