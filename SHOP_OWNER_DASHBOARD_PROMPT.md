# NearBuy Shop Owner Dashboard - Professional Development Prompt

## 🎯 Project Overview

Build a **production-ready, professional mobile/web dashboard application** exclusively for **NearBuy shop owners** to manage their orders, track earnings, monitor performance, and receive real-time notifications. This application must seamlessly integrate with the existing NearBuy e-commerce platform.

---

## 📱 Application Name

**"NearBuy Business Central"** or **"NearBuy Merchant Dashboard"**

---

## 🏢 Target Users

- **Shop Owners/Store Managers** who are registered on the NearBuy platform
- Each store has unique login credentials (email/password authentication)
- Stores include: Brookie, ONE Bite, Tahir Khan Restaurant, GIKIans Essentials, and future partners

---

## 🔐 Authentication & Security

### Store-Specific Login System
- **Individual store credentials**: Each store owner has unique login credentials
- **Authentication method**: Email + Password (with optional 2FA for enhanced security)
- **Session management**: Secure token-based authentication (JWT)
- **Password recovery**: Email-based password reset functionality
- **Role-based access**: Store owners can only view their own store's data

### Store Credentials Structure
```javascript
{
  storeId: 1,
  storeName: "Brookie",
  ownerEmail: "brookie.orders@gmail.com",
  whatsappNumber: "923018806666",
  category: "Restaurant"
}
```

**Current Stores:**
1. **Brookie** - `brookie.orders@gmail.com`
2. **ONE Bite** - `onebite.orders@gmail.com`
3. **Tahir Khan Restaurant** - `tahirkhan.orders@gmail.com`
4. **GIKIans Essentials** - `gikians.essentials@gmail.com`

---

## 🎨 Design Requirements

### Visual Excellence (CRITICAL)
This is a **professional business dashboard** - it MUST look premium and modern:

