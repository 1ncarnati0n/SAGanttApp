# 스타일 개선 전략

> SAGanttApp 프로젝트의 스타일링 체계 개선을 위한 전략 문서

## 📊 현재 상태 분석

### 발견된 주요 이슈

#### 1. App.tsx (src/App.tsx:7)
- **문제**: 메인 제목 `<h1>ConTech Gantt App</h1>`에 스타일이 적용되지 않음
- **영향**: 기본 브라우저 스타일만 표시되어 일관성 부족

#### 2. GanttPreview.tsx - 로딩/에러 상태 (src/components/GanttPreview.tsx:228-263)
- **문제**: 로딩 메시지와 에러 메시지에 스타일이 거의 없음
- **영향**: 사용자 경험 저하

```tsx
// 현재 구현 (line 228-231)
<div>
  데이터를 불러오는 중...
</div>

// 현재 구현 (line 261-263)
<div>
  데이터를 불러오지 못했습니다.
</div>
```

#### 3. GanttControls.tsx - 디버그 정보 노출 (src/components/gantt/GanttControls.tsx:54,62)
- **문제**: 프로덕션 환경에 부적합한 디버그 정보 노출
- **위치**:
  - line 54: 버튼 title 속성
  - line 62: UI에 직접 표시

```tsx
// line 54
title={`hasChanges: ${hasChanges}, saveState: ${saveState}`}

// line 62
<span className="ml-2 text-xs text-gray-400">
  (Debug: hasChanges={String(hasChanges)})
</span>
```

#### 4. 스타일 일관성
- **문제**: Tailwind CSS와 custom CSS 혼용
- **현황**:
  - Tailwind 사용: App.tsx, GanttPreview.tsx, GanttControls.tsx
  - Custom CSS 사용: 버튼 컴포넌트 (`.btn`, `.btn-view`, `.btn-toggle`, `.btn-save`)
- **영향**: 유지보수성 저하, 학습 곡선 증가

#### 5. GanttControls 컨테이너 (src/components/gantt/GanttControls.tsx:29)
- **문제**: 배경색이 다른 컴포넌트와 조화롭지 않을 가능성
- **현재**: `bg-gray-100`

---

## 🎯 개선 전략

### Phase 1: 디자인 시스템 정립 (우선순위: 높음)

#### 1.1 Tailwind 테마 확장 및 통합

**목표**: CSS 변수와 Tailwind 테마를 통합하여 일관성 확보

**현재 문제점**:
- `globals.css`에 CSS 변수로 색상, 간격, 반경 등 정의
- `tailwind.config.ts`에 일부 색상만 정의
- 두 시스템이 분리되어 중복 관리 필요

**개선 방안**:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4b8aef",
          hover: "#2563eb",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#ffffff",
          hover: "#059669",
          foreground: "#000000",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          hover: "#7c3aed",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#d1d5db",
          hover: "#9ca3af",
          foreground: "#1f2937",
        },
      },
      spacing: {
        xs: "0.3rem",
        sm: "0.6rem",
        md: "1rem",
        lg: "1.4rem",
      },
      borderRadius: {
        sm: "0.25rem",
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
      boxShadow: {
        brutalist: "2px 2px 1px rgba(15, 23, 42, 0.8)",
        "gantt": "5px 5px 0px rgba(27, 27, 27, 0.85)",
      },
    },
  },
  plugins: [],
};

