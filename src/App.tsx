import { GanttPreview } from "./components/GanttPreview";

export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900">ConTech Gantt: React 19</h1>
        <p className="text-sm text-slate-500">
          최신 SVAR React Gantt 2.3 릴리즈를 사용하여 공정 데이터를 관리합니다.
        </p>
      </section>
      <GanttPreview />
    </main>
  );
}
