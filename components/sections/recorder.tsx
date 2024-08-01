"use client";
import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function Recorder() {
  const [transcription, setTranscription] = useState("");

  const addAudioElement = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob, "audio.webm");

    try {
      const response = await fetch("/api/stt", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await response.json();
      setTranscription(data.transcription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <div>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
      />
      {transcription && <p>{transcription}</p>}
    </div>
  );
}
