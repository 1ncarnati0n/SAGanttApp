# SAGanttApp Quick Start Guide
## 🚀 빠른 시작 가이드 (Week 1 실행 계획)

> **이 가이드를 따라하면 첫 주에 환경 설정을 완료할 수 있습니다!**

---

## 📋 준비사항 체크리스트

- [ ] Node.js 20+ 설치
- [ ] Git 설치
- [ ] VS Code (권장)
- [ ] Supabase 계정 (무료)

---

## Day 1: Supabase 설정 (2-3시간)

### Step 1: Supabase 프로젝트 생성

1. [Supabase](https://supabase.com/) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   ```
   Name: SAGanttApp
   Database Password: (강력한 비밀번호 입력 - 메모!)
   Region: Northeast Asia (Seoul) - 한국에서 가장 빠름
   ```
4. "Create new project" 클릭 (2-3분 소요)

### Step 2: 데이터베이스 스키마 생성

1. 왼쪽 메뉴에서 "SQL Editor" 클릭
2. "New Query" 클릭
3. 아래 SQL 복사 & 붙여넣기:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  archived BOOLEAN DEFAULT FALSE
);

-- Gantt Charts Table
CREATE TABLE gantt_charts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  archived BOOLEAN DEFAULT FALSE
);

-- Tasks Table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gantt_chart_id UUID NOT NULL REFERENCES gantt_charts(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'task',
  start_date DATE NOT NULL,
  end_date DATE,
  progress FLOAT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  parent_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  open BOOLEAN DEFAULT TRUE,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Links Table
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gantt_chart_id UUID NOT NULL REFERENCES gantt_charts(id) ON DELETE CASCADE,
  source_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  target_task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('e2s', 's2s', 'e2e', 's2e')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_gantt_charts_project ON gantt_charts(project_id);
CREATE INDEX idx_tasks_gantt_chart ON tasks(gantt_chart_id);
CREATE INDEX idx_tasks_parent ON tasks(parent_id);
CREATE INDEX idx_links_gantt_chart ON links(gantt_chart_id);
CREATE INDEX idx_links_source ON links(source_task_id);
CREATE INDEX idx_links_target ON links(target_task_id);

-- Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gantt_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT USING (auth.uid() = owner_id);

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE USING (auth.uid() = owner_id);

-- RLS Policies for gantt_charts
CREATE POLICY "Users can view gantt charts of their projects"
  ON gantt_charts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = gantt_charts.project_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create gantt charts in their projects"
  ON gantt_charts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = gantt_charts.project_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update gantt charts of their projects"
  ON gantt_charts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = gantt_charts.project_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete gantt charts of their projects"
  ON gantt_charts FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = gantt_charts.project_id
      AND projects.owner_id = auth.uid()
    )
  );

-- RLS Policies for tasks
CREATE POLICY "Users can view tasks of their gantt charts"
  ON tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = tasks.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks in their gantt charts"
  ON tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = tasks.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tasks of their gantt charts"
  ON tasks FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = tasks.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tasks of their gantt charts"
  ON tasks FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = tasks.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

-- RLS Policies for links
CREATE POLICY "Users can view links of their gantt charts"
  ON links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = links.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create links in their gantt charts"
  ON links FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = links.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete links of their gantt charts"
  ON links FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM gantt_charts
      JOIN projects ON projects.id = gantt_charts.project_id
      WHERE gantt_charts.id = links.gantt_chart_id
      AND projects.owner_id = auth.uid()
    )
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gantt_charts_updated_at
    BEFORE UPDATE ON gantt_charts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

4. "Run" 버튼 클릭
5. 성공 메시지 확인: "Success. No rows returned"

### Step 3: API 키 복사

1. 왼쪽 메뉴에서 "Project Settings" (톱니바퀴 아이콘) 클릭
2. "API" 탭 클릭
3. 다음 정보를 메모장에 복사:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
cd /Users/1ncarnati0n/Desktop/tsxPJT/SAGanttApp
touch .env.local
```

`.env.local` 파일에 다음 내용 추가 (위에서 복사한 값 붙여넣기):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Day 2: 패키지 설치 및 코드 품질 도구 (1-2시간)

### Step 1: 필수 패키지 설치

```bash
cd /Users/1ncarnati0n/Desktop/tsxPJT/SAGanttApp

# Supabase
npm install @supabase/ssr @supabase/supabase-js

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-tooltip
npm install @radix-ui/react-dropdown-menu @radix-ui/react-select

# Utilities
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install next-themes
npm install sonner
npm install date-fns

# Form
npm install react-hook-form @hookform/resolvers zod

# Animation
npm install framer-motion

# Dev Tools
npm install -D @types/node @types/react @types/react-dom
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Step 2: ESLint 설정

`eslint.config.mjs` 파일 생성:

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
```

### Step 3: Prettier 설정

`.prettierrc` 파일 생성:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### Step 4: Vitest 설정

`vitest.config.ts` 파일 생성:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`vitest.setup.ts` 파일 생성:

```typescript
import "@testing-library/jest-dom";
```

### Step 5: package.json 스크립트 추가

`package.json`에 스크립트 추가:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

---

## Day 3-4: Supabase 클라이언트 및 인증 설정 (3-4시간)

### Step 1: Supabase 클라이언트 생성

`src/lib/supabase/client.ts` 파일 생성:

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

`src/lib/supabase/server.ts` 파일 생성:

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component에서는 무시
          }
        },
      },
    }
  );
}
```

`src/lib/supabase/middleware.ts` 파일 생성:

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/auth/login") &&
    !request.nextUrl.pathname.startsWith("/auth/signup") &&
    request.nextUrl.pathname !== "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

`middleware.ts` (루트) 파일 생성:

```typescript
import { type NextRequest } from "next/server";
import { updateSession } from "./src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

