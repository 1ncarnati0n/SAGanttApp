/**
 * Login Page
 * 간단한 로그인 페이지
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("로그인 실패: " + error.message);
        return;
      }

      toast.success("로그인 성공!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error("이메일과 비밀번호를 입력하세요");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("회원가입 실패: " + error.message);
        return;
      }

      toast.success("회원가입 성공! 이메일을 확인하세요.");
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error("회원가입 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            ConTech Gantt 로그인
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                이메일
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                비밀번호
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                로그인
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                회원가입
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/dashboard"
                className="text-sm text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300"
              >
                로그인 없이 계속하기 →
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

