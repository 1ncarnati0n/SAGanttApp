import { GanttWrapper } from "@/components/GanttWrapper";

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow px-6 py-4 z-10">
        <h1 className="text-2xl font-bold text-gray-800">ConTech Gantt App (Next.js)</h1>
      </header>
      <div className="flex-1 p-6 overflow-hidden">
        <GanttWrapper />
      </div>
    </main>
  );
}
