'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
  category: 'Platform' | 'Pricing' | 'Subscription'
}

const faqData: FAQItem[] = [
  {
    question: "What features does your platform offer?",
    answer: "Our platform offers a wide range of features including real-time collaboration, advanced analytics, and customizable workflows to enhance your productivity.",
    category: "Platform"
  },
  {
    question: "How secure is your platform?",
    answer: "We prioritize security with end-to-end encryption, regular security audits, and compliance with industry standards to ensure your data remains safe and protected.",
    category: "Platform"
  },
  {
    question: "What pricing plans do you offer?",
    answer: "We offer flexible pricing plans including a free tier, professional tier, and enterprise solutions to cater to businesses of all sizes.",
    category: "Pricing"
  },
  {
    question: "Is there a discount for annual subscriptions?",
    answer: "Yes, we offer a 20% discount for annual subscriptions on all our paid plans.",
    category: "Pricing"
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "You can cancel your subscription at any time. We offer a prorated refund for the unused portion of annual subscriptions.",
    category: "Subscription"
  },
  {
    question: "How often do you bill for subscriptions?",
    answer: "We offer monthly and annual billing cycles. You can choose the option that best suits your needs during the signup process.",
    category: "Subscription"
  }
]

export default function FAQComponent() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const categories = ["All", "Platform", "Pricing", "Subscription"]

  const filteredFAQs = faqData.filter(item => 
    activeTab === "all" || item.category.toLowerCase() === activeTab.toLowerCase()
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-center text-muted-foreground mb-8">
        Find answers to common questions about our platform, pricing, and subscriptions.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category.toLowerCase()}
              className="px-4 py-2"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}