export default config;
```

**효과**:
- CSS 변수와 Tailwind 클래스 간 일관성 확보
- 디자인 토큰 중앙 관리
- 자동완성 지원으로 개발 생산성 향상

#### 1.2 컴포넌트 레이어 정의

**목표**: 재사용 가능한 컴포넌트 클래스 생성

**개선 방안**:

```css
/* globals.css */
@layer components {
  .btn {
    @apply px-2 py-1.5 border border-black cursor-pointer;
    @apply shadow-brutalist font-medium transition-all;
    @apply text-sm leading-tight;
    border-radius: 0;
  }

  .btn:disabled {
    @apply cursor-not-allowed opacity-60 bg-muted text-muted-foreground;
  }

  .btn-view {
    @apply btn bg-muted text-muted-foreground font-normal;
  }

  .btn-view.active {
    @apply bg-success text-success-foreground font-bold;
  }

  .btn-toggle {
    @apply btn bg-muted text-muted-foreground font-normal;
  }

  .btn-toggle.active {
    @apply bg-accent text-accent-foreground font-bold;
  }

  .btn-save {
    @apply btn bg-primary text-primary-foreground font-bold ml-2;
  }

  .btn-save:hover:not(:disabled) {
    @apply bg-primary-hover;
  }
}
```

**효과**:
- Tailwind의 유틸리티와 커스텀 스타일 통합
- 일관된 버튼 스타일 관리
- 코드 중복 제거

---

### Phase 2: 컴포넌트별 스타일 개선 (우선순위: 중간)

#### 2.1 즉시 개선 항목

##### A. App.tsx 제목 스타일링

**Before**:
```tsx
<h1>ConTech Gantt App</h1>
```

**After**:
```tsx
<h1 className="text-3xl font-bold text-slate-800 mb-2">
  ConTech Gantt App
</h1>
```

##### B. 로딩/에러 상태 컴포넌트화

**새로운 컴포넌트 생성**:

```tsx
// src/components/ui/LoadingSpinner.tsx
export function LoadingSpinner({ message = "데이터를 불러오는 중..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-primary"></div>
      <p className="text-slate-600 text-sm">{message}</p>
    </div>
  );
}

// src/components/ui/ErrorMessage.tsx
export function ErrorMessage({ message = "데이터를 불러오지 못했습니다." }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-3">
        <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <p className="text-red-800 font-medium">{message}</p>
      </div>
    </div>
  );
}
```

**GanttPreview.tsx 수정**:
```tsx
import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";

// ...

{isLoading ? (
  <LoadingSpinner />
) : schedule ? (
  // ... 간트 차트
) : (
  <ErrorMessage />
)}
```

##### C. 디버그 정보 제거/조건부 표시

**Option 1: 완전 제거** (추천)
```tsx
// GanttControls.tsx

// ❌ 제거
// title={`hasChanges: ${hasChanges}, saveState: ${saveState}`}

