// This file contains placeholder functions for database operations
// In a real application, these would be replaced with actual database calls

interface Feedback {
  id: string
  userId?: string
  category: string
  productName: string
  feedback: string
  rating: number
  isAnonymous: boolean
  sentiment?: string
  keywords?: string[]
  tags?: string[]
  urgency?: string
  createdAt: Date
}

// In-memory storage for demo purposes
const feedbackStore: Feedback[] = []

/**
 * Stores feedback in the database
 */
export async function storeFeedback(data: Omit<Feedback, "id" | "createdAt">) {
  // Generate a random ID
  const id = Math.random().toString(36).substring(2, 15)

  // Create feedback object
  const feedback: Feedback = {
    ...data,
    id,
    createdAt: new Date(),
  }

  // In a real app, we would store this in a database
  feedbackStore.push(feedback)

  return { id, success: true }
}

/**
 * Retrieves feedback by ID
 */
export async function getFeedback(id: string) {
  // In a real app, we would query the database
  const feedback = feedbackStore.find((f) => f.id === id)

  if (!feedback) {
    // For demo purposes, return mock data if not found
    return {
      id,
      userId: "user123",
      category: "Kitchen Appliances",
      productName: "Philips Air Fryer HD9252",
      feedback:
        "I've been using this air fryer for about a month now. It cooks food evenly and is easy to clean. However, the basket is a bit small for a family of four, and the touch controls are sometimes unresponsive. Overall, it's a good product but could be improved.",
      rating: 4,
      isAnonymous: false,
      sentiment: "Positive",
      keywords: ["cooks evenly", "easy to clean", "small basket", "unresponsive controls"],
      tags: ["cooking quality", "cleaning", "size", "controls"],
      urgency: "Low",
      createdAt: new Date(),
    }
  }

  return feedback
}

/**
 * Retrieves all feedback with optional filtering
 */
export async function getAllFeedback(filters?: {
  category?: string
  sentiment?: string
  minRating?: number
  maxRating?: number
  startDate?: Date
  endDate?: Date
}) {
  // In a real app, we would query the database with filters
  let results = [...feedbackStore]

  // Apply filters if provided
  if (filters) {
    if (filters.category) {
      results = results.filter((f) => f.category === filters.category)
    }

    if (filters.sentiment) {
      results = results.filter((f) => f.sentiment === filters.sentiment)
    }

    if (filters.minRating !== undefined) {
      results = results.filter((f) => f.rating >= filters.minRating!)
    }

    if (filters.maxRating !== undefined) {
      results = results.filter((f) => f.rating <= filters.maxRating!)
    }

    if (filters.startDate) {
      results = results.filter((f) => f.createdAt >= filters.startDate!)
    }

    if (filters.endDate) {
      results = results.filter((f) => f.createdAt <= filters.endDate!)
    }
  }

  // If no results (for demo purposes), return mock data
  if (results.length === 0) {
    return [
      {
        id: "mock1",
        category: "Kitchen Appliances",
        productName: "Philips Air Fryer HD9252",
        feedback: "Great product, cooks evenly and is easy to clean.",
        rating: 5,
        isAnonymous: false,
        sentiment: "Positive",
        keywords: ["great", "cooks evenly", "easy to clean"],
        tags: ["cooking quality", "cleaning"],
        urgency: "Low",
        createdAt: new Date(),
      },
      {
        id: "mock2",
        category: "Personal Care",
        productName: "Philips Electric Shaver S5579/50",
        feedback: "Good shave quality but battery life could be improved.",
        rating: 3,
        isAnonymous: true,
        sentiment: "Neutral",
        keywords: ["good shave", "battery life", "improved"],
        tags: ["performance", "battery"],
        urgency: "Medium",
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
      },
      {
        id: "mock3",
        category: "Air Care",
        productName: "Philips Air Purifier AC2887",
        feedback: "Very disappointed. It's noisy and the app keeps disconnecting.",
        rating: 2,
        isAnonymous: false,
        sentiment: "Negative",
        keywords: ["disappointed", "noisy", "app", "disconnecting"],
        tags: ["noise", "connectivity"],
        urgency: "High",
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
      },
    ]
  }

  return results
}

/**
 * Gets analytics data for the dashboard
 */
export async function getAnalyticsData() {
  // In a real app, we would query the database and aggregate data

  // For demo purposes, return mock data
  return {
    totalFeedback: 1248,
    averageRating: 4.2,
    sentimentDistribution: {
      positive: 68,
      neutral: 22,
      negative: 10,
    },
    categoryDistribution: {
      "Kitchen Appliances": 32,
      "Personal Care": 28,
      "Air Care": 18,
      Ironing: 12,
      "Vacuum Cleaners": 8,
      Others: 2,
    },
    urgencyDistribution: {
      high: 42,
      medium: 156,
      low: 1050,
    },
    // Monthly feedback counts for the last 6 months
    monthlyTrends: [
      { month: "Nov", count: 180 },
      { month: "Dec", count: 220 },
      { month: "Jan", count: 205 },
      { month: "Feb", count: 190 },
      { month: "Mar", count: 250 },
      { month: "Apr", count: 280 },
    ],
  }
}
