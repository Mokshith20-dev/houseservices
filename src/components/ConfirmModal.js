import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { colors, radius } from '../theme';
import { Button } from './ui';

export default function ConfirmModal({ visible, title, message, confirmText = 'Confirm', cancelText = 'Cancel', danger, onConfirm, onCancel }) {
  return (
    <Modal visible={!!visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable onPress={onCancel} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <Pressable onPress={() => {}} style={{ backgroundColor: '#fff', borderRadius: radius.lg, padding: 22, width: '100%', maxWidth: 400 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: colors.text }}>{title}</Text>
          {message ? <Text style={{ color: colors.muted, marginTop: 8, lineHeight: 20 }}>{message}</Text> : null}
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Button title={cancelText} variant="outline" onPress={onCancel} style={{ flex: 1, marginRight: 10 }} />
            <Button title={confirmText} variant={danger ? 'danger' : 'primary'} onPress={onConfirm} style={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
