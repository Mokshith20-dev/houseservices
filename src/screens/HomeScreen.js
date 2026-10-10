import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ImageBackground, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container, Section, Grid, Card, Stars, Avatar, Button, useBreakpoint } from '../components/ui';
import { CategoryTile, ServiceCard, WorkerCard } from '../components/Cards';
import { useApp } from '../store';
import { categories, services, workers, offers, howItWorks, testimonials } from '../data';

export default function HomeScreen() {
  const { navigate, city, showToast } = useApp();
  const { isMobile } = useBreakpoint();
  const [q, setQ] = useState('');
  const search = () => navigate('search', { q: q.trim() });
  const popular = [...services].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const top = [...workers].sort((a, b) => b.rating - a.rating || b.jobs - a.jobs).slice(0, 6);

  return (
    <View>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=70' }}
        style={{ backgroundColor: colors.primary }}
      >
        <View style={{ backgroundColor: 'rgba(8,60,56,0.82)', paddingVertical: isMobile ? 40 : 70 }}>
          <Container>
            <Text style={{ color: '#fff', fontSize: isMobile ? 30 : 46, fontWeight: '900', maxWidth: 640, lineHeight: isMobile ? 36 : 54 }}>
              Home services, at your doorstep
            </Text>
            <Text style={{ color: '#CFE9E6', fontSize: 16, marginTop: 10, maxWidth: 520 }}>
              Verified professionals for cleaning, repairs, beauty and more in {city}.
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 24, maxWidth: 620, backgroundColor: '#fff', borderRadius: radius.md, padding: 6, alignItems: 'center' }}>
              <MaterialCommunityIcons name="magnify" size={22} color={colors.muted} style={{ marginHorizontal: 8 }} />
              <TextInput
                value={q}
                onChangeText={setQ}
                onSubmitEditing={search}
                placeholder="Search 'AC repair', 'cleaning'…"
                placeholderTextColor="#9CA3AF"
                style={{ flex: 1, fontSize: 15, paddingVertical: 10, outlineStyle: 'none', color: colors.text }}
              />
              <Button title="Search" onPress={search} small />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 }}>
              {['AC Service', 'Deep Cleaning', 'Plumber', 'Electrician'].map((t) => (
                <Pressable key={t} onPress={() => navigate('search', { q: t })} style={{ marginRight: 8, marginBottom: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, backgroundColor: 'rgba(255,255,255,0.18)' }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>{t}</Text>
                </Pressable>
              ))}
            </View>
          </Container>
        </View>
      </ImageBackground>

      <Section title="What are you looking for?" subtitle="12 categories, one app">
        <Grid cols={{ mobile: 3, tablet: 4, desktop: 6 }} gap={10}>
          {categories.map((c) => (
            <CategoryTile key={c.id} category={c} />
          ))}
        </Grid>
      </Section>

      <Section title="Offers for you">
        <Grid cols={{ mobile: 1, tablet: 3, desktop: 3 }}>
          {offers.map((o) => (
            <Pressable
              key={o.title}
              onPress={() => showToast(o.code ? `Apply code ${o.code} at checkout` : o.title)}
              style={{ backgroundColor: o.color, borderRadius: radius.lg, padding: 20, flexDirection: 'row', alignItems: 'center' }}
            >
              <MaterialCommunityIcons name={o.icon} size={38} color="#fff" />
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>{o.title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>{o.sub}</Text>
              </View>
            </Pressable>
          ))}
        </Grid>
      </Section>

      <Section title="Most booked services" action="View all" onAction={() => navigate('services')}>
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
          {popular.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </Grid>
      </Section>

      <Section title="How it works">
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 4 }}>
          {howItWorks.map((h, i) => (
            <Card key={h.title} style={{ padding: 18 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialCommunityIcons name={h.icon} size={24} color={colors.primary} />
                </View>
                <Text style={{ marginLeft: 10, fontWeight: '900', color: colors.border, fontSize: 28 }}>{i + 1}</Text>
              </View>
              <Text style={{ fontWeight: '800', fontSize: 16, marginTop: 12, color: colors.text }}>{h.title}</Text>
              <Text style={{ color: colors.muted, marginTop: 4 }}>{h.text}</Text>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="Top-rated professionals" action="See more" onAction={() => navigate('services')}>
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {top.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </Grid>
      </Section>

      <Section title="Loved by customers">
        <Grid cols={{ mobile: 1, tablet: 3, desktop: 3 }}>
          {testimonials.map((t) => (
            <Card key={t.name} style={{ padding: 18 }}>
              <Stars value={t.rating} size={16} />
              <Text style={{ color: colors.text, marginTop: 10, lineHeight: 21 }}>“{t.text}”</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                <Avatar uri={t.avatar} name={t.name} size={38} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: '800' }}>{t.name}</Text>
                  <Text style={{ color: colors.muted, fontSize: 12 }}>{t.city}</Text>
                </View>
              </View>
            </Card>
          ))}
        </Grid>
      </Section>

      <Container style={{ paddingVertical: 20 }}>
        <View style={{ backgroundColor: colors.primary, borderRadius: radius.lg, padding: 28, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>
          <View style={{ marginBottom: isMobile ? 16 : 0 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '900' }}>Are you a skilled professional?</Text>
            <Text style={{ color: '#CFE9E6', marginTop: 4 }}>Join HouServices and grow your earnings.</Text>
          </View>
          <Button title="Become a Pro" variant="accent" onPress={() => navigate('become-pro')} />
        </View>
      </Container>
    </View>
  );
}
