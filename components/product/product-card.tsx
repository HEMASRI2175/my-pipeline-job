import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Product {
  id: string
  title: string
  image: string
  price: string
  link: string
  source: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const getSourceColor = (source: string) => {
    switch (source) {
      case "Amazon":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "Flipkart":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Philips":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square">
        <Image
          src={product.image || `/placeholder.svg?height=300&width=300`}
          alt={product.title}
          fill
          className="object-cover"
        />
        <Badge variant="outline" className={`absolute right-2 top-2 ${getSourceColor(product.source)}`}>
          {product.source}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 font-medium">{product.title}</h3>
        <div className="mb-4 text-lg font-bold text-blue-600">{product.price}</div>
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          View Product
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  )
}
