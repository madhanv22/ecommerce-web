// Load cart items from localStorage
const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutItemsEl = document.getElementById("checkoutItems");
const finalTotalEl = document.getElementById("finalTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

let total = 0;

// Display items
checkoutCart.forEach(item => {
  total += item.qty * item.price;

  const div = document.createElement("div");
  div.classList.add("checkout-item");
  div.innerHTML = `
    <span>${item.name} x ${item.qty}</span>
    <span>$${(item.price * item.qty).toFixed(2)}</span>
  `;
  checkoutItemsEl.appendChild(div);
});

finalTotalEl.textContent = total.toFixed(2);

// Place Order button
placeOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !email || !address) {
    alert("Please fill all billing details.");
    return;
  }

  alert(`Order Placed Successfully!\nPayment Method: ${payment}`);
  
  // Clear cart
  localStorage.removeItem("cart");
  
  // Redirect to homepage
  window.location.href = "index.html";
});