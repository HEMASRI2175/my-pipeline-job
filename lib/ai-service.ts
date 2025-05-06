import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

/**
 * Analyzes feedback text to extract sentiment, keywords, tags, and urgency
 */
export async function analyzeFeedback(feedback: string, category: string, productName: string) {
  try {
    const prompt = `
Analyze the following customer feedback for a Philips product and return a JSON object with the following properties:
- sentiment: The overall sentiment (Positive, Neutral, or Negative)
- keywords: An array of 3-5 key phrases or words extracted from the feedback
- tags: An array of 2-4 issue categories or aspects mentioned (e.g., durability, performance, usability, value, etc.)
- urgency: Priority level (High, Medium, or Low) based on the severity of issues mentioned

Product Category: ${category}
Product Name: ${productName}
Feedback: "${feedback}"

Return ONLY a valid JSON object with no additional text or explanation.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    try {
      // Parse the response as JSON
      const result = JSON.parse(text)
      return {
        sentiment: result.sentiment as "Positive" | "Neutral" | "Negative",
        keywords: result.keywords as string[],
        tags: result.tags as string[],
        urgency: result.urgency as "High" | "Medium" | "Low",
      }
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError)
      // Fallback to default values if parsing fails
      return fallbackAnalysis(feedback)
    }
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    // Fallback to simple analysis if API call fails
    return fallbackAnalysis(feedback)
  }
}

/**
 * Translates text to English if it's in another language
 */
export async function translateToEnglish(text: string) {
  try {
    const prompt = `
Detect the language of the following text. If it's not in English, translate it to English. 
If it's already in English, return the original text unchanged.

Text: "${text}"

Return ONLY the translated text (or original if already English) with no additional explanation.
`

    const { text: translatedText } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    return translatedText.trim()
  } catch (error) {
    console.error("Error translating text:", error)
    // Return original text if translation fails
    return text
  }
}

/**
 * Generates product recommendations based on feedback
 */
export async function generateProductRecommendations(feedback: string, category: string, productName: string) {
  try {
    const prompt = `
Based on the following customer feedback for a Philips product, suggest 6 related products that might interest the customer.
Return a JSON array of product objects with these properties:
- id: A unique string identifier
- title: Product name (should be realistic Philips product names)
- price: Price in Indian Rupees (₹)
- source: The source of the product (randomly assign "Philips", "Amazon", or "Flipkart")

Make the recommendations relevant to the feedback - if they mentioned issues, suggest better alternatives.
If they liked the product, suggest complementary products or accessories.

Product Category: ${category}
Product Name: ${productName}
Feedback: "${feedback}"

Return ONLY a valid JSON array with no additional text or explanation.
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    try {
      // Parse the response as JSON
      const products = JSON.parse(text)

      // Add placeholder images and links
      return products.map((product: any, index: number) => ({
        ...product,
        image: `/placeholder.svg?height=300&width=300`,
        link: getProductLink(product.title, product.source),
      }))
    } catch (parseError) {
      console.error("Error parsing product recommendations:", parseError)
      // Return fallback recommendations
      return getFallbackRecommendations(category)
    }
  } catch (error) {
    console.error("Error generating product recommendations:", error)
    // Return fallback recommendations
    return getFallbackRecommendations(category)
  }
}

// Helper function to generate product links
function getProductLink(productTitle: string, source: string) {
  const encodedTitle = encodeURIComponent(productTitle)

  switch (source) {
    case "Philips":
      return `https://www.philips.co.in/c-m-ho/search?q=${encodedTitle}`
    case "Amazon":
      return `https://www.amazon.in/s?k=${encodedTitle}`
    case "Flipkart":
      return `https://www.flipkart.com/search?q=${encodedTitle}`
    default:
      return `https://www.philips.co.in/c-m-ho/search?q=${encodedTitle}`
  }
}

