import * as Haptics from 'expo-haptics'
import { router } from 'expo-router'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { AnimatedGradient } from '@/components/ui/AnimatedGradient'
import { ThemeChip } from '@/components/ui/ThemeChip'
import { TimePicker } from '@/components/ui/TimePicker'
import { useAppStore } from '@/lib/store'
import { ThemeTag, borderRadius, shadows, spacing } from '@/lib/theme'

const themes: ThemeTag[] = [
  'stoicism',
  'mindfulness',
  'gratitude',
  'growth',
  'joy',
]

export default function OnboardingScreen() {
  const { preferences, setPreferences } = useAppStore()
  const [selectedThemes, setSelectedThemes] = useState<ThemeTag[]>(
    preferences.selectedThemes
  )
  const [notificationTime, setNotificationTime] = useState(
    preferences.notificationTime
  )
  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleThemeToggle = (theme: ThemeTag) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    setSelectedThemes((prev) => {
      if (prev.includes(theme)) {
        return prev.filter((t) => t !== theme)
      } else {
        return [...prev, theme]
      }
    })
  }

  const handleTimeChange = (time: string) => {
    setNotificationTime(time)
  }

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    // Update preferences
    setPreferences({
      selectedThemes,
      notificationTime,
      hasCompletedOnboarding: true,
    })

    // Navigate to home
    router.replace('/(tabs)')
  }

  const canContinue = selectedThemes.length > 0

  return (
    <AnimatedGradient theme="mindfulness">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          style={styles.header}>
          <ThemedText variant="title" style={styles.title}>
            Welcome to Life Thoughts
          </ThemedText>
          <ThemedText variant="body" style={styles.subtitle}>
            Pick a few themes so your daily thought matches your mood
          </ThemedText>
        </MotiView>

        {/* Theme Selection */}
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
            Choose Your Themes
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            Select 1-5 themes that resonate with you
          </ThemedText>

          <View style={styles.themesGrid}>
            {themes.map((theme, index) => (
              <MotiView
                key={theme}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 300,
                  delay: 400 + index * 100,
                }}>
                <ThemeChip
                  theme={theme}
                  selected={selectedThemes.includes(theme)}
                  onPress={() => handleThemeToggle(theme)}
                  size="large"
                />
              </MotiView>
            ))}
          </View>
        </MotiView>

        {/* Notification Time */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 600,
          }}
          style={styles.section}>
          <ThemedText variant="title" style={styles.sectionTitle}>
            Daily Reminder
          </ThemedText>
          <ThemedText variant="body" style={styles.sectionSubtitle}>
            One gentle notification each morning
          </ThemedText>

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              setShowTimePicker(true)
            }}>
            <ThemedText style={styles.timeText}>{notificationTime}</ThemedText>
            <ThemedText style={styles.timeHint}>Tap to change</ThemedText>
          </TouchableOpacity>
        </MotiView>

        {/* Continue Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 800,
          }}
          style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !canContinue && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!canContinue}>
            <ThemedText
              style={[
                styles.continueText,
                !canContinue && styles.continueTextDisabled,
              ]}>
              Continue
            </ThemedText>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>

      {/* Time Picker Modal */}
      <TimePicker
        value={notificationTime}
        onValueChange={handleTimeChange}
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
      />
    </AnimatedGradient>
  )
}

const styles = StyleSheet.create({
  container: {
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
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.lg,
  },
  themesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'center',
  },
  timeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.light,
  },
  timeText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  timeHint: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.medium,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  continueText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  continueTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
})
