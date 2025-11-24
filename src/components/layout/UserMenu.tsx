/**
 * UserMenu Component
 * 사용자 메뉴 (로그인/로그아웃)
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { User, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function UserMenu() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toast.success("로그아웃되었습니다");
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <div className="spinner w-4 h-4" />
      </div>
    );
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <Button variant="ghost" size="sm">
          <LogIn className="h-4 w-4 mr-2" />
          로그인
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-primary-100 dark:bg-primary-800">
        <User className="h-4 w-4" />
        <span className="text-sm">{user.email?.split("@")[0]}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        로그아웃
      </Button>
    </div>
  );
}

