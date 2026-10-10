// Entry point: navbar on top, the current page in the middle, footer at the bottom.
import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/store';
import { colors, radius, shadow } from './src/theme';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import HomeScreen from './src/screens/HomeScreen';
import { ServicesScreen, CategoryScreen, ServiceScreen, WorkerScreen } from './src/screens/BrowseScreens';
import BookingScreen from './src/screens/BookingScreen';
import { SuccessScreen, BookingsScreen } from './src/screens/BookingsScreens';
import { LoginScreen, ProfileScreen, BecomeProScreen, HelpScreen } from './src/screens/AccountScreens';

const PAGE_TITLES = {
  home: 'HouServices — Home services at your doorstep',
  services: 'All services · HouServices',
  search: 'Search · HouServices',
  category: 'Services · HouServices',
  service: 'Service details · HouServices',
  worker: 'Professional · HouServices',
  book: 'Book a service · HouServices',
  success: 'Booking confirmed · HouServices',
  bookings: 'My bookings · HouServices',
  login: 'Login · HouServices',
  profile: 'My profile · HouServices',
  'become-pro': 'Become a Professional · HouServices',
  help: 'Help & Support · HouServices',
};

// Picks which page component to show for the current route.
function Page({ route }) {
  const p = route.params || {};
  switch (route.name) {
    case 'services': return <ServicesScreen />;
    case 'search': return <ServicesScreen initialQuery={p.q || ''} />;
    case 'category': return <CategoryScreen id={p.id} />;
    case 'service': return <ServiceScreen id={p.id} />;
    case 'worker': return <WorkerScreen id={p.id} />;
    case 'book': return <BookingScreen service={p.service} worker={p.worker} />;
    case 'success': return <SuccessScreen id={p.id} />;
    case 'bookings': return <BookingsScreen />;
    case 'login': return <LoginScreen {...p} />;
    case 'profile': return <ProfileScreen />;
    case 'become-pro': return <BecomeProScreen />;
    case 'help': return <HelpScreen />;
    default: return <HomeScreen />;
  }
}

function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  const error = toast.type === 'error';
  return (
    <View style={styles.toastWrap} pointerEvents="none">
      <View style={[styles.toast, { backgroundColor: error ? colors.danger : '#111827' }]}>
        <MaterialCommunityIcons name={error ? 'alert-circle' : 'check-circle'} size={18} color={error ? '#fff' : '#34D399'} />
        <Text style={{ color: '#fff', marginLeft: 8, fontWeight: '600', flexShrink: 1 }}>{toast.message}</Text>
      </View>
    </View>
  );
}

function Shell() {
  const { route } = useApp();
  const scrollRef = useRef(null);

  // Scroll to top and update the browser tab title whenever the page changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    if (Platform.OS === 'web') document.title = PAGE_TITLES[route.name] || PAGE_TITLES.home;
  }, [route]);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar style="dark" />
      <Navbar />
      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {/* key=route forces a fresh page (fresh form state) on every navigation */}
        <View style={{ flexGrow: 1 }} key={JSON.stringify(route)}>
          <Page route={route} />
        </View>
        <Footer />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Shell />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  toastWrap: { position: 'absolute', bottom: 24, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 16 },
  toast: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 18, borderRadius: radius.md, maxWidth: 480, ...shadow },
});
