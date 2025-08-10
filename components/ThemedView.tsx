import React from 'react'
import { StyleSheet, useColorScheme, View, ViewProps } from 'react-native'

import { useAppStore } from '@/lib/store'
import { getColors, getEffectiveThemeMode } from '@/lib/theme'

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode
}

export function ThemedView({ style, children, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme()
  const { preferences } = useAppStore()

  const effectiveMode = getEffectiveThemeMode(
    preferences.themeMode,
    colorScheme
  )
  const colors = getColors(effectiveMode)

  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
})
