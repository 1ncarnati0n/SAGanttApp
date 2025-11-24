# 🏗️ SAGanttApp 프로젝트 총괄 개요

> **한눈에 보는 프로젝트 전략, 아키텍처, 실행 계획**

---

## 📊 프로젝트 요약

### 목적
SAGanttApp을 **contech-dx에 통합 가능한 Gantt 컴포넌트 라이브러리**로 개편하고,  
독립 실행 가능한 **프로젝트 관리 대시보드**를 구축합니다.

### 핵심 가치 제안
1. 🔄 **재사용성**: contech-dx에서 `import`만으로 사용 가능
2. 💾 **영속성**: Supabase 기반 실시간 데이터 동기화
3. 🎨 **일관성**: contech-dx와 동일한 디자인 시스템
4. 🌗 **유연성**: 독립 테마 시스템 (Willow/Willow Dark)
5. 📈 **확장성**: 멀티 프로젝트, 멀티 Gantt 차트 관리

---

## 🎯 핵심 목표 vs 현재 상태

| 목표 | 현재 상태 | 목표 상태 | 우선순위 |
|------|----------|----------|---------|
| **독립 모듈화** | 단일 앱 형태 | Export 가능한 라이브러리 | 🔴 높음 |
| **Supabase 연동** | Mock API (메모리) | PostgreSQL + RLS | 🔴 높음 |
| **환경 통일** | 일부 다름 | contech-dx 동일 | 🔴 높음 |
| **테마 시스템** | 부분 적용 | Willow 독립 테마 | 🟡 중간 |
| **대시보드** | 없음 | 멀티 프로젝트 관리 | 🟡 중간 |
| **타입 안전성** | `any` 다수 | Strict TypeScript | 🟡 중간 |
| **테스트** | 0% | 70%+ 커버리지 | 🟢 낮음 |
| **문서화** | 기본 | API + 가이드 완성 | 🟢 낮음 |

---

## 🏛️ 시스템 아키텍처

### 3-Tier 구조

```
┌─────────────────────────────────────────────────────┐
│            Presentation Layer (UI)                  │
│  ┌──────────────┐  ┌───────────────────────┐       │
│  │ Dashboard    │  │  Gantt Module         │       │
│  │ (Projects,   │  │  (독립 컴포넌트)        │       │
│  │  Gantt List) │  │  - Chart              │       │
│  │              │  │  - Toolbar            │       │
│  │              │  │  - Theme              │       │
│  └──────────────┘  └───────────────────────┘       │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│         Business Logic Layer (Services)             │
│  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Projects    │  │ Gantt Charts│  │  Tasks     │  │
│  │ Service     │  │  Service    │  │  Service   │  │
│  └─────────────┘  └─────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│          Data Layer (Supabase + PostgreSQL)         │
│  ┌─────────┐  ┌─────────────┐  ┌────────┐  ┌─────┐ │
│  │projects │→ │gantt_charts │→ │ tasks  │→ │links│ │
│  └─────────┘  └─────────────┘  └────────┘  └─────┘ │
│                                                      │
│  + Row Level Security (RLS)                         │
│  + Realtime Subscriptions (선택)                     │
└─────────────────────────────────────────────────────┘
```

### 데이터 플로우

```
사용자 액션 (Gantt 차트 수정)
  ↓
React Event Handler
  ↓
Gantt Hook (useGanttSchedule)
  ↓
Service Layer (tasksService.update)
  ↓
Supabase Client (API call)
  ↓
PostgreSQL (RLS 체크 → 데이터 저장)
  ↓
Supabase Realtime (선택, 다른 사용자에게 전파)
  ↓
React State Update (UI 갱신)
```

---

## 🎨 UI/UX 설계

### 화면 구성 (3단계 네비게이션)

