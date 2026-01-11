// Load cart items from localStorage
const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutItemsEl = document.getElementById("checkoutItems");
const finalTotalEl = document.getElementById("finalTotal");
const placeOrderBtn = document.getElementById("placeOrderBtn");

let total = 0;

// Display items
checkoutItemsEl.innerHTML = ""; // Clear loader
if (checkoutCart.length === 0) {
  checkoutItemsEl.innerHTML = "<p>Your cart is empty.</p>";
} else {
  checkoutCart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("checkout-item");
    div.innerHTML = `
        <span>${item.qty} x ${item.name}</span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
      `;
    checkoutItemsEl.appendChild(div);
  });
}

finalTotalEl.textContent = total.toFixed(2);

// Place Order button
placeOrderBtn.addEventListener("click", () => {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const payment = document.getElementById("payment");

  // Simple Validation
  let isValid = true;
  [name, email, address].forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add("input-error");

      // Remove error class after animation
      setTimeout(() => {
        field.classList.remove("input-error");
      }, 500);
    }
  });

  if (!isValid) return;

  // Mock processing
  placeOrderBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

  setTimeout(() => {
    alert(`Order Placed Successfully!\nAmount: $${total.toFixed(2)}\nPayment: ${payment.value}`);

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect to homepage
    window.location.href = "index.html";
  }, 1500);
});