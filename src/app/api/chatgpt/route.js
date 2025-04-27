import { NextResponse } from "next/server";
import OpenAI from "openai";

export const config = {
    api: {
        bodyParser: false, // disable built-in JSON parser so we can use formData()
    },
};

export async function POST(request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // Parse the incoming multipart/form-data
    const formData = await request.formData();
    const file = formData.get("image");
    if (!file) {
        return NextResponse.json(
            { error: "No image file provided" },
            { status: 400 }
        );
    }

    // Convert the uploaded file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // Call OpenAI with the image
    const response = await openai.responses.create({
        model: "gpt-4.1-mini-2025-04-14",
        input: [
            {
                role: "developer",
                content:
                    "Given an image, tell me how to safely dispose of the item (i.e. should I recycle parts, or throw it all in the trash, or does it need to be taken to a disposal center). This should be specific for the city of San Jose, California.",
            },
            {
                role: "user",
                content: [
                    {
                        type: "input_image",
                        image_url: "data:image/jpeg;base64," + base64Image,
                    },
                ],
            },
        ],
    });

    // Return the API’s output
    console.log(response.output_text);
    //return NextResponse.json({ output_text: response.output_text });
    //return NextResponse.json({ output_text: response.output_text });
}
