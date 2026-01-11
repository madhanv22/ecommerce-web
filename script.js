/******************************
 PRODUCT DATA
******************************/
// products are loaded from products.js

/******************************
 HERO CAROUSEL LOGIC
******************************/
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
  if (slides.length === 0) return;
  currentSlide = (currentSlide + 1) % slides.length;
  // Move track left by percentage
  // e.g. 3 slides, each is 100% of container (1/3 of track)
  // Actually simplicity: track is 300% width. we translate -100%/3 * currentSlide??
  // Simpler: translate - (currentSlide * 100) / slides.length + "%"?
  // No, track display:flex. each slide is flex:1?
  // Let's assume standard: translateX(-100% * currentSlide) relative to slide WIDTH?
  // Since track width is 300% (or dynamic), safest is:
  track.style.transform = `translateX(-${currentSlide * (100 / slides.length)}%)`;
}

// Change slide every 5 seconds
if (slides.length > 0) {
  setInterval(nextSlide, 5000);
}

/******************************
 RENDER PRODUCTS INTO GRID
******************************/
const productListEl = document.getElementById("productList");

/* Helper to generate stars */
function getStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let html = '';
  for (let i = 0; i < fullStars; i++) html += '<i class="fa-solid fa-star"></i>';
  if (halfStar) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  // Fill rest with empty if needed, or just leave it
  return html;
}

function renderProducts() {
  if (!productListEl) return;

  const cart = getCart();

  productListEl.innerHTML = "";
  products.forEach(prod => {
    const cartItem = cart.find(x => x.id === prod.id);
    const qty = cartItem ? cartItem.qty : 0;

    let buttonHtml = '';
    if (qty > 0) {
      buttonHtml = `
            <div class="qty-control">
                <button class="qty-btn" onclick="updateQty(${prod.id}, -1)"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-val">${qty}</span>
                <button class="qty-btn" onclick="updateQty(${prod.id}, 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
        `;
    } else {
      buttonHtml = `<button class="add-btn" onclick="updateQty(${prod.id}, 1)">Add to Cart</button>`;
    }

    productListEl.innerHTML += `
      <div class="product-card">
        <div class="product-img-wrapper">
             <img src="${prod.img}" alt="${prod.name}">
        </div>
        <div class="product-details">
            <h3>${prod.name}</h3>
            <div class="product-rating">
                ${getStarRatingHTML(prod.rating)}
                <span>(${prod.reviews})</span>
            </div>
            <div class="product-price">
                <small>$</small>${prod.price}
            </div>
            ${buttonHtml}
        </div>
      </div>
    `;
  });
}
renderProducts();

/******************************
 CART STORAGE + UPDATE
******************************/
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Unified function to add or remove
function updateQty(id, change) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  const productInfo = products.find(p => p.id === id);

  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      // Remove item
      const idx = cart.indexOf(item);
      cart.splice(idx, 1);
    }
  } else if (change > 0) {
    // Add new
    cart.push({ id, qty: 1, name: productInfo.name, price: productInfo.price, img: productInfo.img });
    showToast(`Added to Cart`);
  }

  saveCart(cart);
  updateCartCount();
  renderProducts(); // Re-render to update buttons
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.innerText = total;
}

// Initialize cart count on load
updateCartCount();

/******************************
 TOAST NOTIFICATION
******************************/
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/******************************
 DARK / LIGHT MODE TOGGLE
******************************/
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  // Detect saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = `<i class="fa-regular fa-sun"></i>`;
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = `<i class="fa-regular fa-sun"></i>`;
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = `<i class="fa-regular fa-moon"></i>`;
    }
  });
}