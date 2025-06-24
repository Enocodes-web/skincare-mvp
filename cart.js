let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  // Check if product already exists in cart
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
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
  updateCartCount();
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
        <td>₦${itemTotal}</td>
        <td>₦${itemTotal}</td>
        <td>{item.name}</td>
        <td>₦{item.price}</td>
        <td>{item.quantity}</td>
        <td>₦{itemTotal}</td>
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
