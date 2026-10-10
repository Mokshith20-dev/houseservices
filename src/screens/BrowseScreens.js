import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container, Section, Grid, Card, Chip, Button, Img, Stars, Avatar, Empty, Badge, money, useBreakpoint } from '../components/ui';
import { ServiceRow, WorkerCard } from '../components/Cards';
import { useApp } from '../store';
import { categories, services, workers, getCategory, getService, getWorker, workersFor } from '../data';

const SORTS = [
  ['popular', 'Popularity'],
  ['rating', 'Rating'],
  ['low', 'Price: Low → High'],
  ['high', 'Price: High → Low'],
];

function sortServices(list, sort) {
  const l = [...list];
  if (sort === 'rating') l.sort((a, b) => b.rating - a.rating);
  else if (sort === 'low') l.sort((a, b) => a.price - b.price);
  else if (sort === 'high') l.sort((a, b) => b.price - a.price);
  else l.sort((a, b) => b.reviews - a.reviews);
  return l;
}

function Crumb({ items }) {
  const { navigate } = useApp();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
      {items.map((it, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {i > 0 ? <MaterialCommunityIcons name="chevron-right" size={16} color={colors.muted} /> : null}
          <Pressable onPress={it.to ? () => navigate(it.to, it.params) : undefined}>
            <Text style={{ color: it.to ? colors.primary : colors.muted, fontWeight: '600' }}>{it.label}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function ServiceList({ list }) {
  if (!list.length) return <Empty icon="magnify-close" title="No services found" text="Try a different search or filter." />;
  return (
    <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
      {list.map((s) => (
        <ServiceRow key={s.id} service={s} />
      ))}
    </Grid>
  );
}

export function ServicesScreen({ initialQuery = '' }) {
  const [q, setQ] = useState(initialQuery);
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    let l = services.filter((s) => {
      const c = getCategory(s.category);
      return (
        (cat === 'all' || s.category === cat) &&
        (!t || s.name.toLowerCase().includes(t) || c.name.toLowerCase().includes(t) || s.desc.toLowerCase().includes(t)) &&
        (!maxPrice || s.price <= maxPrice) &&
        s.rating >= minRating
      );
    });
    return sortServices(l, sort);
  }, [q, cat, sort, maxPrice, minRating]);

  return (
    <Container style={{ paddingVertical: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: '900', color: colors.text }}>{initialQuery ? `Results for “${initialQuery}”` : 'All services'}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: 10, marginTop: 14 }}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.muted} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search services…" placeholderTextColor="#9CA3AF" style={{ flex: 1, padding: 12, outlineStyle: 'none' }} />
        {q ? (
          <Pressable onPress={() => setQ('')}>
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 }}>
        <Chip label="All" active={cat === 'all'} onPress={() => setCat('all')} />
        {categories.map((c) => (
          <Chip key={c.id} label={c.name} icon={c.icon} active={cat === c.id} onPress={() => setCat(c.id)} />
        ))}
      </View>

      <Text style={{ fontWeight: '700', marginTop: 4, marginBottom: 8 }}>Sort by</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {SORTS.map(([k, l]) => (
          <Chip key={k} label={l} active={sort === k} onPress={() => setSort(k)} />
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
        <Text style={{ fontWeight: '700', marginRight: 10, marginBottom: 8 }}>Filters</Text>
        {[[0, 'Any price'], [500, 'Under ₹500'], [1000, 'Under ₹1,000'], [3000, 'Under ₹3,000']].map(([v, l]) => (
          <Chip key={v} label={l} active={maxPrice === v} onPress={() => setMaxPrice(v)} />
        ))}
        {[[0, 'Any rating'], [4.5, '4.5+ ★'], [4.7, '4.7+ ★']].map(([v, l]) => (
          <Chip key={l} label={l} active={minRating === v} onPress={() => setMinRating(v)} />
        ))}
      </View>

      <Text style={{ color: colors.muted, marginVertical: 8 }}>{list.length} service{list.length === 1 ? '' : 's'} found</Text>
      <ServiceList list={list} />
    </Container>
  );
}

export function CategoryScreen({ id }) {
  const cat = getCategory(id);
  const [sort, setSort] = useState('popular');
  const { navigate } = useApp();
  if (!cat) return <Empty title="Category not found" action="Browse all" onAction={() => navigate('services')} />;
  const list = sortServices(services.filter((s) => s.category === id), sort);
  const pros = workersFor(id);
  return (
    <View>
      <View style={{ backgroundColor: cat.color + '22', paddingVertical: 28 }}>
        <Container>
          <Crumb items={[{ label: 'Home', to: 'home' }, { label: 'Services', to: 'services' }, { label: cat.name }]} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons name={cat.icon} size={30} color={cat.color} />
            </View>
            <View style={{ marginLeft: 14 }}>
              <Text style={{ fontSize: 28, fontWeight: '900', color: colors.text }}>{cat.name}</Text>
              <Text style={{ color: colors.muted }}>{list.length} services · {pros.length} verified pros</Text>
            </View>
          </View>
        </Container>
      </View>
      <Section title="Services">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {SORTS.map(([k, l]) => (
            <Chip key={k} label={l} active={sort === k} onPress={() => setSort(k)} />
          ))}
        </View>
        <ServiceList list={list} />
      </Section>
      <Section title="Professionals">
        <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }}>
          {pros.map((w) => (
            <WorkerCard key={w.id} worker={w} />
          ))}
        </Grid>
      </Section>
    </View>
  );
}

