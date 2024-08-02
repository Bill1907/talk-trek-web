"use client";
import { useState } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import Button from "../button";

export default function Recorder() {
  const [transcription, setTranscription] = useState("");
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder();

  const handleSubmit = async () => {
    if (!recordingBlob) {
      console.log("No audio recorded yet");
      return;
    }

    // audioResult is a Blob object
    const formData = new FormData();
    formData.append("file", recordingBlob, "audio.webm");

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

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <p>
        Recording status:{" "}
        {isRecording ? (isPaused ? "Paused" : "Recording") : "Not recording"}
      </p>
      <p>Recording time: {formatTime(recordingTime)}</p>
      <Button onClick={startRecording}>Start Recording</Button>
      <Button onClick={stopRecording}>Stop Recording</Button>
      <Button onClick={togglePauseResume}>Pause Recording</Button>
      <Button onClick={togglePauseResume}>Resume Recording</Button>
      <Button onClick={handleSubmit}>Transcribe</Button>

      {transcription && <p>{transcription}</p>}
    </div>
  );
}
