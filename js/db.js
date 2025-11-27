// ============================================
// NearBuy - Mock Database
// Stores and Products Data
// ============================================

// Helper function to create a simple product (no variations)
function createProduct(id, storeId, category, name, price, imageName) {
  return {
    id,
    storeId,
    category,
    name,
    price,
    imageUrl: `/assets/images/${storeId === 1 ? 'brookie' : 'onebite'}/${imageName}`,
    hasVariations: false
  };
}

// Helper function to create a product with variations (sizes)
function createProductWithVariations(id, storeId, category, name, variations, imageName) {
  return {
    id,
    storeId,
    category,
    name,
    imageUrl: `/assets/images/${storeId === 1 ? 'brookie' : 'onebite'}/${imageName}`,
    hasVariations: true,
    variations: variations.map((v, index) => ({
      id: id + index, // Each variation gets a unique ID
      size: v.size,
      price: v.price
    }))
  };
}

// Brookie Products
const brookieProducts = [
  createProduct(101, 1, null, "Triple Chocolate", 280, "triplechocolate.jpg"),
  createProduct(102, 1, null, "Classic Chocolate Chip", 250, "classic_chocolate_chip.jpg"),
  createProduct(103, 1, null, "Lotus", 300, "lotus.webp"),
  createProduct(104, 1, null, "Nutella", 280, "nutella.jpg"),
  createProduct(105, 1, null, "Peanut Butter", 300, "PeanutButter.webp")
];

// ONE Bite - Deals
const oneBiteDeals = [
  createProduct(201, 2, "Deals", "Buy 4 Zinger Get Small Fries FREE", 1600, "/deals/deal1.png"),
  createProduct(202, 2, "Deals", "Buy 5 Zinger Get 1.5Ltr Drink FREE", 2000, "/deals/deal2.png"),
];

