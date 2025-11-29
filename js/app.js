// ============================================
// NearBuy - Main Application Controller
// DOM Manipulation & Event Handling
// ============================================

import { DB } from './db.js';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCart,
  getCartCount,
  getSubtotal,
  clearCart,
  getCartByStore
} from './cart.js';
import { initEmailJS, sendOrderEmails } from './emailService.js';

// App State
let currentView = 'stores'; // 'stores' or 'products'
let currentStoreId = null;
let currentCategory = 'All';

// DOM Elements
const storesContainer = document.getElementById('stores-container');
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartBadge = document.getElementById('cart-badge');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const categoryFilters = document.getElementById('category-filters');
const backToStores = document.getElementById('back-to-stores');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const checkoutBtn = document.getElementById('checkout-btn');
const closeCheckoutBtn = document.getElementById('close-checkout-btn');
const checkoutForm = document.getElementById('checkout-form');

// Initialize App
function init() {
  initEmailJS();
  renderCategoryFilters();
  renderStores();
  updateCartBadge();
  attachEventListeners();
  showWelcomeModal();
}

// Attach Event Listeners
function attachEventListeners() {
  // Category filters
  if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('category-btn')) {
        currentCategory = e.target.dataset.category;
        renderCategoryFilters();
        renderStores();
      }
    });
  }

  // Back to stores button
  if (backToStores) {
    backToStores.addEventListener('click', () => {
      currentView = 'stores';
      currentStoreId = null;
      renderStores();
    });
  }

  // View cart button
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', () => {
      openCartModal();
    });
  }

  // Close cart modal
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      closeModal(cartModal);
    });
  }

  // Alternative close cart button
  const closeCartBtn2 = document.getElementById('close-cart-btn-2');
  if (closeCartBtn2) {
    closeCartBtn2.addEventListener('click', () => {
      closeModal(cartModal);
    });
  }

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeModal(cartModal);
      openCheckoutModal();
    });
  }

  // Close checkout modal
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
      closeModal(checkoutModal);
    });
  }

  // Checkout form submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }

  // Close modals on overlay click
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });
}

// Render Category Filters
function renderCategoryFilters() {
  if (!categoryFilters) return;

  const categories = DB.getAllCategories();

  categoryFilters.innerHTML = categories.map(category => `
    <button class="category-btn ${category === currentCategory ? 'active' : ''}" 
            data-category="${category}">
      ${category}
    </button>
  `).join('');
}

