import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { Container, Card, Button, Input, Chip, Avatar, Empty } from '../components/ui';
import { useApp } from '../store';
import { categories, faqs, CITIES } from '../data';

const DEMO_OTP = '1234';

export function LoginScreen({ redirect, redirectParams }) {
  const { login, navigate, showToast, user } = useApp();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState('');

  const done = () => navigate(redirect || 'home', redirectParams || {});
  useEffect(() => {
    if (user) done();
  }, []); // eslint-disable-line

  const send = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) return setErr('Enter a valid 10-digit mobile number');
    setErr('');
    setSent(true);
    showToast('OTP sent! (Demo OTP is 1234)');
  };
  const verify = () => {
    if (otp !== DEMO_OTP) return setErr('Incorrect OTP. Hint: 1234');
    login(phone);
    showToast('Logged in successfully');
    done();
  };

  return (
    <Container style={{ paddingVertical: 40, alignItems: 'center' }}>
      <Card style={{ padding: 24, width: '100%', maxWidth: 420 }}>
        <Text style={{ fontSize: 26, fontWeight: '900', color: colors.text }}>Welcome back</Text>
        <Text style={{ color: colors.muted, marginBottom: 20, marginTop: 4 }}>Log in with your mobile number</Text>
        <Input label="Mobile number" value={phone} onChangeText={(t) => setPhone(t.replace(/\D/g, '').slice(0, 10))} keyboardType="phone-pad" placeholder="9876543210" editable={!sent} error={!sent ? err : ''} />
        {sent ? (
          <>
            <Input label="Enter OTP (demo: 1234)" value={otp} onChangeText={(t) => setOtp(t.replace(/\D/g, '').slice(0, 4))} keyboardType="number-pad" placeholder="1234" error={err} />
            <Button title="Verify & Login" onPress={verify} />
            <Pressable onPress={() => { setSent(false); setOtp(''); setErr(''); }} style={{ marginTop: 12, alignItems: 'center' }}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>Change number</Text>
            </Pressable>
          </>
        ) : (
          <Button title="Send OTP" onPress={send} />
        )}
      </Card>
    </Container>
  );
}

