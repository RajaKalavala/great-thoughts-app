import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { useAppStore } from './store'

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export interface NotificationSettings {
  enabled: boolean
  time: string // HH:MM format
  lastScheduledDate?: string // YYYY-MM-DD format
}

// Request notification permissions
export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) {
    console.log('Notifications not available on simulator')
    return false
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      console.log('Notification permission not granted')
      return false
    }

    // Configure for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('daily-reminder', {
        name: 'Daily Reminder',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        sound: 'default',
      })
    }

    return true
  } catch (error) {
    console.error('Error requesting notification permissions:', error)
    return false
  }
}

// Schedule daily notification
export async function scheduleDailyNotification(
  time: string
): Promise<boolean> {
  try {
    // Cancel any existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync()

    // Parse time (HH:MM format)
    const [hour, minute] = time.split(':').map(Number)

    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      console.error('Invalid time format:', time)
      return false
    }

    // Create notification content
    const notificationContent = {
      title: 'Your Daily Thought',
      body: "Take a moment to reflect on today's wisdom",
      data: { type: 'daily-reminder' },
      sound: 'default',
    }

    // Schedule for today if time hasn't passed, otherwise schedule for tomorrow
    const now = new Date()
    const scheduledTime = new Date()
    scheduledTime.setHours(hour, minute, 0, 0)

    // If time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1)
    }

    // Schedule the notification
    const identifier = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    })

    console.log(
      'Daily notification scheduled for',
      time,
      'with ID:',
      identifier
    )

    // Update store with scheduling info
    const store = useAppStore.getState()
    store.setPreferences({
      notificationTime: time,
    })

    return true
  } catch (error) {
    console.error('Error scheduling daily notification:', error)
    return false
  }
}

// Cancel all scheduled notifications
export async function cancelAllNotifications(): Promise<void> {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync()
    console.log('All notifications cancelled')
  } catch (error) {
    console.error('Error cancelling notifications:', error)
  }
}

// Get scheduled notifications
export async function getScheduledNotifications(): Promise<
  Notifications.NotificationRequest[]
> {
  try {
    return await Notifications.getAllScheduledNotificationsAsync()
  } catch (error) {
    console.error('Error getting scheduled notifications:', error)
    return []
  }
}

// Check if notifications are enabled
export async function checkNotificationStatus(): Promise<{
  granted: boolean
  scheduled: boolean
}> {
  try {
    const { status } = await Notifications.getPermissionsAsync()
    const scheduledNotifications = await getScheduledNotifications()

    return {
      granted: status === 'granted',
      scheduled: scheduledNotifications.length > 0,
    }
  } catch (error) {
    console.error('Error checking notification status:', error)
    return { granted: false, scheduled: false }
  }
}

// Initialize notification system
export async function initializeNotifications(): Promise<void> {
  try {
    const { preferences } = useAppStore.getState()

    // Request permissions if not already granted
    const hasPermission = await requestNotificationPermissions()

    if (hasPermission && preferences.notificationTime) {
      // Schedule notification with current time preference
      await scheduleDailyNotification(preferences.notificationTime)
    }
  } catch (error) {
    console.error('Error initializing notifications:', error)
  }
}

// Update notification time
export async function updateNotificationTime(
  newTime: string
): Promise<boolean> {
  try {
    const hasPermission = await requestNotificationPermissions()

    if (!hasPermission) {
      console.log('Notification permissions not granted')
      return false
    }

    const success = await scheduleDailyNotification(newTime)

    if (success) {
      // Update store
      const store = useAppStore.getState()
      store.setPreferences({ notificationTime: newTime })
    }

    return success
  } catch (error) {
    console.error('Error updating notification time:', error)
    return false
  }
}

// Handle notification response (when user taps notification)
export function setupNotificationResponseHandler(): void {
  Notifications.addNotificationResponseReceivedListener((response) => {
    const { type } = response.notification.request.content.data || {}

    if (type === 'daily-reminder') {
      // Navigate to home screen to show daily thought
      // This will be handled by the app's navigation system
      console.log('Daily reminder tapped - navigating to home')
    }
  })
}

// Handle notification received (when app is in foreground)
export function setupNotificationReceivedHandler(): void {
  Notifications.addNotificationReceivedListener((notification) => {
    const { type } = notification.request.content.data || {}

    if (type === 'daily-reminder') {
      console.log('Daily reminder received while app is open')
      // Could show an in-app notification or update UI
    }
  })
}
