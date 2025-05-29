
const productList = [
  {
    id: 1,
    name: "Smart Watch",
    image: "./assets/images/watch-product-1.jpg",
    price: 3499,
    rating: 4,
    category: "Electronics",
    tags: ["smartwatch", "wearable", "fitness", "bluetooth"]
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image: "./assets/images/earbuds.jpeg",
    price: 2299,
    rating: 5,
    category: "Audio",
    tags: ["earbuds", "audio", "wireless", "bluetooth"]
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "./assets/images/bluetooth speaker.jpeg",
    price: 1599,
    rating: 3,
    category: "Audio",
    tags: ["speaker", "bluetooth", "portable", "music"]
  },
  {
    id: 4,
    name: "Phone Holder",
    image: "./assets/images/phone holder.webp",
    price: 299,
    rating: 4,
    category: "Accessories",
    tags: ["phone", "holder", "mount", "car"]
  },
  {
    id: 5,
    name: "Laptop Stand",
    image: "./assets/images/laptop stand.jpeg",
    price: 1299,
    rating: 5,
    category: "Office",
    tags: ["laptop", "stand", "ergonomic", "office"]
  },
  {
    id: 6,
    name: "Tablet",
    image: "./assets/images/tablet.jpeg",
    price: 7499,
    rating: 4,
    category: "Electronics",
    tags: ["tablet", "touchscreen", "android", "device"]
  },
  {
    id: 7,
    name: "Gaming Mouse",
    image: "./assets/images/gaming mouse.jpeg",
    price: 899,
    rating: 4,
    category: "Accessories",
    tags: ["mouse", "gaming", "wired", "dpi"]
  },
  {
    id: 8,
    name: "Mechanical Keyboard",
    image: "./assets/images/mechanical keyboard.jpg",
    price: 2199,
    rating: 5,
    category: "Accessories",
    tags: ["keyboard", "mechanical", "gaming", "RGB"]
  },
  {
    id: 9,
    name: "Power Bank",
    image: "./assets/images/power bank.jpeg",
    price: 1399,
    rating: 3,
    category: "Electronics",
    tags: ["powerbank", "portable", "charging", "usb"]
  },
  {
    id: 10,
    name: "USB-C Cable",
    image: "./assets/images/usb c cable.jpeg",
    price: 199,
    rating: 4,
    category: "Accessories",
    tags: ["usb", "type-c", "charging", "cable"]
  },
  {
    id: 11,
    name: "Tripod Stand",
    image: "./assets/images/tripod stand.jpeg",
    price: 799,
    rating: 4,
    category: "Photography",
    tags: ["tripod", "stand", "camera", "photography"]
  },
  {
    id: 12,
    name: "Ring Light",
    image: "./assets/images/ring light.jpeg",
    price: 1199,
    rating: 4,
    category: "Photography",
    tags: ["ringlight", "lighting", "vlogging", "photography"]
  },
  {
    id: 13,
    name: "Smartphone",
    image: "./assets/images/product1.webp",
    price: 14999,
    rating: 5,
    category: "Electronics",
    tags: ["phone", "android", "mobile", "smartphone"]
  },
  {
    id: 14,
    name: "WiFi Router",
    image: "./assets/images/wifi router.jpeg",
    price: 1799,
    rating: 4,
    category: "Electronics",
    tags: ["router", "wifi", "network", "internet"]
  },
  {
    id: 15,
    name: "LED Monitor",
    image: "./assets/images/led monitor.jpeg",
    price: 7899,
    rating: 5,
    category: "Office",
    tags: ["monitor", "LED", "display", "screen"]
  },
  {
    id: 16,
    name: "Noise Cancelling Headphones",
    image: "./assets/images/noice headphone.jpeg",
    price: 3299,
    rating: 5,
    category: "Audio",
    tags: ["headphones", "noise-cancelling", "audio", "music"]
  },
  {
    id: 17,
    name: "Portable Projector",
    image: "./assets/images/projector.jpeg",
    price: 6499,
    rating: 4,
    category: "Electronics",
    tags: ["projector", "portable", "display", "media"]
  },
  {
    id: 18,
    name: "Wireless Charger",
    image: "./assets/images/wireless charger.jpeg",
    price: 499,
    rating: 3,
    category: "Accessories",
    tags: ["charger", "wireless", "charging", "tech"]
  },
  {
    id: 19,
    name: "Fitness Tracker",
    image: "./assets/images/fitness traker.jpeg",
    price: 2199,
    rating: 4,
    category: "Health",
    tags: ["fitness", "tracker", "health", "wearable"]
  },
  {
    id: 20,
    name: "Webcam",
    image: "./assets/images/webcame.jpeg",
    price: 1399,
    rating: 4,
    category: "Office",
    tags: ["webcam", "video", "camera", "meetings"]
  }
];


