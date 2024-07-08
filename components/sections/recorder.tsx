"use client";
import { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import Button from "@/components/button";

export default function Recorder() {
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newRecorder = new MediaRecorder(stream);
      newRecorder.ondataavailable = (event: BlobEvent) => {
        // 청크 추가는 녹음 중에만 이루어집니다.
        setAudioChunks((currentChunks) => [...currentChunks, event.data]);
      };
      newRecorder.onstop = () => {
        // 녹음이 완전히 끝난 후 Blob을 생성합니다.
        const audioBlob = new Blob(audioChunks, { type: "audio/ogg" }); // MIME 타입 설정
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioChunks([]); // 청크 초기화
      };
      newRecorder.start();
      setRecorder(newRecorder);
    } catch (error) {
      console.error("Error accessing the microphone:", error);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop(); // 녹음 중지
      recorder.stream.getTracks().forEach((track) => track.stop());
      setRecorder(null);
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
      <Button onClick={startRecording}>Start Recording</Button>
      <Button onClick={stopRecording} disabled={!recorder}>
        Stop Recording
      </Button>
      {audioUrl && <audio src={audioUrl} controls />}
    </div>
  );
}
