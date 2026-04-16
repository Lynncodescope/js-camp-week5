// ========================================
// 第五週作業：電商資料處理系統
// ========================================

// ========== 提供的資料結構 ==========

// 產品資料
const products = [
  { id: 'prod-1', title: '經典白T', category: '衣服', origin_price: 500, price: 399, images: 'https://example.com/t1.jpg' },
  { id: 'prod-2', title: '牛仔褲', category: '褲子', origin_price: 1200, price: 899, images: 'https://example.com/p1.jpg' },
  { id: 'prod-3', title: '帆布鞋', category: '鞋子', origin_price: 1800, price: 1299, images: 'https://example.com/s1.jpg' },
  { id: 'prod-4', title: '棒球帽', category: '配件', origin_price: 350, price: 299, images: 'https://example.com/h1.jpg' },
  { id: 'prod-5', title: '運動外套', category: '衣服', origin_price: 2000, price: 1599, images: 'https://example.com/j1.jpg' }
];

// 購物車資料
const carts = [
  { id: 'cart-1', product: products[0], quantity: 2 },
  { id: 'cart-2', product: products[2], quantity: 1 },
  { id: 'cart-3', product: products[4], quantity: 1 }
];

// 訂單資料
const orders = [
  {
    id: 'order-1',
    createdAt: 1704067200, // Unix timestamp
    paid: false,
    total: 2097,
    user: { name: '王小明', tel: '0912345678', email: 'ming@example.com', address: '台北市信義區', payment: 'ATM' },
    products: [
      { ...products[0], quantity: 2 },
      { ...products[2], quantity: 1 }
    ]
  },
  {
    id: 'order-2',
    createdAt: 1704153600,
    paid: true,
    total: 899,
    user: { name: '李小華', tel: '0923456789', email: 'hua@example.com', address: '台中市西區', payment: 'Credit Card' },
    products: [
      { ...products[1], quantity: 1 }
    ]
  }
];

// ========================================
// 任務一：產品查詢模組 (基礎)
// ========================================

/**
 * 1. 根據 ID 查詢產品
 * @param {Array} products - 產品陣列
 * @param {string} productId - 產品 ID
 * @returns {Object|null} - 回傳產品物件，找不到回傳 null
 */
function getProductById(products, productId) {
  // 請實作此函式
  return products.find(function(merchandise){
    return merchandise.id === productId;
  }) || null
}

/**
 * 2. 根據分類篩選產品
 * @param {Array} products - 產品陣列
 * @param {string} category - 分類名稱
 * @returns {Array} - 回傳符合分類的產品陣列，若 category 為 '全部' 則回傳全部產品
 */
function getProductsByCategory(products, category) {
  // 請實作此函式
  if (category === '全部'){
    return products;
  }else{
    return products.filter(merchandise => merchandise.category === category)   // 設定 merchandise 是 跑filter時依序帶入的任一筆商品
  }
}

/**
 * 3. 計算產品折扣率
 * @param {Object} product - 產品物件
 * @returns {string} - 回傳折扣百分比，例如 '8折' 或 '79折'
 * 計算方式：Math.round((price / origin_price) * 100) / 10
 */
function getDiscountRate(product) {
  // 請實作此函式
  return `${Math.round((products.price / products.origin_price) * 100) / 10}折`
}

/**
 * 4. 取得所有產品分類（不重複）
 * @param {Array} products - 產品陣列
 * @returns {Array} - 回傳分類陣列，例如 ['衣服', '褲子', '鞋子', '配件']
 */
function getAllCategories(products) {
  // 請實作此函式
  const categoryArray = products.map(function(merchandise){
    return merchandise.category;
  });
  return [...new Set(categoryArray)];
}

// ========================================
// 任務二：購物車計算模組 (中階)
// ========================================

/**
 * 1. 計算購物車原價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（原價 × 數量 的總和）
 */
function calculateCartOriginalTotal(carts) {
  // 請實作此函式
  return carts.reduce(function(acc,merchandise){
    return acc + merchandise.product.origin_price*merchandise.quantity;
  },0);
}

/**
 * 2. 計算購物車售價總金額
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳數字（售價 × 數量 的總和）
 */
function calculateCartTotal(carts) {
  // 請實作此函式
  return carts.reduce(function(acc,merchandise){
    return acc + merchandise.product.price*merchandise.quantity;
  },0);
}

/**
 * 3. 計算總共省下多少錢
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳原價總金額 - 售價總金額
 */
