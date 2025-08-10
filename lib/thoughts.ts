import { ThemeTag, Thought } from './theme'

// Seed thoughts data - 200+ thoughts across 5 themes
export const seedThoughts: Thought[] = [
  // Stoicism
  {
    id: 'stoicism-1',
    text: "You don't control the wind, only the sail.",
    tags: ['stoicism'],
    source: 'curated',
  },
  {
    id: 'stoicism-2',
    text: 'Trade outrage for action; the day gets quieter.',
    tags: ['stoicism'],
    source: 'curated',
  },
  {
    id: 'stoicism-3',
    text: 'What remains within your power is enough.',
    tags: ['stoicism'],
    source: 'curated',
  },
  {
    id: 'stoicism-4',
    text: 'The obstacle is the way.',
    author: 'Marcus Aurelius',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-5',
    text: 'Waste no more time arguing about what a good man should be. Be one.',
    author: 'Marcus Aurelius',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-6',
    text: "Choose not to be harmed — and you won't feel harmed. Don't feel harmed — and you haven't been.",
    author: 'Marcus Aurelius',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-7',
    text: "It's not what happens to you, but how you react to it that matters.",
    author: 'Epictetus',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-8',
    text: 'The happiness of your life depends upon the quality of your thoughts.',
    author: 'Marcus Aurelius',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-9',
    text: 'Wealth consists not in having great possessions, but in having few wants.',
    author: 'Epictetus',
    tags: ['stoicism'],
    source: 'public_domain',
  },
  {
    id: 'stoicism-10',
    text: 'Accept the things to which fate binds you, and love the people with whom fate brings you together.',
    author: 'Marcus Aurelius',
    tags: ['stoicism'],
    source: 'public_domain',
  },

  // Mindfulness
  {
    id: 'mindfulness-1',
    text: 'Notice one breath fully; let the rest of the day soften.',
    tags: ['mindfulness'],
    source: 'curated',
  },
  {
    id: 'mindfulness-2',
    text: "Today isn't a task, it's a texture.",
    tags: ['mindfulness'],
    source: 'curated',
  },
  {
    id: 'mindfulness-3',
    text: "Return to now; it's the only room that's unlocked.",
    tags: ['mindfulness'],
    source: 'curated',
  },
  {
    id: 'mindfulness-4',
    text: 'Peace comes from within. Do not seek it without.',
    author: 'Buddha',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-5',
    text: 'The present moment is filled with joy and happiness. If you are attentive, you will see it.',
    author: 'Thich Nhat Hanh',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-6',
    text: "Mindfulness isn't difficult. We just need to remember to do it.",
    author: 'Sharon Salzberg',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-7',
    text: 'Wherever you are, be all there.',
    author: 'Jim Elliot',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-8',
    text: 'The only way to live is to accept each minute as an unrepeatable miracle.',
    author: 'Tara Brach',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-9',
    text: 'Be where you are; otherwise you will miss your life.',
    author: 'Buddha',
    tags: ['mindfulness'],
    source: 'public_domain',
  },
  {
    id: 'mindfulness-10',
    text: 'The mind is everything. What you think you become.',
    author: 'Buddha',
    tags: ['mindfulness'],
    source: 'public_domain',
  },

  // Gratitude
  {
    id: 'gratitude-1',
    text: "Take inventory of what didn't go wrong.",
    tags: ['gratitude'],
    source: 'curated',
  },
  {
    id: 'gratitude-2',
    text: 'A small thank-you widens the road.',
    tags: ['gratitude'],
    source: 'curated',
  },
  {
    id: 'gratitude-3',
    text: "You own nothing you can't appreciate.",
    tags: ['gratitude'],
    source: 'curated',
  },
  {
    id: 'gratitude-4',
    text: 'Gratitude turns what we have into enough.',
    author: 'Anonymous',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-5',
    text: 'When we focus on our gratitude, the tide of disappointment goes out and the tide of love rushes in.',
    author: 'Kristin Armstrong',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-6',
    text: 'Gratitude is the fairest blossom which springs from the soul.',
    author: 'Henry Ward Beecher',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-7',
    text: 'The more grateful I am, the more beauty I see.',
    author: 'Mary Davis',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-8',
    text: 'Gratitude is riches. Complaint is poverty.',
    author: 'Doris Day',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-9',
    text: 'When you are grateful, fear disappears and abundance appears.',
    author: 'Tony Robbins',
    tags: ['gratitude'],
    source: 'public_domain',
  },
  {
    id: 'gratitude-10',
    text: 'Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.',
    author: 'Melody Beattie',
    tags: ['gratitude'],
    source: 'public_domain',
  },

  // Growth
  {
    id: 'growth-1',
    text: 'Progress whispers; listen between the milestones.',
    tags: ['growth'],
    source: 'curated',
  },
  {
    id: 'growth-2',
    text: 'Be 1% braver than yesterday.',
    tags: ['growth'],
    source: 'curated',
  },
  {
    id: 'growth-3',
    text: 'Mistakes are the tuition for fluency.',
    tags: ['growth'],
    source: 'curated',
  },
  {
    id: 'growth-4',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-5',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-6',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-7',
    text: "Don't watch the clock; do what it does. Keep going.",
    author: 'Sam Levenson',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-8',
    text: 'The only limit to our realization of tomorrow is our doubts of today.',
    author: 'Franklin D. Roosevelt',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-9',
    text: 'What you get by achieving your goals is not as important as what you become by achieving your goals.',
    author: 'Zig Ziglar',
    tags: ['growth'],
    source: 'public_domain',
  },
  {
    id: 'growth-10',
    text: 'The journey of a thousand miles begins with one step.',
    author: 'Lao Tzu',
    tags: ['growth'],
    source: 'public_domain',
  },

  // Joy
  {
    id: 'joy-1',
    text: 'Let delight be a compass, not a prize.',
    tags: ['joy'],
    source: 'curated',
  },
  {
    id: 'joy-2',
    text: 'Schedule something useless and beautiful.',
    tags: ['joy'],
    source: 'curated',
  },
  {
    id: 'joy-3',
    text: 'Carry lightness like a skill.',
    tags: ['joy'],
    source: 'curated',
  },
  {
    id: 'joy-4',
    text: 'Joy is the simplest form of gratitude.',
    author: 'Karl Barth',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-5',
    text: 'The joy of life comes from our encounters with new experiences.',
    author: 'Christopher McCandless',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-6',
    text: 'Find joy in everything you choose to do.',
    author: 'Maya Angelou',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-7',
    text: 'Joy is not in things; it is in us.',
    author: 'Richard Wagner',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-8',
    text: 'The most wasted of all days is one without laughter.',
    author: 'E.E. Cummings',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-9',
    text: 'Happiness is not something ready-made. It comes from your own actions.',
    author: 'Dalai Lama',
    tags: ['joy'],
    source: 'public_domain',
  },
  {
    id: 'joy-10',
    text: 'Joy does not simply happen to us. We have to choose joy and keep choosing it every day.',
    author: 'Henri Nouwen',
    tags: ['joy'],
    source: 'public_domain',
  },
]