// Fallback analysis function for when the API call fails
function fallbackAnalysis(feedback: string) {
  // Simple sentiment analysis based on keywords
  const positiveWords = ["love", "great", "excellent", "good", "amazing", "easy", "perfect"]
  const negativeWords = ["bad", "poor", "terrible", "disappointed", "issue", "problem", "broken"]

  const words = feedback.toLowerCase().split(/\s+/)

  let positiveCount = 0
  let negativeCount = 0

  words.forEach((word) => {
    if (positiveWords.some((pw) => word.includes(pw))) positiveCount++
    if (negativeWords.some((nw) => word.includes(nw))) negativeCount++
  })

  // Determine sentiment
  let sentiment: "Positive" | "Neutral" | "Negative"
  if (positiveCount > negativeCount) {
    sentiment = "Positive"
  } else if (negativeCount > positiveCount) {
    sentiment = "Negative"
  } else {
    sentiment = "Neutral"
  }

  // Extract potential keywords
  const keywords = words
    .filter((word) => word.length > 4)
    .filter((word, index, self) => self.indexOf(word) === index)
    .slice(0, 4)

  // Generate tags based on common product issues
  const tagCategories = {
    performance: ["slow", "fast", "efficient", "inefficient", "performance"],
    durability: ["durable", "broke", "lasting", "sturdy", "fragile"],
    usability: ["easy", "difficult", "intuitive", "confusing", "user-friendly"],
    noise: ["quiet", "loud", "noisy", "silent", "sound"],
    value: ["expensive", "cheap", "worth", "value", "price", "cost"],
  }

  const tags: string[] = []

  Object.entries(tagCategories).forEach(([category, categoryWords]) => {
    if (words.some((word) => categoryWords.includes(word))) {
      tags.push(category)
    }
  })

  // Determine urgency based on sentiment and specific urgent words
  const urgentWords = ["immediately", "urgent", "dangerous", "safety", "hazard", "broken"]
  const hasUrgentWords = words.some((word) => urgentWords.includes(word))

  let urgency: "Low" | "Medium" | "High"
  if (sentiment === "Negative" && hasUrgentWords) {
    urgency = "High"
  } else if (sentiment === "Negative") {
    urgency = "Medium"
  } else {
    urgency = "Low"
  }

  return {
    sentiment,
    keywords,
    tags: tags.length > 0 ? tags : ["general"],
    urgency,
  }
}

// Fallback product recommendations
function getFallbackRecommendations(category: string) {
  const recommendations = {
    "Kitchen Appliances": [
      {
        id: "p1",
        title: "Philips Air Fryer HD9270/90",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹12,999",
        link: "https://www.philips.co.in/c-e/ho/cooking/airfryer",
        source: "Philips",
      },
      {
        id: "p2",
        title: "Philips Air Fryer XXL HD9860",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹16,499",
        link: "https://www.amazon.in/s?k=philips+air+fryer+xxl",
        source: "Amazon",
      },
    ],
    "Personal Care": [
      {
        id: "p1",
        title: "Philips OneBlade Pro QP6550/30",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹4,999",
        link: "https://www.philips.co.in/c-m-pe/oneblade-face-style-shave",
        source: "Philips",
      },
      {
        id: "p2",
        title: "Philips Hair Dryer BHD274/00",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹2,999",
        link: "https://www.amazon.in/s?k=philips+hair+dryer",
        source: "Amazon",
      },
    ],
    "Air Care": [
      {
        id: "p1",
        title: "Philips Air Purifier AC2887",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹15,999",
        link: "https://www.philips.co.in/c-m-ho/air-purifier-and-air-humidifier",
        source: "Philips",
      },
      {
        id: "p2",
        title: "Philips Air Purifier 3000i Series",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹29,999",
        link: "https://www.amazon.in/s?k=philips+air+purifier+3000i",
        source: "Amazon",
      },
    ],
  }

  // Return category-specific recommendations or default ones
  return (
    recommendations[category as keyof typeof recommendations] || [
      {
        id: "p1",
        title: "Philips Product",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹9,999",
        link: "https://www.philips.co.in",
        source: "Philips",
      },
      {
        id: "p2",
        title: "Philips Product Premium",
        image: "/placeholder.svg?height=300&width=300",
        price: "₹14,999",
        link: "https://www.amazon.in/s?k=philips",
        source: "Amazon",
      },
    ]
  )
}
