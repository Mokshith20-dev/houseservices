import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

const LS = {
  get(key, fallback) {
    try {
      if (Platform.OS !== 'web') return fallback;
      const v = window.localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      if (Platform.OS === 'web') window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  },
};

// ---- hash routing: #/name or #/name/<encoded json params> ----
function parseHash() {
  if (Platform.OS !== 'web') return { name: 'home', params: {} };
  const h = (window.location.hash || '').replace(/^#\/?/, '');
  if (!h) return { name: 'home', params: {} };
  const [name, rest] = h.split('/');
  let params = {};
  if (rest) {
    try {
      params = JSON.parse(decodeURIComponent(rest));
    } catch (e) {}
  }
  return { name: name || 'home', params };
}

function toHash(name, params) {
  const has = params && Object.keys(params).length;
  return `#/${name}${has ? '/' + encodeURIComponent(JSON.stringify(params)) : ''}`;
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => LS.get('hs_user', null));
  const [city, setCityState] = useState(() => LS.get('hs_city', 'Hyderabad'));
  const [bookings, setBookings] = useState(() => LS.get('hs_bookings', []));
  const [route, setRoute] = useState(parseHash);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => LS.set('hs_user', user), [user]);
  useEffect(() => LS.set('hs_city', city), [city]);
  useEffect(() => LS.set('hs_bookings', bookings), [bookings]);

  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = useCallback((name, params = {}) => {
    if (Platform.OS === 'web') {
      const next = toHash(name, params);
      if (window.location.hash === next) setRoute({ name, params });
      else window.location.hash = next; // triggers hashchange
    } else {
      setRoute({ name, params });
    }
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const setCity = useCallback((c) => {
    setCityState(c);
    showToast(`City set to ${c}`);
  }, [showToast]);

  const login = useCallback((phone, name) => {
    setUser((u) => ({ phone, name: name || (u && u.name) || '', email: (u && u.email) || '', address: (u && u.address) || '' }));
  }, []);
  const logout = useCallback(() => setUser(null), []);
  const updateUser = useCallback((patch) => setUser((u) => ({ ...u, ...patch })), []);

  const addBooking = useCallback((b) => {
    const booking = { id: 'HS' + Date.now().toString().slice(-8), status: 'upcoming', createdAt: Date.now(), ...b };
    setBookings((list) => [booking, ...list]);
    return booking;
  }, []);
  const updateBooking = useCallback((id, patch) => {
    setBookings((list) => list.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }, []);

  const value = useMemo(
    () => ({
      user, login, logout, updateUser,
      city, setCity,
      bookings, addBooking, updateBooking,
      route, navigate,
      toast, showToast,
    }),
    [user, login, logout, updateUser, city, setCity, bookings, addBooking, updateBooking, route, navigate, toast, showToast]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
