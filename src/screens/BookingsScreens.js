import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container, Card, Button, Chip, Badge, Stars, Empty, money } from '../components/ui';
import ConfirmModal from '../components/ConfirmModal';
import { useApp } from '../store';

export function SuccessScreen({ id }) {
  const { bookings, navigate } = useApp();
  const b = bookings.find((x) => x.id === id);
  if (!b) return <Empty title="Booking not found" action="My bookings" onAction={() => navigate('bookings')} />;
  return (
    <Container style={{ paddingVertical: 40, alignItems: 'center' }}>
      <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.successSoft, alignItems: 'center', justifyContent: 'center' }}>
        <MaterialCommunityIcons name="check-bold" size={44} color={colors.success} />
      </View>
      <Text style={{ fontSize: 28, fontWeight: '900', marginTop: 16, color: colors.text }}>Booking confirmed!</Text>
      <Text style={{ color: colors.muted, marginTop: 4 }}>Booking ID: {b.id}</Text>
      <Card style={{ padding: 20, marginTop: 24, width: '100%', maxWidth: 460 }}>
        <Line l="Service" r={b.serviceName} />
        <Line l="Professional" r={b.workerName} />
        <Line l="Date" r={b.date} />
        <Line l="Time" r={b.slot} />
        <Line l="Address" r={b.address} />
        <Line l="Payment" r={b.payment === 'later' ? 'Pay after service' : b.payment.toUpperCase()} />
        <Line l="Total" r={money(b.total)} bold />
      </Card>
      <View style={{ flexDirection: 'row', marginTop: 24 }}>
        <Button title="My bookings" onPress={() => navigate('bookings')} style={{ marginRight: 10 }} />
        <Button title="Back to home" variant="outline" onPress={() => navigate('home')} />
      </View>
    </Container>
  );
}

function Line({ l, r, bold }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
      <Text style={{ color: colors.muted }}>{l}</Text>
      <Text style={{ fontWeight: bold ? '900' : '700', flex: 1, textAlign: 'right', marginLeft: 16 }}>{r}</Text>
    </View>
  );
}

const TONES = { upcoming: ['Upcoming', 'info'], completed: ['Completed', 'success'], cancelled: ['Cancelled', 'danger'] };

export function BookingsScreen() {
  const { user, bookings, updateBooking, navigate, showToast } = useApp();
  const [tab, setTab] = useState('upcoming');
  const [cancelId, setCancelId] = useState(null);

  if (!user) return <Empty icon="account-lock" title="Please log in" text="Log in to see your bookings." action="Login" onAction={() => navigate('login', { redirect: 'bookings' })} />;

  const list = bookings.filter((b) => b.status === tab);
  return (
    <Container style={{ paddingVertical: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: '900', color: colors.text }}>My Bookings</Text>
      <View style={{ flexDirection: 'row', marginVertical: 14 }}>
        {['upcoming', 'completed', 'cancelled'].map((t) => (
          <Chip key={t} label={`${TONES[t][0]} (${bookings.filter((b) => b.status === t).length})`} active={tab === t} onPress={() => setTab(t)} />
        ))}
      </View>
      {!list.length ? (
        <Empty icon="calendar-blank" title={`No ${tab} bookings`} action="Book a service" onAction={() => navigate('services')} />
      ) : (
        list.map((b) => (
          <Card key={b.id} style={{ padding: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontWeight: '900', fontSize: 16, flex: 1 }}>{b.serviceName}</Text>
              <Badge label={TONES[b.status][0]} tone={TONES[b.status][1]} />
            </View>
            <Text style={{ color: colors.muted, marginTop: 4 }}>#{b.id} · {b.workerName}</Text>
            <Text style={{ marginTop: 6 }}>📅 {b.date} · {b.slot}</Text>
            <Text style={{ color: colors.muted, marginTop: 2 }} numberOfLines={2}>📍 {b.address}</Text>
            <Text style={{ fontWeight: '900', color: colors.primary, marginTop: 6 }}>{money(b.total)}</Text>

            {b.status === 'completed' ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: '700', marginBottom: 2 }}>{b.rating ? 'Your rating' : 'Rate this service'}</Text>
                <Stars value={b.rating || 0} size={26} onChange={(n) => { updateBooking(b.id, { rating: n }); showToast('Thanks for your feedback!'); }} />
              </View>
            ) : null}

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
              {b.status === 'upcoming' ? (
                <>
                  <Button small title="Mark as done" variant="secondary" onPress={() => { updateBooking(b.id, { status: 'completed' }); setTab('completed'); }} style={{ marginRight: 8, marginBottom: 6 }} />
                  <Button small title="Cancel" variant="danger" onPress={() => setCancelId(b.id)} style={{ marginBottom: 6 }} />
                </>
              ) : (
                <Button small title="Book again" icon="refresh" variant="outline" onPress={() => navigate('book', { service: b.serviceId, worker: b.workerId })} />
              )}
            </View>
          </Card>
        ))
      )}
      <ConfirmModal
        visible={!!cancelId}
        danger
        title="Cancel this booking?"
        message="You can always book again later. No charges apply."
        confirmText="Yes, cancel"
        cancelText="Keep it"
        onCancel={() => setCancelId(null)}
        onConfirm={() => { updateBooking(cancelId, { status: 'cancelled' }); setCancelId(null); showToast('Booking cancelled'); }}
      />
    </Container>
  );
}