### Step 2: Auth Callback Route

`src/app/auth/callback/route.ts` 파일 생성:

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth`);
}
```

---

## Day 5-7: 디자인 시스템 이식 (4-6시간)

### Step 1: globals.css 업데이트

`src/app/globals.css` 파일을 contech-dx 스타일로 교체:

```css
@import "tailwindcss";
@source "../../src";

@theme {
  /* contech-dx 색상 체계 */
  --color-background: #ffffff;
  --color-foreground: #000000;

  --color-primary-50: #fafafa;
  --color-primary-100: #f5f5f5;
  --color-primary-200: #e5e5e5;
  --color-primary-300: #d4d4d4;
  --color-primary-400: #a3a3a3;
  --color-primary-500: #737373;
  --color-primary-600: #525252;
  --color-primary-700: #404040;
  --color-primary-800: #262626;
  --color-primary-900: #171717;
  --color-primary-950: #0a0a0a;

  --color-accent-50: #eff6ff;
  --color-accent-100: #dbeafe;
  --color-accent-200: #bfdbfe;
  --color-accent-300: #93c5fd;
  --color-accent-400: #60a5fa;
  --color-accent-500: #3b82f6;
  --color-accent-600: #2563eb;
  --color-accent-700: #1d4ed8;
  --color-accent-800: #1e40af;
  --color-accent-900: #1e3a8a;

  --color-success-50: #f0fdf4;
  --color-success-500: #10b981;
  --color-success-600: #059669;

  --color-error-50: #fef2f2;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;

  --radius-sm: 0.125rem;
  --radius-DEFAULT: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

:root {
  --background: var(--color-background);
  --foreground: var(--color-foreground);
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
}

@layer base {
  body {
    @apply bg-[var(--background)] text-[var(--foreground)] antialiased;
  }
}
```

### Step 2: shadcn/ui 컴포넌트 생성

`src/lib/utils.ts` 파일 생성:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`src/components/ui/Button.tsx` 파일 생성 (contech-dx와 동일):

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
        accent:
          "bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500",
        outline:
          "bg-transparent text-primary-700 border-2 border-primary-200 hover:bg-primary-50 focus:ring-primary-500",
        ghost: "bg-transparent text-primary-700 hover:bg-primary-100 focus:ring-primary-500",
        danger: "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, loading = false, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
```

---

## Day 8-10: 레이아웃 구축 (4-6시간)

### Step 1: ThemeProvider 생성

`src/components/layout/ThemeProvider.tsx` 파일 생성:

```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Step 2: 루트 레이아웃 업데이트

`src/app/layout.tsx` 파일 업데이트:

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAGantt - Project Management with Gantt Charts",
  description: "Manage your projects with powerful Gantt chart visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 3: 간단한 홈 페이지 생성

`src/app/page.tsx` 파일 업데이트:

```typescript
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">🏗️ SAGantt</h1>
        <p className="text-xl text-primary-600">프로젝트 관리를 위한 Gantt 차트</p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="primary" size="lg">
            <Link href="/auth/login">로그인</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/signup">회원가입</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
```

---

## ✅ 완료 확인

### Day 1 체크리스트
- [ ] Supabase 프로젝트 생성됨
- [ ] 데이터베이스 스키마 실행됨
- [ ] API 키 복사 및 `.env.local` 설정됨

### Day 2 체크리스트
- [ ] 모든 패키지 설치 완료
- [ ] ESLint 설정 완료
- [ ] Prettier 설정 완료
- [ ] Vitest 설정 완료

### Day 3-4 체크리스트
- [ ] Supabase 클라이언트 생성됨
- [ ] 인증 미들웨어 설정됨
- [ ] Auth Callback Route 생성됨

### Day 5-7 체크리스트
- [ ] globals.css 업데이트됨
- [ ] utils.ts 생성됨
- [ ] Button 컴포넌트 생성됨

### Day 8-10 체크리스트
- [ ] ThemeProvider 생성됨
- [ ] 루트 레이아웃 업데이트됨
- [ ] 홈 페이지 생성됨

---

## 🧪 테스트 실행

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3000

# Lint 체크
npm run lint

# 포맷 체크
npm run format

# 테스트 실행
npm run test
```

---

## 🐛 문제 해결

### Q: Supabase 연결 안 됨
**A:** `.env.local` 파일이 올바른 위치에 있는지, 키가 정확한지 확인

### Q: 패키지 설치 오류
**A:** `node_modules` 삭제 후 재설치
```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: TypeScript 에러
**A:** `tsconfig.json`의 `paths` 설정 확인

### Q: 테마가 적용 안 됨
**A:** `html` 태그에 `suppressHydrationWarning` 추가 확인

---

## 📚 다음 단계

Week 1 완료 후:
1. **Week 2**: 로그인/회원가입 UI 구축
2. **Week 3**: Gantt 모듈 리팩토링 시작
3. **Week 4**: Supabase API 연동

---

**질문이나 문제가 있으면 GitHub Issues에 올려주세요!**

**작성일:** 2025-11-24

