/******************************
 PRODUCT DATA
******************************/
const products = [
  {
    id: 1,
    name: "Minimal Leather Backpack",
    price: 79,
    img: "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129,
    img: "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg"
  },
  {
    id: 3,
    name: "Modern Sunglasses",
    price: 59,
    img: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg"
  },
  {
    id: 4,
    name: "Analog Wrist Watch",
    price: 169,
    img: "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg"
  },
  {
    id: 5,
    name: "Sport Sneakers",
    price: 99,
    img: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    id: 6,
    name: "Designer Wallet",
    price: 49,
    img: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg"
  }
];

/******************************
 RENDER PRODUCTS INTO GRID
******************************/
const productListEl = document.getElementById("productList");

function renderProducts() {
  productListEl.innerHTML = "";
  products.forEach(prod => {
    productListEl.innerHTML += `
      <div class="product-card">
        <img src="${prod.img}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>$${prod.price}</p>
        <button onclick="addToCart(${prod.id})">Add to Cart</button>
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

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }

  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = total;
}

// Initialize cart count on load
updateCartCount();

/******************************
 DARK / LIGHT MODE TOGGLE
******************************/
const themeToggle = document.getElementById("themeToggle");

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