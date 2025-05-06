"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ThumbsUp, AlertTriangle, Info, ArrowLeft, ExternalLink } from "lucide-react"
import { getFeedbackAnalysis } from "@/lib/actions"
import { ProductCard } from "@/components/product/product-card"

interface FeedbackAnalysis {
  id: string
  productName: string
  category: string
  feedback: string
  rating: number
  sentiment: "Positive" | "Neutral" | "Negative"
  keywords: string[]
  tags: string[]
  urgency: "Low" | "Medium" | "High"
}

interface Product {
  id: string
  title: string
  image: string
  price: string
  link: string
  source: string
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const feedbackId = searchParams.get("id")

  const [isLoading, setIsLoading] = useState(true)
  const [loadingStep, setLoadingStep] = useState(1)
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    if (!feedbackId) {
      setError("No feedback ID provided")
      setIsLoading(false)
      return
    }

    // Simulate loading steps for better UX
    const loadingInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 4 ? prev + 1 : prev))
    }, 800)

    const loadFeedbackAnalysis = async () => {
      try {
        // Fetch the feedback analysis
        const result = await getFeedbackAnalysis(feedbackId)

        // Set the analysis and related products
        setAnalysis(result.analysis)
        setRelatedProducts(result.relatedProducts)
      } catch (err) {
        console.error("Error loading feedback analysis:", err)
        setError("Failed to load feedback analysis. Please try submitting your feedback again.")
      } finally {
        clearInterval(loadingInterval)
        setIsLoading(false)
      }
    }

    loadFeedbackAnalysis()

    return () => clearInterval(loadingInterval)
  }, [feedbackId])

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Neutral":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Negative":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Positive":
        return <ThumbsUp className="h-5 w-5" />
      case "Negative":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex flex-1 items-center justify-center bg-gray-50 py-10 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-blue-600" />
            <h2 className="text-xl font-semibold">AI Analysis in Progress</h2>
            <p className="text-gray-500">
              Our AI is analyzing your feedback and generating personalized recommendations
            </p>
            <div className="mt-6 flex flex-col items-center text-sm">
              <p className={loadingStep >= 1 ? "text-blue-600 font-medium" : "text-gray-400"}>
                {loadingStep >= 1 ? "✓ " : "• "}
                Analyzing sentiment
              </p>
              <p className={loadingStep >= 2 ? "text-blue-600 font-medium" : "text-gray-400"}>
                {loadingStep >= 2 ? "✓ " : "• "}
                Extracting keywords
              </p>
              <p className={loadingStep >= 3 ? "text-blue-600 font-medium" : "text-gray-400"}>
                {loadingStep >= 3 ? "✓ " : "• "}
                Identifying product issues
              </p>
              <p className={loadingStep >= 4 ? "text-blue-600 font-medium" : "text-gray-400"}>
                {loadingStep >= 4 ? "✓ " : "• "}
                Finding related products
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !analysis) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex flex-1 items-center justify-center bg-gray-50 py-10 dark:bg-gray-900">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error || "Failed to load feedback analysis"}</p>
              <div className="mt-6">
                <Link href="/feedback">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Feedback Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1 bg-gray-50 py-10 dark:bg-gray-900">
        <div className="container max-w-4xl px-4 md:px-6">
          <div className="mb-8">
            <Link href="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Feedback Analysis</h1>
            <p className="mt-2 text-gray-500">Thank you for your feedback on {analysis.productName}</p>
          </div>

          {/* Analysis Summary Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`rounded-full p-2 ${getSentimentColor(analysis.sentiment)}`}>
                  {getSentimentIcon(analysis.sentiment)}
                </div>
                Feedback Analysis Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Product Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Product:</span>
                      <span className="font-medium">{analysis.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{analysis.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <span className="font-medium">{analysis.rating} / 5</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">AI Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sentiment:</span>
                      <Badge variant="outline" className={getSentimentColor(analysis.sentiment)}>
                        {analysis.sentiment}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Urgency:</span>
                      <Badge variant="outline" className={getUrgencyColor(analysis.urgency)}>
                        {analysis.urgency}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Your Feedback</h3>
                <div className="rounded-md border border-gray-200 bg-gray-50 p-4 text-gray-700">
                  {analysis.feedback}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Extracted Keywords & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, index) => (
                    <Badge key={`keyword-${index}`} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                  {analysis.tags.map((tag, index) => (
                    <Badge key={`tag-${index}`} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Products */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Explore Related Philips Products</h2>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="philips">Philips</TabsTrigger>
                <TabsTrigger value="amazon">Amazon</TabsTrigger>
                <TabsTrigger value="flipkart">Flipkart</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="philips">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedProducts
                    .filter((product) => product.source === "Philips")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="amazon">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedProducts
                    .filter((product) => product.source === "Amazon")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="flipkart">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {relatedProducts
                    .filter((product) => product.source === "Flipkart")
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <a href="https://www.philips.co.in" target="_blank" rel="noopener noreferrer">
                  View All Philips Products
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/feedback">
              <Button>Submit Another Feedback</Button>
            </Link>
            <Link href="/home">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <span>© 2025 Smart Feedback Collector</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