// Render Stores
function renderStores() {
  if (!storesContainer) return;

  // Show stores view, hide products view
  storesContainer.classList.remove('hidden');
  if (productsContainer) productsContainer.classList.add('hidden');
  if (backToStores) backToStores.classList.add('hidden');

  const stores = DB.getStoresByCategory(currentCategory);

  if (stores.length === 0) {
    storesContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-text">No stores found in this category</div>
      </div>
    `;
    return;
  }

  storesContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      ${stores.map(store => `
        <div class="store-card" data-store-id="${store.id}">
          <img src="${store.imageUrl}" alt="${store.name}" class="store-card-image" loading="lazy">
          <div class="store-card-body">
            <h3 class="store-card-title">${store.name}</h3>
            <span class="store-card-category">${store.category}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Attach click handlers to store cards
  document.querySelectorAll('.store-card').forEach(card => {
    card.addEventListener('click', () => {
      const storeId = parseInt(card.dataset.storeId);
      openStore(storeId);
    });
  });
}

// Open Store and Show Products
function openStore(storeId) {
  // Check if this store has a notice modal (GIKians Essentials or Tahir Khan Restaurant)
  if (storeId === 3 || storeId === 4) {
    showStoreNoticeModal(storeId);
  } else {
    currentView = 'products';
    currentStoreId = storeId;
    renderProducts(storeId);
  }
}

// Render Products
function renderProducts(storeId) {
  if (!productsContainer) return;

  const store = DB.getStoreById(storeId);
  const products = DB.getProductsByStoreId(storeId);

  // Hide stores view, show products view
  if (storesContainer) storesContainer.classList.add('hidden');
  productsContainer.classList.remove('hidden');
  if (backToStores) backToStores.classList.remove('hidden');

  if (products.length === 0) {
    productsContainer.innerHTML = `
      <div class="section-header">
        <h2 class="section-title">${store.name}</h2>
        <p class="section-subtitle">No products available</p>
      </div>
    `;
    return;
  }

  // Group products by category
  const categories = DB.getProductCategoriesForStore(storeId);

  // Build categorized HTML
  let categorizedHTML = `
    <div class="section-header">
      <h2 class="section-title">${store.name}</h2>
      <p class="section-subtitle">${store.category}</p>
    </div>
  `;

  if (categories.length === 0) {
    // Brookie store - no categories, flat display
    categorizedHTML += `
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        ${products.map(product => renderProductCard(product)).join('')}
      </div>
    `;
  } else {
    // ONE Bite store - categorized display
    categories.forEach(category => {
      const categoryProducts = DB.getProductsByCategoryAndStore(storeId, category);

      categorizedHTML += `
        <div class="category-section">
          <h3 class="category-header">${category}</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            ${categoryProducts.map(product => renderProductCard(product)).join('')}
          </div>
        </div>
      `;
    });
  }

  productsContainer.innerHTML = categorizedHTML;

  // Attach click handlers
  attachProductCardHandlers();
}

// Render a single product card
function renderProductCard(product) {
  if (product.hasVariations) {
    // Product with variations - show "From" price and "Select Options" button
    const minPrice = Math.min(...product.variations.map(v => v.price));
    return `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}" class="product-card-image" loading="lazy">
        <div class="product-card-body">
          <h3 class="product-card-title">${product.name}</h3>
          <div class="product-card-price">From Rs. ${minPrice.toLocaleString()}</div>
          <button class="btn btn-primary btn-full select-options-btn" 
                  data-product-id="${product.id}">
            Select Options
          </button>
        </div>
      </div>
    `;
  } else {
    // Simple product - show direct "Add to Cart" button
    return `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}" class="product-card-image" loading="lazy">
        <div class="product-card-body">
          <h3 class="product-card-title">${product.name}</h3>
          <div class="product-card-price">Rs. ${product.price.toLocaleString()}</div>
          <button class="btn btn-primary btn-full add-to-cart-btn" 
                  data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }
}

// Attach event handlers to product cards
function attachProductCardHandlers() {
  // Handle "Add to Cart" for simple products
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      handleAddToCart(productId);
    });
  });

  // Handle "Select Options" for products with variations
  document.querySelectorAll('.select-options-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      showVariationModal(productId);
    });
  });
}

// Show variation selection modal
function showVariationModal(productId) {
  const product = DB.getProductById(productId);
  if (!product || !product.hasVariations) return;

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'variation-modal';

  // Default to first variation
  let selectedVariationId = product.variations[0].id;
  let selectedPrice = product.variations[0].price;

  modal.innerHTML = `
    <div class="modal variation-modal">
      <div class="modal-header">
        <h2 class="modal-title">Select Size</h2>
        <button class="modal-close" id="close-variation-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="variation-product-info">
          <img src="${product.imageUrl}" alt="${product.name}" class="variation-product-image">
          <h3 class="variation-product-name">${product.name}</h3>
        </div>
        <div class="variation-options">
          ${product.variations.map((variation, index) => `
            <label class="variation-option ${index === 0 ? 'selected' : ''}">
              <input type="radio" 
                     name="variation" 
                     value="${variation.id}" 
                     data-price="${variation.price}"
                     ${index === 0 ? 'checked' : ''}>
              <div class="variation-option-content">
                <span class="variation-size">${variation.size}</span>
                <span class="variation-price">Rs. ${variation.price.toLocaleString()}</span>
              </div>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary btn-full" id="add-variation-to-cart">
          Add to Cart - Rs. ${selectedPrice.toLocaleString()}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Get elements
  const addBtn = modal.querySelector('#add-variation-to-cart');
  const closeBtn = modal.querySelector('#close-variation-modal');
  const radioButtons = modal.querySelectorAll('input[type="radio"]');
  const optionLabels = modal.querySelectorAll('.variation-option');

  // Handle variation selection
  radioButtons.forEach((radio, index) => {
    radio.addEventListener('change', () => {
      selectedVariationId = parseInt(radio.value);
      selectedPrice = parseInt(radio.dataset.price);
      addBtn.textContent = `Add to Cart - Rs. ${selectedPrice.toLocaleString()}`;

      // Update selected class
      optionLabels.forEach(label => label.classList.remove('selected'));
      optionLabels[index].classList.add('selected');
    });
  });

  // Handle add to cart
  addBtn.addEventListener('click', () => {
    handleAddToCartWithVariation(product, selectedVariationId);
    document.body.removeChild(modal);
  });

  // Handle close
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Show Store Notice Modal (for GIKians Essentials & Tahir Khan Restaurant)
function showStoreNoticeModal(storeId) {
  const store = DB.getStoreById(storeId);
  if (!store) return;

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'store-notice-modal';

  // Different content based on store
  let noticeContent = '';

  if (storeId === 3) {
    // Tahir Khan Restaurant - Show payment image and delivery fee
    noticeContent = `
      <div class="modal-body">
        <div class="store-notice-icon">💳</div>
        <h3 class="store-notice-title">${store.name}</h3>
        
        <div class="store-notice-content">
          ${store.paymentImage ? `
            <div class="store-notice-item" style="margin-bottom: var(--spacing-lg);">
              <div style="text-align: center;">
                <p style="font-weight: 600; margin-bottom: var(--spacing-md); color: var(--color-primary);">
                  💳 Payment Transfer Details
                </p>
                <img src="${store.paymentImage}" 
                     alt="Payment Transfer Details" 
                     style="max-width: 100%; height: auto; border-radius: var(--border-radius-md); box-shadow: var(--shadow-md);" 
                     loading="lazy">
              </div>
            </div>
          ` : ''}
          
          <div class="store-notice-item">
            <span class="store-notice-bullet">✓</span>
            <span class="store-notice-text">
              <span class="store-notice-highlight">Delivery Charges:</span> 
              Note that <strong>Rs. ${store.deliveryFee}</strong> will be charged as delivery fee
            </span>
          </div>
        </div>
      </div>
    `;
  } else if (storeId === 4) {
    // GIKians Essentials - Coming Soon message
    noticeContent = `
      <div class="modal-body">
        <div class="store-notice-icon">🎉</div>
        <h3 class="store-notice-title">${store.name}</h3>
        
        <div class="store-notice-content" style="text-align: center;">
          <h2 style="font-size: 2rem; font-weight: 700; color: var(--color-primary); margin: var(--spacing-lg) 0;">
            Coming Soon!
          </h2>
          <p style="font-size: 1.125rem; color: var(--color-gray-700); margin-bottom: var(--spacing-xl);">
            Follow us on Instagram for updates
          </p>
          <a href="https://www.instagram.com/nearbuy_topi" 
             target="_blank" 
             rel="noopener noreferrer"
             class="btn btn-primary"
             style="display: inline-flex; align-items: center; gap: var(--spacing-sm); text-decoration: none;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    `;
  }

  // Different footer based on store
  let modalFooter = '';
  if (storeId === 4) {
    // GIKians Essentials - No continue button
    modalFooter = '';
  } else {
    // Other stores - Show continue shopping button
    modalFooter = `
      <div class="modal-footer">
        <button class="btn btn-primary btn-full" id="understand-notice-btn">
          I Understand - Continue Shopping
        </button>
      </div>
    `;
  }

  modal.innerHTML = `
    <div class="modal store-notice-modal">
      <div class="modal-header">
        <h2 class="modal-title">📢 Important Notice</h2>
        <button class="modal-close" id="close-notice-modal">×</button>
      </div>
      ${noticeContent}
      ${modalFooter}
    </div>
  `;

  document.body.appendChild(modal);

  // Get elements
  const understandBtn = modal.querySelector('#understand-notice-btn');
  const closeBtn = modal.querySelector('#close-notice-modal');

  // Handle understand/continue button (only for stores other than GIKIans Essentials)
  if (understandBtn) {
    understandBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
      // Now open the store
      currentView = 'products';
      currentStoreId = storeId;
      renderProducts(storeId);
    });
  }

  // Handle close
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modal);
    // Don't open the store, just close the modal
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
      // Don't open the store, just close the modal
    }
  });
}


