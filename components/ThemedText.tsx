import React from 'react'
import { StyleSheet, Text, TextProps, useColorScheme } from 'react-native'

import { useAppStore } from '@/lib/store'
import { getColors, scaleTypography, ThemeMode } from '@/lib/theme'

type TypographyVariant = 'headline' | 'title' | 'body' | 'caption' | 'meta'

interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant
  scale?: number
  children: React.ReactNode
}

export function ThemedText({
  variant = 'body',
  scale = 1,
  style,
  children,
  ...props
}: ThemedTextProps) {
  const colorScheme = useColorScheme()
  const { preferences } = useAppStore()

  const mode: ThemeMode = colorScheme === 'dark' ? 'dark' : 'light'
  const colors = getColors(mode)
  const sizes = scaleTypography(scale)

  const sizeMap = {
    headline: sizes.headline,
    title: sizes.title,
    body: sizes.body,
    caption: sizes.caption,
    meta: sizes.meta,
  } as const

  // Font family mapping - using system fonts for now
  const fontFamilyMap = {
    headline: 'System', // Will be PlayfairDisplay-Bold when fonts are fixed
    title: 'System', // Will be PlusJakartaSans-Semibold
    body: 'System', // Will be PlusJakartaSans-Regular
    caption: 'System',
    meta: 'System',
  } as const

  const fontWeightMap = {
    headline: '700',
    title: '600',
    body: '400',
    caption: '400',
    meta: '400',
  } as const

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          color: colors.text,
          fontSize: sizeMap[variant],
          fontFamily: fontFamilyMap[variant],
          fontWeight: fontWeightMap[variant],
        },
        style,
      ]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
})
