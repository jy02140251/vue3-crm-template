# Vue 3 CRM Template

A modern CRM (Customer Relationship Management) template built with **Vue 3**, **TypeScript**, **Pinia**, and **Vue Router**. Features a responsive dashboard, customer management, and analytics views.

## Features

- **Vue 3 Composition API** with TypeScript
- **Pinia** for type-safe state management
- **Vue Router** with route guards
- **Responsive Dashboard** with statistics cards and charts
- **Customer Management**: CRUD operations with search and filtering
- **Customer Detail View**: Contact info, activity timeline, notes
- **API Integration**: Axios-based REST API client
- **Vite** for fast development and optimized builds

## Quick Start

```bash
git clone https://github.com/jy02140251/vue3-crm-template.git
cd vue3-crm-template
npm install
npm run dev
```

Visit `http://localhost:5173` to see the application.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
vue3-crm-template/
├── src/
│   ├── main.ts               # Application entry point
│   ├── App.vue                # Root component
│   ├── router/index.ts        # Route definitions
│   ├── stores/customer.ts     # Pinia customer store
│   ├── views/
│   │   ├── Dashboard.vue      # Dashboard with stats
│   │   ├── CustomerList.vue   # Customer list with search
│   │   └── CustomerDetail.vue # Customer detail view
│   ├── components/
│   │   └── StatsCard.vue      # Reusable statistics card
│   ├── api/customer.ts        # API client
│   └── types/index.ts         # TypeScript interfaces
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## License

MIT License