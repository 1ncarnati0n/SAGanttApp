# 🏗️ SAGanttApp

> **프로젝트 관리를 위한 Gantt 차트 컴포넌트 라이브러리 & 대시보드**  
> contech-dx 프로젝트에 통합 가능한 독립 모듈

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38bdf8)](https://tailwindcss.com/)

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [빠른 시작](#-빠른-시작)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 로드맵](#-개발-로드맵)
- [문서](#-문서)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 개요

SAGanttApp은 **SVAR React Gantt** 라이브러리를 기반으로 한 강력한 프로젝트 관리 솔루션입니다.

### 핵심 목표

1. **재사용 가능한 Gantt 컴포넌트 모듈**: contech-dx 프로젝트에 쉽게 통합 가능
2. **프로젝트 관리 대시보드**: 멀티 프로젝트 & 멀티 Gantt 차트 관리
3. **Supabase 통합**: 실시간 데이터 동기화 및 협업
4. **통일된 디자인 시스템**: contech-dx와 동일한 UI/UX
5. **유연한 테마 시스템**: SVAR Willow/Willow Dark 테마 지원

### 사용 사례

- 🏗️ **건설 프로젝트**: 공정 관리, 일정 추적
- 💻 **IT 프로젝트**: 스프린트 계획, 작업 의존성 관리
- 📊 **일반 프로젝트**: 타임라인 시각화, 진행률 추적

---

## ✨ 주요 기능

### 대시보드 (진행 예정)
- ✅ 프로젝트 목록 및 CRUD
- ✅ Gantt 차트 멀티 관리
- ✅ 통계 및 활동 피드
- ✅ 검색 및 필터링

### Gantt 차트
- ✅ 드래그 앤 드롭으로 작업 이동
- ✅ 작업 간 의존성 연결 (링크)
- ✅ 진행률 추적 (Progress Bar)
- ✅ Summary 작업 자동 진행률 계산
- ✅ 마일스톤 표시
- ✅ 한국 공휴일 및 주말 하이라이트
- ✅ 다양한 작업 타입 (일반, 긴급, 간접, 마일스톤 등)
- ✅ 일/주/월 단위 스케일 전환
- ✅ 계획 일정(Baseline) 비교
- ✅ 실시간 저장 및 동기화

### 테마
- 🎨 Light/Dark 모드 (전체 앱)
- 🎨 SVAR Willow/Willow Dark (Gantt 영역 전용)
- 🎨 자동 테마 감지

### 인증 및 권한
- 🔐 Supabase Auth (이메일/비밀번호)
- 🔐 Row Level Security (RLS)
- 🔐 사용자별 데이터 격리

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Gantt**: SVAR React Gantt 2.3.3
- **Components**: Radix UI + shadcn/ui 스타일
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Form**: React Hook Form + Zod

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### Dev Tools
- **Linter**: ESLint 9.x
- **Formatter**: Prettier
- **Testing**: Vitest + Testing Library
- **Type Safety**: TypeScript strict mode

---

## 🚀 빠른 시작

### 필수 조건

- Node.js 20+
- npm 또는 yarn
- Supabase 계정

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-org/SAGanttApp.git
cd SAGanttApp
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> 📖 **상세 가이드**: [Quick Start Guide](./docs/QUICK_START_GUIDE.md)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

---

## 📁 프로젝트 구조

```
SAGanttApp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # 대시보드 레이아웃 그룹
│   │   ├── auth/               # 인증 페이지
│   │   └── api/                # API Routes
│   │
│   ├── components/
│   │   ├── gantt/              # ✨ Gantt 모듈 (독립 라이브러리)
│   │   │   ├── core/           # 핵심 차트 컴포넌트
│   │   │   ├── controls/       # 컨트롤 UI
│   │   │   ├── themes/         # Willow 테마
│   │   │   └── config/         # 설정
│   │   ├── dashboard/          # 대시보드 컴포넌트
│   │   ├── layout/             # 레이아웃 컴포넌트
│   │   └── ui/                 # shadcn/ui 스타일 컴포넌트
│   │
│   ├── lib/
│   │   ├── gantt/              # ✨ Gantt 로직 (독립 라이브러리)
│   │   │   ├── hooks/          # React Hooks
│   │   │   ├── utils/          # 유틸리티 함수
│   │   │   └── types/          # TypeScript 타입
│   │   ├── supabase/           # Supabase 클라이언트
│   │   └── services/           # 비즈니스 로직
│   │
│   └── styles/                 # CSS 파일
│
├── docs/                       # 📚 프로젝트 문서
│   ├── INTEGRATED_DEVELOPMENT_STRATEGY.md
│   ├── QUICK_START_GUIDE.md
│   ├── REFACTORING_STRATEGY.md
│   └── REFACTORING_SUMMARY.md
│
└── public/                     # 정적 파일
```

---

## 🗺️ 개발 로드맵

### Phase 1: 환경 통일 (Week 1-2) - 🔄 진행 중

- [ ] Supabase 설정
- [ ] 패키지 설치
- [ ] 디자인 시스템 이식
- [ ] 레이아웃 구축

### Phase 2: Gantt 리팩토링 (Week 3-4)

- [ ] 타입 시스템 개선
- [ ] 코드 모듈화
- [ ] Supabase API 연동
- [ ] 유닛 테스트

### Phase 3: 대시보드 (Week 5-6)

- [ ] 프로젝트 관리 UI
- [ ] Gantt 차트 관리 UI
- [ ] 통계 패널
- [ ] 검색/필터

### Phase 4: 테마 시스템 (Week 7)

- [ ] Willow 테마
- [ ] Willow Dark 테마
- [ ] 테마 토글

### Phase 5: 최종 점검 (Week 8)

- [ ] 통합 테스트
- [ ] 성능 최적화
- [ ] 문서화
- [ ] 배포

> 📖 **상세 일정**: [Integrated Development Strategy](./docs/INTEGRATED_DEVELOPMENT_STRATEGY.md)

---

## 📚 문서

### 개발 가이드

- **[통합 개발 전략](./docs/INTEGRATED_DEVELOPMENT_STRATEGY.md)** - 전체 프로젝트 아키텍처 및 8주 로드맵
- **[빠른 시작 가이드](./docs/QUICK_START_GUIDE.md)** - Week 1 실행 계획 (Day-by-Day)
- **[리팩토링 전략](./docs/REFACTORING_STRATEGY.md)** - 10대 개선점 상세 분석
- **[리팩토링 요약](./docs/REFACTORING_SUMMARY.md)** - 한눈에 보는 리팩토링 가이드

### API 문서 (예정)

- Gantt 컴포넌트 API
- Supabase 서비스 레이어
- Hooks 사용 가이드

### 디자인 문서

- **[스타일링 전략](./STYLING_STRATEGY.md)** - Gantt UI 개선 전략
- 컴포넌트 스타일 가이드 (예정)
- 테마 커스터마이징 (예정)

---

## 🏗️ 아키텍처

### 데이터베이스 ERD

```
users (Supabase Auth)
  ↓ (1:N)
projects
  ↓ (1:N)
gantt_charts
  ↓ (1:N)
tasks
  ↓ (N:M via links)
links
```

### 컴포넌트 계층

```
App
└── ThemeProvider (전체 앱 테마)
    └── Layout (NavBar, Sidebar)
        └── Dashboard (프로젝트 목록)
            └── Project Detail (Gantt 목록)
                └── GanttThemeProvider (Gantt 전용 테마)
                    └── GanttChart
```

---

## 🧪 테스트

```bash
# 유닛 테스트
npm run test

# 테스트 UI
npm run test:ui

# 커버리지
npm run test:coverage

# E2E 테스트 (예정)
npm run test:e2e
```

---

## 🤝 기여하기

### 브랜치 전략

- `main`: 프로덕션 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발
- `refactor/*`: 리팩토링
- `fix/*`: 버그 수정

### 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 포맷팅
test: 테스트 코드
chore: 빌드 설정 등
```

### Pull Request

1. `develop` 브랜치에서 새 브랜치 생성
2. 작업 완료 후 커밋 & 푸시
3. PR 생성 (템플릿 사용)
4. 코드 리뷰 후 병합

---

## 🔗 관련 프로젝트

- **[contech-dx](../contech-dx)** - 메인 프로젝트 (SAGantt 통합 예정)
- **[SVAR React Gantt](https://docs.svar.dev/react/gantt/)** - 기반 라이브러리

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

---

## 📞 문의

- **Issues**: [GitHub Issues](https://github.com/your-org/SAGanttApp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/SAGanttApp/discussions)
- **Email**: your-email@example.com

---

## 🙏 감사의 말

- [SVAR React Gantt](https://svar.dev/) - 훌륭한 Gantt 라이브러리
- [Supabase](https://supabase.com/) - 강력한 백엔드 서비스
- [shadcn/ui](https://ui.shadcn.com/) - 아름다운 UI 컴포넌트
- [Next.js](https://nextjs.org/) - 최고의 React 프레임워크

---

<div align="center">
  <p>Made with ❤️ by SAGantt Team</p>
  <p>
    <a href="./docs/QUICK_START_GUIDE.md">빠른 시작</a> •
    <a href="./docs/INTEGRATED_DEVELOPMENT_STRATEGY.md">개발 전략</a> •
    <a href="https://github.com/your-org/SAGanttApp">GitHub</a>
  </p>
</div>
