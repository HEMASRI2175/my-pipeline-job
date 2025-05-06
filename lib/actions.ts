"use server"

import { analyzeFeedback, translateToEnglish, generateProductRecommendations } from "./ai-service"

// In-memory storage for demo purposes - in a real app, this would be a database
const feedbackStore = new Map<string, any>()

/**
 * Submits feedback and performs AI analysis
 */
export async function submitFeedback(data: {
  category: string
  productName: string
  feedback: string
  rating: number
  isAnonymous: boolean
  consentGiven: boolean
}) {
  // Validate the data
  if (!data.category || !data.productName || !data.feedback || !data.rating || !data.consentGiven) {
    throw new Error("Missing required fields")
  }

  try {
    // Step 1: Translate feedback to English if needed
    const translatedFeedback = await translateToEnglish(data.feedback)

    // Step 2: Analyze the feedback using OpenAI
    const analysis = await analyzeFeedback(translatedFeedback, data.category, data.productName)

    // Generate a unique ID for this feedback
    const id = Math.random().toString(36).substring(2, 15)

    // Store the feedback data and analysis for retrieval
    feedbackStore.set(id, {
      id,
      productName: data.productName,
      category: data.category,
      feedback: translatedFeedback,
      rating: data.rating,
      isAnonymous: data.isAnonymous,
      sentiment: analysis.sentiment,
      keywords: analysis.keywords,
      tags: analysis.tags,
      urgency: analysis.urgency,
      createdAt: new Date().toISOString(),
    })

    return {
      id,
      success: true,
    }
  } catch (error) {
    console.error("Error submitting feedback:", error)
    throw new Error("Failed to submit feedback. Please try again.")
  }
}

/**
 * Retrieves feedback analysis and generates product recommendations
 */
export async function getFeedbackAnalysis(id: string) {
  try {
    // Retrieve the stored feedback
    const feedback = feedbackStore.get(id)

    if (!feedback) {
      throw new Error("Feedback not found")
    }

    // Generate product recommendations based on the feedback
    const relatedProducts = await generateProductRecommendations(
      feedback.feedback,
      feedback.category,
      feedback.productName,
    )

    return {
      analysis: feedback,
      relatedProducts,
    }
  } catch (error) {
    console.error("Error retrieving feedback analysis:", error)
    throw new Error("Failed to retrieve feedback analysis")
  }
}
