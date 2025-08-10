import * as Haptics from 'expo-haptics'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { TimePicker } from '@/components/ui/TimePicker'
import { useAppStore } from '@/lib/store'
import { borderRadius, shadows, spacing } from '@/lib/theme'

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const { preferences, setPreferences } = useAppStore()
  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleThemeModeChange = (mode: 'light' | 'dark' | 'system') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setPreferences({ themeMode: mode })
  }

  const handleFontScaleChange = (scale: number) => {
    setPreferences({ fontScale: scale })
  }

  const handleReduceMotionToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setPreferences({ reduceMotion: !preferences.reduceMotion })
  }

  const handleNotificationTimeChange = (time: string) => {
    setPreferences({ notificationTime: time })
  }

  const themeModes = [
    { value: 'system', label: 'System', description: 'Follow device settings' },
    { value: 'light', label: 'Light', description: 'Always light theme' },
    { value: 'dark', label: 'Dark', description: 'Always dark theme' },
  ] as const

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          style={styles.header}>
          <ThemedText variant="title" style={styles.title}>
            Settings
          </ThemedText>
          <ThemedText variant="body" style={styles.subtitle}>
            Customize your Life Thoughts experience
          </ThemedText>
        </MotiView>

        {/* Theme Mode */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 100,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            Theme
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            Choose your preferred appearance
          </ThemedText>

          <View style={styles.optionsContainer}>
            {themeModes.map((mode, index) => (
              <MotiView
                key={mode.value}
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 300,
                  delay: 200 + index * 100,
                }}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    preferences.themeMode === mode.value &&
                      styles.optionButtonActive,
                  ]}
                  onPress={() => handleThemeModeChange(mode.value)}>
                  <View style={styles.optionContent}>
                    <ThemedText
                      variant="body"
                      style={[
                        styles.optionLabel,
                        preferences.themeMode === mode.value &&
                          styles.optionLabelActive,
                      ]}>
                      {mode.label}
                    </ThemedText>
                    <ThemedText
                      variant="caption"
                      style={[
                        styles.optionDescription,
                        preferences.themeMode === mode.value &&
                          styles.optionDescriptionActive,
                      ]}>
                      {mode.description}
                    </ThemedText>
                  </View>
                  {preferences.themeMode === mode.value && (
                    <View style={styles.checkmark}>
                      <ThemedText style={styles.checkmarkText}>✓</ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Font Scale */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 200,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            Font Size
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            Adjust text size for better readability
          </ThemedText>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  {
                    width: `${((preferences.fontScale - 0.9) / 0.3) * 100}%`,
                  },
                ]}
              />
              <TouchableOpacity
                style={[
                  styles.sliderThumb,
                  { left: `${((preferences.fontScale - 0.9) / 0.3) * 100}%` },
                ]}
                onPress={() => {
                  // Simple toggle between 0.9, 1.0, 1.1, 1.2
                  const scales = [0.9, 1.0, 1.1, 1.2]
                  const currentIndex = scales.indexOf(preferences.fontScale)
                  const nextIndex = (currentIndex + 1) % scales.length
                  handleFontScaleChange(scales[nextIndex])
                }}
              />
            </View>
            <View style={styles.sliderLabels}>
              <ThemedText variant="caption" style={styles.sliderLabel}>
                Small
              </ThemedText>
              <ThemedText variant="caption" style={styles.sliderLabel}>
                Large
              </ThemedText>
            </View>
            <ThemedText variant="body" style={styles.currentScale}>
              {Math.round(preferences.fontScale * 100)}%
            </ThemedText>
          </View>
        </MotiView>

        {/* Reduce Motion */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 300,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            Motion
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            Reduce animations for accessibility
          </ThemedText>

          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={handleReduceMotionToggle}>
            <View style={styles.toggleContent}>
              <ThemedText variant="body" style={styles.toggleLabel}>
                Reduce Motion
              </ThemedText>
              <ThemedText variant="caption" style={styles.toggleDescription}>
                Minimize animations and transitions
              </ThemedText>
            </View>
            <View
              style={[
                styles.toggleSwitch,
                preferences.reduceMotion && styles.toggleSwitchActive,
              ]}>
              <View
                style={[
                  styles.toggleThumb,
                  preferences.reduceMotion && styles.toggleThumbActive,
                ]}
              />
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* Notification Time */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 400,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            Notifications
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            Set your daily reminder time
          </ThemedText>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              setShowTimePicker(true)
            }}>
            <View style={styles.timeContent}>
              <ThemedText variant="body" style={styles.timeLabel}>
                Daily Reminder
              </ThemedText>
              <ThemedText variant="caption" style={styles.timeDescription}>
                One gentle notification each morning
              </ThemedText>
            </View>
            <View style={styles.timeValue}>
              <ThemedText variant="body" style={styles.timeText}>
                {preferences.notificationTime}
              </ThemedText>
              <ThemedText variant="caption" style={styles.timeHint}>
                Tap to change
              </ThemedText>
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* App Info */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 500,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            About
          </ThemedText>

          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <ThemedText variant="body" style={styles.infoLabel}>
                Version
              </ThemedText>
              <ThemedText variant="body" style={styles.infoValue}>
                1.0.0
              </ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText variant="body" style={styles.infoLabel}>
                Build
              </ThemedText>
              <ThemedText variant="body" style={styles.infoValue}>
                Step 5 Complete
              </ThemedText>
            </View>
          </View>
        </MotiView>
      </ScrollView>

      {/* Time Picker Modal */}
      <TimePicker
        value={preferences.notificationTime}
        onValueChange={handleNotificationTimeChange}
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: spacing.lg,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    ...shadows.light,
  },
  optionButtonActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  optionLabelActive: {
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  optionDescriptionActive: {
    opacity: 0.8,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  sliderContainer: {
    alignItems: 'center',
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    position: 'relative',
    marginBottom: spacing.sm,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    ...shadows.medium,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.sm,
  },
  sliderLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  currentScale: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    ...shadows.light,
  },
  toggleContent: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  toggleSwitch: {
    width: 51,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 2,
  },
  toggleSwitchActive: {
    backgroundColor: '#007AFF',
  },
  toggleThumb: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    backgroundColor: '#ffffff',
    ...shadows.light,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    ...shadows.light,
  },
  timeContent: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  timeDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  timeValue: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: spacing.xs,
  },
  timeHint: {
    fontSize: 12,
    opacity: 0.7,
  },
  infoContainer: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  infoLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
})
