import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    // Grabbing the user's input
    const params = await request.json();

    // Passing it to the OpenAI API
    const response = await openai.chat.completions.create({
        model: 'gpt-4.1-mini-2025-04-14',
        messages: [
            {
                role: 'system',
                content: 'Given an image, tell me how to safely dispose of the item (i.e. should I recycle parts, or throw it all in the trash, or does it need to be taken to a disposal center). This should be specific for the city of San Jose, California.'
            },
            {
                role: 'user',
                content: params.prompt // Image that the user uploads
            }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    return NextResponse.json(response);
}