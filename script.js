// ==========================================
// TOYTOWN - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// DEFAULT PRODUCTS
// ==========================================

const defaultProducts = [

  // Product image: Classic Teddy Bear
  {
    id: 1,
    name: "Classic Teddy Bear",
    category: "Soft Toys",
    price: 499,
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=80",
    description: "A soft and adorable teddy bear made for fun and cuddles."
  },

  // Product image: Racing Toy Car
  {
    id: 2,
    name: "Racing Toy Car",
    category: "Cars",
    price: 349,
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=700&q=80",
    description: "A colourful racing toy car for exciting indoor play."
  },

  // Product image: Building Blocks
  {
    id: 3,
    name: "Building Blocks",
    category: "Educational",
    price: 699,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=700&q=80",
    description: "Creative building blocks that encourage imagination."
  },

  // Product image: Family Board Game
  {
    id: 4,
    name: "Family Board Game",
    category: "Games",
    price: 799,
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=700&q=80",
    description: "A fun board game for family game time."
  },

  // Product image: Plush Bunny
  {
    id: 5,
    name: "Plush Bunny",
    category: "Soft Toys",
    price: 449,
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=80",
    description: "Cute and soft plush bunny toy."
  },

  // Product image: Kids Puzzle Set
  {
    id: 6,
    name: "Kids Puzzle Set",
    category: "Educational",
    price: 299,
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=700&q=80",
    description: "Colourful puzzle set designed for fun learning."
  }

];


// ==========================================
// LOAD PRODUCTS
// ==========================================

let products =
  JSON.parse(localStorage.getItem("toytown_products")) ||
  defaultProducts;


// ==========================================
// WISHLIST
// ==========================================

let wishlist =
  JSON.parse(localStorage.getItem("toytown_wishlist")) ||
  [];


// ==========================================
// CURRENT PRODUCTS
// ==========================================

let currentProducts = [...products];


// ==========================================
// SAVE PRODUCTS
// ==========================================

