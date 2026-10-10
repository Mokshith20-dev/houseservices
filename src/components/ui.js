import React from 'react';
import { View, Text, Pressable, TextInput, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, shadow, MAX_WIDTH } from '../theme';

export function useBreakpoint() {
  const { width } = useWindowDimensions();
  return { width, isMobile: width < 640, isTablet: width >= 640 && width < 960, isDesktop: width >= 960 };
}

export function Container({ children, style }) {
  return (
    <View style={[{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: 16 }, style]}>{children}</View>
  );
}

export function Section({ title, subtitle, action, onAction, children, style }) {
  return (
    <Container style={[{ paddingVertical: 20 }, style]}>
      {title ? (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: colors.text }}>{title}</Text>
            {subtitle ? <Text style={{ color: colors.muted, marginTop: 2 }}>{subtitle}</Text> : null}
          </View>
          {action ? (
            <Pressable onPress={onAction}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>{action}</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
      {children}
    </Container>
  );
}

/** Responsive grid: cols = {mobile, tablet, desktop} */
export function Grid({ children, cols = { mobile: 1, tablet: 2, desktop: 3 }, gap = 14 }) {
  const { isMobile, isTablet } = useBreakpoint();
  const n = isMobile ? cols.mobile : isTablet ? cols.tablet : cols.desktop;
  const items = React.Children.toArray(children).filter(Boolean);
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -gap / 2 }}>
      {items.map((c, i) => (
        <View key={i} style={{ width: `${100 / n}%`, padding: gap / 2 }}>
          {c}
        </View>
      ))}
    </View>
  );
}

export function Card({ children, style, onPress }) {
  const base = [{ backgroundColor: colors.card, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }, shadow, style];
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ hovered, pressed }) => [...base, (hovered || pressed) && { transform: [{ translateY: -2 }] }]}>
        {children}
      </Pressable>
    );
  }
  return <View style={base}>{children}</View>;
}

export function Button({ title, onPress, variant = 'primary', icon, disabled, loading, style, small }) {
  const v = {
    primary: { bg: colors.primary, fg: '#fff', border: colors.primary },
    secondary: { bg: colors.primarySoft, fg: colors.primary, border: colors.primarySoft },
    outline: { bg: '#fff', fg: colors.primary, border: colors.primary },
    danger: { bg: '#fff', fg: colors.danger, border: colors.danger },
    ghost: { bg: 'transparent', fg: colors.text, border: 'transparent' },
    accent: { bg: colors.accent, fg: '#111827', border: colors.accent },
  }[variant];
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ hovered, pressed }) => [
        {
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
          backgroundColor: v.bg, borderColor: v.border, borderWidth: 1.5, borderRadius: radius.md,
          paddingVertical: small ? 8 : 13, paddingHorizontal: small ? 14 : 20,
          opacity: disabled ? 0.5 : hovered || pressed ? 0.88 : 1,
        },
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={v.fg} style={{ marginRight: 8 }} /> : icon ? <MaterialCommunityIcons name={icon} size={small ? 16 : 18} color={v.fg} style={{ marginRight: 6 }} /> : null}
      <Text style={{ color: v.fg, fontWeight: '700', fontSize: small ? 13 : 15 }}>{title}</Text>
    </Pressable>
  );
}

export function Input({ label, error, style, multiline, ...props }) {
  return (
    <View style={[{ marginBottom: 14 }, style]}>
      {label ? <Text style={{ fontWeight: '600', color: colors.text, marginBottom: 6 }}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        {...props}
        style={[
          {
            backgroundColor: '#fff', borderWidth: 1.5, borderColor: error ? colors.danger : colors.border,
            borderRadius: radius.md, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: colors.text,
          },
          multiline && { minHeight: 90, textAlignVertical: 'top' },
          { outlineStyle: 'none' },
        ]}
      />
      {error ? <Text style={{ color: colors.danger, marginTop: 4, fontSize: 12 }}>{error}</Text> : null}
    </View>
  );
}

export function Stars({ value = 0, size = 14, onChange, showValue }) {
  const full = Math.round(value);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const icon = (
          <MaterialCommunityIcons key={n} name={n <= full ? 'star' : 'star-outline'} size={size} color={colors.star} />
        );
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} style={{ padding: 2 }}>
            {icon}
          </Pressable>
        ) : (
          icon
        );
      })}
      {showValue ? <Text style={{ marginLeft: 4, fontWeight: '700', color: colors.text, fontSize: size - 1 }}>{Number(value).toFixed(1)}</Text> : null}
    </View>
  );
}

export function Avatar({ uri, name = '', size = 48 }) {
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  if (uri) return <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.border }} />;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.primary, fontWeight: '800', fontSize: size / 2.6 }}>{initials || '?'}</Text>
    </View>
  );
}

export function Chip({ label, active, onPress, icon }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
        borderWidth: 1.5, borderColor: active ? colors.primary : colors.border,
        backgroundColor: active ? colors.primarySoft : '#fff', marginRight: 8, marginBottom: 8,
      }}
    >
      {icon ? <MaterialCommunityIcons name={icon} size={15} color={active ? colors.primary : colors.muted} style={{ marginRight: 5 }} /> : null}
      <Text style={{ color: active ? colors.primary : colors.text, fontWeight: '600', fontSize: 13 }}>{label}</Text>
    </Pressable>
  );
}

export function Badge({ label, tone = 'success' }) {
  const t = {
    success: [colors.successSoft, colors.success],
    warn: [colors.warnSoft, colors.warn],
    danger: [colors.dangerSoft, colors.danger],
    info: [colors.primarySoft, colors.primary],
  }[tone];
  return (
    <View style={{ backgroundColor: t[0], paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, alignSelf: 'flex-start' }}>
      <Text style={{ color: t[1], fontWeight: '700', fontSize: 12 }}>{label}</Text>
    </View>
  );
}

export function Img({ uri, style }) {
  return <Image source={{ uri }} style={[{ backgroundColor: colors.border }, style]} resizeMode="cover" />;
}

export function Empty({ icon = 'inbox-outline', title, text, action, onAction }) {
  return (
    <View style={{ alignItems: 'center', padding: 40 }}>
      <MaterialCommunityIcons name={icon} size={56} color={colors.border} />
      <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 10 }}>{title}</Text>
      {text ? <Text style={{ color: colors.muted, marginTop: 4, textAlign: 'center' }}>{text}</Text> : null}
      {action ? <Button title={action} onPress={onAction} style={{ marginTop: 16 }} /> : null}
    </View>
  );
}

export const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