export function ServiceScreen({ id }) {
  const { navigate } = useApp();
  const { isDesktop } = useBreakpoint();
  const s = getService(id);
  const [worker, setWorker] = useState(null);
  if (!s) return <Empty title="Service not found" action="Browse all" onAction={() => navigate('services')} />;
  const cat = getCategory(s.category);
  const pros = workersFor(s.category);
  const book = () => navigate('book', { service: s.id, worker: worker ? worker.id : null });

  const Summary = (
    <Card style={{ padding: 18 }}>
      <Text style={{ color: colors.muted }}>Starting at</Text>
      <Text style={{ fontSize: 30, fontWeight: '900', color: colors.primary }}>{money(s.price)}</Text>
      <Text style={{ color: colors.muted, marginBottom: 14 }}>Duration: {s.duration}</Text>
      <Text style={{ fontWeight: '700', marginBottom: 6 }}>Professional</Text>
      <Text style={{ color: colors.muted, marginBottom: 14 }}>{worker ? worker.name : 'Auto-assign the best available pro'}</Text>
      <Button title="Book now" icon="calendar-check" onPress={book} />
    </Card>
  );

  return (
    <Container style={{ paddingVertical: 20 }}>
      <Crumb items={[{ label: 'Home', to: 'home' }, { label: cat.name, to: 'category', params: { id: cat.id } }, { label: s.name }]} />
      <View style={{ flexDirection: isDesktop ? 'row' : 'column' }}>
        <View style={{ flex: 1, marginRight: isDesktop ? 24 : 0 }}>
          <Img uri={s.image} style={{ height: 280, width: '100%', borderRadius: radius.lg }} />
          <Text style={{ fontSize: 28, fontWeight: '900', color: colors.text, marginTop: 16 }}>{s.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
            <Stars value={s.rating} size={16} showValue />
            <Text style={{ color: colors.muted, marginLeft: 8 }}>{s.reviews.toLocaleString('en-IN')} reviews</Text>
          </View>
          <Text style={{ color: colors.text, marginTop: 14, lineHeight: 22 }}>{s.desc}</Text>
          <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 20, marginBottom: 8 }}>What's included</Text>
          {s.includes.map((i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <MaterialCommunityIcons name="check-circle" size={18} color={colors.success} />
              <Text style={{ marginLeft: 8, color: colors.text }}>{i}</Text>
            </View>
          ))}
          <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 24, marginBottom: 10 }}>Choose a professional (optional)</Text>
          <Grid cols={{ mobile: 1, tablet: 2, desktop: 2 }}>
            {pros.map((w) => (
              <WorkerCard key={w.id} worker={w} compact selected={worker && worker.id === w.id} onSelect={(x) => setWorker(worker && worker.id === x.id ? null : x)} />
            ))}
          </Grid>
        </View>
        <View style={{ width: isDesktop ? 320 : '100%', marginTop: isDesktop ? 0 : 20 }}>{Summary}</View>
      </View>
    </Container>
  );
}

export function WorkerScreen({ id }) {
  const { navigate } = useApp();
  const w = getWorker(id);
  if (!w) return <Empty title="Professional not found" action="Browse all" onAction={() => navigate('services')} />;
  const cat = getCategory(w.category);
  const list = services.filter((s) => s.category === w.category);
  return (
    <Container style={{ paddingVertical: 20 }}>
      <Crumb items={[{ label: 'Home', to: 'home' }, { label: cat.name, to: 'category', params: { id: cat.id } }, { label: w.name }]} />
      <Card style={{ padding: 20, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
        <Avatar uri={w.avatar} name={w.name} size={96} />
        <View style={{ marginLeft: 18, flex: 1, minWidth: 220 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '900' }}>{w.name}</Text>
            <MaterialCommunityIcons name="check-decagram" size={20} color={colors.primary} style={{ marginLeft: 6 }} />
          </View>
          <Text style={{ color: colors.muted }}>{cat.name} specialist</Text>
          <View style={{ marginTop: 6 }}>
            <Stars value={w.rating} size={16} showValue />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            <Badge label={`${w.experience} yrs experience`} tone="info" />
            <View style={{ width: 8 }} />
            <Badge label={`${w.jobs} jobs done`} tone="success" />
          </View>
        </View>
      </Card>
      <Text style={{ marginTop: 16, color: colors.text, lineHeight: 22 }}>{w.bio}</Text>
      <Text style={{ marginTop: 8, color: colors.muted }}>Languages: {w.languages.join(', ')}</Text>
      <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 24, marginBottom: 10 }}>Book {w.name.split(' ')[0]} for</Text>
      <Grid cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
        {list.map((s) => (
          <Card key={s.id} style={{ padding: 14 }}>
            <Text style={{ fontWeight: '800', fontSize: 15 }}>{s.name}</Text>
            <Text style={{ color: colors.muted, marginVertical: 4 }}>{s.duration} · from {money(s.price)}</Text>
            <Button title="Book" small onPress={() => navigate('book', { service: s.id, worker: w.id })} style={{ alignSelf: 'flex-start', marginTop: 6 }} />
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
