import { NextRequest, NextResponse } from "next/server";
import OpenAIService from "@/lib/openai";
import fs from "fs";
import os from "os";
import path from "path";

export async function POST(request: NextRequest) {
  const openAIService = new OpenAIService(process.env.OPENAI_API_KEY as string);

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save the file temporarily
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, file.name);
  fs.writeFileSync(tempFilePath, new Uint8Array(buffer));

  try {
    const transcription = await openAIService.transcribeAudio(tempFilePath);

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    return NextResponse.json({ transcription });
  } catch (error) {
    console.error("Error transcribing audio:", error);

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    return NextResponse.json(
      { error: "Error transcribing audio" },
      { status: 500 }
    );
  }
}
