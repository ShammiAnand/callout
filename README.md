# CallOut - International Calling Service

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

CallOut is a Progressive Web App for making affordable international calls directly from your browser. Built to fill the gap left by Skype's shutdown, CallOut provides a simple, credit-based system for calling international phone numbers without the excessive rates charged by mobile carriers.

## 🌟 Features

- **Browser-Based Calling**: Make international calls directly from any modern browser
- **Affordable Rates**: Transparent country-based pricing with volume discounts
- **Progressive Web App**: Install on desktop or mobile for app-like experience
- **Offline Support**: Access contacts and call history without internet
- **User Authentication**: Secure account management with social login options
- **Credit System**: Purchase credits and track usage with detailed history

## 🚀 Tech Stack

- **Frontend**: React (with Vite), TypeScript, TailwindCSS, Shadcn UI
- **Backend**: Pocketbase (single binary backend solution)
- **Calling API**: Plivo Browser SDK
- **Payments**: Stripe Elements
- **Deployment**: AWS (EC2, S3, CloudFront)

## 🏗️ Project Structure

```
callout/
├── pocketbase/           # PocketBase executable and schema
├── public/               # Public assets
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   └── ui/           # UI components (Shadcn)
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   ├── index.css         # Global styles
│   └── main.tsx          # Entry point
├── .env                  # Environment variables
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Pocketbase binary (included in the repository)
- Plivo account with API credentials
- Stripe account for payment processing

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/your-username/callout.git
cd callout
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up PocketBase schema**

```bash
# Import the schema into PocketBase
npm run pb:import
```

4. **Start the development servers**

```bash
# Start both PocketBase and Vite servers
npm run dev:all
```

The application will be available at <http://localhost:5173>
PocketBase admin UI will be available at <http://localhost:8090/_/>

### Initial Configuration

1. **Set up Pocketbase collections**

   - Navigate to <http://localhost:8090/_/> and create an admin account
   - The schema should already be imported, but you can verify the collections

2. **Configure Plivo credentials**

   - Add your Plivo App ID and credentials to the .env file
   - Test calling functionality with a test number

3. **Set up Stripe**

   - Add Stripe API keys to the .env file
   - Configure webhook endpoints for payment notifications

## 💳 Credit System

Credits work as follows:

- Purchase packages: 100 credits ($10), 300 credits ($25), or 700 credits ($50)
- Rates vary by country (1-8 credits per minute)
- Credit balance updates in real-time during calls
- Transaction history available in user dashboard

## 📞 Calling Architecture

CallOut uses Plivo's Browser SDK to handle WebRTC calls:

1. User initiates call through the interface
2. System checks for sufficient credits
3. Plivo SDK establishes connection
4. Credit counter updates throughout call duration
5. Call details saved to history after completion

## 🔒 Security

- JWT authentication with Pocketbase
- HTTPS enforced for all connections
- Secure storage of API credentials in environment variables
- Regular security updates and dependency audits
- Data encryption at rest and in transit

## 📱 PWA Features

- Install prompts on compatible browsers
- Offline access to contacts and call history
- Push notifications for important events
- Background synchronization when connection restored

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📊 Roadmap

- **Phase 1 (MVP)**: Basic calling, credit system, user accounts
- **Phase 2**: Enhanced UI, contact management, call quality improvements
- **Phase 3**: Business accounts, subscriptions, additional features

## 🌐 APIs and Services

- **Plivo**: Powers the calling functionality
- **Stripe**: Handles credit purchases and subscription management
- **AWS**: Hosts the application infrastructure
- **Pocketbase**: Provides authentication, database, and API services

## 📫 Contact

For support or inquiries, please contact <support@callout-app.com>