// Handle Add to Cart with Variation
function handleAddToCartWithVariation(product, variationId) {
  const variation = product.variations.find(v => v.id === variationId);
  if (!variation) return;

  // Create cart item with variation info
  const cartItem = {
    id: variationId, // Use variation ID as cart item ID
    productId: product.id,
    storeId: product.storeId,
    name: product.name,
    variation: variation.size,
    price: variation.price,
    imageUrl: product.imageUrl,
    category: product.category
  };

  addToCart(cartItem);
  updateCartBadge();
  showToast(`${product.name} (${variation.size}) added to cart!`);
}

// Handle Add to Cart (for simple products without variations)
function handleAddToCart(productId) {
  const product = DB.getProductById(productId);
  if (!product) return;

  addToCart(product);
  updateCartBadge();
  showToast(`${product.name} added to cart!`);
}

// Update Cart Badge
function updateCartBadge() {
  if (!cartBadge) return;

  const count = getCartCount();

  if (count > 0) {
    cartBadge.textContent = count;
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }
}

// Open Cart Modal
function openCartModal() {
  if (!cartModal) return;

  renderCart();
  openModal(cartModal);
}

// Render Cart
function renderCart() {
  if (!cartItemsContainer) return;

  const cart = getCart();
  const subtotal = getSubtotal();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <div class="cart-empty-text">Your cart is empty</div>
        <p style="color: var(--color-gray-700); margin-top: var(--spacing-md);">
          Add items from stores to get started!
        </p>
      </div>
    `;

    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('hidden');
    }
    return;
  }

  cartItemsContainer.innerHTML = `
    <div class="cart-items">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" loading="lazy">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}${item.variation ? ` - ${item.variation}` : ''}</h4>
            <div class="cart-item-price">Rs. ${item.price.toLocaleString()} each</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-quantity">
              <button class="decrease-qty" data-product-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button class="increase-qty" data-product-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary">
      <div class="cart-summary-row">
        <span>Subtotal:</span>
        <span>Rs. ${subtotal.toLocaleString()}</span>
      </div>
    </div>
  `;

  // Attach event handlers
  document.querySelectorAll('.increase-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      const item = cart.find(i => i.id === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
        renderCart();
        updateCartBadge();
      }
    });
  });

  document.querySelectorAll('.decrease-qty').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      const item = cart.find(i => i.id === productId);
      if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
        renderCart();
        updateCartBadge();
      }
    });
  });

  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.productId);
      removeFromCart(productId);
      renderCart();
      updateCartBadge();
      showToast('Item removed from cart');
    });
  });

  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.classList.remove('hidden');
  }
}

// Open Checkout Modal
function openCheckoutModal() {
  if (!checkoutModal) return;

  openModal(checkoutModal);
}

// Handle Checkout
async function handleCheckout(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerName = formData.get('name');
  const location = formData.get('location');
  const customerEmail = formData.get('email');

  const cart = getCart();
  const total = getSubtotal();

  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Show loading spinner
  showSpinner('Processing your order...');

  try {
    // Group cart by store
    const cartByStore = getCartByStore();
    const storeIds = Object.keys(cartByStore);

    // For simplicity, we'll use the first store for WhatsApp
    const primaryStoreId = parseInt(storeIds[0]);
    const store = DB.getStoreById(primaryStoreId);

    // Prepare order data with complete store details
    const orderData = {
      customerName,
      customerEmail,
      location,
      items: cart,
      total,
      store: store,  // Pass complete store object for email details
      storeName: store.name  // Keep for backward compatibility
    };

    // Send emails
    const emailResult = await sendOrderEmails(orderData);

    // Open WhatsApp
    const whatsappMessage = createWhatsAppMessage(orderData, store);
    openWhatsApp(store.whatsappNumber, whatsappMessage);

    // Wait a bit for emails to send
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Hide spinner
    hideSpinner();

    // Show success message
    showSuccessMessage();

    // Clear cart
    clearCart();
    updateCartBadge();

    // Close modals
    closeModal(checkoutModal);
    closeModal(cartModal);

    // Reset form
    e.target.reset();

  } catch (error) {
    console.error('Checkout error:', error);
    hideSpinner();
    alert('There was an error processing your order. Please try again.');
  }
}

// Create WhatsApp Message
function createWhatsAppMessage(orderData, store) {
  let message = `🔔 *NEW ORDER RECEIVED*\\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\\n\\n`;

  message += `📦 *ORDER SUMMARY*\\n`;
  orderData.items.forEach(item => {
    const itemName = item.variation ? `${item.name} (${item.variation})` : item.name;
    message += `   • ${itemName}\\n`;
    message += `      Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = Rs. ${(item.price * item.quantity).toLocaleString()}\\n`;
  });

  message += `\\n💰 *TOTAL AMOUNT: Rs. ${orderData.total.toLocaleString()}*\\n\\n`;

  message += `👤 *CUSTOMER INFORMATION*\\n`;
  message += `   Name: ${orderData.customerName}\\n`;
  message += `   Location: ${orderData.location}\\n`;
  message += `   Email: ${orderData.customerEmail}\\n\\n`;

  message += `━━━━━━━━━━━━━━━━━━━━\\n`;
  message += `📱 Ordered via NearBuy Platform\\n`;
  message += `⏰ Please confirm this order at your earliest convenience.`;

  return encodeURIComponent(message);
}

// Open WhatsApp
function openWhatsApp(phoneNumber, message) {
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
}

// Show Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">×</button>
  `;

  document.body.appendChild(toast);

  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    removeToast(toast);
  });

  setTimeout(() => {
    removeToast(toast);
  }, 3000);
}

