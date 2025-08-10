import { LinearGradient } from 'expo-linear-gradient'
import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useAppStore } from '@/lib/store'
import { ThemeTag, themeBackgrounds } from '@/lib/theme'

interface AnimatedGradientProps {
  theme: ThemeTag
  children?: React.ReactNode
  style?: any
}

export function AnimatedGradient({
  theme,
  children,
  style,
}: AnimatedGradientProps) {
  const { preferences } = useAppStore()
  const colors = themeBackgrounds[theme]
  const reduceMotion = preferences.reduceMotion

  return (
    <View style={[styles.container, style]}>
      <MotiView
        style={StyleSheet.absoluteFillObject}
        animate={
          reduceMotion
            ? {}
            : {
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }
        }
        transition={{
          type: 'timing',
          duration: 8000,
          loop: true,
        }}>
        <LinearGradient
          colors={[colors.start, colors.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      </MotiView>

      {/* Subtle floating particles effect */}
      {!reduceMotion && (
        <>
          <MotiView
            style={[styles.particle, styles.particle1]}
            animate={{
              translateY: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              type: 'timing',
              duration: 6000,
              loop: true,
            }}
          />
          <MotiView
            style={[styles.particle, styles.particle2]}
            animate={{
              translateY: [0, -15, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              type: 'timing',
              duration: 8000,
              loop: true,
              delay: 2000,
            }}
          />
          <MotiView
            style={[styles.particle, styles.particle3]}
            animate={{
              translateY: [0, -25, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              type: 'timing',
              duration: 7000,
              loop: true,
              delay: 4000,
            }}
          />
        </>
      )}

      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  particle: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  particle1: {
    top: '20%',
    left: '15%',
  },
  particle2: {
    top: '60%',
    right: '20%',
  },
  particle3: {
    bottom: '30%',
    left: '25%',
  },
})
