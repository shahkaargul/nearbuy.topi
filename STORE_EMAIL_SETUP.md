# NearBuy - Store Email Notification Setup Guide

## Overview
This guide will help you set up the EmailJS template for sending order notifications to store owners.

## Problem Fixed
Previously, store owners were NOT receiving any order notifications because:
1. Only customers and NearBuy admin were receiving emails
2. Store owners relied on WhatsApp, but customers had to manually send the message
3. This created a disconnect where orders were "lost" between the platform and stores

## Solution Implemented
Now the system sends **THREE concurrent emails** when an order is placed:
1. **Customer Confirmation Email** - Sent to the customer
2. **Admin Notification Email** - Sent to NearBuy owner
3. **Store Owner Notification Email** ⭐ NEW - Sent directly to the store owner

---

## EmailJS Template Setup

### Step 1: Create New Template in EmailJS

1. Log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Go to **Email Templates**
3. Click **Create New Template**
4. Name it: `Store Order Notification`

### Step 2: Template Configuration

**Template ID**: Replace `template_STORE123` in `emailService.js` line 13 with your actual template ID

**From Name**: `NearBuy Platform`

**From Email**: Use your verified email

**To Email**: `{{to_email}}` (This will be dynamically set to the store owner's email)

**Subject**: `🔔 New Order from {{customer_name}} - NearBuy`

### Step 3: Email Body (HTML)

Copy and paste this HTML template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      color: #667eea;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      border-bottom: 2px solid #667eea;
      padding-bottom: 5px;
    }
    .info-row {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .label {
      font-weight: 600;
      color: #555;
    }
    .value {
      color: #333;
    }
    .order-items {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      margin-top: 10px;
    }
    .order-items pre {
      margin: 0;
      white-space: pre-wrap;
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }
    .total {
      background: #667eea;
      color: white;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin: 20px 0;
    }
    .footer {
      background: #f5f5f5;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 10px 10px;
      font-size: 12px;
      color: #666;
    }
    .important-note {
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔔 New Order Received!</h1>
    <p style="margin: 5px 0 0 0;">{{store_name}}</p>
  </div>
  
  <div class="content">
    <div class="important-note">
      <strong>⚡ Action Required:</strong> You have received a new order through NearBuy. Please prepare the order and contact the customer to confirm delivery details.
    </div>

    <!-- Customer Information -->
    <div class="section">
      <div class="section-title">👤 Customer Information</div>
      <div class="info-row">
        <span class="label">Name:</span>
        <span class="value">{{customer_name}}</span>
      </div>
      <div class="info-row">
        <span class="label">Email:</span>
        <span class="value">{{customer_email}}</span>
      </div>
      <div class="info-row">
        <span class="label">Delivery Location:</span>
        <span class="value">{{customer_location}}</span>
      </div>
    </div>

    <!-- Order Details -->
    <div class="section">
      <div class="section-title">📦 Order Details</div>
      <div class="info-row">
        <span class="label">Order Date:</span>
        <span class="value">{{order_date}}</span>
      </div>
      <div class="order-items">
        <strong>Items Ordered:</strong>
        <pre>{{order_items}}</pre>
      </div>
    </div>

    <!-- Total Amount -->
    <div class="total">
      💰 TOTAL AMOUNT: {{order_total}}
    </div>

    <!-- Next Steps -->
    <div class="section">
      <div class="section-title">📋 Next Steps</div>
      <ol style="padding-left: 20px;">
        <li>Prepare the order items</li>
        <li>Contact the customer at: <strong>{{customer_email}}</strong></li>
        <li>Confirm delivery time and location: <strong>{{customer_location}}</strong></li>
        <li>Arrange delivery or pickup</li>
      </ol>
    </div>
  </div>

  <div class="footer">
    <p><strong>NearBuy - Shop Smart, Shop Local</strong></p>
    <p>This is an automated notification from the NearBuy platform</p>
    <p>For support, contact: support@nearbuy.com</p>
  </div>
</body>
</html>
```

### Step 4: Test the Template

Before saving, test the template with sample data:

```
store_name: ONE Bite
store_category: Restaurant
customer_name: John Doe
customer_email: john@example.com
customer_location: Hostel A, Room 123
order_items: Cheese Lover Pizza (Medium) x 1 @ Rs. 1,000 each = Rs. 1,000
Zinger Burger x 2 @ Rs. 400 each = Rs. 800
order_date: November 29, 2025, 09:30 PM
order_total: Rs. 1,800
```

---

## Store Email Addresses Setup

### Important: Add Store Email Addresses to Database

You need to add email addresses for each store in `db.js`:

```javascript
{
  id: 1,
  name: "Brookie",
  category: "Restaurant",
  whatsappNumber: "923018806666",
  email: "brookie@example.com",  // ADD THIS LINE
  imageUrl: "/assets/images/brookie/brookielogo.jpg"
},
{
  id: 2,
  name: "ONE Bite",
  category: "Restaurant",
  whatsappNumber: "923489331622",
  email: "onebite@example.com",  // ADD THIS LINE
  imageUrl: "/assets/images/onebite/onebite.jpg"
},
```

### Then Update emailService.js

In the `sendStoreEmail` function, modify it to send to the store's email:

```javascript
const response = await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.storeTemplateId,
    {
        ...templateParams,
        to_email: orderData.store.email  // Add this line
    }
);
```

---

## Features Added

### 1. ✅ Store Email Notifications
- Stores now receive instant email notifications for all orders
- Includes complete customer information and order details
- Professional, easy-to-read format

### 2. ✅ Welcome Modal
- First-time visitors see a detailed guide on how to use NearBuy
- Step-by-step ordering instructions
- Never shown again after dismissal (uses localStorage)
- Can be manually reset by clearing browser localStorage

### 3. ✅ Enhanced Footer
- Added NearBuy branding with logo
- Instagram social link with gradient button
- Hover effects on social links
- Professional copyright section

---

## Testing Checklist

### Test Order Flow:
1. ☐ Add items to cart from a store
2. ☐ Proceed to checkout
3. ☐ Fill in customer details
4. ☐ Submit order
5. ☐ Verify 3 emails are sent:
   - ☐ Customer confirmation email
   - ☐ Admin notification email
   - ☐ Store owner notification email ⭐ NEW
6. ☐ Verify WhatsApp redirect works
7. ☐ Check welcome modal appears on first visit
8. ☐ Verify welcome modal doesn't appear on subsequent visits
9. ☐ Test Instagram link in footer

---

## Troubleshooting

### Emails not being sent to store:
1. Check that the store has an email address in `db.js`
2. Verify the template ID is correct in `emailService.js`
3. Check EmailJS dashboard for error logs
4. Ensure `to_email` parameter is being passed correctly

### Welcome modal appears every time:
1. Clear browser localStorage
2. Check browser console for JavaScript errors
3. Verify the modal ID matches in HTML and JS

### Instagram link not working:
1. Update the Instagram URL in `index.html` footer
2. Replace `nearbuy.pk` with your actual Instagram handle

---

## Files Modified

1. **`js/emailService.js`**
   - Added `storeTemplateId` configuration
   - Created `sendStoreEmail()` function
   - Updated `sendOrderEmails()` to send 3 concurrent emails

2. **`index.html`**
   - Added welcome/instructions modal
   - Enhanced footer with branding
   - Added Instagram social link

3. **`js/app.js`**
   - Added `showWelcomeModal()` function
   - Integrated modal display on initialization
   - localStorage tracking for first-time visitors

---

## Contact & Support

For any issues or questions:
- Review the EmailJS documentation: https://www.emailjs.com/docs/
- Check browser console for errors
- Verify all template IDs and email addresses are correct

---

**Made with ❤️ for GIKI/Topi Community**