```
Level 1: 대시보드
┌────────────────────────────────────────┐
│ 🏗️ SAGantt        [테마] [프로필▼]     │
├────────────────────────────────────────┤
│ 📊 프로젝트 대시보드                     │
│ [+ 새 프로젝트]           [검색][필터]  │
│                                        │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐│
│ │프로젝트 A │ │프로젝트 B │ │프로젝트 C ││
│ │3개 차트  │ │1개 차트  │ │5개 차트  ││
│ │[열기]    │ │[열기]    │ │[열기]    ││
│ └──────────┘ └──────────┘ └──────────┘│
└────────────────────────────────────────┘
         ↓ 클릭
Level 2: 프로젝트 상세
┌────────────────────────────────────────┐
│ 🏗️ SAGantt > 프로젝트 A   [테마][프로필]│
├────────────────────────────────────────┤
│ ← 대시보드                              │
│ 📁 프로젝트 A                [설정⚙️]   │
│ [+ 새 Gantt 차트]          [검색][필터] │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │📊 지하 골조 공정  [열기][복사][삭제]│  │
│ │56% 완료 ▓▓▓▓▓▓▓░░░░░░░          │  │
│ └──────────────────────────────────┘  │
│ ┌──────────────────────────────────┐  │
│ │📊 지상 골조 공정  [열기][복사][삭제]│  │
│ │23% 완료 ▓▓▓░░░░░░░░░░░░          │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
         ↓ 클릭
Level 3: Gantt 차트
┌────────────────────────────────────────┐
│ 🏗️ SAGantt > A > 지하골조 [전체화면]   │
│ [← 뒤로]                   [테마][저장] │
├────────────────────────────────────────┤
│ [일▼][주][월] | [계획일정표시]           │
│ ┌──────────────────────────────────┐  │
│ │   SVAR Gantt 차트 영역            │  │
│ │   (Willow/Willow Dark 테마)      │  │
│ │                                  │  │
│ │ ┌────┬────────┬───────────────┐ │  │
│ │ │작업│시작종료 │2025-01│02│03 │ │  │
│ │ ├────┼────────┼───────────────┤ │  │
│ │ │벽체│01-04~31│▓▓▓░░░         │ │  │
│ │ │슬래브01-10~24  ▓▓▓░░         │ │  │
│ │ └────┴────────┴───────────────┘ │  │
│ └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

### 주요 UX 플로우

#### 플로우 1: 신규 프로젝트 생성
```
대시보드 → [+ 새 프로젝트] → 폼 입력 → [생성] → 프로젝트 상세 (빈 상태)
```

#### 플로우 2: Gantt 차트 생성 및 편집
```
프로젝트 상세 → [+ 새 Gantt] → 템플릿 선택 → Gantt 뷰 → 작업 추가/편집 → [저장💾]
```

#### 플로우 3: 테마 전환
```
Gantt 뷰 → [테마 토글] → Willow ↔ Willow Dark (차트 영역만 변경)
```

---

## 🛠️ 기술 스택 매트릭스

### contech-dx 대비 차이점

| 구분 | contech-dx | SAGanttApp (현재) | SAGanttApp (목표) |
|------|-----------|-----------------|-----------------|
| **Framework** | Next.js 16.0.1 | Next.js 16.0.3 | Next.js 16.0.3 ✅ |
| **React** | 19.2.0 | 19.2.0 | 19.2.0 ✅ |
| **Tailwind** | 4.x | 4.x | 4.x ✅ |
| **Supabase** | @supabase/ssr | ❌ | @supabase/ssr ⚠️ |
| **UI Comp** | Radix UI | ❌ | Radix UI ⚠️ |
| **Icons** | Lucide React | ❌ | Lucide React ⚠️ |
| **Theme** | next-themes | ❌ | next-themes ⚠️ |
| **Toast** | Sonner | ❌ | Sonner ⚠️ |
| **Form** | RHF + Zod | ❌ | RHF + Zod ⚠️ |
| **Animation** | Framer Motion | ❌ | Framer Motion ⚠️ |
| **Gantt** | - | SVAR 2.3.3 | SVAR 2.3.3 ✅ |

**범례:**
- ✅ 완료
- ⚠️ 설치 필요
- ❌ 없음

---

## 🗓️ 8주 개발 로드맵

### Week 1-2: 환경 통일 🔄
**목표:** contech-dx와 동일한 기술 스택 구축

```
Day 1-2   : Supabase 프로젝트 생성, DB 스키마
Day 3-4   : 패키지 설치, ESLint/Prettier
Day 5-7   : Supabase 클라이언트, 인증 설정
Day 8-10  : 디자인 시스템 이식 (globals.css, Button 등)
Day 11-14 : 레이아웃 구축 (NavBar, ThemeProvider)
```

**Deliverable:**
- ✅ Supabase 연결 완료
- ✅ contech-dx 스타일 적용
- ✅ 기본 레이아웃 및 테마 시스템

---

### Week 3-4: Gantt 리팩토링 🔧
**목표:** 코드 품질 향상 및 모듈화

```
Day 15-17 : 타입 시스템 개선 (any 제거)
Day 18-21 : Hook 분리 (Data/Events/SummaryProgress)
Day 22-24 : Utils 분리 (dateUtils, serializers)
Day 25-28 : Supabase Service Layer 구축
```

**Deliverable:**
- ✅ TypeScript strict mode 통과
- ✅ 모듈화된 코드 구조
- ✅ Supabase CRUD 연동

---

### Week 5-6: 대시보드 구축 🎨
**목표:** 프로젝트 관리 UI 완성

```
Day 29-31 : 프로젝트 CRUD (목록, 생성, 수정, 삭제)
Day 32-35 : Gantt 차트 CRUD
Day 36-38 : 통계 패널 및 활동 피드
Day 39-42 : 검색/필터 기능
```

**Deliverable:**
- ✅ 프로젝트 관리 대시보드
- ✅ Gantt 차트 목록 페이지
- ✅ 통계 시각화

---

### Week 7: 테마 시스템 🌗
**목표:** Willow/Willow Dark 독립 테마

```
Day 43-45 : gantt-willow.css 작성
Day 46-47 : gantt-willow-dark.css 작성
Day 48-49 : GanttThemeProvider 구현
```

**Deliverable:**
- ✅ Gantt 영역 독립 테마
- ✅ 테마 토글 UI
- ✅ 전체 앱 vs Gantt 테마 격리

---

### Week 8: 최종 점검 ✅
**목표:** 프로덕션 준비

```
Day 50-52 : 통합 테스트 (E2E)
Day 53-54 : 성능 최적화
Day 55-56 : 문서화 (API, 가이드)
```

**Deliverable:**
- ✅ 테스트 커버리지 70%+
- ✅ Lighthouse 점수 85+
- ✅ 배포 완료 (Vercel)

---

## 📋 체크리스트 (전체)

### Phase 1: 환경 설정 ⏳
- [ ] Supabase 프로젝트 생성
- [ ] 데이터베이스 스키마 실행
- [ ] 필수 패키지 설치
- [ ] ESLint/Prettier 설정
- [ ] Supabase 클라이언트 설정
- [ ] 인증 미들웨어 설정
- [ ] contech-dx 스타일 이식
- [ ] 기본 레이아웃 구축

### Phase 2: Gantt 리팩토링 ⏳
- [ ] 타입 시스템 개선
- [ ] Hook 분리
- [ ] Utils 분리
- [ ] Supabase Service Layer
- [ ] API Routes 작성
- [ ] 유닛 테스트 작성

### Phase 3: 대시보드 ⏳
- [ ] 프로젝트 CRUD
- [ ] Gantt 차트 CRUD
- [ ] 통계 패널
- [ ] 활동 피드
- [ ] 검색/필터

### Phase 4: 테마 시스템 ⏳
- [ ] Willow 테마
- [ ] Willow Dark 테마
- [ ] 테마 토글
- [ ] 사용자 설정 저장

### Phase 5: 최종 점검 ⏳
- [ ] 통합 테스트
- [ ] 성능 최적화
- [ ] 문서화
- [ ] 배포

---

## 📚 문서 가이드

### 읽는 순서

1. **처음 시작한다면:**
   - 📖 [README.md](../README.md) - 프로젝트 소개
   - 🚀 [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) - Day 1부터 시작

2. **전체 전략을 알고 싶다면:**
   - 🎯 [INTEGRATED_DEVELOPMENT_STRATEGY.md](./INTEGRATED_DEVELOPMENT_STRATEGY.md) - 아키텍처 + 로드맵

3. **코드 개선에 집중한다면:**
   - 🔧 [REFACTORING_STRATEGY.md](./REFACTORING_STRATEGY.md) - 10대 개선점 상세
   - 📊 [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - 한눈에 보는 요약

4. **UI 개선에 집중한다면:**
   - 🎨 [STYLING_STRATEGY.md](../STYLING_STRATEGY.md) - Gantt 스타일 전략

---

## 🎯 핵심 성공 지표 (KPI)

### 개발 효율성
- [ ] 새 기능 추가 시간 **50% 감소**
- [ ] 버그 수정 시간 **40% 감소**
- [ ] 코드 리뷰 시간 **30% 감소**

### 코드 품질
- [ ] TypeScript strict mode 통과
- [ ] ESLint 에러 **0개**
- [ ] 테스트 커버리지 **70%+**
- [ ] 함수당 평균 라인 수 **< 50줄**

### 성능
- [ ] 대시보드 초기 로딩 **< 2초**
- [ ] Gantt 차트 렌더링 **< 1.5초**
- [ ] 사용자 인터랙션 반응 **< 100ms**
- [ ] Lighthouse 점수 **85+**

### 사용성
- [ ] 모바일 반응형 완성
- [ ] 키보드 단축키 지원
- [ ] 접근성 **WCAG 2.1 AA**
- [ ] 다국어 지원 (한국어/영어)

---

## 💡 핵심 기술 도전 과제

### 1. 모듈 독립성 🔴
**도전:** Gantt 모듈을 contech-dx에 쉽게 통합  
**해결책:**
- 명확한 Public API (`components/gantt/index.ts`)
- Peer Dependencies 설정
- Zero External Config (자체 완결성)

### 2. 테마 시스템 격리 🟡
**도전:** Gantt 영역만 Willow 테마, 나머지는 contech-dx 테마  
**해결책:**
- CSS 변수 스코프 격리
- Context API로 테마 상태 관리
- `gantt-area` 클래스로 영역 분리

### 3. 실시간 동기화 🟢
**도전:** 여러 사용자가 동시에 Gantt 수정  
**해결책:**
- Supabase Realtime Subscriptions
- Optimistic UI Updates
- Conflict Resolution 전략

### 4. 대용량 데이터 처리 🟡
**도전:** 수백 개의 Task가 있는 Gantt 차트  
**해결책:**
- SVAR Gantt 기본 Virtual Scrolling 활용
- Lazy Loading (부모-자식 관계)
- Pagination + Infinite Scroll

---

## 🚀 즉시 시작하기

### Quick Wins (30분 ~ 2시간)

1. **ESLint/Prettier 설정** (30분)
2. **Supabase 프로젝트 생성** (1시간)
3. **패키지 설치** (30분)
4. **개발 서버 실행** (10분)

### 오늘 할 수 있는 것 (Day 1)

```bash
# 1. Supabase 프로젝트 생성
https://supabase.com → New Project