function saveProducts() {

  localStorage.setItem(
    "toytown_products",
    JSON.stringify(products)
  );

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(list = currentProducts) {

  const container =
    document.getElementById("productContainer");

  const noProducts =
    document.getElementById("noProducts");

  container.innerHTML = "";

  if (list.length === 0) {
    noProducts.style.display = "block";
    return;
  }

  noProducts.style.display = "none";

  list.forEach(product => {

    const active =
      wishlist.includes(product.id);

    const card =
      document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `
      <img
        class="product-image"
        src="${product.image}"
        alt="${product.name}"
      >

      <button
        class="wishlist ${active ? "active" : ""}"
        onclick="toggleWishlist(${product.id})">
        ${active ? "♥" : "♡"}
      </button>

      <div class="product-info">

        <small>${product.category}</small>

        <h3>${product.name}</h3>

        <div class="price">
          ₹${product.price}
        </div>

        <button
          class="view-btn"
          onclick="viewProduct(${product.id})">
          View Product
        </button>

      </div>
    `;

    container.appendChild(card);

  });

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function filterCategory(category) {

  currentProducts =
    products.filter(
      product => product.category === category
    );

  displayProducts(currentProducts);

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// ==========================================
// SEARCH
// ==========================================

function searchProducts() {

  const text =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

  currentProducts =
    products.filter(product =>
      product.name.toLowerCase().includes(text) ||
      product.category.toLowerCase().includes(text)
    );

  displayProducts(currentProducts);

}


document
  .getElementById("searchInput")
  .addEventListener("input", searchProducts);


// ==========================================
// SORT
// ==========================================

function sortProducts() {

  const type =
    document.getElementById("sortSelect").value;

  if (type === "low") {

    currentProducts.sort(
      (a,b) => a.price - b.price
    );

  } else if (type === "high") {

    currentProducts.sort(
      (a,b) => b.price - a.price
    );

  } else if (type === "name") {

    currentProducts.sort(
      (a,b) => a.name.localeCompare(b.name)
    );

  } else {

    currentProducts = [...products];

  }

  displayProducts(currentProducts);

}


// ==========================================
// CLEAR
// ==========================================

function clearFilters() {

  document.getElementById("searchInput").value = "";

  document.getElementById("sortSelect").value = "default";

  currentProducts = [...products];

  displayProducts();

}


// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(id) {

  if (wishlist.includes(id)) {

    wishlist =
      wishlist.filter(item => item !== id);

  } else {

    wishlist.push(id);

  }

  localStorage.setItem(
    "toytown_wishlist",
    JSON.stringify(wishlist)
  );

  updateWishlistCount();

  displayProducts(currentProducts);

}


// ==========================================
// WISHLIST COUNT
// ==========================================

function updateWishlistCount() {

  document.getElementById(
    "wishlistCount"
  ).textContent = wishlist.length;

}


// ==========================================
// OPEN WISHLIST
// ==========================================

function openWishlist() {

  const modal =
    document.getElementById("wishlistModal");

  const box =
    document.getElementById("wishlistItems");

  box.innerHTML = "";

  if (wishlist.length === 0) {

    box.innerHTML =
      "<p style='margin-top:20px'>Your wishlist is empty.</p>";

  }

  wishlist.forEach(id => {

    const product =
      products.find(item => item.id === id);

    if (!product) return;

    const div =
      document.createElement("div");

    div.className = "wishlist-product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">

      <div>
        <strong>${product.name}</strong>
        <p>₹${product.price}</p>
      </div>

      <button
        class="remove-wish"
        onclick="toggleWishlist(${product.id}); openWishlist();">
        Remove
      </button>
    `;

    box.appendChild(div);

  });

  modal.style.display = "flex";

}


function closeWishlist() {

  document.getElementById(
    "wishlistModal"
  ).style.display = "none";

}


// ==========================================
// VIEW PRODUCT
// ==========================================

function viewProduct(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;

  document.getElementById("modalImage").src =
    product.image;

  document.getElementById("modalCategory").textContent =
    product.category;

  document.getElementById("modalName").textContent =
    product.name;

  document.getElementById("modalPrice").textContent =
    "₹" + product.price;

  document.getElementById("modalDescription").textContent =
    product.description;

  const button =
    document.getElementById("modalWishlistBtn");

  button.textContent =
    wishlist.includes(product.id)
      ? "♥ Remove from Wishlist"
      : "♡ Add to Wishlist";

  button.onclick = function() {

    toggleWishlist(product.id);

    button.textContent =
      wishlist.includes(product.id)
        ? "♥ Remove from Wishlist"
        : "♡ Add to Wishlist";

  };

  document.getElementById(
    "productModal"
  ).style.display = "flex";

}


function closeProductModal() {

  document.getElementById(
    "productModal"
  ).style.display = "none";

}


// ==========================================
// OWNER LOGIN
// PASSWORD = 123456
// ==========================================

function openOwnerLogin() {

  document.getElementById(
    "ownerPassword"
  ).value = "";

  document.getElementById(
    "loginError"
  ).textContent = "";

  document.getElementById(
    "ownerLoginModal"
  ).style.display = "flex";

}


function closeOwnerLogin() {

  document.getElementById(
    "ownerLoginModal"
  ).style.display = "none";

}


function ownerLogin() {

  const password =
    document.getElementById(
      "ownerPassword"
    ).value;

  if (password === "123456") {

    closeOwnerLogin();

    openDashboard();

  } else {

    document.getElementById(
      "loginError"
    ).textContent =
      "❌ Wrong password!";

  }

}


// ==========================================
// OPEN DASHBOARD
// ==========================================

function openDashboard() {

  document.getElementById(
    "ownerDashboardModal"
  ).style.display = "flex";

  updateDashboard();

}


// ==========================================
// CLOSE DASHBOARD
// ==========================================

function closeDashboard() {

  document.getElementById(
    "ownerDashboardModal"
  ).style.display = "none";

}


// ==========================================
// DASHBOARD DATA
// ==========================================

function updateDashboard() {

  document.getElementById(
    "totalProducts"
  ).textContent = products.length;

  document.getElementById(
    "totalWishlist"
  ).textContent = wishlist.length;

  const categories =
    new Set(
      products.map(product => product.category)
    );

  document.getElementById(
    "totalCategories"
  ).textContent = categories.size;

  displayAdminProducts();

}


// ==========================================
// ADD PRODUCT
// ==========================================

function addProduct() {

  const name =
    document.getElementById("productName").value.trim();

  const price =
    Number(
      document.getElementById("productPrice").value
    );

  const category =
    document.getElementById("productCategory").value;

  const image =
    document.getElementById("productImage").value.trim();

  const description =
    document.getElementById("productDescription").value.trim();


  if (!name || !price || !image) {

    alert("Please fill Product Name, Price and Image URL.");

    return;

  }


  const newProduct = {

    id: Date.now(),

    name: name,

    price: price,

    category: category,

    image: image,

    description:
      description || "A fun ToyTown product."

  };


  products.push(newProduct);

  saveProducts();


  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("productDescription").value = "";


  currentProducts = [...products];

  displayProducts();

  updateDashboard();


  alert("✅ Product Added Successfully!");

}


// ==========================================
// ADMIN PRODUCT LIST
// ==========================================

function displayAdminProducts() {

  const box =
    document.getElementById("adminProductList");

  box.innerHTML = "";


  products.forEach(product => {

    const div =
      document.createElement("div");

    div.className = "admin-product";

    div.innerHTML = `

      <img
        src="${product.image}"
        alt="${product.name}"
      >

      <div class="admin-product-info">

        <h3>${product.name}</h3>

        <p>
          ${product.category} • ₹${product.price}
        </p>

      </div>

      <div class="admin-product-actions">

        <button
          class="edit-btn"
          onclick="editProduct(${product.id})">
          ✏️ Edit
        </button>

        <button
          class="image-btn"
          onclick="changeImage(${product.id})">
          🖼️ Image
        </button>

        <button
          class="delete-btn"
          onclick="deleteProduct(${product.id})">
          🗑️ Delete
        </button>

      </div>
    `;

    box.appendChild(div);

  });

}


// ==========================================
// EDIT PRODUCT
// ==========================================

function editProduct(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;


  const name =
    prompt(
      "Product name:",
      product.name
    );

  if (name === null) return;


  const price =
    prompt(
      "Product price:",
      product.price
    );

  if (price === null) return;


  const category =
    prompt(
      "Category: Soft Toys / Cars / Educational / Games",
      product.category
    );

  if (category === null) return;


  const description =
    prompt(
      "Product description:",
      product.description
    );

  if (description === null) return;


  product.name = name;
  product.price = Number(price);
  product.category = category;
  product.description = description;


  saveProducts();

  currentProducts = [...products];

  displayProducts();

  updateDashboard();


  alert("✅ Product Updated!");

}


// ==========================================
// CHANGE IMAGE
// ==========================================

function changeImage(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;


  const image =
    prompt(
      "Enter new image URL:",
      product.image
    );

  if (image === null || image.trim() === "") return;


  product.image = image.trim();


  saveProducts();

  currentProducts = [...products];

  displayProducts();

  updateDashboard();


  alert("🖼️ Product Image Updated!");

}


// ==========================================
// DELETE PRODUCT
// ==========================================

function deleteProduct(id) {

  const product =
    products.find(item => item.id === id);

  if (!product) return;


  const confirmDelete =
    confirm(
      `Delete "${product.name}"?`
    );


  if (!confirmDelete) return;


  products =
    products.filter(
      item => item.id !== id
    );


  wishlist =
    wishlist.filter(
      item => item !== id
    );


  saveProducts();


  localStorage.setItem(
    "toytown_wishlist",
    JSON.stringify(wishlist)
  );


  currentProducts = [...products];

  displayProducts();

  updateWishlistCount();

  updateDashboard();


  alert("🗑️ Product Deleted!");

}


// ==========================================
// OFFER MANAGEMENT
// ==========================================

function saveOffer() {

  const text =
    document.getElementById(
      "offerText"
    ).value.trim();


  if (!text) {

    alert("Please enter offer text.");

    return;

  }


  localStorage.setItem(
    "toytown_offer",
    text
  );


  alert("🏷️ Offer Saved!");

}


function viewOffer() {

  const offer =
    localStorage.getItem(
      "toytown_offer"
    );


  if (!offer) {

    alert("No offer saved yet.");

    return;

  }


  alert(
    "🏷️ CURRENT OFFER\n\n" +
    offer
  );

}


// ==========================================
// SPECIAL OFFER
// ==========================================

function showSpecialOffer() {

  const offer =
    localStorage.getItem(
      "toytown_offer"
    );


  if (offer) {

    alert(
      "🎈 TOYTOWN OFFER\n\n" +
      offer
    );

  } else {

    alert(
      "🎈 TOYTOWN SPECIAL\n\n" +
      "Explore our colourful toy collection!"
    );

  }

}


// ==========================================
// FAQ
// ==========================================

function toggleFAQ(button) {

  const item =
    button.parentElement;

  item.classList.toggle("active");

  const span =
    button.querySelector("span");

  span.textContent =
    item.classList.contains("active")
      ? "−"
      : "+";

}


// ==========================================
// SCROLL
// ==========================================

function goToProducts() {

  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// ==========================================
// MOBILE MENU
// ==========================================

document
  .getElementById("menuBtn")
  .addEventListener("click", function() {

    const nav =
      document.getElementById("mainNav");

    if (nav.style.display === "flex") {

      nav.style.display = "none";

    } else {

      nav.style.display = "flex";
      nav.style.position = "absolute";
      nav.style.top = "65px";
      nav.style.left = "0";
      nav.style.width = "100%";
      nav.style.padding = "20px";
      nav.style.background = "white";
      nav.style.flexDirection = "column";
      nav.style.textAlign = "center";

    }

  });


// ==========================================
// MODAL OUTSIDE CLICK
// ==========================================

window.addEventListener("click", function(event) {

  if (
    event.target ===
    document.getElementById("productModal")
  ) {
    closeProductModal();
  }

  if (
    event.target ===
    document.getElementById("wishlistModal")
  ) {
    closeWishlist();
  }

  if (
    event.target ===
    document.getElementById("ownerLoginModal")
  ) {
    closeOwnerLogin();
  }

  if (
    event.target ===
    document.getElementById("ownerDashboardModal")
  ) {
    closeDashboard();
  }

});


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeProductModal();
    closeWishlist();
    closeOwnerLogin();
    closeDashboard();

  }

});


// ==========================================
// START
// ==========================================

displayProducts();
updateWishlistCount();