function calculateSavings(carts) {
  // 請實作此函式
  return calculateCartOriginalTotal(carts) - calculateCartTotal(carts)
}

/**
 * 4. 計算購物車商品總數量
 * @param {Array} carts - 購物車陣列
 * @returns {number} - 回傳所有商品的 quantity 總和
 */
function calculateCartItemCount(carts) {
  // 請實作此函式
  return carts.reduce (function(acc,merchandise){
    return acc + merchandise.quantity;
  },0)
}

/**
 * 5. 檢查產品是否已在購物車中
 * @param {Array} carts - 購物車陣列
 * @param {string} productId - 產品 ID
 * @returns {boolean} - 回傳 true 或 false
 */
function isProductInCart(carts, productId) {
  // 請實作此函式
  return carts.some (function(merchandise){
    return merchandise.product.id === productId;
  })
}

// ========================================
// 任務三：購物車操作模組 (進階)
// ========================================

/**
 * 1. 新增商品到購物車
 * @param {Array} carts - 購物車陣列
 * @param {Object} product - 產品物件（要新增的那一個商品，它的格式就如同products陣列中的物件。）
 * @param {number} quantity - 數量
 * @returns {Array} - 回傳新的購物車陣列（不要修改原陣列）
 * 如果產品已存在，合併數量；如果不存在，新增一筆
 */
function addToCart(carts, product, quantity) {
  // 請實作此函式
  // 找要新增至購物車的商品，是否在原本購物車中就有（找它的index）
  const productIndex = carts.findIndex (function(merchandise){
    return merchandise.product.id === product.id;
    // ===左側，跑carts陣列，所以merchandise.product.id結果會是抓出'prod-1'～'prod-5'的資料
    // 再和===右側比對，product.id因為是要找那個「要新增進購物的商品」的id，所以是跑products陣列。
    // 但此處「要新增進購物的商品」的參數名稱是使用product，故此處寫成product.id。
  });
  if (productIndex !== -1){
    // 有找到index，代表商品已存在，合併數量
    return carts.map (function(merchandise,index){
      if (index === productIndex){
        // 合併數量
        return {
          ...merchandise,
          quantity: merchandise.quantity + quantity   // 這裡也能寫成 quantity: (merchandise.quantity += quantity) 取出原有的數量後加上新數量，再列為屬性的值。
          // 這裡是用每日任務Day21「...展開運算子」中的展開與覆寫，
          // 將舊物件的所有屬性展開到新物件中。
        };
      }else{
        return carts;
      }
    })
  }else{
    // 商品原本不存在，新增一筆商品
    // 這裡物件內用的是當屬性名稱和作為該屬性的值的變數名稱相同時的縮寫寫法。
    const newProduct = {
      id: `cart-${carts.length}`,
      product,
      quantity
    };
    // 回傳新購物車陣列，也是展開運算子的用法（除了物件裡屬性的展開和覆寫，
    // 還能合併兩個陣列，或者將新的元素加入既有的清單內。）
    return [...carts,newProduct];
  }
}

/**
 * 2. 更新購物車商品數量
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @param {number} newQuantity - 新數量
 * @returns {Array} - 回傳新的購物車陣列，如果 newQuantity <= 0，移除該商品
 */
function updateCartItemQuantity(carts, cartId, newQuantity) {
  // 請實作此函式
  if (newQuantity <= 0){
    return carts.filter (merchandise => merchandise.id !== cartId);
  }else{
    return carts.map (merchandise => {
      if (merchandise.id === cartId){
        return {
          ...carts,
          quantity: newQuantity
        }
      }else{
        return carts;
      }
    })
  }
}

/**
 * 3. 從購物車移除商品
 * @param {Array} carts - 購物車陣列
 * @param {string} cartId - 購物車項目 ID
 * @returns {Array} - 回傳移除後的新購物車陣列
 */
function removeFromCart(carts, cartId) {
  // 請實作此函式
  return carts.filter (merchandise => merchandise.id !== cartId);
}

/**
 * 4. 清空購物車.   (因為不能動到原始的購物車陣列，所以就直接回傳空陣列。)
 * @returns {Array} - 回傳空陣列
 */
function clearCart() {
  // 請實作此函式
  return [];
}

// ========================================
// 任務四：訂單統計模組 (挑戰)
// ========================================

/**
 * 1. 計算訂單總營收
 * @param {Array} orders - 訂單陣列
 * @returns {number} - 只計算已付款 (paid: true) 的訂單
 */
