import { GanttPreview } from "./components/GanttPreview";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-2">
        <h3 className="text-3xl font-semibold text-slate-900">ConTech Gantt App</h3>
      </section>
      <GanttPreview />
    </main>
  );
}
