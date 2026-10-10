import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '../theme';
import { Container, useBreakpoint } from './ui';
import { useApp } from '../store';
import { categories } from '../data';

export default function Footer() {
  const { navigate } = useApp();
  const { isMobile } = useBreakpoint();
  const Link = ({ label, onPress }) => (
    <Pressable onPress={onPress} style={{ paddingVertical: 4 }}>
      <Text style={{ color: '#CBD5E1' }}>{label}</Text>
    </Pressable>
  );
  const Col = ({ title, children }) => (
    <View style={{ flex: 1, minWidth: isMobile ? '45%' : 0, marginBottom: 20 }}>
      <Text style={{ color: '#fff', fontWeight: '800', marginBottom: 8 }}>{title}</Text>
      {children}
    </View>
  );
  return (
    <View style={{ backgroundColor: '#0B1F1E', marginTop: 30, paddingTop: 30 }}>
      <Container>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ flex: 2, minWidth: isMobile ? '100%' : 240, marginBottom: 20, paddingRight: 20 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '900' }}>HouServices</Text>
            <Text style={{ color: '#94A3B8', marginTop: 8, lineHeight: 20 }}>
              Book trusted, verified household service professionals in minutes.
            </Text>
          </View>
          <Col title="Services">
            {categories.slice(0, 5).map((c) => (
              <Link key={c.id} label={c.name} onPress={() => navigate('category', { id: c.id })} />
            ))}
          </Col>
          <Col title="Company">
            <Link label="Become a Pro" onPress={() => navigate('become-pro')} />
            <Link label="Help & FAQ" onPress={() => navigate('help')} />
            <Link label="My Bookings" onPress={() => navigate('bookings')} />
          </Col>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: '#1E3A38', paddingVertical: 16 }}>
          <Text style={{ color: '#64748B', fontSize: 12 }}>© {new Date().getFullYear()} HouServices. Demo project — no real bookings are made.</Text>
        </View>
      </Container>
    </View>
  );
}
