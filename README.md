# Rinzo Delivery Laundry App

## Overview

**Rinzo Delivery Laundry App** is a modern on-demand laundry service application that simplifies the entire laundry process. Customers can schedule doorstep pickup and delivery, choose from multiple laundry services, track their orders in real time, and make secure online payments—all from a seamless mobile experience.

## Features

* 🧺 Doorstep laundry pickup and delivery
* 📅 Easy scheduling of pickup and delivery slots
* 👕 Multiple services (Wash, Iron, Dry Clean, Fold, etc.)
* 📍 Real-time order tracking
* 🔔 Push notifications for order updates
* 💳 Secure online payment integration
* 📜 Order history and invoice management
* 👤 User profile and address management
* ⭐ Ratings and feedback system
* 🌙 Clean, responsive, and intuitive UI

## Tech Stack

* **Framework:** React Native (Expo)
* **Language:** TypeScript
* **Navigation:** Custom root navigator with animated tab transitions
* **Camera/Scanner:** `expo-camera` for QR scanning
* **Image Picker:** `expo-image-picker` for photo uploads
* **Maps:** Static map previews for pickup/delivery locations
* **State Management:** Context API
* **Backend:** REST APIs
* **Authentication:** OTP / JWT

## Project Goal

The objective of the Rinzo Delivery Laundry App is to provide customers with a fast, reliable, and hassle-free laundry service by digitizing the booking, tracking, payment, and delivery workflow while ensuring a premium user experience.

## Highlights

* Modern and responsive UI/UX
* Smooth animations and optimized performance
* Scalable architecture
* Clean and maintainable codebase
* Secure authentication and payment flow
* Real-time order status updates
* Cross-platform support for Android and iOS

## Project Structure

```
src/
├── components/         # Shared UI components (Header, BottomTabBar, OrderCard, StatsCard, etc.)
├── screens/            # Screen components
│   ├── Alerts/         # Alert notifications screen
│   ├── Auth/           # Authentication screens (Login, OTP, Signup, etc.)
│   ├── Home/           # Home screen with pickup/delivery order cards
│   ├── Onboarding/     # Onboarding flow (3 screens)
│   ├── OrderHistory/   # Order history screen
│   ├── Performance/    # Performance insights screen
│   ├── Pickup/         # Pickup flow screens (transit, verification, QR, etc.)
│   ├── Profile/        # Profile, settings, documents, bank details
│   └── Splash/         # Splash screen
├── navigation/         # Navigation setup (RootNavigator)
├── data/               # Mock data and types
├── theme/              # Design tokens (colors, typography, spacing, shadows)
└── utils/              # Responsive scaling utilities
```

## Screens & Flow

### Auth / Onboarding
- Splash → Onboarding (3 screens) → Allow Location → Login (Phone or Email) → OTP Verification → Main

### Main App (after auth)
- **Home:** Stats cards, online/offline toggle, pickup & delivery order cards
- **History:** Past order history
- **Alerts:** Filterable notifications (Route, Earnings, System)
- **Profile:** Driver profile, personal info, vehicle info, documents, bank details, settings

### Pickup & Delivery Flow
- Order Card → Pickup Details → Order Transit → Pickup Active → Item Verification → Verify Pickup → Order Collected → Generate QR → Label Preview → Franchise Intake → QR Scanner → Collection Complete → Order Complete

## Getting Started

### Prerequisites
- Node.js 18+
- Android Studio / Xcode
- React Native CLI

### Install dependencies

```sh
npm install
```

### Start Metro

```sh
npm start
```

### Run on Android

```sh
npm run android
```

### Run on iOS

```sh
npm run ios
```

## Key Dependencies

| Package | Version |
|---------|---------|
| react-native | 0.86.0 |
| expo | ~57.0.2 |
| expo-camera | ~57.0.0 |
| expo-image-picker | ~57.0.2 |
| react-native-safe-area-context | ~5.7.0 |
| react-native-svg | 15.15.4 |
| react-native-qrcode-svg | ^6.3.21 |