// ONE Bite - Regular Pizzas (consolidated with variations)
const regularPizzas = [
  createProductWithVariations(207, 2, "Pizzas", "Cheese Lover", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/cheese-lover.jpg"),

  createProductWithVariations(211, 2, "Pizzas", "Chicken Tikka", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/chicken-tikka.jpg"),

  createProductWithVariations(215, 2, "Pizzas", "Fajita", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/fajita.jpg"),

  createProductWithVariations(219, 2, "Pizzas", "Tandoori", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/tandoori.webp"),

  createProductWithVariations(223, 2, "Pizzas", "BBQ", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/bbq.jpg"),

  createProductWithVariations(227, 2, "Pizzas", "Vegetarian", [
    { size: "Small", price: 500 },
    { size: "Medium", price: 1000 },
    { size: "Large", price: 1750 },
    { size: "XL", price: 2200 }
  ], "/pizza/veg.jpg")
];

// ONE Bite - Special Pizzas (consolidated with variations)
const specialPizzas = [
  createProductWithVariations(231, 2, "ONE Bite Special", "Crown Crust", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/crown-crust.webp"),

  createProductWithVariations(235, 2, "ONE Bite Special", "Cheese Crust", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/cheese-crust.webp"),

  createProductWithVariations(239, 2, "ONE Bite Special", "Stuffed Crust", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/stuff-crust.jpg"),

  createProductWithVariations(243, 2, "ONE Bite Special", "Bihari Kabab", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/bihari-kabab.jpg"),

  createProductWithVariations(251, 2, "ONE Bite Special", "Supreme", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/supreme.jpg"),

  createProductWithVariations(255, 2, "ONE Bite Special", "Beef Pepperoni", [
    { size: "Small", price: 750 },
    { size: "Medium", price: 1300 },
    { size: "Large", price: 1900 },
    { size: "XL", price: 2500 }
  ], "/pizza/beef-pepperoni.jpg")
];

// ONE Bite - Burgers
const burgers = [
  createProduct(259, 2, "Burgers", "Zinger Burger", 400, "/burgers/zinger.jpg"),
  createProduct(260, 2, "Burgers", "Zinger Supreme Burger", 700, "/burgers/zinger-supreme.jpg"),
  createProduct(261, 2, "Burgers", "Reggy Burger", 300, "/burgers/reggy.webp"),
  createProduct(262, 2, "Burgers", "Tower Burger", 600, "/burgers/tower.jpg"),
  createProduct(263, 2, "Burgers", "Fillet Burger Single", 400, "/burgers/fillet.webp"),
  createProduct(264, 2, "Burgers", "Fillet Burger Double", 700, "/burgers/double-fillet.webp"),
  createProduct(265, 2, "Burgers", "Jalapeno Burger", 500, "/burgers/jalapeno.webp")
];

// ONE Bite - Sandwiches
const sandwiches = [
  createProduct(266, 2, "Sandwiches", "Mexican Sandwich", 700, "/sandwich/mexican.jpg"),
  createProduct(267, 2, "Sandwiches", "Pizza Stacker", 800, "/sandwich/pizza-stacker.jpg"),
  createProduct(268, 2, "Sandwiches", "Calzone Chunks", 1000, "/sandwich/calzone-chunks.webp")
];

// ONE Bite - Starters
const starters = [
  createProduct(269, 2, "Starters", "Bake Wings", 400, "/starters/baked-wings.jpg"),
  createProduct(270, 2, "Starters", "Fried Wings", 400, "/starters/fried-wings.jpg"),
  createProduct(271, 2, "Starters", "Nuggets", 600, "/starters/nuggets.jpg"),
  createProduct(272, 2, "Starters", "Chicken Strips", 600, "/starters/chicken-strips.jpg"),
  createProduct(273, 2, "Starters", "Chicken Piece", 600, "/starters/chicken-piece.jpg")
];

// ONE Bite - Wraps
const wraps = [
  createProduct(274, 2, "Wraps", "Fillet Wrap", 700, "/wrap/fillet-wrap.jpg"),
  createProduct(275, 2, "Wraps", "Behari Wrap", 650, "/wrap/behari-wrap.jpg"),
  createProduct(276, 2, "Wraps", "Zinger Wrap", 700, "/wrap/zinger-wrap.webp")
];

// ONE Bite - Pasta
const pasta = [
  createProduct(277, 2, "Pasta", "Crunchy Pasta", 750, "/pasta/crunchy-pasta.webp"),
  createProduct(278, 2, "Pasta", "Fettuccine Alfredo", 900, "/pasta/fettuccine-alfredo.jpg")
];

// ONE Bite - Fries (consolidated with variations)
const fries = [
  createProductWithVariations(279, 2, "Fries", "Fries", [
    { size: "Small", price: 250 },
    { size: "Medium", price: 350 },
    { size: "Large", price: 500 }
  ], "/fries/fries.jpg"),
  createProduct(282, 2, "Fries", "Pizza Fries", 600, "/fries/pizza-fries.jpg")
];

export const DB = {
  stores: [
    {
      id: 1,
      name: "Brookie",
      category: "Restaurant",
      whatsappNumber: "923018806666",
      imageUrl: "/assets/images/brookie/brookielogo.jpg"
    },
    {
      id: 2,
      name: "ONE Bite",
      category: "Restaurant",
      whatsappNumber: "923489331622",
      imageUrl: "/assets/images/onebite/onebite.jpg"
    },
  ],

  products: [
    ...brookieProducts,
    ...oneBiteDeals,
    ...regularPizzas,
    ...specialPizzas,
    ...burgers,
    ...sandwiches,
    ...starters,
    ...wraps,
    ...pasta,
    ...fries
  ],

  // Helper methods
  getStoreById(id) {
    return this.stores.find(store => store.id === id);
  },

  getProductsByStoreId(storeId) {
    return this.products.filter(product => product.storeId === storeId);
  },

  getProductById(id) {
    return this.products.find(product => product.id === id);
  },

  // Get product and variation by variation ID
  getProductByVariationId(variationId) {
    for (const product of this.products) {
      if (product.hasVariations) {
        const variation = product.variations.find(v => v.id === variationId);
        if (variation) {
          return {
            product,
            variation
          };
        }
      }
    }
    return null;
  },

  getStoresByCategory(category) {
    if (category === 'All') {
      return this.stores;
    }
    return this.stores.filter(store => store.category === category);
  },

  getAllCategories() {
    const categories = ['All', ...new Set(this.stores.map(store => store.category))];
    return categories;
  },

  // Filter products by category within a store
  getProductsByCategoryAndStore(storeId, category) {
    return this.products.filter(product =>
      product.storeId === storeId && product.category === category
    );
  },

  // Get all product categories for a specific store
  getProductCategoriesForStore(storeId) {
    const storeProducts = this.products.filter(product => product.storeId === storeId);
    const categories = [...new Set(storeProducts.map(product => product.category).filter(Boolean))];
    return categories;
  }
};
