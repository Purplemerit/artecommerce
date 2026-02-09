# Complete Production Setup Guide

## ✅ What's Been Implemented

### 1. **Prisma ORM Integration**
- Complete database schema with all e-commerce models
- Type-safe database queries
- Automatic migrations

### 2. **Authentication System**
- JWT-based authentication with HTTP-only cookies
- Bcrypt password hashing
- Role-based access control (Admin/User)
- Session management

### 3. **API Routes Created**
- `/api/auth/signup` - User registration
- `/api/auth/login` - User login with JWT
- `/api/auth/session` - Check current session
- `/api/auth/logout` - Logout and clear session
- `/api/products` - GET all products, POST create product (admin)
- `/api/products/[id]` - GET/PUT/DELETE single product (admin)

### 4. **Database Models**
- Users (with roles)
- Products (full e-commerce fields)
- Orders (with payment tracking)
- OrderItems
- Cart
- Wishlist

---

## 🚀 Setup Instructions

### Step 1: Verify Database URL

Your `.env.local` already has the correct DATABASE_URL:
```
DATABASE_URL="postgresql://postgres.hdqywcbzfubgnfjnsbei:Ha@100929945@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
```

### Step 2: Push Database Schema

Run this command to create all tables in your PostgreSQL database:

```bash
npx prisma db push
```

This will create:
- `users` table
- `products` table
- `orders` table
- `order_items` table
- `cart` table
- `wishlist` table

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

This generates the type-safe Prisma Client for database queries.

### Step 4: Seed Initial Data (Optional)

Create an admin user and some products:

```bash
npx prisma studio
```

Then manually add:
1. **Admin User**:
   - Email: `admin@art.com`
   - Password: (hashed) - Use signup API
   - Role: `ADMIN`

2. **Sample Products** (or use the admin panel after login)

### Step 5: Restart Development Server

```bash
npm run dev
```

---

## 🧪 Testing the System

### 1. Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@art.com",
    "password": "admin123!",
    "name": "Admin User"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@art.com",
    "password": "admin123!"
  }'
```

### 3. Test Get Products
```bash
curl http://localhost:3000/api/products
```

---

## 📁 File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts       # Login endpoint
│   │   ├── signup/route.ts      # Signup endpoint
│   │   ├── session/route.ts     # Session check
│   │   └── logout/route.ts      # Logout endpoint
│   └── products/
│       ├── route.ts             # List/Create products
│       └── [id]/route.ts        # Get/Update/Delete product
├── context/
│   └── AuthContext.tsx          # Auth state management
lib/
├── prisma.ts                    # Prisma client singleton
└── supabase.ts                  # (Can be removed if using Prisma only)
prisma/
└── schema.prisma                # Database schema
```

---

## 🔐 Security Features

✅ **Password Security**
- Bcrypt hashing with salt rounds
- Never store plain text passwords

✅ **JWT Tokens**
- HTTP-only cookies (XSS protection)
- 7-day expiration
- Secure in production

✅ **Role-Based Access**
- Admin-only routes protected
- User-specific data isolation

✅ **SQL Injection Protection**
- Prisma ORM prevents SQL injection
- Parameterized queries

---

## 🎯 What Works Now

### Authentication
- ✅ User signup with automatic role assignment
- ✅ Login with JWT token generation
- ✅ Session persistence across page reloads
- ✅ Secure logout
- ✅ Admin detection (`admin@art.com` gets ADMIN role)

### Products
- ✅ List all products (public)
- ✅ Create product (admin only)
- ✅ Update product (admin only)
- ✅ Delete product (admin only)
- ✅ Get single product (public)

### Database
- ✅ PostgreSQL with Prisma ORM
- ✅ Type-safe queries
- ✅ Automatic timestamps
- ✅ Cascade deletes
- ✅ Unique constraints

---

## 🔧 Troubleshooting

### "Environment variable not found: DATABASE_URL"
**Solution**: Make sure `.env.local` exists and contains DATABASE_URL

### "Can't reach database server"
**Solution**: 
1. Check your internet connection
2. Verify the database password in DATABASE_URL
3. Make sure Supabase project is active

### "Prisma Client not generated"
**Solution**: Run `npx prisma generate`

### "Invalid token" errors
**Solution**: 
1. Clear browser cookies
2. Login again
3. Check JWT_SECRET is set in .env.local

---

## 📊 Database Schema Overview

```prisma
User
├── id (UUID)
├── email (unique)
├── password (hashed)
├── role (ADMIN | USER)
└── Relations: orders, cart, wishlist

Product
├── id (auto-increment)
├── name
├── price
├── images (array)
├── category
└── Relations: orderItems, cartItems, wishlistItems

Order
├── id (UUID)
├── userId
├── total
├── status (PENDING | PAID | SHIPPED | DELIVERED | CANCELLED)
├── paymentStatus
└── Relations: user, items

Cart
├── userId
├── productId
├── quantity
└── Relations: user, product

Wishlist
├── userId
├── productId
└── Relations: user, product
```

---

## 🚀 Next Steps

1. **Run Database Migration**:
   ```bash
   npx prisma db push
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Create Admin Account**:
   - Use signup page with `admin@art.com`
   - Or use API directly

4. **Test Admin Panel**:
   - Login as admin
   - Access `/admin` route
   - Create/Edit/Delete products

5. **Update ProductContext** (if needed):
   - Replace localStorage with API calls
   - Use `/api/products` endpoints

---

## 💡 Production Checklist

Before deploying:

- [ ] Change JWT_SECRET to a strong random string
- [ ] Set secure environment variables in hosting platform
- [ ] Enable HTTPS (JWT cookies require secure in production)
- [ ] Set up database backups
- [ ] Configure CORS if needed
- [ ] Add rate limiting to API routes
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure email service for password resets
- [ ] Add input validation middleware
- [ ] Set up CI/CD pipeline

---

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure database connection is working
4. Check Prisma schema matches database

**Common Commands**:
```bash
# View database in browser
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Check database connection
npx prisma db pull

# Format schema file
npx prisma format
```