# 2. 환경 변수 설정
echo "NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx..." >> .env.local

# 3. DB 스키마 실행
# Supabase SQL Editor에서 schema 실행

# 4. 개발 서버 실행
npm install
npm run dev
```

---

## 🤝 협업 가이드

### 개발 플로우

```
1. Issue/Task 확인
   ↓
2. 브랜치 생성 (feature/xxx)
   ↓
3. 개발 + 커밋
   ↓
4. 로컬 테스트 (npm run test)
   ↓
5. Push + PR 생성
   ↓
6. 코드 리뷰
   ↓
7. 병합 (develop)
```

### 커밋 규칙

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 포맷팅
test: 테스트 코드
chore: 빌드 설정 등
```

### PR 템플릿

```markdown
## 변경 내용
- 

## 관련 Issue
- #123

## 체크리스트
- [ ] 로컬 테스트 완료
- [ ] 타입 에러 없음
- [ ] Lint 통과
- [ ] 문서 업데이트
```

---

## 📞 지원 및 문의

- **📖 문서**: [docs/](./docs/)
- **🐛 버그 리포트**: GitHub Issues
- **💬 질문**: GitHub Discussions
- **📧 이메일**: team@example.com

---

## 🎉 다음 단계

### 지금 바로 시작
1. [Quick Start Guide](./QUICK_START_GUIDE.md) Day 1 진행
2. Supabase 프로젝트 생성
3. 첫 커밋 만들기

### Week 1 목표
- Supabase 연동 완료
- contech-dx 스타일 적용
- 기본 레이아웃 구축

### 장기 비전
- contech-dx에 통합
- NPM 패키지로 배포
- 오픈소스 커뮤니티 구축

---

<div align="center">

**🏗️ Let's Build Amazing Project Management Together! 🚀**

[시작하기](./QUICK_START_GUIDE.md) • [전략 보기](./INTEGRATED_DEVELOPMENT_STRATEGY.md) • [코드 보기](../src)

</div>

---

**작성일:** 2025-11-24  
**최종 수정:** 2025-11-24  
**버전:** 1.0.0

