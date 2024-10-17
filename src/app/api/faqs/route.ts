// app/api/faqs/route.ts

import { NextResponse } from 'next/server';
import faqdata from '@/app/test_data.json'; // Assuming your test_data.json is here

export async function GET() {
  return NextResponse.json(faqdata); // Return JSON response
}
