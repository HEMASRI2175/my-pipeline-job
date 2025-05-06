import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, MessageSquare, Star, Zap } from "lucide-react"
import { AppHeader } from "@/components/app-header"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1">
        {/* Welcome Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Welcome to Smart Feedback Collector
              </h1>
              <p className="mb-8 text-gray-500 dark:text-gray-400 md:text-xl">
                Help improve Philips products by sharing your valuable feedback. Our AI-powered system analyzes your
                input to provide meaningful insights.
              </p>
              <Link href="/feedback">
                <Button size="lg" className="group">
                  Submit Your Feedback
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Feedback Insights */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">Recent Feedback Insights</h2>
              <p className="mt-2 text-gray-500">See what others are saying about Philips products</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <InsightCard
                category="Kitchen Appliances"
                product="Philips Air Fryer"
                sentiment="Positive"
                sentimentColor="bg-green-100 text-green-800"
                tags={["easy to use", "quick cooking", "energy efficient"]}
                quote="The air fryer has transformed how I cook. Food is crispy and delicious with minimal oil."
              />
              <InsightCard
                category="Personal Care"
                product="Philips Electric Shaver"
                sentiment="Neutral"
                sentimentColor="bg-blue-100 text-blue-800"
                tags={["battery life", "close shave", "price"]}
                quote="Good shave quality but battery life could be improved. Overall satisfied with the purchase."
              />
              <InsightCard
                category="Air Care"
                product="Philips Air Purifier"
                sentiment="Negative"
                sentimentColor="bg-red-100 text-red-800"
                tags={["noise level", "filter replacement", "app connectivity"]}
                quote="The purifier works well but is quite noisy at higher settings. App frequently disconnects."
              />
            </div>

            <div className="mt-10 text-center">
              <Link href="/admin">
                <Button variant="outline">
                  View All Insights
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="mt-2 text-gray-500">Our simple process for collecting and analyzing feedback</p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <StepCard
                number="1"
                title="Submit Feedback"
                description="Share your experience with Philips products through our intuitive form"
                icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
              />
              <StepCard
                number="2"
                title="AI Analysis"
                description="Our AI analyzes sentiment, extracts keywords, and identifies issues"
                icon={<Zap className="h-10 w-10 text-blue-600" />}
              />
              <StepCard
                number="3"
                title="Get Recommendations"
                description="Receive personalized product suggestions based on your feedback"
                icon={<Star className="h-10 w-10 text-blue-600" />}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="rounded-lg bg-blue-600 p-8 text-white shadow-lg">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold md:text-3xl">Ready to share your feedback?</h2>
                <p className="mt-4 text-blue-100">
                  Your insights help us improve Philips products for everyone. Start sharing now!
                </p>
                <Link href="/feedback" className="mt-6 inline-block">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Submit Feedback
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span>© 2025 Smart Feedback Collector</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function InsightCard({
  category,
  product,
  sentiment,
  sentimentColor,
  tags,
  quote,
}: {
  category: string
  product: string
  sentiment: string
  sentimentColor: string
  tags: string[]
  quote: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{product}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-medium ${sentimentColor}`}>{sentiment}</div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-2 border-gray-200 pl-4 italic text-gray-600">"{quote}"</blockquote>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">{number}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
