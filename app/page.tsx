import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, MessageSquare, Star, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <span>Smart Feedback Collector</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Smart Feedback Collector for Philips Products
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Capture and understand customer sentiment using AI. Empower Philips product teams to act on real
                    feedback with clarity.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/feedback">
                    <Button size="lg" className="group">
                      Submit Feedback
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/signin?guest=true">
                    <Button size="lg" variant="outline">
                      Continue as Guest
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 p-6 shadow-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MessageSquare className="h-24 w-24 text-blue-600 opacity-20" />
                  </div>
                  <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <h3 className="text-xl font-bold">AI-Powered Insights</h3>
                    <p className="text-gray-500">
                      Our advanced AI analyzes your feedback to extract valuable insights and recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-16 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold">Key Features</h2>
              <p className="mt-4 text-gray-500">
                Discover how our platform transforms feedback into actionable insights
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-blue-600" />}
                title="Rich Feedback Collection"
                description="Collect detailed feedback with our intuitive form, including voice input options."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-blue-600" />}
                title="AI-Powered Analysis"
                description="Leverage AI to analyze sentiment, extract keywords, and identify issues."
              />
              <FeatureCard
                icon={<Star className="h-10 w-10 text-blue-600" />}
                title="Product Recommendations"
                description="Get personalized product suggestions based on your feedback."
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-blue-600" />}
                title="Comprehensive Analytics"
                description="Track feedback trends and gain insights with our analytics dashboard."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="rounded-lg bg-blue-50 p-8 dark:bg-blue-950">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold md:text-3xl">Ready to share your feedback?</h2>
                <p className="mt-4 text-gray-500 dark:text-gray-400">
                  Help us improve Philips products by sharing your experience. Your feedback matters!
                </p>
                <Link href="/feedback" className="mt-6 inline-block">
                  <Button size="lg">Get Started</Button>
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

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="group rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
}
