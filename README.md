# Halal Dinner Club

A full-stack social dining platform for the Muslim community to discover, join, and host halal dining events.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Email:** Resend
- **Maps:** Leaflet
- **Animations:** Framer Motion

## Features

- **User Roles:** Guest, Member, Host, Admin
- **Subscription Tiers:** Free (£0), Member (£1.99/mo), Host (£2.99/mo)
- **Event Types:** Dinners, Breakfasts, Brunches, Lunches
- **Themes:** Eid, Ramadan, Singles, Networking, Family, Professional, Social, Charity
- **Singles Events:** Age-restricted, gender-specific matching
- **Waitlist System:** Automatic promotion when spots open
- **Email Notifications:** RSVP confirmations, reminders, updates
- **Host Dashboard:** Create, manage, and message attendees
- **Admin Dashboard:** Moderation and analytics

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- Stripe account
- Resend account (for emails)
- Google OAuth credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/halal-dinner-club.git
cd halal-dinner-club
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/halaldinnerclub"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_MEMBER="price_..."
STRIPE_PRICE_HOST="price_..."
RESEND_API_KEY="re_..."
```

### Database Setup

1. Generate Prisma client:
```bash
npx prisma generate
```

2. Run database migrations:
```bash
npx prisma migrate dev --name init
```

3. Seed the database with demo data:
```bash
npx prisma db seed
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Stripe Setup

1. Create products in Stripe Dashboard:
   - Member Subscription: £1.99/month
   - Host Subscription: £2.99/month

2. Copy the price IDs to your `.env.local`:
```env
STRIPE_PRICE_MEMBER="price_xxxxx"
STRIPE_PRICE_HOST="price_xxxxx"
```

3. Set up Stripe Webhook for local development:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Vercel Deployment

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. Connect to Vercel:
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy

3. Set up Stripe webhooks in production:
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

4. Set up Vercel Cron:
   - The `vercel.json` already includes the cron schedule
   - Add `CRON_SECRET` environment variable for securing the cron endpoint

## Project Structure

```
halal-dinner-club/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Demo data
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── (marketing)/    # Landing pages
│   │   └── (dashboard)/    # App pages
│   ├── components/         # React components
│   │   ├── landing/        # Landing page sections
│   │   ├── ui/             # UI components
│   │   └── ...
│   ├── lib/                # Utilities
│   │   ├── prisma.ts       # Database client
│   │   ├── auth.ts         # NextAuth config
│   │   ├── stripe.ts       # Stripe config
│   │   └── resend.ts       # Email config
│   └── types/              # TypeScript types
└── ...
```

## Demo Accounts

After seeding, these accounts are available:

| Email | Password | Role |
|-------|----------|------|
| admin@halaldinner.club | password123 | Admin |
| sarah.host@example.com | password123 | Host |
| ahmed.host@example.com | password123 | Host |
| fatima.host@example.com | password123 | Host |
| omar.member@example.com | password123 | Member |
| aisha.member@example.com | password123 | Member |
| yusuf.member@example.com | password123 | Member |
| maryam.member@example.com | password123 | Member |
| guest@example.com | password123 | Guest |

## API Routes

- `POST /api/auth/[...nextauth]` - Authentication
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/portal` - Customer portal
- `POST /api/webhooks/stripe` - Stripe webhooks
- `GET /api/events` - List events
- `POST /api/events` - Create event (Host only)
- `POST /api/rsvp` - RSVP to event
- `GET /api/cron/reminders` - Send reminder emails

## License

MIT License - feel free to use this for your own projects!

## Support

For questions or support, please open an issue on GitHub.