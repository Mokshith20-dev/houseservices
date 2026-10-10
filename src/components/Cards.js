import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Card, Img, Stars, Avatar, Badge, money } from './ui';
import { useApp } from '../store';
import { getCategory } from '../data';

export function CategoryTile({ category }) {
  const { navigate } = useApp();
  return (
    <Pressable
      onPress={() => navigate('category', { id: category.id })}
      style={({ hovered }) => ({
        alignItems: 'center', padding: 14, backgroundColor: '#fff', borderRadius: radius.md,
        borderWidth: 1, borderColor: colors.border, transform: [{ translateY: hovered ? -2 : 0 }],
      })}
    >
      <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: category.color + '22', alignItems: 'center', justifyContent: 'center' }}>
        <MaterialCommunityIcons name={category.icon} size={28} color={category.color} />
      </View>
      <Text style={{ marginTop: 8, fontWeight: '700', color: colors.text, textAlign: 'center', fontSize: 13 }} numberOfLines={2}>
        {category.name}
      </Text>
    </Pressable>
  );
}

export function ServiceCard({ service }) {
  const { navigate } = useApp();
  return (
    <Card onPress={() => navigate('service', { id: service.id })}>
      <Img uri={service.image} style={{ height: 150, width: '100%' }} />
      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }} numberOfLines={2}>{service.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <MaterialCommunityIcons name="star" size={14} color={colors.star} />
          <Text style={{ marginLeft: 3, fontWeight: '700', fontSize: 13 }}>{service.rating}</Text>
          <Text style={{ marginLeft: 4, color: colors.muted, fontSize: 12 }}>({service.reviews.toLocaleString('en-IN')})</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <Text style={{ fontWeight: '800', color: colors.primary, fontSize: 16 }}>{money(service.price)}</Text>
          <Text style={{ color: colors.muted, fontSize: 12 }}>{service.duration}</Text>
        </View>
      </View>
    </Card>
  );
}

export function ServiceRow({ service }) {
  const { navigate } = useApp();
  const cat = getCategory(service.category);
  return (
    <Card onPress={() => navigate('service', { id: service.id })} style={{ flexDirection: 'row' }}>
      <Img uri={service.image} style={{ width: 110, minHeight: 110 }} />
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={{ color: cat.color, fontWeight: '700', fontSize: 11 }}>{cat.name.toUpperCase()}</Text>
        <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15, marginTop: 2 }} numberOfLines={2}>{service.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Stars value={service.rating} />
          <Text style={{ marginLeft: 6, color: colors.muted, fontSize: 12 }}>{service.rating} · {service.reviews.toLocaleString('en-IN')} reviews</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' }}>
          <Text style={{ fontWeight: '800', color: colors.primary, fontSize: 16 }}>{money(service.price)}</Text>
          <Text style={{ color: colors.muted, fontSize: 12 }}>{service.duration}</Text>
        </View>
      </View>
    </Card>
  );
}

export function WorkerCard({ worker, selected, onSelect, compact }) {
  const { navigate } = useApp();
  const cat = getCategory(worker.category);
  const press = () => (onSelect ? onSelect(worker) : navigate('worker', { id: worker.id }));
  return (
    <Card
      onPress={press}
      style={selected ? { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft } : null}
    >
      <View style={{ padding: 14, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar uri={worker.avatar} name={worker.name} size={compact ? 46 : 56} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '800', color: colors.text, fontSize: 15 }}>{worker.name}</Text>
            {worker.verified ? <MaterialCommunityIcons name="check-decagram" size={16} color={colors.primary} style={{ marginLeft: 4 }} /> : null}
          </View>
          <Text style={{ color: colors.muted, fontSize: 12, marginTop: 1 }}>{cat.name} · {worker.experience} yrs exp</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Stars value={worker.rating} />
            <Text style={{ marginLeft: 5, fontSize: 12, fontWeight: '700' }}>{worker.rating}</Text>
            <Text style={{ marginLeft: 6, fontSize: 12, color: colors.muted }}>{worker.jobs} jobs</Text>
          </View>
        </View>
        {selected ? <MaterialCommunityIcons name="check-circle" size={22} color={colors.primary} /> : null}
      </View>
    </Card>
  );
}

export { Badge };
