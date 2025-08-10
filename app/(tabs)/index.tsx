import { AnimatedGradient } from '@/components/ui/AnimatedGradient'
import { SwipeFeed } from '@/components/ui/SwipeFeed'
import { useAppStore } from '@/lib/store'
import { getDailyThought } from '@/lib/thoughts'

export default function HomeScreen() {
  const { preferences } = useAppStore()

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0]

  // Get daily thought
  const dailyThought = getDailyThought(
    today,
    preferences.selectedThemes,
    [] // No recently shown thoughts for demo
  )

  const themeTag = dailyThought.tags[0]

  const handleSave = (thought: any) => {
    console.log('Thought saved:', thought.id)
  }

  const handleShare = (thought: any) => {
    console.log('Share thought:', thought.text)
  }

  return (
    <AnimatedGradient theme={themeTag}>
      <SwipeFeed
        dailyThought={dailyThought}
        onSave={handleSave}
        onShare={handleShare}
      />
    </AnimatedGradient>
  )
}
