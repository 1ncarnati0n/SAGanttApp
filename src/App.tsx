import { GanttPreview } from "./components/GanttPreview";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col gap-1 px-6 py-6">
      <section>
        <h1>ConTech Gantt App</h1>
      </section>
      <GanttPreview />
    </main>
  );
}
