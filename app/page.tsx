import Recorder from "@/components/sections/recorder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold text-center">Talk Trek</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <Recorder />
      </div>
    </main>
  );
}