// Remove Toast
function removeToast(toast) {
  toast.classList.add('toast-hide');
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Show Spinner
function showSpinner(message = 'Loading...') {
  const spinner = document.createElement('div');
  spinner.id = 'loading-spinner';
  spinner.className = 'spinner-overlay';
  spinner.innerHTML = `
    <div class="spinner"></div>
    <div class="spinner-text">${message}</div>
  `;
  document.body.appendChild(spinner);
}

// Hide Spinner
function hideSpinner() {
  const spinner = document.getElementById('loading-spinner');
  if (spinner && spinner.parentNode) {
    spinner.parentNode.removeChild(spinner);
  }
}

// Show Success Message
function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'modal-overlay';
  successDiv.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Order Placed Successfully! 🎉</h2>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--font-size-lg); text-align: center; margin-bottom: var(--spacing-lg);">
          Your order has been sent to the store via WhatsApp and you will receive a confirmation email shortly.
        </p>
        <p style="text-align: center; color: var(--color-gray-700);">
          Thank you for using NearBuy!
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary btn-full" id="success-ok-btn">Okay</button>
      </div>
    </div>
  `;
  document.body.appendChild(successDiv);

  const okBtn = successDiv.querySelector('#success-ok-btn');
  okBtn.addEventListener('click', () => {
    if (successDiv.parentNode) {
      successDiv.parentNode.removeChild(successDiv);
    }
  });
}

// Open Modal
function openModal(modal) {
  if (modal) {
    modal.classList.remove('hidden');
  }
}

// Show Welcome Modal (on first visit)
// Show Welcome Modal
function showWelcomeModal() {
  const welcomeModal = document.getElementById('welcome-modal');
  const closeWelcomeBtn = document.getElementById('close-welcome-btn');
  const startShoppingBtn = document.getElementById('start-shopping-btn');

  if (welcomeModal) {
    welcomeModal.classList.remove('hidden');

    // Handle close button
    if (closeWelcomeBtn) {
      // Remove existing listeners to avoid duplicates if any (though init runs once)
      const newCloseBtn = closeWelcomeBtn.cloneNode(true);
      closeWelcomeBtn.parentNode.replaceChild(newCloseBtn, closeWelcomeBtn);

      newCloseBtn.addEventListener('click', () => {
        closeModal(welcomeModal);
      });
    }

    // Handle start shopping button
    if (startShoppingBtn) {
      const newStartBtn = startShoppingBtn.cloneNode(true);
      startShoppingBtn.parentNode.replaceChild(newStartBtn, startShoppingBtn);

      newStartBtn.addEventListener('click', () => {
        closeModal(welcomeModal);
      });
    }

    // Close on overlay click
    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        closeModal(welcomeModal);
      }
    });
  }
}

// Close Modal
function closeModal(modal) {
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Initialize on DOM Content Loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
