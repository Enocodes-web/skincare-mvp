let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartHTML = "";
let total = 0;
const cartItemsContainer = document.getElementById("cart-items");
cart.forEach((item, index) => {
  let itemTotal = item.price * item.quantity;
  total += itemTotal;
  cartHTML += `
    <tr>
      <td><img src="${item.image}" alt="${item.name}" class="cart-product-img"></td>
      <td>${item.name}</td>
      <td>₦${formatPrice(item.price)}</td>
      <td>${item.quantity}</td>
      <td><button onclick="removeItem(${index})">Remove</button></td>
    </tr>
  `;
});
if (cartItemsContainer) {
  cartItemsContainer.innerHTML = cartHTML;
}

function addToCart(name, price, image) {
  
  const existingProductIndex = cart.findIndex(item => item.name === name && item.price === price && item.image === image);
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    const product = {
      name: name,
      price: price,
      quantity: 1,
      image: image
    };
    cart.push(product);
  }
}
function displayCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartItemsContainer.innerHTML += `
      <tr>
        <td><img src="${item.image}" alt="${item.name}" class='cart-product-img'></td>
        <td>${item.name}</td>
        <td>₦${formatPrice(item.price)}</td>
        <td>${item.quantity}</td>
        <td>₦${formatPrice(itemTotal)}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
  });

  const cartTotalElem = document.getElementById("cart-total");
  if (cartTotalElem) {
    cartTotalElem.innerText = `₦${total}`;
  }
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCountElem = document.getElementById("cart-count");
  if (cartCountElem) {
    cartCountElem.textContent = cart.length;
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function formatPrice(amount) {
  return amount.toLocaleString();
}

document.getElementById("clear-cart").addEventListener("click", function(){
  localStorage.removeItem("cart");
  document.querySelector(".cart-items").innerHTML = "";
  cart = [];
  updateCartCount();
  alert("Cart has been cleared");
});

document.getElementById("checkout-btn").addEventListener("click", function() {
    window.location.href = "checkout.html";
});

document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
  displayCart();
});
document.addEventListener('DOMContentLoaded', updateCartCount);


document.addEventListeener("DOMContentLoaded", function(){
  let cart = JSON.parse(localStorage,getItem("cart")) || [];

  if (cart.length === 0) {
    document.getElementById("order-summary").value = "NO items in cart.";
    return;
  }

  let summary = cart.map(item => '${item.name} x${item.quantity} - ₦${item.price * item quantity}').join("\n");
  
    let summaryDiv = document.createElement("pre");
  summaryDiv.textcontent = summary;
  document.querySelector(".checkout-container").appendChild(summaryDiv);

   let phone = "+23408083967968";
    let text = encodeURLComoonent("Hello I want to place an order: \n\n" + summary);
    document.getElementById("whatsapp-link").href = 'https://wa.me/${phone}?tex=${text}';
});
