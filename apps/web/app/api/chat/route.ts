import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    if (!messages) {
      return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
    }
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
    });
    return NextResponse.json(completion);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
