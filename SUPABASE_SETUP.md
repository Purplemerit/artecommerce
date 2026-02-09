# Supabase Database Setup Instructions

## Prerequisites
- Supabase account (https://supabase.com)
- PostgreSQL database URL provided

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 2: Update Environment Variables

Update your `.env.local` file with the actual values:

```env
# Replace YOUR_SUPABASE_ANON_KEY with the actual anon key from Supabase
NEXT_PUBLIC_SUPABASE_URL="https://hdqywcbzfubgnfjnsbei.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your_actual_anon_key_here"

# Replace [YOUR-PASSWORD] with your actual database password
DATABASE_URL="postgresql://postgres.hdqywcbzfubgnfjnsbei:[YOUR-PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
```

## Step 3: Run the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `supabase/schema.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the schema

This will create:
- All necessary tables (users, products, orders, cart, wishlist)
- Row Level Security (RLS) policies
- Indexes for performance
- Triggers for automatic timestamps
- Auto-creation of user profiles on signup

## Step 4: Create Admin User

After running the schema, you need to create the admin user:

### Option A: Through Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter:
   - Email: `admin@art.com`
   - Password: `admin` (or your preferred password)
   - Auto Confirm User: **Yes**
4. Click **Create User**

### Option B: Through SQL
Run this in the SQL Editor:

```sql
-- This will be done automatically when you sign up through the app
-- The trigger will detect admin@art.com and assign admin role
```

## Step 5: Seed Initial Products (Optional)

To add some initial products to your database, run this in SQL Editor:

```sql
INSERT INTO products (name, description, price, old_price, images, category, type, quantity, sku) VALUES
('Abstract Canvas Print', 'Modern abstract art piece perfect for contemporary spaces', 89.99, 119.99, ARRAY['/images/unsplash_nimElTcTNyY.png'], 'Painting', 'Physical', 50, 'ART-001'),
('Minimalist Line Drawing', 'Elegant minimalist artwork with clean lines', 59.99, 79.99, ARRAY['/images/unsplash_nimElTcTNyY.png'], 'Drawing', 'Physical', 30, 'ART-002'),
('Vintage Landscape', 'Classic landscape painting reproduction', 129.99, 159.99, ARRAY['/images/unsplash_nimElTcTNyY.png'], 'Painting', 'Physical', 20, 'ART-003'),
('Modern Sculpture Print', 'Contemporary sculpture photography', 79.99, 99.99, ARRAY['/images/unsplash_nimElTcTNyY.png'], 'Print', 'Physical', 40, 'ART-004');
```

## Step 6: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Try to sign up with a new account
3. Try to login with the admin account (`admin@art.com`)
4. Verify that the "Admin Panel" button appears in the navbar
5. Test adding products through the admin panel

## Features Enabled

✅ **Authentication**
- Secure user signup and login
- Email verification
- Password reset (can be configured)
- Session management

✅ **User Profiles**
- Automatic profile creation on signup
- Role-based access (admin/user)
- Real-time session updates

✅ **Products**
- Full CRUD operations
- Admin-only write access
- Public read access
- Image storage support

✅ **Orders**
- User order history
- Admin order management
- Payment tracking (Razorpay integration ready)

✅ **Cart & Wishlist**
- Per-user cart items
- Persistent across sessions
- Real-time updates

✅ **Security**
- Row Level Security (RLS) enabled
- Admin-only routes protected
- Secure password hashing
- SQL injection protection

## Troubleshooting

### "Invalid API key" error
- Make sure you copied the **anon/public** key, not the service_role key
- Verify the key starts with `eyJ`

### "relation does not exist" error
- The schema hasn't been run yet
- Go to SQL Editor and run the schema.sql file

### Admin panel not showing
- Make sure you're logged in with `admin@art.com`
- Check that the user's role is set to 'admin' in the database
- Clear browser cache and localStorage

### Products not showing
- Check if products exist in the database
- Run the seed SQL to add sample products
- Verify RLS policies are set correctly

## Next Steps

1. **Configure Email**: Set up email templates in Supabase for verification emails
2. **Add Storage**: Configure Supabase Storage for product images
3. **Payment Integration**: Complete Razorpay integration for live payments
4. **Deploy**: Deploy to Vercel/Netlify with environment variables

## Support

If you encounter any issues:
1. Check Supabase logs in the dashboard
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure the database schema was executed successfully
