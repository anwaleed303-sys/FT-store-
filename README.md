# FT Shop - Premium Grocery Store

A complete Next.js TypeScript grocery e-commerce website with customer and admin portals.

## 🎨 Design Features

- **Beautiful Gradient Theme**: Uses the specified gradient `linear-gradient(135deg, #0066FF, #00D4B1)`
- **Modern UI**: Built with Ant Design components
- **Responsive Layout**: Works on all devices
- **Animated Elements**: Smooth transitions and hover effects

## 📁 Project Structure

```
src/
├── components/
│   └── Layout.tsx                 # Main layout with header and footer
├── pages/
│   ├── _app.tsx                  # App wrapper with theme configuration
│   ├── index.tsx                 # Main homepage with products
│   ├── login.tsx                 # Login page (customer/admin)
│   ├── register.tsx              # Registration page (customer/admin)
│   ├── customer/
│   │   ├── products.tsx          # Customer products page with cart
│   │   └── checkout.tsx          # Checkout page with PDF generation
│   ├── admin/
│   │   └── dashboard.tsx         # Admin dashboard to manage products
│   └── api/
│       ├── auth/
│       │   ├── login.ts          # Login API endpoint
│       │   └── register.ts       # Registration API endpoint
│       ├── products/
│       │   ├── index.ts          # Get all products
│       │   ├── create.ts         # Create product (admin)
│       │   └── [id].ts           # Update/Delete product (admin)
│       └── orders/
│           └── create.ts         # Create order
├── lib/
│   ├── db.ts                     # Database operations (already exists)
│   ├── mongodb.ts                # MongoDB connection (already exists)
│   └── auth.ts                   # JWT and password utilities (already exists)
├── types/
│   └── index.ts                  # TypeScript type definitions
├── utils/
│   ├── constants.ts              # Mock products data
│   └── cartHelpers.ts            # Cart localStorage helpers
└── styles/
    └── globals.css               # Global CSS styles
```

## 🚀 Setup Instructions

1. **Copy Files to Your Project**:

   - Copy all files from the `src` folder to your project's `src` folder
   - Copy `.env.local` to your project root

2. **Install Required Dependencies** (if not already installed):

   ```bash
   npm install jspdf
   ```

3. **Environment Variables**:
   Your `.env.local` file is already configured with:

   - MongoDB connection string
   - JWT secret
   - Database name

4. **Start Development Server**:

   ```bash
   npm run dev
   ```

5. **Access the Application**:
   - Main Page: `http://localhost:3000`
   - Login: `http://localhost:3000/login`
   - Register: `http://localhost:3000/register`

## 👥 User Roles

### Customer

- View all products on main page
- Search and filter products
- Add products to cart
- Place orders
- Generate PDF bill with JazzCash payment details

### Admin

- View all products in dashboard
- Add new products with details
- Edit existing products
- Delete products
- View product statistics

## 🔑 Key Features

### Main Page (`/`)

- Moving carousel with product introductions
- Search bar for filtering products
- Product cards with images, prices, and stock info
- Click product → redirects to login if not authenticated

### Customer Portal

- **Products Page**: Browse all products, add to cart
- **Cart Drawer**: View cart, update quantities, remove items
- **Checkout Page**: Review order, see total, place order
- **PDF Generation**: Automatically generates bill with:
  - Order details
  - Customer information
  - JazzCash payment details (03056248720 - Waleed Ali Nawazish)
  - Item breakdown with prices

### Admin Portal

- **Dashboard Statistics**: Total products, in-stock, low-stock counts
- **Product Table**: View all products in organized table
- **Add Product Modal**: Form to add new products
- **Edit/Delete**: Manage existing products

## 💳 Payment Information

The system generates PDF bills with JazzCash payment details:

- **Number**: 03056248720
- **Name**: Waleed Ali Nawazish

Customers can download the PDF and make local mobile payments.

## 🎨 UI Highlights

1. **Gradient Theme**: All buttons and accents use the blue-to-teal gradient
2. **Hover Effects**: Cards lift and change border colors on hover
3. **Smooth Animations**: Floating background elements, fade-ins
4. **Responsive Design**: Works on mobile, tablet, and desktop
5. **Professional Typography**: Clean, readable fonts throughout

## 📱 Pages Overview

### `/` - Main Homepage

- Hero carousel with 4 slides
- Search functionality
- Grid of product cards
- Login required to view details

### `/login` - Login Page

- Role selection (Customer/Admin)
- Email and password fields
- Beautiful gradient background
- Animated floating elements

### `/register` - Registration Page

- Role selection (Customer/Admin)
- Full registration form
- Phone and address fields
- Validation and error handling

### `/customer/products` - Customer Products

- All products displayed
- Shopping cart in drawer
- Add/remove items
- Quantity controls
- Cart persists in localStorage

### `/customer/checkout` - Checkout

- Order summary
- Total calculation
- Payment instructions
- PDF bill generation
- Order success page

### `/admin/dashboard` - Admin Dashboard

- Product statistics cards
- Full product table
- Add/Edit/Delete products
- Category and unit selection
- Image URL input

## 🔒 Authentication

- JWT-based authentication
- Passwords hashed with bcrypt
- Role-based access control
- Protected routes for customer/admin

## 📊 Database Collections

1. **users**: User accounts (customer/admin)
2. **products**: Product catalog
3. **orders**: Customer orders

## 🎯 Next Steps (Optional Enhancements)

1. Add payment gateway integration
2. Implement order tracking
3. Add product reviews
4. Email notifications
5. Admin order management
6. Product image upload to cloud storage

## 📝 Notes

- All products initially loaded from mock data in `constants.ts`
- Cart data stored in localStorage
- PDF generation uses jsPDF library
- Admin can only see products, not customer bills (as per requirements)

## 🐛 Troubleshooting

If you encounter issues:

1. **MongoDB Connection**: Verify your connection string in `.env.local`
2. **Port Conflicts**: Change port if 3000 is busy
3. **Dependencies**: Run `npm install` to ensure all packages are installed
4. **Build Errors**: Clear `.next` folder and rebuild

## 📞 Support

For issues or questions, refer to the Next.js and Ant Design documentation.

---

**Built with ❤️ using Next.js, TypeScript, and Ant Design**
