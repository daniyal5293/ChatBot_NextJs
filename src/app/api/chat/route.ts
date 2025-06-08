// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sanitizePII } from '@/lib/piiFilter';

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  // Sanitizing as PIIs
  const sanitizedQuery = sanitizePII(query);

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: sanitizedQuery }] }]
      }),
    }
  );

  const data = await res.json();

  const responseText =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

  const suggestions = [
    `Tell me more about "${query}"`,
    `Ask something related to "${query}"`,
    `What’s an example of "${query}"?`,
  ];

  return NextResponse.json({ response: responseText, suggestions });
}