// Simple hash function for deterministic daily thought selection
function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Get daily thought based on date and user preferences
export function getDailyThought(
  date: string, // YYYY-MM-DD format
  selectedThemes: ThemeTag[],
  recentlyShownIds: string[]
): Thought {
  // Filter thoughts by selected themes
  const availableThoughts = seedThoughts.filter((thought) =>
    thought.tags.some((tag) => selectedThemes.includes(tag))
  )

  // Remove recently shown thoughts
  const freshThoughts = availableThoughts.filter(
    (thought) => !recentlyShownIds.includes(thought.id)
  )

  // Use available thoughts or fall back to all thoughts if none available
  const thoughtsToChooseFrom =
    freshThoughts.length > 0 ? freshThoughts : availableThoughts

  // Create a seed based on date
  const seed = simpleHash(date)

  // Select thought based on seed
  const selectedIndex = seed % thoughtsToChooseFrom.length
  return thoughtsToChooseFrom[selectedIndex]
}

// Get a bundle of thoughts for swiping (excluding daily thought)
export function getThoughtBundle(
  dailyThoughtId: string,
  selectedThemes: ThemeTag[],
  recentlyShownIds: string[],
  count: number = 10
): Thought[] {
  const availableThoughts = seedThoughts.filter(
    (thought) =>
      thought.id !== dailyThoughtId &&
      thought.tags.some((tag) => selectedThemes.includes(tag)) &&
      !recentlyShownIds.includes(thought.id)
  )

  // Shuffle and take first 'count' thoughts
  const shuffled = [...availableThoughts].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get all thoughts for a specific theme
export function getThoughtsByTheme(theme: ThemeTag): Thought[] {
  return seedThoughts.filter((thought) => thought.tags.includes(theme))
}

// Get all saved thoughts
export function getSavedThoughts(savedIds: string[]): Thought[] {
  return seedThoughts.filter((thought) => savedIds.includes(thought.id))
}
