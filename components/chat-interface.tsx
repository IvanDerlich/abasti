"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, Sparkles, Package, DollarSign, Truck } from "lucide-react"

interface Message {
  id: number
  type: "user" | "ai" | "system"
  content: string
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "system",
    content: "You're asking about Industrial Steel Beams - Grade A",
  },
  {
    id: 2,
    type: "ai",
    content: "Hi! I'm Abasti AI. I can help answer questions about this product. What would you like to know?",
    suggestions: ["Request quote", "Stock availability", "Product specs", "Shipping options"],
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: text,
    }
    setMessages([...messages, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = ""
      const lowerText = text.toLowerCase()

      if (lowerText.includes("quote") || lowerText.includes("price")) {
        aiResponse =
          "The current price for Industrial Steel Beams - Grade A is $2,450 per ton. For bulk orders over 50 tons, we offer a 10% discount. Would you like me to generate a formal quote?"
      } else if (lowerText.includes("stock") || lowerText.includes("available")) {
        aiResponse =
          "We currently have 500 tons in stock and ready to ship. The product is available for immediate delivery. Would you like to proceed with an order?"
      } else if (lowerText.includes("spec") || lowerText.includes("detail")) {
        aiResponse =
          "This is a high-grade steel alloy certified to ISO 9001 and ASTM A36 standards. Custom sizes are available with a minimum order of 10 tons. Lead time is typically 2-3 weeks. Would you like the full technical specification sheet?"
      } else if (lowerText.includes("ship") || lowerText.includes("deliver")) {
        aiResponse =
          "We offer worldwide shipping with multiple carrier options. Standard delivery takes 5-7 business days. Express shipping is available for urgent orders. What's your delivery location?"
      } else {
        aiResponse =
          "I can help you with pricing, availability, specifications, and shipping for this product. What specific information do you need?"
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content: aiResponse,
        suggestions: ["Request formal quote", "Check shipping cost", "Technical specs", "Place order"],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Abasti AI</h1>
              <p className="text-xs text-muted-foreground">Always available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === "system" && (
              <div className="flex justify-center mb-4">
                <Badge variant="secondary" className="text-xs">
                  {message.content}
                </Badge>
              </div>
            )}

            {message.type === "ai" && (
              <div className="flex gap-3 items-start">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Card className="bg-muted">
                    <CardContent className="p-3">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </CardContent>
                  </Card>

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs rounded-full bg-transparent"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {message.type === "user" && (
              <div className="flex gap-3 items-start justify-end">
                <Card className="bg-primary text-primary-foreground max-w-[80%]">
                  <CardContent className="p-3">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </CardContent>
                </Card>
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-secondary">U</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-start">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <Card className="bg-muted">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border-t border-border bg-background p-4">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full bg-transparent"
            onClick={() => handleSendMessage("Request quote")}
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Request Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full bg-transparent"
            onClick={() => handleSendMessage("Stock availability")}
          >
            <Package className="h-4 w-4 mr-2" />
            Stock Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="whitespace-nowrap rounded-full bg-transparent"
            onClick={() => handleSendMessage("Shipping options")}
          >
            <Truck className="h-4 w-4 mr-2" />
            Shipping
          </Button>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask about this product..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(input)
              }
            }}
            className="flex-1 h-12"
          />
          <Button
            size="icon"
            className="h-12 w-12 flex-shrink-0"
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
