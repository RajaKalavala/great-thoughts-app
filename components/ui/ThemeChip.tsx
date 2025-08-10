import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemeTag, borderRadius, spacing, themeBackgrounds } from '@/lib/theme'

interface ThemeChipProps {
  theme: ThemeTag
  selected?: boolean
  onPress?: () => void
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export function ThemeChip({
  theme,
  selected = false,
  onPress,
  size = 'medium',
  disabled = false,
}: ThemeChipProps) {
  const colors = themeBackgrounds[theme]
  const isInteractive = onPress && !disabled

  const sizeMap = {
    small: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      fontSize: 12,
    },
    medium: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      fontSize: 14,
    },
    large: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      fontSize: 16,
    },
  }

  const Container = isInteractive ? TouchableOpacity : View

  return (
    <Container
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        {
          paddingHorizontal: sizeMap[size].paddingHorizontal,
          paddingVertical: sizeMap[size].paddingVertical,
        },
      ]}>
      <MotiView
        style={[
          styles.background,
          {
            backgroundColor: selected
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(255, 255, 255, 0.15)',
            borderRadius: borderRadius.lg,
          },
        ]}
        animate={{
          scale: selected ? 1.05 : 1,
          opacity: disabled ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 300,
        }}>
        <ThemedText
          style={[
            styles.text,
            {
              fontSize: sizeMap[size].fontSize,
              color: '#ffffff',
              fontWeight: selected ? '600' : '500',
            },
          ]}>
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </ThemedText>
      </MotiView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  background: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
})
