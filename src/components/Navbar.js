import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { Container, useBreakpoint, Avatar } from './ui';
import { useApp } from '../store';
import { CITIES } from '../data';

export default function Navbar() {
  const { user, city, setCity, navigate, route, logout } = useApp();
  const { isMobile } = useBreakpoint();
  const [cityOpen, setCityOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (name, params) => {
    setMenuOpen(false);
    setCityOpen(false);
    navigate(name, params);
  };

  const NavLink = ({ label, to }) => (
    <Pressable onPress={() => go(to)} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
      <Text style={{ fontWeight: '700', color: route.name === to ? colors.primary : colors.text }}>{label}</Text>
    </Pressable>
  );

  return (
    <View style={[{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: colors.border, zIndex: 50 }, shadow]}>
      <Container style={{ flexDirection: 'row', alignItems: 'center', height: 62 }}>
        <Pressable onPress={() => go('home')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name="home-heart" size={20} color="#fff" />
          </View>
          <Text style={{ marginLeft: 8, fontSize: 20, fontWeight: '900', color: colors.primary }}>HouServices</Text>
        </Pressable>

        <Pressable
          onPress={() => setCityOpen((o) => !o)}
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 14, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: colors.primarySoft }}
        >
          <MaterialCommunityIcons name="map-marker" size={16} color={colors.primary} />
          <Text style={{ color: colors.primary, fontWeight: '700', marginHorizontal: 4, fontSize: 13 }}>{city}</Text>
          <MaterialCommunityIcons name="chevron-down" size={16} color={colors.primary} />
        </Pressable>

        <View style={{ flex: 1 }} />

        {isMobile ? (
          <Pressable onPress={() => setMenuOpen((o) => !o)} style={{ padding: 6 }}>
            <MaterialCommunityIcons name={menuOpen ? 'close' : 'menu'} size={26} color={colors.text} />
          </Pressable>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <NavLink label="Services" to="services" />
            <NavLink label="My Bookings" to="bookings" />
            <NavLink label="Become a Pro" to="become-pro" />
            <NavLink label="Help" to="help" />
            {user ? (
              <Pressable onPress={() => go('profile')} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                <Avatar name={user.name || user.phone} size={34} />
              </Pressable>
            ) : (
              <Pressable onPress={() => go('login')} style={{ marginLeft: 8, backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 9, borderRadius: radius.md }}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Login</Text>
              </Pressable>
            )}
          </View>
        )}
      </Container>

      {cityOpen ? (
        <View style={[{ position: 'absolute', top: 58, left: 16, backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: 6, width: 200, zIndex: 100 }, shadow]}>
          {CITIES.map((c) => (
            <Pressable
              key={c}
              onPress={() => { setCity(c); setCityOpen(false); }}
              style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: radius.sm, backgroundColor: c === city ? colors.primarySoft : 'transparent' }}
            >
              <Text style={{ fontWeight: c === city ? '800' : '500', color: c === city ? colors.primary : colors.text }}>{c}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      {isMobile && menuOpen ? (
        <View style={{ paddingHorizontal: 16, paddingBottom: 12, borderTopWidth: 1, borderTopColor: colors.border }}>
          {[['Services', 'services'], ['My Bookings', 'bookings'], ['Become a Pro', 'become-pro'], ['Help', 'help'], [user ? 'My Profile' : 'Login', user ? 'profile' : 'login']].map(([l, t]) => (
            <Pressable key={t} onPress={() => go(t)} style={{ paddingVertical: 12 }}>
              <Text style={{ fontWeight: '700', color: colors.text }}>{l}</Text>
            </Pressable>
          ))}
          {user ? (
            <Pressable onPress={() => { setMenuOpen(false); logout(); navigate('home'); }} style={{ paddingVertical: 12 }}>
              <Text style={{ fontWeight: '700', color: colors.danger }}>Logout</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
