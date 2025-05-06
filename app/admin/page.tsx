"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, PieChart, LineChart, Search, Filter } from "lucide-react"

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")

  // Mock data for the dashboard
  const mockFeedbackData = [
    {
      id: "1",
      productName: "Philips Air Fryer HD9252",
      category: "Kitchen Appliances",
      rating: 4,
      sentiment: "Positive",
      urgency: "Low",
      date: "2025-04-28",
      feedback: "Love this air fryer! It cooks evenly and is easy to clean.",
      tags: ["easy to use", "quick cooking", "energy efficient"],
    },
    {
      id: "2",
      productName: "Philips Electric Shaver S5579/50",
      category: "Personal Care",
      rating: 3,
      sentiment: "Neutral",
      urgency: "Medium",
      date: "2025-04-27",
      feedback: "Good shave quality but battery life could be improved. Overall satisfied with the purchase.",
      tags: ["battery life", "close shave", "price"],
    },
    {
      id: "3",
      productName: "Philips Air Purifier AC2887",
      category: "Air Care",
      rating: 2,
      sentiment: "Negative",
      urgency: "High",
      date: "2025-04-26",
      feedback: "The purifier works well but is quite noisy at higher settings. App frequently disconnects.",
      tags: ["noise level", "filter replacement", "app connectivity"],
    },
    {
      id: "4",
      productName: "Philips Steam Iron GC1750",
      category: "Ironing",
      rating: 5,
      sentiment: "Positive",
      urgency: "Low",
      date: "2025-04-25",
      feedback: "Excellent iron! Heats up quickly and glides smoothly over fabrics.",
      tags: ["fast heating", "smooth gliding", "value for money"],
    },
    {
      id: "5",
      productName: "Philips Vacuum Cleaner FC9352",
      category: "Vacuum Cleaners",
      rating: 1,
      sentiment: "Negative",
      urgency: "High",
      date: "2025-04-24",
      feedback: "Very disappointed with the suction power. Makes a loud noise and doesn't pick up pet hair well.",
      tags: ["suction power", "noise", "pet hair"],
    },
  ]

  // Filter feedback data based on search term and filters
  const filteredFeedback = mockFeedbackData.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.feedback.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    const matchesSentiment = sentimentFilter === "all" || item.sentiment === sentimentFilter

    return matchesSearch && matchesCategory && matchesSentiment
  })

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

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1 bg-gray-50 py-10 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Feedback Analytics Dashboard</h1>
            <p className="mt-2 text-gray-500">Monitor and analyze customer feedback for Philips products</p>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard title="Total Feedback" value="1,248" description="+12% from last month" trend="up" />
            <DashboardCard title="Average Rating" value="4.2" description="Out of 5 stars" trend="up" />
            <DashboardCard title="Positive Sentiment" value="68%" description="+5% from last month" trend="up" />
            <DashboardCard title="High Urgency Issues" value="42" description="-8% from last month" trend="down" />
          </div>

          {/* Charts and Analytics */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="products">Product Categories</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sentiment Distribution</CardTitle>
                    <CardDescription>Breakdown of feedback sentiment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-[200px] items-center justify-center">
                      <PieChart className="h-32 w-32 text-gray-300" />
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Positive (68%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Neutral (22%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Negative (10%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Feedback by Category</CardTitle>
                    <CardDescription>Distribution across product categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex h-[200px] items-center justify-center">
                      <BarChart className="h-32 w-32 text-gray-300" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <span className="text-sm">Kitchen (32%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm">Personal Care (28%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Air Care (18%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Others (22%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sentiment" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sentiment Analysis Over Time</CardTitle>
                  <CardDescription>Tracking sentiment trends across all products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[300px] items-center justify-center">
                    <LineChart className="h-48 w-48 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Category Performance</CardTitle>
                  <CardDescription>Comparing ratings and sentiment across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[300px] items-center justify-center">
                    <BarChart className="h-48 w-48 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Volume Trends</CardTitle>
                  <CardDescription>Monthly feedback volume and key metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-[300px] items-center justify-center">
                    <LineChart className="h-48 w-48 text-gray-300" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Feedback Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Browse and filter the latest customer feedback</CardDescription>

              <div className="mt-4 flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by product or feedback..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Kitchen Appliances">Kitchen Appliances</SelectItem>
                      <SelectItem value="Personal Care">Personal Care</SelectItem>
                      <SelectItem value="Air Care">Air Care</SelectItem>
                      <SelectItem value="Ironing">Ironing</SelectItem>
                      <SelectItem value="Vacuum Cleaners">Vacuum Cleaners</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sentiment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sentiments</SelectItem>
                      <SelectItem value="Positive">Positive</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                      <SelectItem value="Negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Product</th>
                      <th className="px-4 py-3 text-left font-medium">Category</th>
                      <th className="px-4 py-3 text-left font-medium">Rating</th>
                      <th className="px-4 py-3 text-left font-medium">Sentiment</th>
                      <th className="px-4 py-3 text-left font-medium">Urgency</th>
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFeedback.length > 0 ? (
                      filteredFeedback.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{item.productName}</td>
                          <td className="px-4 py-3">{item.category}</td>
                          <td className="px-4 py-3">{item.rating}/5</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={getSentimentColor(item.sentiment)}>
                              {item.sentiment}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={getUrgencyColor(item.urgency)}>
                              {item.urgency}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">{item.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                          No feedback found matching your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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

function DashboardCard({
  title,
  value,
  description,
  trend,
}: {
  title: string
  value: string
  description: string
  trend: "up" | "down" | "neutral"
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="mt-2 text-3xl font-bold">{value}</div>
        <div className="mt-1 flex items-center">
          <span
            className={`text-sm ${
              trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-500"
            }`}
          >
            {description}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