const filters = {
  search: "",
  sort: "A-Z",
  priceFrom: 0,
  priceTo: Infinity,
  rating: 0,
  categories: [],
  tags: []
};

// Generate filter checkboxes
const categoryTagMap = {};
productList.forEach(product => {
  if (!categoryTagMap[product.category]) categoryTagMap[product.category] = new Set();
  product.tags.forEach(tag => categoryTagMap[product.category].add(tag));
});

Object.keys(categoryTagMap).forEach(category => {
  $(".filter_category").append(`
    <div class="form-check filter_category_item">
      <input class="form-check-input" type="checkbox" value="${category}" />
      <label class="form-check-label">${category}</label>
    </div>
  `);
  categoryTagMap[category].forEach(tag => {
    $(".filter_tags").append(`
      <div class="form-check filter_tag_item">
        <input class="form-check-input" type="checkbox" value="${tag}" />
        <label class="form-check-label">${tag}</label>
      </div>
    `);
  });
});



function applyAllFilters() {
  let filtered = [...productList];

  // Search
  if (filters.search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(filters.search));
  }

  // Price
  filtered = filtered.filter(p => p.price >= filters.priceFrom && p.price <= filters.priceTo);

  // Rating
  if (filters.rating > 0) {
    filtered = filtered.filter(p => p.rating >= filters.rating);
  }

  // Category
  if (filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.category));
  }

  // Tags
  if (filters.tags.length > 0) {
    filtered = filtered.filter(p => p.tags.some(tag => filters.tags.includes(tag)));
  }

  // Sorting
  if (filters.sort === "A-Z") filtered.sort((a, b) => a.name.localeCompare(b.name));
  else if (filters.sort === "Z-A") filtered.sort((a, b) => b.name.localeCompare(a.name));
  else if (filters.sort === "Low-High") filtered.sort((a, b) => a.price - b.price);
  else if (filters.sort === "High-Low") filtered.sort((a, b) => b.price - a.price);
  else if (filters.sort === "Rating") filtered.sort((a, b) => b.rating - a.rating);

  renderProducts(filtered);
}

function renderProducts(products) {
    if (products.length === 0) {
        $(".productList").html("<p>No products found</p>").css({
            "display": "flex",
            "justify-content": "center",
            "font-size": "1.5rem",
            "color": "#555"
        });
        return;
    }
  const html = products.map(p => `
    <div class="productCard">
      <img src="${p.image}" alt="${p.name}" />
      <h5>${p.name}</h5>
      <p>Price: ₹${p.price}</p>
      <div class="rating">${'<i class="fas fa-star"></i>'.repeat(p.rating)}</div>
      <p>Category: ${p.category}</p>
    </div>
  `)
  $(".productList").html(html);
}

// Event listeners
$("#searchProduct").on("input", function () {
  filters.search = $(this).val().trim().toLowerCase();
  applyAllFilters();
});

$("#sortingProduct").on("change", function () {
  filters.sort = $(this).val();
  applyAllFilters();
});

$("#floatingInputFrom, #floatingInputTo").on("input", function () {
  const from = parseInt($("#floatingInputFrom").val()) || 0;
  const to = parseInt($("#floatingInputTo").val()) || Infinity;
  filters.priceFrom = from;
  filters.priceTo = to;
  applyAllFilters();
});

$("#filterByStar").on("change", function () {
  filters.rating = parseInt($(this).val()) || 0;
  applyAllFilters();
});

$(document).on("change", ".filter_category_item input", function () {
  const category = $(this).val();
  if ($(this).is(":checked")) {
    filters.categories.push(category);
  } else {
    filters.categories = filters.categories.filter(c => c !== category);
  }
  applyAllFilters();
});

$(document).on("change", ".filter_tag_item input", function () {
  const tag = $(this).val();
  if ($(this).is(":checked")) {
    filters.tags.push(tag);
  } else {
    filters.tags = filters.tags.filter(t => t !== tag);
  }
  applyAllFilters();
});


$(document).ready(() => {
  applyAllFilters();
});