// ❌ 제거
// <span className="ml-2 text-xs text-gray-400">
//   (Debug: hasChanges={String(hasChanges)})
// </span>
```

**Option 2: 개발 환경에서만 표시**
```tsx
{import.meta.env.DEV && (
  <span className="ml-2 text-xs text-gray-400">
    (Debug: hasChanges={String(hasChanges)})
  </span>
)}
```

#### 2.2 GanttControls 리팩토링

**현재 문제**: Tailwind + Custom CSS 혼용

**Option A: Tailwind 중심** (유연성 높음)

```tsx
export function GanttControls({ ... }: GanttControlsProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200">
      {VIEW_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onViewTypeChange(option.id)}
          className={`
            px-3 py-2 text-sm font-medium border border-black
            transition-all shadow-brutalist
            ${viewType === option.id
              ? 'bg-white text-black font-bold'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
          aria-pressed={viewType === option.id}
        >
          {option.label}
        </button>
      ))}
      {/* ... */}
    </div>
  );
}
```

**Option B: Custom CSS 유지** (일관성 높음)

현재 구조 유지, 단 Tailwind와 custom 클래스를 명확히 분리

---

### Phase 3: UI/UX 향상 (우선순위: 중간)

#### 3.1 상태별 피드백 개선

##### 저장 상태 피드백

**현재**:
```tsx
<span className="ml-2 text-sm text-gray-600" role="status">
  {hasChanges && saveState === "idle" && "변경 사항이 있습니다."}
  {saveState === "saved" && "변경 내용이 mock.json에 저장되었습니다."}
  {saveState === "error" && "저장 실패 - 콘솔을 확인하세요."}
</span>
```

**개선**:
```tsx
<div className="ml-4" role="status" aria-live="polite">
  {hasChanges && saveState === "idle" && (
    <span className="inline-flex items-center gap-1.5 text-sm text-amber-600">
      <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
      변경 사항이 있습니다
    </span>
  )}
  {saveState === "saved" && (
    <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      저장되었습니다
    </span>
  )}
  {saveState === "error" && (
    <span className="inline-flex items-center gap-1.5 text-sm text-red-600">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      저장 실패
    </span>
  )}
</div>
```

#### 3.2 반응형 디자인 고려

**현재**: 데스크톱 위주 레이아웃

**개선 제안**:
```tsx
// GanttControls.tsx
<div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50">
  {/* 모바일에서 버튼이 자동으로 줄바꿈 */}
</div>

// App.tsx
<main className="flex flex-col gap-4 px-4 py-4 md:px-6 md:py-6">
  {/* 화면 크기에 따라 패딩 조정 */}
</main>
```

---

### Phase 4: 유지보수성 향상 (우선순위: 낮음)

#### 4.1 스타일 파일 구조 개선

**현재 구조**:
```
src/
├── styles/
│   └── globals.css
└── components/
    └── styles/
        └── gantt.css
```

**제안 구조**:
```
src/
└── styles/
    ├── globals.css              # Tailwind directives + 전역 스타일
    ├── tokens/
    │   └── variables.css        # CSS 변수만 (색상, 간격 등)
    └── components/
        ├── gantt.css           # Gantt 라이브러리 커스터마이징
        ├── buttons.css         # 버튼 스타일 (옵션)
        └── feedback.css        # 로딩/에러/성공 상태
```

**장점**:
- 명확한 책임 분리
- 파일 크기 관리 용이
- 필요한 스타일만 선택적으로 import 가능

#### 4.2 스타일 가이드 문서화

**STYLE_GUIDE.md 생성**:

```markdown
# 스타일 가이드

## 색상 팔레트

### Primary (주요 액션)
- Default: `#4b8aef` / `bg-primary`
- Hover: `#2563eb` / `bg-primary-hover`

### Success (성공 상태)
- Default: `#ffffff` / `bg-success`
- Hover: `#059669` / `bg-success-hover`

## 타이포그래피

- 제목(h1): `text-3xl font-bold`
- 제목(h2): `text-2xl font-semibold`
- 본문: `text-base`
- 캡션: `text-sm`

## 간격 시스템

- xs: 0.3rem (4.8px)
- sm: 0.6rem (9.6px)
- md: 1rem (16px)
- lg: 1.4rem (22.4px)

## 컴포넌트 사용 예시

### 버튼
[예시 코드...]
```

---

## 🚀 추천 구현 순서

### Step 1: 긴급 수정 (예상 시간: 30분)

**목표**: 즉시 눈에 띄는 문제 해결

- [ ] App.tsx h1 제목 스타일 추가
- [ ] GanttControls 디버그 정보 제거
- [ ] 로딩/에러 상태 기본 스타일 추가

**체크리스트**:
```tsx
// 1. src/App.tsx
<h1 className="text-3xl font-bold text-slate-800 mb-2">
  ConTech Gantt App
</h1>

// 2. src/components/gantt/GanttControls.tsx
// - line 54 title 제거
// - line 62 Debug 문구 제거

// 3. src/components/GanttPreview.tsx
<div className="flex items-center justify-center p-8 text-slate-600">
  데이터를 불러오는 중...
</div>

<div className="bg-red-50 border border-red-200 p-4 rounded text-red-800">
  데이터를 불러오지 못했습니다.
</div>
```

### Step 2: 기반 작업 (예상 시간: 2-3시간)

**목표**: 디자인 시스템 기반 구축

- [ ] Tailwind 테마 확장 (CSS 변수 통합)
- [ ] 버튼 컴포넌트 스타일 통일
- [ ] LoadingSpinner 컴포넌트 생성
- [ ] ErrorMessage 컴포넌트 생성
- [ ] 저장 상태 피드백 개선

**세부 작업**:

1. **tailwind.config.ts 수정**
   - colors 확장
   - spacing 확장
   - boxShadow 확장

2. **globals.css 리팩토링**
   - @layer components 사용
   - Tailwind 유틸리티로 변환

3. **UI 컴포넌트 생성**
   ```
   src/components/ui/
   ├── LoadingSpinner.tsx
   ├── ErrorMessage.tsx
   └── index.ts
   ```

4. **GanttControls 상태 피드백 개선**

### Step 3: 장기 개선 (예상 시간: 1-2일, 선택사항)

**목표**: 유지보수성과 확장성 강화

- [ ] 스타일 파일 구조 재편성
- [ ] 스타일 가이드 문서 작성 (STYLE_GUIDE.md)
- [ ] 반응형 디자인 추가
- [ ] 접근성 개선 (aria-label, role 등)
- [ ] 다크 모드 지원 (선택)

---

## ⚖️ 의사결정이 필요한 부분

### 1. 스타일 방향성

#### Option A: Tailwind 중심 ⭐ **추천**
- **장점**: 유연성, 빠른 개발, 번들 크기 최적화
- **단점**: 클래스명이 길어질 수 있음
- **적합한 경우**: 빠른 프로토타이핑, 디자인 변경이 잦은 경우

#### Option B: Custom CSS 중심
- **장점**: 깔끔한 JSX, 재사용성
- **단점**: CSS 파일 관리 필요, 번들 크기 증가 가능
- **적합한 경우**: 일관된 디자인 시스템, 복잡한 컴포넌트

#### Option C: 혼합 (Tailwind + Custom)
- **장점**: 각 방식의 장점 활용
- **단점**: 학습 곡선, 일관성 유지 필요
- **적합한 경우**: 현재 프로젝트 (Gantt 라이브러리 커스터마이징 필요)

**권장**: **Option C (혼합)**
- Gantt 라이브러리 커스터마이징: Custom CSS (gantt.css)
- 일반 UI 컴포넌트: Tailwind 중심
- 복잡한 컴포넌트: @layer components 활용

### 2. Brutalist 디자인 유지 여부

**현재 스타일**:
- `border: 1px solid black`
- `box-shadow: 2px 2px 1px rgba(15, 23, 42, 0.8)`
- `border-radius: 0`

**선택지**:
- ✅ **유지**: 강한 시각적 개성, 차별화
- ❌ **변경**: 더 부드러운 모던 디자인

**권장**: **유지** (프로젝트 정체성 확립)

### 3. 개선 범위

**선택지**:
- 🟢 **Step 1만**: 빠른 개선, 최소한의 변경
- 🟡 **Step 1 + 2**: 체계적 개선, 장기적 유지보수성 확보 ⭐ **추천**
- 🔴 **전체**: 완벽한 시스템, 시간 투자 필요

**권장**: **Step 1 + 2**
- 즉각적인 개선 효과
- 향후 확장 가능한 기반 마련
- 합리적인 시간 투자

---

## 📝 체크리스트

작업 진행 시 아래 체크리스트를 활용하세요.

### Phase 1: 디자인 시스템
- [ ] tailwind.config.ts 색상 확장
- [ ] tailwind.config.ts spacing 확장
- [ ] tailwind.config.ts boxShadow 확장
- [ ] globals.css @layer components 작성
- [ ] 기존 CSS 변수 정리

### Phase 2: 컴포넌트 개선
- [ ] App.tsx h1 스타일 추가
- [ ] LoadingSpinner 컴포넌트 생성
- [ ] ErrorMessage 컴포넌트 생성
- [ ] GanttPreview 로딩/에러 상태 적용
- [ ] GanttControls 디버그 정보 제거
- [ ] GanttControls 저장 피드백 개선

### Phase 3: UI/UX 향상
- [ ] 저장 상태 아이콘 추가
- [ ] 애니메이션 추가 (저장 중 스피너 등)
- [ ] 반응형 레이아웃 적용
- [ ] 접근성 속성 추가 (aria-*)

### Phase 4: 유지보수성
- [ ] 스타일 파일 구조 개편
- [ ] STYLE_GUIDE.md 작성
- [ ] 주석 및 문서화

---

## 📚 참고 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [@svar-ui/react-gantt 문서](https://docs.svar.dev/gantt/overview/)
- [CSS Custom Properties (변수)](https://developer.mozilla.org/ko/docs/Web/CSS/Using_CSS_custom_properties)
- [Brutalist Web Design](https://brutalist-web.design/)

---

## 📅 작성 정보

- **작성일**: 2025-11-18
- **프로젝트**: SAGanttApp
- **버전**: 1.0.0
- **상태**: Draft
