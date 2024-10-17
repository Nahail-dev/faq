'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Define the types for FAQ data
type FAQ = {
  question: string;
  answer: string;
};

type FAQData = {
  title: string;
  description: string;
  tabs: string[];
  faqs: Record<string, FAQ[]>;
};

type FAQCategory = string | 'All'; // Tabs can be strings, or 'All'

export default function FAQComponent() {
  const [faqData, setFaqData] = useState<FAQData | null>(null); // State to hold fetched FAQ data
  const [activeTab, setActiveTab] = useState<FAQCategory>("All")
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [loading, setLoading] = useState(true); // To track loading state

  // Fetch FAQ data from API on component mount
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        const response = await fetch('/api/faqs'); // Fetch from the API route
        const data: FAQData = await response.json(); // Define the type of the fetched data
        setFaqData(data); // Set the fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
        setLoading(false); // Handle fetch error
      }
    };

    fetchFAQData();
  }, []); // Runs once on component mount

  if (loading) {
    return <div>Loading FAQs...</div>; // Loading state
  }

  if (!faqData) {
    return <div>Failed to load FAQ data</div>; // Handle case where data fetching fails
  }

  // Ensure "All" is the first category, avoid duplicate 'All' tab
  const categories = ['All', ...faqData.tabs.filter((tab) => tab !== 'All')];

  // Handle "All" tab by combining all FAQs into one array
  const filteredFAQs = activeTab === "All"
    ? Object.values(faqData.faqs).flat() // Flatten all FAQ arrays for "All"
    : faqData.faqs[activeTab] || []; // Fallback to empty array if category doesn't exist

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-2">{faqData.title}</h2>
      <p className="text-center text-gray-600 mb-8">
        {faqData.description}
      </p>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as FAQCategory)} className="w-full">
        <TabsList className="flex justify-center rounded-full bg-gray-200 p-1 mb-8 max-w-md mx-auto transition-all duration-200 ease-in-out border-2 border-gray-300">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category} // Keep the original category names
              className="flex-1 px-4 py-2 rounded-full transition-all duration-200 ease-in-out data-[state=active]:bg-gray-100 data-[state=active]:shadow-md hover:bg-gray-50 text-sm whitespace-nowrap"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {filteredFAQs.map((faq: FAQ, index: number) => ( // Use FAQ type
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${openItem === index ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItem === index && (
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
