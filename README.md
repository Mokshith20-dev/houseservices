# HouServices 🏠

A **frontend-only** website for booking household workers — plumbers, electricians, cleaners,
carpenters, AC repair, cooks, maids and more. Inspired by Urban Company and TaskRabbit.

Built with **React Native** (via Expo + react-native-web), so the same code runs as a website
in the browser (and could also run as a mobile app).

> College project — there is **no backend**. All data (services, workers) lives in `src/data.js`,
> and your login + bookings are saved in the browser's localStorage.

## Run it

```bash
npm install
npm run web
```

Then open http://localhost:8081

## Build for hosting

```bash
npm run build
```

This creates a `dist/` folder of plain HTML/JS — drag it into Netlify Drop
(https://app.netlify.com/drop) or deploy it on Vercel / GitHub Pages.

## Features

- Home page: hero search, 12 service categories, offers, most-booked services, how it works,
  top-rated professionals, testimonials
- City picker (Hyderabad, Bengaluru, Delhi NCR, Mumbai, Chennai, Pune)
- Search + filter by category + sort by price / rating / popularity
- Category, service-detail and professional-profile pages
- Login with phone number + OTP (**demo OTP is always `1234`**)
- Booking: choose service → professional (or auto-assign) → date → time slot → address →
  payment method → coupon (`FIRST20`, `HOME10`) → confirmation
- My Bookings: upcoming / completed / cancelled, cancel, mark done (demo), rate with stars, book again
- Profile editing, Become-a-Professional application form, Help/FAQ + contact form
- Responsive: desktop navbar, mobile hamburger menu; works in phone browsers
- Browser back/forward buttons work (hash-based routing)

## Project structure

```
App.js                    → layout (navbar + page + footer) and page switching
src/theme.js              → colours, radius, shadow
src/data.js               → categories, services, workers, offers, FAQs (the "database")
src/store.js              → global state (user, city, bookings) + router + localStorage
src/components/ui.js      → Button, Input, Card, Grid, Stars, Avatar, Chip…
src/components/Cards.js   → CategoryTile, ServiceCard, ServiceRow, WorkerCard
src/components/Navbar.js  → top navigation + city picker
src/components/Footer.js
src/components/ConfirmModal.js
src/screens/HomeScreen.js
src/screens/BrowseScreens.js   → all services/search, category, service, worker profile
src/screens/BookingScreen.js   → checkout flow
src/screens/BookingsScreens.js → success page + My Bookings
src/screens/AccountScreens.js  → login, profile, become a pro, help
```

## Tech

React Native 0.86 · Expo SDK 57 · react-native-web · @expo/vector-icons (MaterialCommunityIcons)

## Credits

Photos from [Unsplash](https://unsplash.com) (free to use under the Unsplash License).
Icons from Material Design Icons.
