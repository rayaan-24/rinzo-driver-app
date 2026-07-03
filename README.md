# Rinzo Driver App

A React Native driver application for managing pickups and deliveries, built with React Native 0.86 and Expo SDK 57.

## Tech Stack

- **Framework:** React Native 0.86
- **Expo SDK:** 57
- **Language:** TypeScript
- **Navigation:** Custom root navigator with animated tab transitions
- **Camera/Scanner:** `expo-camera` for QR scanning
- **Image Picker:** `expo-image-picker` for photo uploads
- **Maps:** Static map previews for pickup/delivery locations

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
