// ============================================
// NearBuy - Mock Database
// Stores and Products Data
// ============================================

// Helper function to create a simple product (no variations)
function createProduct(id, storeId, category, name, price, imageName) {
  let folder = 'onebite';
  if (storeId === 1) folder = 'brookie';
  else if (storeId === 3) folder = 'tkr';
  else if (storeId === 4) folder = 'GIKians-essentials';

  return {
    id,
    storeId,
    category,
    name,
    price,
    imageUrl: `/assets/images/${folder}/${imageName}`,
    hasVariations: false
  };
}

// Helper function to create a product with variations (sizes)
function createProductWithVariations(id, storeId, category, name, variations, imageName) {
  let folder = 'onebite';
  if (storeId === 1) folder = 'brookie';
  else if (storeId === 3) folder = 'tkr';
  else if (storeId === 4) folder = 'GIKians-essentials';

  return {
    id,
    storeId,
    category,
    name,
    imageUrl: `/assets/images/${folder}/${imageName}`,
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

// Tahir Khan Restaurant - Fast Food
const tahirKhanFastFood = [
  createProduct(301, 3, "Fast Food", "Anda Shami Burger", 220, "/fastfood/Anda-Shami-Burger.webp"),
  createProduct(302, 3, "Fast Food", "Chicken Burger", 300, "/fastfood/chicken-burger.webp"),
  createProduct(303, 3, "Fast Food", "Chicken Shawarma", 250, "/fastfood/chicken-shawarma.jpg")
];

// Tahir Khan Restaurant - Karahi Dishes
const tahirKhanKarahi = [
  createProduct(304, 3, "Karahi Dishes", "Chicken Karahi", 1400, "/karahi/chicken-karahi.jpg"),
  createProduct(305, 3, "Karahi Dishes", "Malai Boti", 1600, "/karahi/malai-boti.jpg"),
  createProduct(306, 3, "Karahi Dishes", "Chicken White Handi", 1500, "/karahi/white-handi.webp"),
  createProduct(307, 3, "Karahi Dishes", "Kabab Handi", 1300, "/karahi/kabab-handi.jpg")
];

// Tahir Khan Restaurant - Salan (Curries/Gravy)
const tahirKhanSalan = [
  createProduct(308, 3, "Salan (Curries)", "Chicken Qorma", 250, "/salan/qorma.webp"),
  createProduct(309, 3, "Salan (Curries)", "Chicken Haleem", 250, "/salan/haleem.jpg"),
  createProduct(310, 3, "Salan (Curries)", "Aloo Keema", 250, "/salan/aloo-keema.jpg"),
  createProduct(311, 3, "Salan (Curries)", "Chana", 150, "/salan/channa.jpg"),
  createProduct(312, 3, "Salan (Curries)", "Lobia", 150, "/salan/lobia.webp"),
  createProduct(313, 3, "Salan (Curries)", "Mix Sabzi", 150, "/salan/mix-sabzi.jpg"),
  createProduct(314, 3, "Salan (Curries)", "Daal Mash", 150, "/salan/daal-mash.jpg"),
];

// Tahir Khan Restaurant - Chai (Tea & Breakfast)
const tahirKhanChai = [
  createProduct(316, 3, "Chai (Tea & Breakfast)", "Special Chai", 80, "/breakfast/special-chai.webp"),
  createProduct(317, 3, "Chai (Tea & Breakfast)", "Sada Chai", 50, "/breakfast/sada-chai.jpg"),
  createProduct(318, 3, "Chai (Tea & Breakfast)", "Anda Fry", 50, "/breakfast/anda-fry.jpg"),
  createProduct(319, 3, "Chai (Tea & Breakfast)", "Sada Paratha", 50, "/breakfast/paratha.webp"),
  createProduct(320, 3, "Chai (Tea & Breakfast)", "Chicken Paratha", 150, "/breakfast/chicken-paratha.jpg"),
  createProduct(321, 3, "Chai (Tea & Breakfast)", "Aloo Paratha", 100, "/breakfast/aloo-paratha.jpg"),
  createProduct(322, 3, "Chai (Tea & Breakfast)", "Chicken Cheese Paratha", 180, "/breakfast/cheese-paratha.jpg")
];

// ============================================
// GIKIans Essentials - Groceries & Staples
// ============================================
const gikiansGroceries = [
  createProduct(401, 4, "Groceries & Staples", "Basmati Rice (1kg)", 250, "/groceries/basmati-rice.png"),
  createProduct(402, 4, "Groceries & Staples", "Wheat Flour (1kg)", 100, "/groceries/wheat-flour.avif"),
  createProduct(403, 4, "Groceries & Staples", "Cooking Oil (1L)", 450, "/groceries/cooking-oil.jpg"),
  createProduct(404, 4, "Groceries & Staples", "White Sugar (1kg)", 150, "/groceries/sugar.webp"),
  createProduct(405, 4, "Groceries & Staples", "Table Salt (800g)", 50, "/groceries/salt.jpg"),
  createProduct(406, 4, "Groceries & Staples", "Masoor Daal (500g)", 150, "/groceries/masoor-daal.jpg"),
  createProduct(407, 4, "Groceries & Staples", "Chana Daal (500g)", 160, "/groceries/daal.jpg"),
  createProduct(408, 4, "Groceries & Staples", "Instant Noodles (Pack of 5)", 200, "/groceries/noodles.jpg"),
  createProduct(409, 4, "Groceries & Staples", "Farm Eggs (6 pieces)", 180, "/groceries/eggs.jpg"),
  createProduct(410, 4, "Groceries & Staples", "Milk Pack", 220, "/groceries/milk.jpg"),
  createProduct(411, 4, "Groceries & Staples", "Bread (Large)", 120, "/groceries/bread.jpg"),
  createProduct(412, 4, "Groceries & Staples", "Butter (200g)", 280, "/groceries/butter.jpg"),
  createProduct(413, 4, "Groceries & Staples", "Jam (450g)", 320, "/groceries/jam.webp")
];

// ============================================
// GIKIans Essentials - Snacks & Confectionery
// ============================================
const gikiansSnacks = [
  createProduct(414, 4, "Snacks & Confectionery", "Lays Classic (Large)", 130, "/snacks/lays.jpg"),
  createProduct(415, 4, "Snacks & Confectionery", "Kurkure Chatni (Medium)", 60, "/snacks/kurkure.jpg"),
  createProduct(416, 4, "Snacks & Confectionery", "Cheetos (Medium)", 80, "/snacks/cheetos.jpg"),
  createProduct(417, 4, "Snacks & Confectionery", "Prince Biscuits", 50, "/snacks/prince.jpg"),
  createProduct(418, 4, "Snacks & Confectionery", "Oreo Biscuits", 100, "/snacks/oreo.jpg"),
  createProduct(419, 4, "Snacks & Confectionery", "Sooper Biscuits", 40, "/snacks/sooper.jpg"),
  createProduct(420, 4, "Snacks & Confectionery", "Peek Freans Cake", 50, "/snacks/cake.jpg"),
  createProduct(421, 4, "Snacks & Confectionery", "Dairy Milk Chocolate", 150, "/snacks/dairymilk.jpg"),
  createProduct(422, 4, "Snacks & Confectionery", "Kit Kat", 120, "/snacks/kitkat.jpg"),
  createProduct(423, 4, "Snacks & Confectionery", "Candyland (Pack of 10)", 100, "/snacks/candy.jpg"),
  createProduct(424, 4, "Snacks & Confectionery", "Center Fresh Gum", 30, "/snacks/gum.jpg"),
  createProduct(425, 4, "Snacks & Confectionery", "Nimko Mix (250g)", 120, "/snacks/nimko.jpg"),
  createProduct(426, 4, "Snacks & Confectionery", "Roasted Chanay (250g)", 100, "/snacks/chanay.jpg"),
  createProduct(427, 4, "Snacks & Confectionery", "Popcorn (200g)", 150, "/snacks/popcorn.jpg")
];

// ============================================
// GIKIans Essentials - Beverages
// ============================================
const gikiansBeverages = [
  createProduct(428, 4, "Beverages", "Pepsi (1.5L)", 150, "/beverages/pepsi.jpg"),
  createProduct(429, 4, "Beverages", "Coca Cola (1.5L)", 150, "/beverages/coke.jpg"),
  createProduct(430, 4, "Beverages", "Sprite (1.5L)", 150, "/beverages/sprite.jpg"),
  createProduct(431, 4, "Beverages", "7UP (1.5L)", 150, "/beverages/7up.jpg"),
  createProduct(432, 4, "Beverages", "Mountain Dew (1.5L)", 150, "/beverages/dew.jpg"),
  createProduct(433, 4, "Beverages", "Fanta (1.5L)", 150, "/beverages/fanta.jpg"),
  createProduct(434, 4, "Beverages", "Mango Juice (1L)", 200, "/beverages/mango.jpg"),
  createProduct(435, 4, "Beverages", "Apple Juice (1L)", 200, "/beverages/apple.jpg"),
  createProduct(436, 4, "Beverages", "Pakola (500ml)", 70, "/beverages/pakola.jpg"),
  createProduct(437, 4, "Beverages", "Red Bull (250ml)", 300, "/beverages/redbull.jpg"),
  createProduct(438, 4, "Beverages", "Sting Energy Drink (330ml)", 120, "/beverages/sting.jpg"),
  createProduct(439, 4, "Beverages", "Mineral Water (1.5L)", 100, "/beverages/water.jpg"),
  createProduct(440, 4, "Beverages", "Tapal Tea (475g)", 550, "/beverages/tapal.jpg"),
  createProduct(441, 4, "Beverages", "Lipton Yellow Label (475g)", 600, "/beverages/lipton.jpg"),
  createProduct(442, 4, "Beverages", "Nescafe Classic (200g)", 850, "/beverages/nescafe.jpg"),
  createProduct(443, 4, "Beverages", "Milk Pack (1L)", 220, "/beverages/milk-pack.jpg")
];

// ============================================
// GIKIans Essentials - Personal Care & Toiletries
// ============================================
const gikiansPersonalCare = [
  createProduct(444, 4, "Personal Care", "Head & Shoulders Shampoo (180ml)", 450, "/personal/shampoo.jpg"),
  createProduct(445, 4, "Personal Care", "Pantene Shampoo (180ml)", 420, "/personal/pantene.jpg"),
  createProduct(446, 4, "Personal Care", "Dove Soap (100g)", 120, "/personal/dove.jpg"),
  createProduct(447, 4, "Personal Care", "Safeguard Soap (100g)", 80, "/personal/safeguard.jpg"),
  createProduct(448, 4, "Personal Care", "Colgate Toothpaste (75ml)", 180, "/personal/colgate.jpg"),
  createProduct(449, 4, "Personal Care", "Sensodyne Toothpaste (75ml)", 350, "/personal/sensodyne.jpg"),
  createProduct(450, 4, "Personal Care", "Toothbrush", 80, "/personal/toothbrush.jpg"),
  createProduct(451, 4, "Personal Care", "Gillette Shaving Foam", 450, "/personal/shaving-foam.jpg"),
  createProduct(452, 4, "Personal Care", "Gillette Razor", 250, "/personal/razor.jpg"),
  createProduct(453, 4, "Personal Care", "Axe Deodorant", 550, "/personal/axe.jpg"),
  createProduct(454, 4, "Personal Care", "Rexona Deodorant", 480, "/personal/rexona.jpg"),
  createProduct(455, 4, "Personal Care", "Tissues Box (100 sheets)", 120, "/personal/tissues.jpg"),
  createProduct(456, 4, "Personal Care", "Wet Wipes (Pack)", 150, "/personal/wipes.jpg"),
  createProduct(457, 4, "Personal Care", "Ariel Detergent (1kg)", 450, "/personal/ariel.jpg"),
  createProduct(458, 4, "Personal Care", "Surf Excel (1kg)", 480, "/personal/surf.jpg"),
  createProduct(459, 4, "Personal Care", "Comfort Fabric Softener (800ml)", 380, "/personal/comfort.jpg"),
  createProduct(460, 4, "Personal Care", "Hand Sanitizer (200ml)", 250, "/personal/sanitizer.jpg")
];

// ============================================
// GIKIans Essentials - Stationery & Supplies
// ============================================
const gikiansStationery = [
  createProduct(461, 4, "Stationery", "A4 Notebook (200 pages)", 180, "/stationery/notebook.jpg"),
  createProduct(462, 4, "Stationery", "Spiral Register (100 pages)", 150, "/stationery/register.jpg"),
  createProduct(463, 4, "Stationery", "Ball Pen (Blue)", 20, "/stationery/pen.jpg"),
  createProduct(464, 4, "Stationery", "Pencil (HB)", 15, "/stationery/pencil.jpg"),
  createProduct(465, 4, "Stationery", "Eraser", 20, "/stationery/eraser.jpg"),
  createProduct(466, 4, "Stationery", "Sharpener", 15, "/stationery/sharpener.jpg"),
  createProduct(467, 4, "Stationery", "Highlighter (Set of 4)", 180, "/stationery/highlighter.jpg"),
  createProduct(468, 4, "Stationery", "Marker (Permanent)", 80, "/stationery/marker.jpg"),
  createProduct(469, 4, "Stationery", "Plastic File Folder", 50, "/stationery/folder.jpg"),
  createProduct(470, 4, "Stationery", "Ring File", 120, "/stationery/ring-file.jpg"),
  createProduct(471, 4, "Stationery", "Stapler", 250, "/stationery/stapler.jpg"),
  createProduct(472, 4, "Stationery", "Stapler Pins (Box)", 50, "/stationery/pins.jpg"),
  createProduct(473, 4, "Stationery", "A4 Printing Paper (500 sheets)", 800, "/stationery/paper.jpg"),
  createProduct(474, 4, "Stationery", "Sticky Notes (3 pads)", 150, "/stationery/sticky.jpg"),
  createProduct(475, 4, "Stationery", "Scissors", 120, "/stationery/scissors.jpg"),
  createProduct(476, 4, "Stationery", "Glue Stick", 80, "/stationery/glue.jpg")
];

// ============================================
// GIKIans Essentials - Tobacco Products
// ============================================
const gikiansTobacco = [
  createProduct(477, 4, "Tobacco Products", "Gold Leaf Cigarettes", 180, "/tobacco/goldleaf.jpg"),
  createProduct(478, 4, "Tobacco Products", "Marlboro Cigarettes", 200, "/tobacco/marlboro.jpg"),
  createProduct(479, 4, "Tobacco Products", "Dunhill Cigarettes", 220, "/tobacco/dunhill.jpg"),
  createProduct(480, 4, "Tobacco Products", "Gold Flake Cigarettes", 160, "/tobacco/goldflake.jpg"),
  createProduct(481, 4, "Tobacco Products", "Capstan Cigarettes", 140, "/tobacco/capstan.jpg")
];

// ============================================
// GIKIans Essentials - Miscellaneous
// ============================================
const gikiansMisc = [
  createProduct(482, 4, "Miscellaneous", "Phone Charger (Type-C)", 500, "/misc/charger-c.jpg"),
  createProduct(483, 4, "Miscellaneous", "Phone Charger (Micro USB)", 400, "/misc/charger-micro.jpg"),
  createProduct(484, 4, "Miscellaneous", "Earphones", 350, "/misc/earphones.jpg"),
  createProduct(485, 4, "Miscellaneous", "Cup Noodles", 100, "/misc/cup-noodles.jpg"),
  createProduct(486, 4, "Miscellaneous", "Shan Biryani Masala", 80, "/misc/shan-biryani.jpg"),
  createProduct(487, 4, "Miscellaneous", "Shan Chicken Masala", 70, "/misc/shan-chicken.jpg"),
  createProduct(488, 4, "Miscellaneous", "Knorr Noodles", 50, "/misc/knorr.jpg"),
  createProduct(489, 4, "Miscellaneous", "Maggi Masala", 40, "/misc/maggi.jpg"),
  createProduct(490, 4, "Miscellaneous", "Disposable Plates (10 pcs)", 120, "/misc/plates.jpg"),
  createProduct(491, 4, "Miscellaneous", "Disposable Cups (10 pcs)", 100, "/misc/cups.jpg"),
  createProduct(492, 4, "Miscellaneous", "Plastic Spoons (10 pcs)", 60, "/misc/spoons.jpg"),
  createProduct(493, 4, "Miscellaneous", "Aluminum Foil Roll", 200, "/misc/foil.jpg"),
  createProduct(494, 4, "Miscellaneous", "Garbage Bags (Pack of 10)", 150, "/misc/bags.jpg"),
  createProduct(495, 4, "Miscellaneous", "Matchbox", 20, "/misc/matchbox.jpg"),
  createProduct(496, 4, "Miscellaneous", "Candles (Pack of 5)", 100, "/misc/candles.jpg")
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
      email: "brookie.orders@gmail.com",  // Store owner email
      imageUrl: "/assets/images/brookie/brookielogo.jpg"
    },
    {
      id: 2,
      name: "ONE Bite",
      category: "Restaurant",
      whatsappNumber: "923489331622",
      email: "onebite.orders@gmail.com",  // Store owner email
      imageUrl: "/assets/images/onebite/onebite.jpg"
    },
    {
      id: 3,
      name: "Tahir Khan Restaurant",
      category: "Restaurant",
      deliveryFee: 50,
      paymentImage: "/assets/images/tkr/tkr-payment.png",  // Payment transfer details
      whatsappNumber: "923416040120",
      email: "tahirkhan.orders@gmail.com",  // Store owner email
      imageUrl: "/assets/images/tkr/tkrlogo.jpg"
    },
    {
      id: 4,
      name: "GIKIans Essentials",
      category: "Grocery",
      tagline: "Only for GIKIans",
      description: "Your one-stop shop for everything on campus! From groceries to tobacco items - we have it all. Perfect for bulk orders with guaranteed delivery.",
      deliveryFee: 50,
      deliveryTime: "30 min - 1 hour",
      minOrderItems: 5,
      whatsappNumber: "923005159901",
      email: "gikians.essentials@gmail.com",  // Store owner email
      imageUrl: "/assets/images/GIKians-essentials/GIKians-essentials.png"
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
    ...fries,
    ...tahirKhanFastFood,
    ...tahirKhanKarahi,
    ...tahirKhanSalan,
    ...tahirKhanChai,
    ...gikiansGroceries,
    ...gikiansSnacks,
    ...gikiansBeverages,
    ...gikiansPersonalCare,
    ...gikiansStationery,
    ...gikiansTobacco,
    ...gikiansMisc
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
