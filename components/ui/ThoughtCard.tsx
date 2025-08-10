import * as Haptics from 'expo-haptics'
import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemeChip } from '@/components/ui/ThemeChip'
import { Thought, useAppStore } from '@/lib/store'
import { shadows, spacing } from '@/lib/theme'

interface ThoughtCardProps {
  thought: Thought
  onSave?: () => void
  onShare?: () => void
  style?: any
}

export function ThoughtCard({
  thought,
  onSave,
  onShare,
  style,
}: ThoughtCardProps) {
  const { isThoughtSaved, saveThought, unsaveThought } = useAppStore()
  const isSaved = isThoughtSaved(thought.id)
  const themeTag = thought.tags[0]

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    if (isSaved) {
      unsaveThought(thought.id)
    } else {
      saveThought(thought.id)
    }
    onSave?.()
  }

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onShare?.()
  }

  return (
    <MotiView
      style={[styles.container, style]}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      from={{
        scale: 0.95,
        opacity: 0,
      }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 300,
      }}>
      {/* Theme Chip */}
      <View style={styles.themeContainer}>
        <ThemeChip theme={themeTag} size="small" />
      </View>

      {/* Quote Content */}
      <View style={styles.content}>
        <ThemedText variant="headline" style={styles.quoteText}>
          "{thought.text}"
        </ThemedText>

        {thought.author && (
          <ThemedText variant="body" style={styles.authorText}>
            — {thought.author}
          </ThemedText>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleSave}
          style={[styles.actionButton, isSaved && styles.actionButtonActive]}>
          <ThemedText
            style={[styles.actionText, isSaved && styles.actionTextActive]}>
            {isSaved ? '♥' : '♡'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <ThemedText style={styles.actionText}>⤴</ThemedText>
        </TouchableOpacity>
      </View>
    </MotiView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeContainer: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
  },
  content: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  quoteText: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    marginBottom: spacing.md,
  },
  authorText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.light,
  },
  actionButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionText: {
    fontSize: 20,
    color: '#ffffff',
  },
  actionTextActive: {
    color: '#ff6b6b',
  },
})
