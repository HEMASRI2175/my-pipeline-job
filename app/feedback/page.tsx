"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { StarRating } from "@/components/feedback/star-rating"
import { VoiceInput } from "@/components/feedback/voice-input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Brain } from "lucide-react"
import { submitFeedback } from "@/lib/actions"

const productCategories = ["Kitchen Appliances", "Ironing", "Air Care", "Vacuum Cleaners", "Personal Care", "Others"]

export default function FeedbackPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [characterCount, setCharacterCount] = useState(0)
  const [rating, setRating] = useState(0)
  const [formData, setFormData] = useState({
    category: "",
    productName: "",
    feedback: "",
    isAnonymous: false,
    consentGiven: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "feedback") {
      setCharacterCount(value.length)
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))

    // Clear error when user selects
    if (errors.category) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.category
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))

    // Clear error when user checks
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleVoiceInput = (transcript: string) => {
    setFormData((prev) => ({
      ...prev,
      feedback: prev.feedback + " " + transcript,
    }))
    setCharacterCount(formData.feedback.length + transcript.length + 1)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category) {
      newErrors.category = "Please select a product category"
    }

    if (!formData.productName.trim()) {
      newErrors.productName = "Product name is required"
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required"
    }

    if (!formData.consentGiven) {
      newErrors.consentGiven = "You must agree to the collection and analysis of your feedback"
    }

    if (rating === 0) {
      newErrors.rating = "Please provide a rating"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Call the server action to submit feedback
      const result = await submitFeedback({
        ...formData,
        rating,
      })

      // Redirect to confirmation page with the result
      router.push(`/confirmation?id=${result.id}`)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setErrors({
        form: "Failed to submit feedback. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1 bg-gray-50 py-10 dark:bg-gray-900">
        <div className="container max-w-3xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Submit Your Feedback</h1>
            <p className="mt-2 text-gray-500">Help us improve Philips products with your valuable insights</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category</Label>
                  <Select value={formData.category} onValueChange={handleSelectChange}>
                    <SelectTrigger id="category" className={errors.category ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    name="productName"
                    placeholder="e.g., Philips Air Fryer HD9252"
                    value={formData.productName}
                    onChange={handleChange}
                    className={errors.productName ? "border-red-500" : ""}
                  />
                  {errors.productName && <p className="text-sm text-red-500">{errors.productName}</p>}
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <span className="text-xs text-gray-500">{characterCount} characters</span>
                  </div>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Please share your experience with this product..."
                    rows={5}
                    value={formData.feedback}
                    onChange={handleChange}
                    className={errors.feedback ? "border-red-500" : ""}
                  />
                  {errors.feedback && <p className="text-sm text-red-500">{errors.feedback}</p>}
                </div>

                {/* Voice Input */}
                <div>
                  <Label>Voice Input</Label>
                  <VoiceInput onTranscript={handleVoiceInput} />
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label>Product Rating</Label>
                  <div>
                    <StarRating rating={rating} onRatingChange={setRating} size={32} />
                  </div>
                  {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentGiven"
                    checked={formData.consentGiven}
                    onCheckedChange={(checked) => handleCheckboxChange("consentGiven", checked as boolean)}
                    className={errors.consentGiven ? "border-red-500" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="consentGiven"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the collection and analysis of this feedback for product improvement
                    </label>
                    {errors.consentGiven && <p className="text-sm text-red-500">{errors.consentGiven}</p>}
                  </div>
                </div>

                {/* Anonymous Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) => handleCheckboxChange("isAnonymous", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="isAnonymous"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Submit this feedback anonymously
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Brain className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>

                {errors.form && <p className="text-center text-sm text-red-500">{errors.form}</p>}

                <div className="text-center text-xs text-gray-500">
                  This feedback will be used for internal product improvement only.
                </div>
              </form>
            </CardContent>
          </Card>
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
