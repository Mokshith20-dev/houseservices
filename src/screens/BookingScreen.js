import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container, Card, Button, Input, Chip, Img, Empty, money, useBreakpoint } from '../components/ui';
import { WorkerCard } from '../components/Cards';
import { useApp } from '../store';
import { getService, getWorker, workersFor, COUPONS, TIME_SLOTS } from '../data';

const STEPS = ['Professional', 'Date & Time', 'Address', 'Payment'];

function nextDays(n = 7) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      day: d.getDate(),
      mon: d.toLocaleDateString('en-IN', { month: 'short' }),
    });
  }
  return out;
}

export default function BookingScreen({ service: serviceId, worker: workerId }) {
  const { user, navigate, addBooking, showToast, city } = useApp();
  const { isDesktop } = useBreakpoint();
  const service = getService(serviceId);
  const [step, setStep] = useState(0);
  const [worker, setWorker] = useState(workerId ? getWorker(workerId) : null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [address, setAddress] = useState(user && user.address ? user.address : '');
  const [notes, setNotes] = useState('');
  const [payment, setPayment] = useState('later');
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(null);
  const days = useMemo(() => nextDays(7), []);

  useEffect(() => {
    if (!user) navigate('login', { redirect: 'book', redirectParams: { service: serviceId, worker: workerId || null } });
  }, [user]); // eslint-disable-line

  if (!service) return <Empty title="Service not found" action="Browse services" onAction={() => navigate('services')} />;
  if (!user) return null;

  const discount = applied ? Math.round(service.price * COUPONS[applied]) : 0;
  const fee = 49;
  const total = service.price - discount + fee;

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    if (COUPONS[c]) {
      setApplied(c);
      showToast(`Coupon ${c} applied`);
    } else showToast('Invalid coupon code', 'error');
  };

  const canNext = [true, !!(date && slot), address.trim().length >= 8, true][step];
  const next = () => {
    if (!canNext) {
      showToast(step === 1 ? 'Pick a date and time slot' : 'Enter a complete address', 'error');
      return;
    }
    if (step < 3) setStep(step + 1);
    else confirm();
  };

  const confirm = () => {
    const assigned = worker || workersFor(service.category)[0];
    const b = addBooking({
      serviceId: service.id, serviceName: service.name, workerId: assigned.id, workerName: assigned.name,
      date, slot, address, notes, payment, coupon: applied, discount, fee, total, city,
    });
    navigate('success', { id: b.id });
  };

  return (
    <Container style={{ paddingVertical: 20 }}>
      <Text style={{ fontSize: 26, fontWeight: '900', color: colors.text }}>Book {service.name}</Text>

      <View style={{ flexDirection: 'row', marginVertical: 18 }}>
        {STEPS.map((s, i) => (
          <View key={s} style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: i <= step ? colors.primary : colors.border, alignItems: 'center', justifyContent: 'center' }}>
              {i < step ? <MaterialCommunityIcons name="check" size={16} color="#fff" /> : <Text style={{ color: i <= step ? '#fff' : colors.muted, fontWeight: '800' }}>{i + 1}</Text>}
            </View>
            <Text style={{ fontSize: 11, marginTop: 4, color: i <= step ? colors.primary : colors.muted, fontWeight: '700', textAlign: 'center' }}>{s}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: isDesktop ? 'row' : 'column' }}>
        <View style={{ flex: 1, marginRight: isDesktop ? 24 : 0 }}>
          {step === 0 && (
            <View>
              <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 10 }}>Choose your professional</Text>
              <Pressable
                onPress={() => setWorker(null)}
                style={{ padding: 14, borderRadius: radius.md, borderWidth: worker ? 1 : 2, borderColor: worker ? colors.border : colors.primary, backgroundColor: worker ? '#fff' : colors.primarySoft, marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}
              >
                <MaterialCommunityIcons name="auto-fix" size={24} color={colors.primary} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={{ fontWeight: '800' }}>Auto-assign (recommended)</Text>
                  <Text style={{ color: colors.muted, fontSize: 12 }}>We'll send the best available pro</Text>
                </View>
              </Pressable>
              {workersFor(service.category).map((w) => (
                <View key={w.id} style={{ marginBottom: 10 }}>
                  <WorkerCard worker={w} compact selected={worker && worker.id === w.id} onSelect={setWorker} />
                </View>
              ))}
            </View>
          )}

          {step === 1 && (
            <View>
              <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 10 }}>Select date</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {days.map((d) => (
                  <Pressable
                    key={d.iso}
                    onPress={() => setDate(d.iso)}
                    style={{ width: 66, paddingVertical: 10, alignItems: 'center', borderRadius: radius.md, borderWidth: 1.5, marginRight: 8, marginBottom: 8, borderColor: date === d.iso ? colors.primary : colors.border, backgroundColor: date === d.iso ? colors.primarySoft : '#fff' }}
                  >
                    <Text style={{ color: colors.muted, fontSize: 12 }}>{d.dow}</Text>
                    <Text style={{ fontWeight: '900', fontSize: 20, color: colors.text }}>{d.day}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12 }}>{d.mon}</Text>
                  </Pressable>
                ))}
              </View>
              <Text style={{ fontWeight: '800', fontSize: 18, marginVertical: 10 }}>Select time slot</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {TIME_SLOTS.map((t) => (
                  <Chip key={t} label={t} icon="clock-outline" active={slot === t} onPress={() => setSlot(t)} />
                ))}
              </View>
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 10 }}>Service address ({city})</Text>
              <Input label="Full address" value={address} onChangeText={setAddress} multiline placeholder="House no, street, landmark, area" />
              <Input label="Notes for the professional (optional)" value={notes} onChangeText={setNotes} multiline placeholder="Gate code, pets, special instructions…" />
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={{ fontWeight: '800', fontSize: 18, marginBottom: 10 }}>Payment method</Text>
              {[['later', 'Pay after service', 'Cash or UPI to the professional', 'cash'], ['upi', 'UPI (demo)', 'No real payment is made', 'cellphone'], ['card', 'Card (demo)', 'No real payment is made', 'credit-card']].map(([k, t, sub, icon]) => (
                <Pressable key={k} onPress={() => setPayment(k)} style={{ padding: 14, borderRadius: radius.md, borderWidth: payment === k ? 2 : 1, borderColor: payment === k ? colors.primary : colors.border, backgroundColor: payment === k ? colors.primarySoft : '#fff', marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
                  <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontWeight: '800' }}>{t}</Text>
                    <Text style={{ color: colors.muted, fontSize: 12 }}>{sub}</Text>
                  </View>
                </Pressable>
              ))}
              <Text style={{ fontWeight: '800', fontSize: 18, marginVertical: 10 }}>Coupon</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Input value={coupon} onChangeText={setCoupon} placeholder="FIRST20 or HOME10" autoCapitalize="characters" style={{ flex: 1, marginRight: 10, marginBottom: 0 }} />
                <Button title={applied ? 'Applied' : 'Apply'} variant="outline" onPress={applyCoupon} />
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', marginTop: 24 }}>
            {step > 0 ? <Button title="Back" variant="outline" onPress={() => setStep(step - 1)} style={{ marginRight: 10 }} /> : null}
            <Button title={step === 3 ? `Confirm booking · ${money(total)}` : 'Continue'} onPress={next} style={{ flex: 1 }} />
          </View>
        </View>

        <View style={{ width: isDesktop ? 320 : '100%', marginTop: isDesktop ? 0 : 24 }}>
          <Card style={{ padding: 16 }}>
            <Img uri={service.image} style={{ height: 120, borderRadius: radius.md, marginBottom: 10 }} />
            <Text style={{ fontWeight: '800', fontSize: 16 }}>{service.name}</Text>
            <Text style={{ color: colors.muted, marginBottom: 10 }}>{service.duration}</Text>
            <Row l="Professional" r={worker ? worker.name : 'Auto-assign'} />
            {date ? <Row l="When" r={`${date} · ${slot || '—'}`} /> : null}
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />
            <Row l="Service price" r={money(service.price)} />
            {applied ? <Row l={`Coupon ${applied}`} r={`− ${money(discount)}`} green /> : null}
            <Row l="Convenience fee" r={money(fee)} />
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />
            <Row l="Total" r={money(total)} bold />
          </Card>
        </View>
      </View>
    </Container>
  );
}

function Row({ l, r, bold, green }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 }}>
      <Text style={{ color: green ? colors.success : colors.muted, fontWeight: bold ? '900' : '500' }}>{l}</Text>
      <Text style={{ color: green ? colors.success : colors.text, fontWeight: bold ? '900' : '700' }}>{r}</Text>
    </View>
  );
}