function calculateTotalRevenue(orders) {
  // 請實作此函式
  return orders
  .filter (order => order.paid == true)
  .reduce ( (acc,order) => acc + order.total , 0);
}

/**
 * 2. 篩選訂單狀態
 * @param {Array} orders - 訂單陣列
 * @param {boolean} isPaid - true 回傳已付款訂單，false 回傳未付款訂單
 * @returns {Array} - 回傳篩選後的訂單陣列
 */
function filterOrdersByStatus(orders, isPaid) {
  // 請實作此函式
  return orders.filter (order => order.paid === isPaid);
}

/**
 * 3. 產生訂單統計報表
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   totalOrders: 2,  (訂單數量)
 *   paidOrders: 1,
 *   unpaidOrders: 1,
 *   totalRevenue: 899,  (已付款的訂單總金額)
 *   averageOrderValue: 1498  // 所有訂單平均金額
 * }
 */
function generateOrderReport(orders) {
  // 請實作此函式
  const paidOrders = filterOrdersByStatus(orders, true).length;
  const unpaidOrders = filterOrdersByStatus(orders, false).length;
  const totalRevenue = calculateTotalRevenue(orders);
  const totalOrdersPrice = orders.reduce ( (acc,order) => acc + order.total , 0);

  return {
    totalOrders: orders.length,
    paidOrders,
    unpaidOrders,
    totalRevenue,
    averageOrderValue: Math.round (totalOrdersPrice / orders.length)
  }
}

/**
 * 4. 依付款方式統計
 * @param {Array} orders - 訂單陣列
 * @returns {Object} - 回傳格式：
 * {
 *   'ATM': [order1],
 *   'Credit Card': [order2]
 * }
 */
function groupOrdersByPayment(orders) {
  // 請實作此函式
  
  // 因為要跑遍每一個訂單，並把不同的付款方式的訂單分別加入ATM以及Credit card的屬性中，因此可使用reduce方式。
  // 設定 group 為最後要回傳的物件格式的參數名稱，尚未開始進行function分類訂單前，要回傳的物件初始值就是{}。
  // 這題也可以使用filter方法寫。

  return orders.reduce ( (group,order) => {
    const payment = order.user.payment;
    
    // 因為還沒有開始分類，所以先建立要回傳的東西是一個空陣列。
    if (!group[payment]){
      group[payment] = [];
    }
    
    // group[payment]這裡是使用取出屬性的值的第二種方法-變數。常用的方法是物件名稱.屬性名稱，e.g. orders.id。
    group[payment].push(order);  
    
    return group;
    
  }, {})
}

// ========================================
// 測試區域（可自行修改測試）
// ========================================

// 任務一測試
console.log('=== 任務一測試 ===');
console.log('getProductById:', getProductById(products, 'prod-1'));
console.log('getProductsByCategory:', getProductsByCategory(products, '衣服'));
console.log('getDiscountRate:', getDiscountRate(products[0]));
console.log('getAllCategories:', getAllCategories(products));

// 任務二測試
console.log('\n=== 任務二測試 ===');
console.log('calculateCartOriginalTotal:', calculateCartOriginalTotal(carts));
console.log('calculateCartTotal:', calculateCartTotal(carts));
console.log('calculateSavings:', calculateSavings(carts));
console.log('calculateCartItemCount:', calculateCartItemCount(carts));
console.log('isProductInCart:', isProductInCart(carts, 'prod-1'));

// 任務三測試
console.log('\n=== 任務三測試 ===');
console.log('addToCart:', addToCart(carts, products[1], 2));
console.log('updateCartItemQuantity:', updateCartItemQuantity(carts, 'cart-1', 5));
console.log('removeFromCart:', removeFromCart(carts, 'cart-1'));
console.log('clearCart:', clearCart());

// 任務四測試
console.log('\n=== 任務四測試 ===');
console.log('calculateTotalRevenue:', calculateTotalRevenue(orders));
console.log('filterOrdersByStatus:', filterOrdersByStatus(orders, true));
console.log('generateOrderReport:', generateOrderReport(orders));
console.log('groupOrdersByPayment:', groupOrdersByPayment(orders));

// ========================================
// 匯出函式供測試使用
// ========================================
module.exports = {
  getProductById,
  getProductsByCategory,
  getDiscountRate,
  getAllCategories,
  calculateCartOriginalTotal,
  calculateCartTotal,
  calculateSavings,
  calculateCartItemCount,
  isProductInCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  calculateTotalRevenue,
  filterOrdersByStatus,
  generateOrderReport,
  groupOrdersByPayment
};
