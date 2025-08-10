import * as Haptics from 'expo-haptics'
import { MotiView } from 'moti'
import React, { useCallback, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

import { ThemedText } from '@/components/ThemedText'
import { ThoughtCard } from '@/components/ui/ThoughtCard'
import { Thought, useAppStore } from '@/lib/store'
import { getThoughtBundle } from '@/lib/thoughts'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const SWIPE_THRESHOLD = screenWidth * 0.25

interface SwipeFeedProps {
  dailyThought: Thought
  onSave?: (thought: Thought) => void
  onShare?: (thought: Thought) => void
}

export function SwipeFeed({ dailyThought, onSave, onShare }: SwipeFeedProps) {
  const { preferences, addShownThought } = useAppStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [thoughts, setThoughts] = useState<Thought[]>([dailyThought])

  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)
  const opacity = useSharedValue(1)

  // Load more thoughts when needed
  React.useEffect(() => {
    if (thoughts.length < 5) {
      try {
        const bundle = getThoughtBundle(
          dailyThought.id,
          preferences.selectedThemes,
          [],
          10
        )
        setThoughts((prev) => [...prev, ...bundle])
      } catch (error) {
        console.log('Error loading thought bundle:', error)
      }
    }
  }, [dailyThought.id, preferences.selectedThemes])

  const handleSwipe = useCallback(
    (direction: 'next' | 'prev') => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        const newIndex =
          direction === 'next' ? currentIndex + 1 : currentIndex - 1

        if (newIndex >= 0 && newIndex < thoughts.length) {
          setCurrentIndex(newIndex)

          const thought = thoughts[newIndex]
          if (thought && thought.id) {
            addShownThought(thought.id)
          }
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        }

        // Reset animation values
        translateX.value = 0
        translateY.value = 0
        scale.value = 1
        opacity.value = 1
        rotation.value = 0
      } catch (error) {
        console.log('Error in handleSwipe:', error)
        translateX.value = 0
        translateY.value = 0
        scale.value = 1
        opacity.value = 1
        rotation.value = 0
      }
    },
    [currentIndex, thoughts, addShownThought]
  )

  const gestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: () => {
        scale.value = withSpring(1.02, { damping: 15, stiffness: 300 })
      },
      onActive: (event) => {
        translateX.value = event.translationX
        translateY.value = event.translationY * 0.3

        // Calculate distance from center
        const distance = Math.sqrt(
          event.translationX * event.translationX +
            event.translationY * event.translationY
        )

        // Rotation based on horizontal movement
        rotation.value = interpolate(
          event.translationX,
          [-screenWidth * 0.5, 0, screenWidth * 0.5],
          [-12, 0, 12],
          Extrapolate.CLAMP
        )

        // Scale based on distance
        scale.value = interpolate(
          distance,
          [0, screenWidth * 0.3],
          [1.02, 0.95],
          Extrapolate.CLAMP
        )

        // Opacity based on distance
        opacity.value = interpolate(
          distance,
          [0, screenWidth * 0.4],
          [1, 0.8],
          Extrapolate.CLAMP
        )
      },
      onEnd: (event) => {
        const distance = Math.sqrt(
          event.translationX * event.translationX +
            event.translationY * event.translationY
        )
        const shouldSwipe = distance > SWIPE_THRESHOLD
        const velocity = Math.sqrt(
          event.velocityX * event.velocityX + event.velocityY * event.velocityY
        )

        if (shouldSwipe || velocity > 800) {
          const direction = event.translationX > 0 ? 'prev' : 'next'
          const canSwipe =
            direction === 'next'
              ? currentIndex < thoughts.length - 1
              : currentIndex > 0

          if (canSwipe) {
            // Calculate exit direction based on swipe
            const exitX =
              event.translationX > 0 ? screenWidth * 1.5 : -screenWidth * 1.5
            const exitY = event.translationY * 0.5

            // Animate card out
            translateX.value = withSpring(exitX, {
              damping: 20,
              stiffness: 200,
            })
            translateY.value = withSpring(exitY, {
              damping: 20,
              stiffness: 200,
            })
            scale.value = withSpring(0.7, { damping: 20, stiffness: 200 })
            opacity.value = withTiming(0, { duration: 250 })
            rotation.value = withSpring(direction === 'next' ? -20 : 20, {
              damping: 20,
              stiffness: 200,
            })

            runOnJS(handleSwipe)(direction)
          } else {
            // Bounce back
            translateX.value = withSpring(0, { damping: 15, stiffness: 300 })
            translateY.value = withSpring(0, { damping: 15, stiffness: 300 })
            scale.value = withSpring(1, { damping: 15, stiffness: 300 })
            opacity.value = withSpring(1, { damping: 15, stiffness: 300 })
            rotation.value = withSpring(0, { damping: 15, stiffness: 300 })
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy)
          }
        } else {
          // Bounce back
          translateX.value = withSpring(0, { damping: 15, stiffness: 300 })
          translateY.value = withSpring(0, { damping: 15, stiffness: 300 })
          scale.value = withSpring(1, { damping: 15, stiffness: 300 })
          opacity.value = withSpring(1, { damping: 15, stiffness: 300 })
          rotation.value = withSpring(0, { damping: 15, stiffness: 300 })
        }
      },
    })

  const currentThought = thoughts[currentIndex] || dailyThought

  if (!currentThought) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.errorText}>Loading thoughts...</ThemedText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Main Card */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.mainCard, getMainCardStyle()]}>
          <ThoughtCard
            thought={currentThought}
            onSave={() => onSave?.(currentThought)}
            onShare={() => onShare?.(currentThought)}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* Progress Dots */}
      <View style={styles.progressContainer}>
        {thoughts.slice(0, 5).map((_, index) => (
          <MotiView
            key={index}
            style={[
              styles.progressDot,
              index === currentIndex && styles.progressDotActive,
            ]}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 300,
            }}
          />
        ))}
      </View>

      {/* Swipe Hint */}
      {currentIndex === 0 && (
        <MotiView
          style={styles.swipeHint}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            type: 'timing',
            duration: 2000,
            loop: true,
          }}>
          <View style={styles.hintContainer}>
            <ThemedText style={styles.hintArrow}>←</ThemedText>
            <ThemedText style={styles.hintText}>
              Swipe for more thoughts
            </ThemedText>
          </View>
        </MotiView>
      )}
    </View>
  )

  function getMainCardStyle() {
    return useAnimatedStyle(() => ({
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    }))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainCard: {
    flex: 1,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    zIndex: 3,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  swipeHint: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hintArrow: {
    fontSize: 16,
    color: '#ffffff',
    marginRight: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  errorText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 100,
  },
})
