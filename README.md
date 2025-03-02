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

- **Frontend**: React (with Vite), TailwindCSS
- **Backend**: Pocketbase (single binary backend solution)
- **Calling API**: Plivo Browser SDK
- **Payments**: Stripe Elements
- **Deployment**: AWS (EC2, S3, CloudFront)

## 🏗️ Project Structure

```
callout/
├── frontend/                # React application
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── manifest.json    # PWA manifest
│   │   └── service-worker.js
│   │
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main application
│   │   └── main.jsx         # Entry point
│   │
│   ├── package.json
│   └── vite.config.js
│
├── pocketbase/              # Pocketbase configuration
│   ├── pb_migrations/       # Database migrations
│   ├── pb_hooks/            # Pocketbase hooks
│   └── .env.example         # Environment variables template
│
├── infrastructure/          # Deployment scripts
│   ├── aws/                 # AWS setup scripts
│   ├── docker/              # Docker configurations
│   └── ci/                  # CI/CD pipeline configs
│
├── docs/                    # Documentation
│   ├── api/                 # API documentation
│   ├── development/         # Development guides
│   └── deployment/          # Deployment guides
│
├── LICENSE
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Pocketbase binary (included in releases)
- Plivo account with API credentials
- Stripe account for payment processing

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/your-username/callout.git
cd callout
```

2. **Set up environment variables**

```bash
cp pocketbase/.env.example pocketbase/.env
# Edit .env file with your configuration
```

3. **Start Pocketbase**

```bash
cd pocketbase
./pocketbase serve
```

Pocketbase will be available at <http://localhost:8090> with the admin UI at <http://localhost:8090/_/>

4. **Install frontend dependencies**

```bash
cd frontend
npm install
```

5. **Start the frontend development server**

```bash
npm run dev
```

The application will be available at <http://localhost:5173>

### Initial Configuration

1. **Set up Pocketbase collections**

   - Navigate to <http://localhost:8090/_/> and create an admin account
   - Import the collection schemas from `pocketbase/pb_migrations`
   - Configure authentication providers under Settings

2. **Configure Plivo credentials**

   - Add your Plivo App ID and credentials to the environment variables
   - Test calling functionality with a test number

3. **Set up Stripe**

   - Add Stripe API keys to environment variables
   - Configure webhook endpoints for payment notifications

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm test

# Run end-to-end tests
npm run test:e2e
```

## 🚢 Deployment

### Pocketbase Deployment

1. **Prepare EC2 instance**

```bash
# Use the setup script
./infrastructure/aws/setup_ec2.sh
```

2. **Deploy Pocketbase**

```bash
# Deploy using the deployment script
./infrastructure/aws/deploy_pocketbase.sh
```

### Frontend Deployment

1. **Build the frontend**

```bash
cd frontend
npm run build
```

2. **Deploy to S3/CloudFront**

```bash
# Use the deployment script
./infrastructure/aws/deploy_frontend.sh
```

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
