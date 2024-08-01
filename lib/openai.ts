import OpenAI from "openai";
import fs from "fs";
import FormData from "form-data";

class OpenAIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Missing OpenAI API key");
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async transcribeAudio(audioFilePath: string): Promise<string> {
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(audioFilePath));
      form.append("model", "whisper-1");

      const response = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(audioFilePath),
        model: "whisper-1",
      });

      return response.text;
    } catch (error) {
      console.error("Error in transcribeAudio:", error);
      throw new Error("Failed to transcribe audio");
    }
  }
}

export default OpenAIService;
