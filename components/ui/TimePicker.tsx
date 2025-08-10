import { Picker } from '@react-native-picker/picker'
import * as Haptics from 'expo-haptics'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { borderRadius, shadows, spacing } from '@/lib/theme'

interface TimePickerProps {
  value: string // HH:MM format
  onValueChange: (time: string) => void
  visible: boolean
  onClose: () => void
}

export function TimePicker({
  value,
  onValueChange,
  visible,
  onClose,
}: TimePickerProps) {
  const [tempValue, setTempValue] = useState(value)
  const [hour, minute] = value.split(':').map(Number)

  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    onValueChange(tempValue)
    onClose()
  }

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setTempValue(value)
    onClose()
  }

  const handleHourChange = (newHour: number) => {
    const newTime = `${newHour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`
    setTempValue(newTime)
  }

  const handleMinuteChange = (newMinute: number) => {
    const newTime = `${hour.toString().padStart(2, '0')}:${newMinute
      .toString()
      .padStart(2, '0')}`
    setTempValue(newTime)
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}>
      <View style={styles.overlay}>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          style={styles.container}>
          <ThemedText variant="title" style={styles.title}>
            Set Notification Time
          </ThemedText>

          <View style={styles.pickerContainer}>
            <View style={styles.pickerColumn}>
              <ThemedText style={styles.pickerLabel}>Hour</ThemedText>
              <Picker
                selectedValue={hour}
                onValueChange={handleHourChange}
                style={styles.picker}>
                {Array.from({ length: 24 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={i.toString().padStart(2, '0')}
                    value={i}
                  />
                ))}
              </Picker>
            </View>

            <ThemedText style={styles.separator}>:</ThemedText>

            <View style={styles.pickerColumn}>
              <ThemedText style={styles.pickerLabel}>Minute</ThemedText>
              <Picker
                selectedValue={minute}
                onValueChange={handleMinuteChange}
                style={styles.picker}>
                {Array.from({ length: 60 }, (_, i) => (
                  <Picker.Item
                    key={i}
                    label={i.toString().padStart(2, '0')}
                    value={i}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleCancel}>
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}>
              <ThemedText style={[styles.buttonText, styles.confirmButtonText]}>
                Confirm
              </ThemedText>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 350,
    ...shadows.medium,
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: '#1a1a1a',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: spacing.sm,
  },
  picker: {
    width: 100,
    height: 150,
  },
  separator: {
    fontSize: 24,
    color: '#1a1a1a',
    fontWeight: '600',
    marginHorizontal: spacing.md,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  confirmButton: {
    backgroundColor: '#0e7490',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  confirmButtonText: {
    color: '#ffffff',
  },
})
