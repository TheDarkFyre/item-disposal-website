import { NextResponse } from "next/server";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false, // must disable so we can use formData()
  },
};

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // 1. Grab the uploaded file from multipart/form-data
  const formData = await request.formData();
  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  // 2. Convert File → ArrayBuffer → Base64 string
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  // 3. Call the OpenAI image-response endpoint
  //    Messages array:
  //      - developer prompt (disposal instructions in San Jose)
  //      - user prompt with input_image containing the base64 blob
  const response = await openai.responses.create({
    model: "gpt-4.1-mini-2025-04-14",
    input: [
      {
        role: "developer",
        content:
          "Given an image, tell me how to safely dispose of the item (i.e. should I recycle parts, or throw it all in the trash, or does it need to be taken to a disposal center). This should be specific for the city of San Jose, California. All text should be in Markdown format. There should be no line breaks, and the instructions should be in a paragraph form. Seperate different ideas into different paragraphs. Text should not be bolded. Try and be as specific as possible, including any locations or websites that are relevant. The government link is https://www.sanjoseca.gov/your-government/departments-offices/environmental-services/recycling-garbage.",
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

  // 4. Return JSON shaped as { choices: [...] }
  return NextResponse.json({
    choices: [
      {
        index: 0,
        message: { content: response.output_text },
      },
    ],
  });
}
