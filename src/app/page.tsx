import Link from "next/link";
import { Button } from "@/components/ui";
import { Building2, BarChart3, Users, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-primary-50 dark:from-black dark:to-primary-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <Building2 className="h-20 w-20 text-accent-600" />
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-900 to-accent-600 bg-clip-text text-transparent dark:from-white dark:to-accent-400">
            SAGantt
          </h1>
          <p className="text-xl text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            프로젝트 관리를 위한 강력한 Gantt 차트
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild variant="primary" size="lg">
              <Link href="/dashboard">대시보드 시작하기 →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">데모 보기</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card card-hover p-6 space-y-4">
            <BarChart3 className="h-12 w-12 text-accent-600" />
            <h3 className="text-xl font-bold">강력한 시각화</h3>
            <p className="text-primary-600 dark:text-primary-400">
              직관적인 Gantt 차트로 프로젝트 일정을 한눈에 파악하세요
            </p>
          </div>
          <div className="card card-hover p-6 space-y-4">
            <Users className="h-12 w-12 text-accent-600" />
            <h3 className="text-xl font-bold">실시간 협업</h3>
            <p className="text-primary-600 dark:text-primary-400">
              팀원들과 실시간으로 프로젝트를 관리하고 공유하세요
            </p>
          </div>
          <div className="card card-hover p-6 space-y-4">
            <Shield className="h-12 w-12 text-accent-600" />
            <h3 className="text-xl font-bold">안전한 데이터</h3>
            <p className="text-primary-600 dark:text-primary-400">
              Supabase 기반 보안으로 데이터를 안전하게 보호합니다
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="card mt-20 p-12 text-center space-y-6 bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-950 dark:to-primary-950 border-accent-200 dark:border-accent-800">
          <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
          <p className="text-primary-600 dark:text-primary-400 max-w-xl mx-auto">
            무료로 시작하고 프로젝트 관리의 새로운 경험을 느껴보세요
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="accent" size="lg">
              <Link href="/auth/signup">회원가입</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/auth/login">로그인</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