export function ProfileScreen() {
  const { user, updateUser, logout, navigate, showToast, city, setCity, bookings } = useApp();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddress] = useState(user ? user.address : '');

  if (!user) return <Empty icon="account-lock" title="Please log in" action="Login" onAction={() => navigate('login', { redirect: 'profile' })} />;

  const save = () => {
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return showToast('Enter a valid email', 'error');
    updateUser({ name: name.trim(), email: email.trim(), address: address.trim() });
    showToast('Profile saved');
  };

  return (
    <Container style={{ paddingVertical: 24, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 560 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Avatar name={user.name || user.phone} size={64} />
          <View style={{ marginLeft: 14 }}>
            <Text style={{ fontSize: 22, fontWeight: '900' }}>{user.name || 'Your profile'}</Text>
            <Text style={{ color: colors.muted }}>+91 {user.phone} · {bookings.length} bookings</Text>
          </View>
        </View>
        <Card style={{ padding: 20 }}>
          <Input label="Full name" value={name} onChangeText={setName} placeholder="Your name" />
          <Input label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" />
          <Input label="Default address" value={address} onChangeText={setAddress} multiline placeholder="House no, street, area" />
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>City</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
            {CITIES.map((c) => (
              <Chip key={c} label={c} active={c === city} onPress={() => setCity(c)} />
            ))}
          </View>
          <Button title="Save changes" onPress={save} />
        </Card>
        <Button title="Logout" variant="danger" onPress={() => { logout(); showToast('Logged out'); navigate('home'); }} style={{ marginTop: 16 }} />
      </View>
    </Container>
  );
}

export function BecomeProScreen() {
  const { showToast, navigate } = useApp();
  const [f, setF] = useState({ name: '', phone: '', city: 'Hyderabad', category: 'cleaning', exp: '' });
  const [done, setDone] = useState(false);
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  const submit = () => {
    if (!f.name.trim()) return showToast('Enter your name', 'error');
    if (!/^[6-9]\d{9}$/.test(f.phone)) return showToast('Enter a valid 10-digit phone', 'error');
    if (!f.exp || isNaN(Number(f.exp))) return showToast('Enter your years of experience', 'error');
    setDone(true);
  };

  if (done)
    return (
      <Container style={{ paddingVertical: 40, alignItems: 'center' }}>
        <MaterialCommunityIcons name="check-circle" size={72} color={colors.success} />
        <Text style={{ fontSize: 26, fontWeight: '900', marginTop: 10 }}>Application received!</Text>
        <Text style={{ color: colors.muted, marginTop: 6, textAlign: 'center' }}>Thanks {f.name.split(' ')[0]}, our team will call you within 2 working days.</Text>
        <Button title="Back to home" onPress={() => navigate('home')} style={{ marginTop: 20 }} />
      </Container>
    );

  return (
    <Container style={{ paddingVertical: 24, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 560 }}>
        <Text style={{ fontSize: 28, fontWeight: '900' }}>Become a HouServices Pro</Text>
        <Text style={{ color: colors.muted, marginVertical: 8 }}>Get steady jobs, fair pay and zero commission for the first month.</Text>
        <Card style={{ padding: 20, marginTop: 8 }}>
          <Input label="Full name" value={f.name} onChangeText={set('name')} />
          <Input label="Phone" value={f.phone} onChangeText={(t) => set('phone')(t.replace(/\D/g, '').slice(0, 10))} keyboardType="phone-pad" />
          <Text style={{ fontWeight: '600', marginBottom: 8 }}>City</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {CITIES.map((c) => <Chip key={c} label={c} active={f.city === c} onPress={() => set('city')(c)} />)}
          </View>
          <Text style={{ fontWeight: '600', marginVertical: 8 }}>Your skill</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {categories.map((c) => <Chip key={c.id} label={c.name} active={f.category === c.id} onPress={() => set('category')(c.id)} />)}
          </View>
          <Input label="Years of experience" value={f.exp} onChangeText={(t) => set('exp')(t.replace(/\D/g, '').slice(0, 2))} keyboardType="number-pad" />
          <Button title="Submit application" onPress={submit} />
        </Card>
      </View>
    </Container>
  );
}

export function HelpScreen() {
  const { showToast } = useApp();
  const [open, setOpen] = useState(0);
  const [m, setM] = useState({ name: '', email: '', msg: '' });

  const send = () => {
    if (!m.name.trim() || !/^\S+@\S+\.\S+$/.test(m.email) || m.msg.trim().length < 5) return showToast('Fill in all fields correctly', 'error');
    showToast('Message sent. We will reply soon!');
    setM({ name: '', email: '', msg: '' });
  };

  return (
    <Container style={{ paddingVertical: 24, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: 720 }}>
        <Text style={{ fontSize: 28, fontWeight: '900' }}>Help & FAQ</Text>
        <View style={{ marginTop: 16 }}>
          {faqs.map((f, i) => (
            <Pressable key={f.q} onPress={() => setOpen(open === i ? -1 : i)} style={{ backgroundColor: '#fff', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: '800', flex: 1 }}>{f.q}</Text>
                <MaterialCommunityIcons name={open === i ? 'chevron-up' : 'chevron-down'} size={22} color={colors.muted} />
              </View>
              {open === i ? <Text style={{ color: colors.muted, marginTop: 8, lineHeight: 21 }}>{f.a}</Text> : null}
            </Pressable>
          ))}
        </View>
        <Text style={{ fontSize: 20, fontWeight: '900', marginTop: 24, marginBottom: 10 }}>Contact us</Text>
        <Card style={{ padding: 20 }}>
          <Input label="Name" value={m.name} onChangeText={(v) => setM({ ...m, name: v })} />
          <Input label="Email" value={m.email} onChangeText={(v) => setM({ ...m, email: v })} keyboardType="email-address" autoCapitalize="none" />
          <Input label="Message" value={m.msg} onChangeText={(v) => setM({ ...m, msg: v })} multiline />
          <Button title="Send message" onPress={send} />
        </Card>
      </View>
    </Container>
  );
}