- **Color Scheme**: 
  - Primary: Deep Blue (#2563eb) / Royal Purple (#7c3aed)
  - Accent: Emerald Green (#10b981) for positive metrics
  - Warning: Amber (#f59e0b) for pending orders
  - Danger: Red (#ef4444) for issues
  - Background: Clean white (#ffffff) with subtle grays (#f9fafb, #f3f4f6)
  - Dark Mode: Full dark theme support with proper contrast

- **Typography**:
  - Primary Font: Inter, Poppins, or Plus Jakarta Sans
  - Headings: Bold, 600-700 weight
  - Body: 400-500 weight
  - Monospace for order IDs and numbers: JetBrains Mono or Roboto Mono

- **Modern UI Elements**:
  - **Glassmorphism cards** with backdrop blur effects
  - **Smooth animations** on all interactions (200-300ms transitions)
  - **Micro-interactions**: Hover effects, ripple effects on buttons
  - **Gradient accents** on important CTAs and metrics
  - **Shadow depth system**: Proper elevation for cards and modals
  - **Rounded corners**: 8-16px border radius for modern feel
  - **Icon system**: Use Lucide Icons, Heroicons, or Material Icons

- **Responsive Design**:
  - Mobile-first approach (most shop owners use phones)
  - Tablet optimization for larger screens
  - Desktop support for in-store management
  - Adaptive layouts that reflow beautifully

---

## 🚀 Core Features & Functionality

### 1. **Real-Time Order Management Dashboard**

#### Order Notifications
- **Push notifications** when new orders arrive (Web Push API or Firebase Cloud Messaging)
- **Sound alerts** for new orders (customizable notification sound)
- **Badge counters** showing unread/pending order count
- **In-app notifications center** with order history

#### Order Display & Details
Each order card must show:
```javascript
{
  orderId: "NB-ORD-20251129-0001",
  orderDate: "2025-11-29T21:57:48+05:00",
  orderStatus: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled",
  
  // Customer Information
  customerName: "Ahmed Khan",
  customerEmail: "ahmed@example.com",
  customerLocation: "Hostel A, Room 123",
  customerPhone: "+923001234567", // Optional if available
  
  // Order Items
  items: [
    {
      productName: "Triple Chocolate",
      variation: "Large", // If applicable
      quantity: 2,
      pricePerUnit: 280,
      totalPrice: 560,
      imageUrl: "/assets/images/product.jpg"
    }
  ],
  
  // Financial Details
  subtotal: 560,
  deliveryFee: 0, // If applicable (e.g., GIKIans Essentials charges Rs. 50)
  platformCommission: 56, // 10% of order total
  storeEarnings: 504, // Total - Commission
  grandTotal: 560,
  
  // Metadata
  orderSource: "Website" | "Mobile App",
  paymentMethod: "Cash on Delivery" | "Online Payment",
  specialInstructions: "Extra spicy, no onions"
}
```

#### Order Actions
- **Accept Order** button → Changes status to "confirmed"
- **Mark as Preparing** → Update status
- **Mark as Ready** → Notify customer via WhatsApp
- **Mark as Delivered** → Complete order, update earnings
- **Cancel Order** → Provide cancellation reason
- **Contact Customer** → Direct WhatsApp integration

#### Order Filtering & Search
- Filter by status: All, Pending, Confirmed, Preparing, Ready, Delivered, Cancelled
- Filter by date range: Today, Yesterday, Last 7 days, Last 30 days, Custom range
- Search by order ID, customer name, or phone number
- Sort by: Newest first, Oldest first, Highest value, Lowest value

---

### 2. **Earnings & Financial Analytics**

#### Dashboard Overview Cards (Top Metrics)
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│  TODAY'S SALES  │ PENDING ORDERS  │  MONTHLY SALES  │ TOTAL EARNINGS  │
│   Rs. 12,540    │      8 Orders   │   Rs. 245,890   │  Rs. 1,234,567  │
│   ↑ 23% vs yday │   🔔           │   ↑ 15% vs last │   All time      │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

#### Monthly Earnings Breakdown
```javascript
{
  month: "November 2025",
  totalRevenue: 245890,           // Gross sales
  platformCommission: 24589,      // 10% commission
  netEarnings: 221301,            // Revenue - Commission
  totalOrders: 87,
  averageOrderValue: 2826,
  topSellingProduct: "Chicken Tikka Pizza (Large)"
}
```

#### Visual Analytics (Charts & Graphs)
- **Line Chart**: Daily/Weekly/Monthly sales trends
- **Bar Chart**: Product category performance
- **Pie Chart**: Order status distribution
- **Donut Chart**: Revenue breakdown (Earnings vs Commission)
- **Area Chart**: Cumulative earnings over time

**Chart Library Recommendation**: Chart.js, Recharts, or ApexCharts

---

### 3. **Order History & Records**

#### Comprehensive Order Log
- **Infinite scroll** or **paginated table** of all orders
- **Export functionality**: Download as CSV/Excel/PDF
- **Date range selection** for custom reports
- **Order details popup/modal** on row click

#### Monthly Performance Report
Auto-generated monthly summary including:
- Total orders processed
- Total revenue generated
- Top-selling products (Top 10)
- Peak order times (hourly breakdown)
- Customer retention metrics
- Commission paid to platform

---

### 4. **Product & Inventory Management** (Optional Enhancement)

- View all store products with current prices
- **Mark products as out of stock** (updates website in real-time)
- **Edit product prices** (with approval workflow if needed)
- **Add new products** to store catalog
- Upload product images

---

### 5. **Notification Center**

#### Real-Time Notifications
- New order alerts with order details
- Customer messages/inquiries
- Payment confirmations
- Platform announcements (e.g., "Platform update scheduled")
- Performance milestones (e.g., "Congratulations! 100 orders completed!")

#### Notification Settings
- Toggle sound alerts on/off
- Choose notification sound
- Set quiet hours (e.g., 11 PM - 7 AM)
- Email notification preferences

---

### 6. **Store Profile & Settings**

#### Store Information
- Store name, category, logo
- Business hours (opening/closing times)
- WhatsApp business number
- Store owner contact email
- Delivery areas (if applicable)

#### Account Settings
- Change password
- Update email address
- Enable/disable two-factor authentication
- Notification preferences
- Language selection (English/Urdu support)

---

## 🔗 Integration with NearBuy Website

### How Orders Flow from Website to Dashboard

#### Current NearBuy Website Flow:
1. Customer browses stores and products
2. Adds items to cart
3. Fills checkout form (name, location, email)
4. Confirms order → Two things happen:
   - **Email sent to store owner** (via EmailJS)
   - **WhatsApp message sent to store** (via WhatsApp Web API)
   - **Email sent to customer** (order confirmation)

#### Enhanced Integration for Dashboard:

**Option 1: Real-Time Database Integration (Recommended)**
- Use **Firebase Realtime Database** or **Firestore** as central order repository
- When customer places order:
  ```javascript
  // Website code (app.js) after order confirmation
  const orderData = {
    orderId: generateOrderId(),
    storeId: store.id,
    customerInfo: {...},
    items: [...],
    total: 1234,
    status: "pending",
    timestamp: Date.now()
  };
  
  // Push to Firebase
  firebase.database().ref(`orders/${storeId}/${orderId}`).set(orderData);
  
  // Dashboard listens for new orders
  firebase.database().ref(`orders/${storeId}`)
    .on('child_added', (snapshot) => {
      showNewOrderNotification(snapshot.val());
    });
  ```

**Option 2: API Backend Integration**
- Create a lightweight Node.js/Express API backend
- Website POSTs order data to API endpoint
- Dashboard polls API or uses WebSockets for real-time updates
- API stores orders in MongoDB/PostgreSQL

**Option 3: Email Parsing (Least Recommended)**
- Dashboard monitors store owner email inbox
- Parses incoming order emails from NearBuy
- Extracts order details using regex/NLP
- Not ideal due to delay and complexity

### Recommended Tech Stack for Integration:

**Backend (Order Management)**
- **Firebase** (Firestore + Authentication + Cloud Functions)
- **Supabase** (PostgreSQL + Real-time + Auth)
- **Node.js + Express + MongoDB** (Custom API)

**Real-Time Sync**
- Firebase Realtime Database
- Supabase Real-time subscriptions
- Socket.io for WebSocket connections

**Notifications**
- Firebase Cloud Messaging (FCM) for push notifications
- Web Push API for browser notifications
- Twilio/WhatsApp Business API for SMS/WhatsApp alerts

---

## 💻 Technical Specifications

### Platform Options

**Option 1: Cross-Platform Mobile App (Flutter)**
```yaml
Framework: Flutter (Dart)
Advantages:
  - Single codebase for Android & iOS
  - Native performance
  - Beautiful Material Design & Cupertino widgets
  - Excellent for mobile-first business apps
  
State Management: Provider, Riverpod, or Bloc
Backend Integration: Firebase SDK, Dio for REST APIs
Push Notifications: Firebase Cloud Messaging
Local Storage: Hive or shared_preferences
Charts: fl_chart or syncfusion_flutter_charts
```

**Option 2: Progressive Web App (PWA)**
```yaml
Framework: React.js / Next.js / Vue.js
Advantages:
  - Works on any device with browser
  - No app store approval needed
  - Easy updates (no download required)
  - Lower development cost
  
UI Library: Material-UI, Ant Design, or TailwindCSS + shadcn/ui
State Management: Redux, Zustand, or React Context
Backend: Firebase, Supabase, or custom REST API
Push Notifications: Web Push API + Service Workers
Charts: Recharts, Chart.js, or ApexCharts
```

**Option 3: Native Mobile Apps**
```yaml
iOS: Swift + SwiftUI
Android: Kotlin + Jetpack Compose
Advantages: Best performance and native feel
Disadvantages: Two separate codebases
```

### Recommended Choice: **Flutter + Firebase**
Perfect balance of:
- Professional native-like UI
- Cross-platform support (Android, iOS, Web)
- Real-time data synchronization
- Built-in authentication
- Push notifications out of the box

---

## 📋 Core Pages/Screens Architecture

### 1. **Login Screen**
- Email input field
- Password input field (with show/hide toggle)
- "Remember Me" checkbox
- "Forgot Password?" link
- Login button with loading spinner
- Error message display

### 2. **Dashboard Home**
- Welcome banner with store name
- Summary metrics cards (4 key stats)
- New orders section (scrollable list)
- Quick actions: View All Orders, Today's Earnings, Settings
- Recent activity feed

### 3. **Orders Screen**
- Tabs: All, Pending, Confirmed, Delivered, Cancelled
- Search bar at top
- Filters button (date range, amount range)
- Order cards list (infinite scroll)
- Floating action button for manual order entry (optional)

### 4. **Order Details Modal/Screen**
- Order ID and timestamp
- Customer information card
- Items list with images
- Financial breakdown (subtotal, commission, net earnings)
- Order status timeline
- Action buttons: Accept, Confirm, Mark Ready, Deliver, Cancel
- Contact customer via WhatsApp button

### 5. **Analytics/Reports Screen**
- Date range selector
- Revenue chart (toggle daily/weekly/monthly)
- Key metrics summary
- Top products list
- Export report button

### 6. **Notifications Center**
- List of all notifications (newest first)
- Mark as read functionality
- Clear all button
- Notification settings link

### 7. **Profile/Settings Screen**
- Store information display
- Account settings
- Notification preferences
- Help & Support
- Logout button

---

## 🎯 User Experience (UX) Flow

### Daily Shop Owner Journey

**Morning Routine:**
1. Shop owner opens app → Logs in
2. Dashboard shows: "Good morning! You have 3 pending orders"
3. Taps on pending orders → Reviews each order
4. Accepts orders → Customers get WhatsApp confirmation
5. Starts preparing orders

**During Business Hours:**
1. **New order arrives** → Push notification + sound alert
2. Shop owner taps notification → Order details screen opens
3. Reviews order → Accepts/Rejects
4. Updates order status as they prepare
5. Marks as "Ready" → Customer gets notification

**End of Day:**
1. Views "Today's Earnings" on dashboard
2. Checks analytics to see peak hours
3. Reviews completed orders
4. Plans for next day based on insights

---

## 🔔 Push Notification Examples

```
🆕 New Order #NB-0142
Ahmed Khan ordered Rs. 1,250 worth of items
📍 Hostel B, Room 204
[Tap to view]

---

💰 Daily Milestone Achieved!
You've earned Rs. 15,000 today! 🎉
Total orders: 18

---

📊 Weekly Report Ready
November Week 4 performance summary is available
[View Report]

---

⚠️ Order Update Required
Order #NB-0138 has been pending for 15 minutes
[Review Now]
```

---

## 📊 Sample Dashboard UI Layout (Mobile)

```
┌─────────────────────────────────────┐
│  🛒 NearBuy Business Central       │ ← Header
│                                 👤  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  👋 Good Evening, Brookie!          │
│  You have 5 pending orders          │ ← Welcome Section
└─────────────────────────────────────┘

┌───────────────┬───────────────────┐
│ TODAY'S SALES │  PENDING ORDERS   │
│  Rs. 12,540   │     5 Orders 🔔  │ ← Metric Cards
│  ↑ 23%        │                   │
└───────────────┴───────────────────┘

┌───────────────┬───────────────────┐
│ THIS MONTH    │  TOTAL EARNINGS   │
│  Rs. 245,890  │   Rs. 1.2M        │
│  ↑ 15%        │   All time        │
└───────────────┴───────────────────┘

📦 Recent Orders ───────────── View All
┌─────────────────────────────────────┐
│ 🆕 Order #NB-0145        Rs. 1,250  │
│ Ahmed Khan • Hostel B, Rm 204       │
│ 2 items • 5 mins ago                │
│ [Accept] [View Details]             │ ← Order Card
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⏱️ Order #NB-0144         Rs. 890   │
│ Sara Ali • Hostel C, Rm 101         │
│ 1 item • 12 mins ago                │
│ Status: Preparing                   │
└─────────────────────────────────────┘

📈 Quick Actions
┌──────────┬──────────┬──────────┐
│ View All │ Analytics│ Settings │
│  Orders  │ & Reports│          │
└──────────┴──────────┴──────────┘

⬇️ Pull down to refresh
```

---

## 🛠️ Development Milestones

### Phase 1: Foundation (Week 1-2)
- [ ] Project setup and architecture design
- [ ] Authentication system implementation
- [ ] Database schema design (Firebase/Supabase)
- [ ] Basic UI components library

### Phase 2: Core Features (Week 3-4)
- [ ] Dashboard homepage with metrics
- [ ] Order management system
- [ ] Real-time order notifications
- [ ] Order status update functionality

### Phase 3: Analytics & Reports (Week 5)
- [ ] Earnings tracker and calculations
- [ ] Charts and visualizations
- [ ] Export functionality (CSV/PDF)
- [ ] Performance analytics

### Phase 4: Integration (Week 6)
- [ ] Integrate with NearBuy website
- [ ] Test order flow end-to-end
- [ ] Push notification setup
- [ ] WhatsApp integration for customer contact

### Phase 5: Polish & Testing (Week 7-8)
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Comprehensive testing (unit, integration, e2e)
- [ ] Beta testing with actual store owners
- [ ] Bug fixes and improvements

### Phase 6: Deployment (Week 9)
- [ ] Production environment setup
- [ ] App store submission (if mobile app)
- [ ] Documentation and user guides
- [ ] Launch and onboarding

---

## 📱 Example Code Snippets

### Firebase Order Listener (Flutter)
```dart
import 'package:firebase_database/firebase_database.dart';

class OrderService {
  final DatabaseReference _ordersRef = 
    FirebaseDatabase.instance.ref('orders');

  Stream<List<Order>> getStoreOrders(String storeId) {
    return _ordersRef
      .child(storeId)
      .orderByChild('timestamp')
      .onValue
      .map((event) {
        final data = event.snapshot.value as Map<dynamic, dynamic>?;
        if (data == null) return [];
        
        return data.entries.map((entry) {
          return Order.fromJson(entry.value as Map<dynamic, dynamic>);
        }).toList();
      });
  }

  Future<void> updateOrderStatus(
    String storeId, 
    String orderId, 
    OrderStatus status
  ) async {
    await _ordersRef
      .child('$storeId/$orderId/status')
      .set(status.toString());
  }
}
```

### Push Notification Setup (Flutter)
```dart
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;

  Future<void> initialize() async {
    // Request permission
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      sound: true,
      badge: true,
    );

    // Handle foreground messages
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      _showNotification(
        title: message.notification?.title ?? 'New Order',
        body: message.notification?.body ?? 'You have a new order!',
      );
    });

    // Handle notification taps
    FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
      _navigateToOrder(message.data['orderId']);
    });
  }

  void _showNotification({required String title, required String body}) {
    // Show local notification with sound
  }

  void _navigateToOrder(String orderId) {
    // Navigate to order details screen
  }
}
```

---

## 🎨 Design System Reference

### Color Palette
```css
:root {
  /* Primary Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Success */
  --success-500: #10b981;
  --success-600: #059669;

  /* Warning */
  --warning-500: #f59e0b;
  --warning-600: #d97706;

  /* Danger */
  --danger-500: #ef4444;
  --danger-600: #dc2626;

  /* Neutrals */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-700: #374151;
  --gray-900: #111827;
}
```

### Typography Scale
```css
/* Headings */
h1 { font-size: 32px; font-weight: 700; }
h2 { font-size: 24px; font-weight: 600; }
h3 { font-size: 20px; font-weight: 600; }

/* Body */
body { font-size: 16px; font-weight: 400; }
small { font-size: 14px; }
tiny { font-size: 12px; }
```

---

## ✅ Success Criteria

The dashboard app is successful when:

1. ✅ **Login works flawlessly** - Store owners can authenticate securely
2. ✅ **Real-time notifications** - Orders appear instantly (<3 seconds delay)
3. ✅ **Beautiful UI** - Looks professional, modern, and premium
4. ✅ **Intuitive navigation** - Store owners can use without training
5. ✅ **Accurate data** - Earnings calculations are 100% correct
6. ✅ **Fast performance** - App loads in <2 seconds, interactions are instant
7. ✅ **Reliable integration** - Every website order appears in dashboard
8. ✅ **Mobile-optimized** - Perfect experience on smartphones
9. ✅ **Offline support** - Can view cached data without internet
10. ✅ **Zero crashes** - Stable and bug-free in production

---

## 🚀 Final Notes

### This app should feel like:
- **Shopify Admin App** - Professional, clean, data-rich
- **Uber Driver App** - Real-time, notification-driven
- **Square Dashboard** - Financial clarity and insights

### Remember:
- **This is a business tool** - Prioritize functionality and speed over fancy animations
- **Shop owners are busy** - Make everything accessible in 2 taps or less
- **Money matters** - Double-check all financial calculations
- **Trust is critical** - Ensure data security and privacy

---

## 📞 Next Steps After Development

1. **User Testing**: Test with actual store owners from NearBuy
2. **Feedback Loop**: Iterate based on real-world usage
3. **Feature Expansion**: Add inventory management, customer analytics
4. **Admin Panel**: Build super-admin dashboard for NearBuy platform management
5. **API Documentation**: Document all endpoints for future integrations

---

**Build something that shop owners will LOVE to use every single day! 🚀**
