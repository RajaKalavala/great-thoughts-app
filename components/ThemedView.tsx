import React from 'react'
import { StyleSheet, useColorScheme, View, ViewProps } from 'react-native'

import { getColors, ThemeMode } from '@/lib/theme'

interface ThemedViewProps extends ViewProps {
  children: React.ReactNode
}

export function ThemedView({ style, children, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme()
  const mode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light'
  const colors = getColors(mode)

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
