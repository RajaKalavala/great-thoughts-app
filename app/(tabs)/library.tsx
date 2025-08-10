import * as Haptics from 'expo-haptics'
import { MotiView } from 'moti'
import React, { useMemo, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { ThemeChip } from '@/components/ui/ThemeChip'
import { useAppStore } from '@/lib/store'
import { ThemeTag, borderRadius, shadows, spacing } from '@/lib/theme'
import { getSavedThoughts } from '@/lib/thoughts'

type ViewMode = 'grid' | 'list'

export default function LibraryScreen() {
  const colorScheme = useColorScheme()
  const { savedThoughtIds, unsaveThought } = useAppStore()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedTheme, setSelectedTheme] = useState<ThemeTag | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get saved thoughts
  const savedThoughts = useMemo(() => {
    return getSavedThoughts(Array.from(savedThoughtIds))
  }, [savedThoughtIds])

  // Filter thoughts by theme and search
  const filteredThoughts = useMemo(() => {
    let filtered = savedThoughts

    // Filter by theme
    if (selectedTheme !== 'all') {
      filtered = filtered.filter((thought) =>
        thought.tags.includes(selectedTheme)
      )
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (thought) =>
          thought.text.toLowerCase().includes(query) ||
          (thought.author && thought.author.toLowerCase().includes(query))
      )
    }

    return filtered
  }, [savedThoughts, selectedTheme, searchQuery])

  const handleThemeFilter = (theme: ThemeTag | 'all') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setSelectedTheme(theme)
  }

  const handleViewModeToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setViewMode(viewMode === 'grid' ? 'list' : 'grid')
  }

  const handleUnsaveThought = (thoughtId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    unsaveThought(thoughtId)
  }

  const themes: (ThemeTag | 'all')[] = [
    'all',
    'stoicism',
    'mindfulness',
    'gratitude',
    'growth',
    'joy',
  ]

  const renderThoughtCard = ({
    item: thought,
    index,
  }: {
    item: any
    index: number
  }) => (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 300,
        delay: index * 50,
      }}
      style={[
        styles.thoughtCard,
        viewMode === 'grid' ? styles.gridCard : styles.listCard,
      ]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => handleUnsaveThought(thought.id)}
        activeOpacity={0.8}>
        {/* Theme Chip */}
        <View style={styles.themeContainer}>
          <ThemeChip theme={thought.tags[0]} size="small" />
        </View>

        {/* Quote Text */}
        <ThemedText
          variant="body"
          style={[
            styles.quoteText,
            viewMode === 'grid' ? styles.gridQuoteText : styles.listQuoteText,
          ]}
          numberOfLines={viewMode === 'grid' ? 3 : 2}>
          "{thought.text}"
        </ThemedText>

        {/* Author */}
        {thought.author && (
          <ThemedText
            variant="caption"
            style={styles.authorText}
            numberOfLines={1}>
            — {thought.author}
          </ThemedText>
        )}

        {/* Unsave Button */}
        <TouchableOpacity
          style={styles.unsaveButton}
          onPress={() => handleUnsaveThought(thought.id)}>
          <ThemedText style={styles.unsaveIcon}>×</ThemedText>
        </TouchableOpacity>
      </TouchableOpacity>
    </MotiView>
  )

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <ThemedText variant="title" style={styles.title}>
            Library
          </ThemedText>
          <ThemedText variant="body" style={styles.subtitle}>
            {filteredThoughts.length} saved thought
            {filteredThoughts.length !== 1 ? 's' : ''}
          </ThemedText>
        </View>

        {/* View Mode Toggle */}
        <TouchableOpacity
          style={styles.viewModeButton}
          onPress={handleViewModeToggle}>
          <ThemedText style={styles.viewModeIcon}>
            {viewMode === 'grid' ? '☰' : '⊞'}
          </ThemedText>
        </TouchableOpacity>
      </MotiView>

      {/* Search Bar */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 100 }}
        style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <ThemedText style={styles.searchIcon}>🔍</ThemedText>
          <TextInput
            style={styles.searchInput}
            placeholder="Search saved thoughts..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}>
              <ThemedText style={styles.clearIcon}>×</ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </MotiView>

      {/* Theme Filters */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300, delay: 200 }}
        style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}>
          {themes.map((theme, index) => (
            <MotiView
              key={theme}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 300,
                delay: 300 + index * 100,
              }}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  selectedTheme === theme && styles.filterChipActive,
                ]}
                onPress={() => handleThemeFilter(theme)}>
                <ThemedText
                  style={[
                    styles.filterText,
                    selectedTheme === theme && styles.filterTextActive,
                  ]}>
                  {theme === 'all'
                    ? 'All'
                    : theme.charAt(0).toUpperCase() + theme.slice(1)}
                </ThemedText>
              </TouchableOpacity>
            </MotiView>
          ))}
        </ScrollView>
      </MotiView>

      {/* Thoughts List */}
      {filteredThoughts.length > 0 ? (
        <FlatList
          data={filteredThoughts}
          renderItem={renderThoughtCard}
          keyExtractor={(item) => item.id}
          key={viewMode} // Force re-render when view mode changes
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 300,
            delay: 400,
          }}
          style={styles.emptyContainer}>
          <ThemedText style={styles.emptyIcon}>📚</ThemedText>
          <ThemedText variant="title" style={styles.emptyTitle}>
            {searchQuery.trim()
              ? 'No matching thoughts'
              : 'No saved thoughts yet'}
          </ThemedText>
          <ThemedText variant="body" style={styles.emptySubtitle}>
            {searchQuery.trim()
              ? 'Try adjusting your search or filters'
              : 'Save thoughts you love by tapping the heart button'}
          </ThemedText>
        </MotiView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  viewModeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.light,
  },
  viewModeIcon: {
    fontSize: 20,
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.light,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  filtersContainer: {
    marginBottom: spacing.lg,
  },
  filtersScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    ...shadows.light,
  },
  filterChipActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  filterTextActive: {
    fontWeight: '600',
    opacity: 1,
  },
  listContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  separator: {
    height: spacing.md,
  },
  thoughtCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  gridCard: {
    aspectRatio: 0.85,
  },
  listCard: {
    height: 120,
  },
  cardContent: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.light,
    position: 'relative',
  },
  themeContainer: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    zIndex: 1,
  },
  quoteText: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  gridQuoteText: {
    fontSize: 14,
    lineHeight: 18,
  },
  listQuoteText: {
    fontSize: 16,
    lineHeight: 22,
  },
  authorText: {
    fontSize: 12,
    opacity: 0.7,
    fontStyle: 'italic',
  },
  unsaveButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  unsaveIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff0000',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
  },
})
