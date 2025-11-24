# SAGanttApp 리팩토링 전략

## 📊 프로젝트 현황 분석

### 기술 스택
- **Framework**: Next.js 16.0.3 (App Router)
- **UI Library**: SVAR React Gantt v2.3.3
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4 + Custom CSS
- **Data Fetching**: Axios
- **State Management**: React Hooks (useState, useRef, useCallback)

### 프로젝트 구조
```
src/
├── app/
│   ├── api/mock/route.ts      # Mock API (메모리 기반)
│   ├── page.tsx                # 메인 페이지
│   └── layout.tsx              # 루트 레이아웃
├── components/
│   ├── GanttChart.tsx          # Gantt 차트 메인 컴포넌트
│   ├── GanttWrapper.tsx        # Dynamic import wrapper
│   └── gantt/
│       ├── useGanttSchedule.ts # 핵심 비즈니스 로직 (630줄)
│       ├── GanttControls.tsx   # 컨트롤 UI
│       ├── TaskTooltip.tsx     # 툴팁
│       ├── WillowTheme.tsx     # 테마 래퍼
│       ├── editorItems.tsx     # 에디터 설정
│       ├── taskConfig.ts       # Task 타입 설정
│       └── types.ts            # 타입 정의
├── data/
│   ├── users.ts                # 사용자 데이터
│   └── koreanHolidays.ts       # 한국 공휴일
└── styles/
    ├── gantt.css               # Gantt 커스텀 스타일
    └── svar-gantt-fixed.css    # 라이브러리 수정 스타일
```

---

## 🔍 주요 개선점 분석

### 1. **타입 안전성 (Type Safety) ⚠️ 높음**

**문제점:**
- `any` 타입이 많이 사용됨 (api: any, task: any)
- `Record<string, unknown>` 타입이 구체적이지 않음
- 타입 가드가 부족함
- 런타임 타입 체크 로직이 복잡함 (`toDateOrUndefined`, `normalizeNumber`)

**개선 방안:**
```typescript
// 현재 (useGanttSchedule.ts)
const [ganttApi, setGanttApi] = useState<any | null>(null);

// 개선안
interface GanttApi {
  exec: (action: string, payload?: any) => void;
  on: (event: string, handler: Function, options?: any) => void;
  detach: (tag: symbol) => void;
  getTask: (id: TaskId) => Task | undefined;
  getState: () => GanttState;
  getStores: () => GanttStores;
  serialize: () => Task[];
}

const [ganttApi, setGanttApi] = useState<GanttApi | null>(null);
```

**우선순위:** 🔴 높음  
**예상 작업량:** 2-3일

---

### 2. **코드 구조 (Code Structure) ⚠️ 높음**

**문제점:**
- `useGanttSchedule.ts`가 630줄로 너무 큼 (단일 책임 원칙 위반)
- 다음 기능들이 한 파일에 혼재:
  - 데이터 로딩/저장
  - 타입 변환 (serialize/deserialize)
  - Summary task 진행률 계산
  - 이벤트 핸들링
  - 날짜 파싱 유틸

**개선 방안:**
```
src/
├── hooks/
│   ├── useGanttData.ts         # 데이터 로딩/저장
│   ├── useGanttEvents.ts       # 이벤트 리스너 관리
│   ├── useSummaryProgress.ts   # Summary 진행률 계산
│   └── useGanttSchedule.ts     # 통합 훅 (orchestrator)
├── lib/
│   ├── gantt/
│   │   ├── serializers.ts      # Task/Link 직렬화
│   │   ├── decorators.ts       # Task 데코레이터
│   │   ├── dateUtils.ts        # 날짜 유틸
│   │   ├── taskCalculations.ts # Duration 계산 등
│   │   └── constants.ts        # 상수 정의
│   └── api/
│       └── ganttApi.ts         # API 클라이언트
```

**우선순위:** 🔴 높음  
**예상 작업량:** 3-4일

---

### 3. **상태 관리 (State Management) ⚠️ 중간**

**문제점:**
- 여러 ref와 state가 복잡하게 얽혀있음
- `currentTasksRef`, `currentLinksRef`, `scalesRef` + `schedule` state
- 상태 동기화 로직이 산재되어 있음 (`syncFromApi`)
- 불필요한 리렌더링 가능성

**개선 방안:**
- Zustand 또는 Jotai 같은 경량 상태 관리 도입 고려
- 또는 Context API + useReducer로 통합
- Immer를 사용한 불변성 관리

```typescript
// 개선안: useReducer 패턴
type GanttAction = 
  | { type: 'LOAD_SUCCESS'; payload: ScheduleData }
  | { type: 'UPDATE_TASKS'; payload: Task[] }
  | { type: 'UPDATE_LINKS'; payload: Link[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVE_STATE'; payload: SaveState };

function ganttReducer(state: GanttState, action: GanttAction): GanttState {
  // ...
}
```

**우선순위:** 🟡 중간  
**예상 작업량:** 2-3일

---

### 4. **에러 처리 (Error Handling) ⚠️ 중간**

**문제점:**
- Try-catch가 있지만 에러 로깅만 함
- 사용자 피드백이 `alert()`로만 제공됨
- 에러 복구 전략 없음
- 전역 에러 바운더리 없음

**개선 방안:**
```typescript
// components/ErrorBoundary.tsx
export class GanttErrorBoundary extends React.Component {
  // ...
}

// lib/errors.ts
export class GanttError extends Error {
  constructor(
    message: string,
    public code: string,
    public recoverable: boolean = true
  ) {
    super(message);
  }
}

// hooks/useErrorHandler.ts
export function useErrorHandler() {
  const showError = (error: Error) => {
    // Toast notification
    // Sentry/LogRocket 등으로 로깅
  };
  
  return { showError };
}
```

**우선순위:** 🟡 중간  
**예상 작업량:** 1-2일

---

### 5. **데이터 영속성 (Data Persistence) ⚠️ 높음**

**문제점:**
- Mock API가 메모리에만 저장 (서버 재시작 시 손실)
- 실제 백엔드 연동 준비 안 됨
- 데이터 백업/복구 기능 없음

**개선 방안:**

**Option A: Local Storage (임시 해결)**
```typescript
// lib/storage/localStorage.ts
export const ganttStorage = {
  save: (data: ScheduleData) => {
    localStorage.setItem('gantt-schedule', JSON.stringify(data));
  },
  load: (): ScheduleData | null => {
    const raw = localStorage.getItem('gantt-schedule');
    return raw ? JSON.parse(raw) : null;
  },
  clear: () => localStorage.removeItem('gantt-schedule'),
};
```

**Option B: Database (장기 해결)**
- Prisma + PostgreSQL/MySQL
- Supabase
- PlanetScale

```typescript
// prisma/schema.prisma
model Task {
  id        String   @id
  text      String
  type      String
  start     DateTime
  end       DateTime?
  progress  Float
  parent    String?
  // ...
}

model Link {
  id      String @id
  source  String
  target  String
  type    String
}
```

**우선순위:** 🔴 높음  
**예상 작업량:** 3-5일 (DB 선택 포함)

---

### 6. **성능 최적화 (Performance) ⚠️ 중간**

**문제점:**
- `GanttChart` 컴포넌트가 너무 많은 책임을 가짐
- Toolbar, Editor 등이 매 렌더링마다 재생성될 수 있음
- `syncFromApi`가 자주 호출되며 전체 tasks 배열을 복사

**개선 방안:**
```typescript
// 1. 컴포넌트 분리
<GanttChart>
  <GanttToolbar /> 
  <GanttScale />
  <GanttGrid />
  <GanttTimeline />
  <GanttEditor />
</GanttChart>

// 2. 메모이제이션 강화
const memoizedTasks = useMemo(() => 
  tasks.map(decorateTask), 
  [tasks]
);

// 3. 가상화 (Virtual Scrolling) 검토
// SVAR Gantt가 자체 지원하는지 확인 필요

// 4. Debounce/Throttle
const debouncedSync = useMemo(
  () => debounce(syncFromApi, 300),
  [syncFromApi]
);
```

**우선순위:** 🟡 중간  
**예상 작업량:** 2-3일

---

### 7. **테스팅 (Testing) ⚠️ 중간**

**문제점:**
- 테스트 코드가 전혀 없음
- Vitest 의존성도 제거됨
- 리팩토링 시 회귀 테스트 불가능

**개선 방안:**
```bash
# 설치
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# 파일 구조
src/
├── __tests__/
│   ├── lib/
│   │   ├── dateUtils.test.ts
│   │   ├── serializers.test.ts
│   │   └── taskCalculations.test.ts
│   ├── hooks/
│   │   ├── useGanttData.test.ts
│   │   └── useSummaryProgress.test.ts
│   └── components/
│       ├── GanttControls.test.tsx
│       └── TaskTooltip.test.tsx
```

**예시:**
```typescript
// lib/dateUtils.test.ts
describe('toDateOrUndefined', () => {
  it('should parse ISO date string correctly', () => {
    const result = toDateOrUndefined('2025-11-24');
    expect(result).toEqual(new Date(2025, 10, 24));
  });
  
  it('should return undefined for invalid date', () => {
    expect(toDateOrUndefined('invalid')).toBeUndefined();
  });
});
```

**우선순위:** 🟡 중간  
**예상 작업량:** 3-4일

---

### 8. **문서화 (Documentation) ⚠️ 낮음**

**문제점:**
- JSDoc 주석이 거의 없음
- 복잡한 로직 (예: Summary progress 계산)에 설명 부족
- README가 기본 템플릿 수준

**개선 방안:**
```typescript
/**
 * Summary task의 진행률을 자식 task들의 가중 평균으로 계산합니다.
 * 
 * @param summaryId - Summary task의 ID
 * @returns 0-100 사이의 진행률 (가중 평균)
 * 
 * @example
 * // Summary task (id: "S1") with children:
 * // - Task A: duration 5, progress 100% → 5 * 100 = 500
 * // - Task B: duration 10, progress 50% → 10 * 50 = 500
 * // Total: 1000 / 15 = 66.67%
 * getSummaryProgress("S1"); // returns 67
 */
const getSummaryProgress = useCallback((summaryId: unknown): number => {
  // ...
}, []);
```

**README 개선:**
- 프로젝트 소개 및 목표
- 주요 기능 목록
- 설치 및 실행 방법
- 아키텍처 다이어그램
- 기여 가이드라인

**우선순위:** 🟢 낮음  
**예상 작업량:** 1-2일

---

### 9. **접근성 (Accessibility) ⚠️ 낮음**

**문제점:**
- ARIA 속성이 일부만 적용됨 (`aria-label`, `aria-pressed`)
- 키보드 네비게이션 테스트 안 됨
- 스크린 리더 호환성 불명확

**개선 방안:**
```typescript
// 개선된 GanttControls
<button
  type="button"
  onClick={() => onViewTypeChange(option.id)}
  className={/* ... */}
  aria-pressed={viewType === option.id}
  aria-label={`보기 모드를 ${option.label}로 변경`}
  tabIndex={0}
>
  {option.label}
</button>

// 저장 버튼
<button
  type="button"
  onClick={onSave}
  disabled={!hasChanges}
  aria-busy={saveState === 'saving'}
  aria-live="polite"
  aria-label={
    saveState === 'saving' 
      ? '변경사항 저장 중...' 
      : '변경사항 저장'
  }
>
  {/* ... */}
</button>
```

**우선순위:** 🟢 낮음  
**예상 작업량:** 1-2일

---

### 10. **코드 품질 (Code Quality) ⚠️ 중간**

**문제점:**
- ESLint 설정 파일 없음 (삭제됨?)
- Prettier 설정 없음
- 코딩 컨벤션이 일관되지 않음
- Pre-commit hook 없음

**개선 방안:**
```bash
# 설치
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D husky lint-staged

# 설정 파일
# .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}

# .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2
}

# package.json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "prepare": "husky install"
  }
}
```

**우선순위:** 🟡 중간  
**예상 작업량:** 1일

---

## 🎯 리팩토링 단계별 실행 계획

### Phase 1: 기초 인프라 구축 (1주)
**목표:** 안정적인 개발 환경 및 테스트 프레임워크 구축

1. **코드 품질 도구 설정** (1일)
   - [ ] ESLint, Prettier 설정
   - [ ] Husky + lint-staged
   - [ ] Git pre-commit hook

2. **테스트 프레임워크 설정** (1일)
   - [ ] Vitest 재설치 및 설정
   - [ ] Testing Library 설정
   - [ ] 테스트 기본 구조 생성

3. **타입 시스템 개선** (3일)
   - [ ] `any` 타입 제거
   - [ ] 명확한 인터페이스 정의 (`Task`, `Link`, `GanttApi` 등)
   - [ ] 타입 가드 함수 작성
   - [ ] Zod/Yup으로 런타임 검증 고려

4. **문서화 기초** (2일)
   - [ ] README 업데이트
   - [ ] 주요 함수에 JSDoc 추가
   - [ ] 아키텍처 다이어그램 작성

---

### Phase 2: 코드 구조 개선 (2주)
**목표:** 모듈화 및 관심사 분리

1. **유틸리티 함수 분리** (2일)
   - [ ] `lib/gantt/dateUtils.ts` 생성 및 이전
   - [ ] `lib/gantt/serializers.ts` 생성 및 이전
   - [ ] `lib/gantt/taskCalculations.ts` 생성 및 이전
   - [ ] 유닛 테스트 작성

2. **Hooks 분리** (3일)
   - [ ] `useGanttData.ts` - 데이터 로딩/저장
   - [ ] `useGanttEvents.ts` - 이벤트 리스너 관리
   - [ ] `useSummaryProgress.ts` - Summary 진행률 계산
   - [ ] `useGanttSchedule.ts` - orchestrator로 역할 축소
   - [ ] 각 hook별 테스트 작성

3. **컴포넌트 리팩토링** (3일)
   - [ ] `GanttChart` 컴포넌트 분해
   - [ ] 책임별 하위 컴포넌트 생성
   - [ ] Props 인터페이스 명확화
   - [ ] 컴포넌트 테스트 작성

4. **API 클라이언트 분리** (2일)
   - [ ] `lib/api/ganttApi.ts` 생성
   - [ ] Axios 인스턴스 설정
   - [ ] API 에러 핸들링 통합

---

### Phase 3: 기능 개선 (2주)
**목표:** 데이터 영속성, 에러 처리, 성능 최적화

1. **데이터 영속성 구현** (5일)
   - [ ] 데이터베이스 선택 (Prisma + PostgreSQL 추천)
   - [ ] Schema 설계
   - [ ] Migration 작성
   - [ ] API Route 업데이트
   - [ ] 데이터 백업/복구 기능

2. **에러 처리 강화** (2일)
   - [ ] ErrorBoundary 컴포넌트
   - [ ] Toast notification 시스템 (react-hot-toast)
   - [ ] 에러 로깅 서비스 연동 (선택)

3. **성능 최적화** (3일)
   - [ ] 메모이제이션 적용
   - [ ] 불필요한 리렌더링 제거
   - [ ] Debounce/Throttle 적용
   - [ ] 성능 프로파일링

4. **상태 관리 개선** (4일)
   - [ ] useReducer 패턴 적용 또는
   - [ ] Zustand/Jotai 도입
   - [ ] 상태 로직 통합 및 단순화

---

### Phase 4: 최종 정리 (1주)
**목표:** 접근성, 문서화, 배포 준비

1. **접근성 개선** (2일)
   - [ ] ARIA 속성 완성
   - [ ] 키보드 네비게이션 테스트
   - [ ] 스크린 리더 테스트

2. **문서화 완성** (2일)
   - [ ] 전체 코드 JSDoc 검토
   - [ ] API 문서 생성
   - [ ] 사용자 가이드 작성

3. **테스트 커버리지 확대** (2일)
   - [ ] 통합 테스트 작성
   - [ ] E2E 테스트 (Playwright) 고려
   - [ ] 커버리지 80% 목표

4. **배포 최적화** (1일)
   - [ ] 빌드 최적화
   - [ ] 환경 변수 설정
   - [ ] CI/CD 파이프라인 (GitHub Actions)

---

## 📋 우선순위별 작업 목록

### 🔴 최우선 (Critical)
1. **타입 안전성 개선** - 런타임 버그 방지
2. **코드 구조 개선** - 유지보수성 향상
3. **데이터 영속성** - 사용자 데이터 보호

### 🟡 중요 (High)
4. **에러 처리 강화** - 사용자 경험 개선
5. **테스트 프레임워크** - 안정성 보장
6. **성능 최적화** - 반응성 향상
7. **코드 품질 도구** - 일관성 유지

### 🟢 보완 (Medium)
8. **문서화** - 협업 및 인수인계
9. **접근성** - 포괄적 사용성

---

## 🎨 기대 효과

### 단기 효과 (Phase 1-2)
- ✅ 코드 가독성 향상
- ✅ 버그 발생률 감소
- ✅ 새 기능 추가 용이성 증가
- ✅ 팀원 온보딩 시간 단축

### 중기 효과 (Phase 3)
- ✅ 사용자 데이터 안정성 확보
- ✅ 에러 발생 시 빠른 대응
- ✅ 성능 향상 (렌더링 시간 감소)
- ✅ 유지보수 비용 절감

### 장기 효과 (Phase 4)
- ✅ 확장 가능한 아키텍처
- ✅ 높은 테스트 커버리지 (회귀 버그 방지)
- ✅ 웹 표준 및 접근성 준수
- ✅ 프로젝트 지속 가능성 확보

---

## 💡 권장 사항

### 즉시 실행 가능 (Quick Wins)
1. **ESLint/Prettier 설정** - 30분 소요, 즉시 효과
2. **타입 가드 함수 추가** - 2시간 소요, 타입 안전성 향상
3. **Console.log 제거** - 1시간 소요, 프로덕션 품질 향상
4. **README 업데이트** - 1시간 소요, 프로젝트 이해도 향상

### 점진적 적용 (Incremental)
- 새 기능 개발 시 리팩토링된 구조 적용
- 버그 수정 시 해당 영역 테스트 추가
- 주간 코드 리뷰에서 리팩토링 진행 상황 공유

### 리스크 관리
- **백업:** 리팩토링 전 Git 브랜치 생성 (`refactor/phase-1`)
- **테스트:** 각 Phase 완료 시 통합 테스트 실행
- **롤백 계획:** 문제 발생 시 이전 버전으로 복구 가능하도록 태그 생성

---

## 📈 성공 지표 (KPI)

### 코드 품질
- [ ] TypeScript strict mode 통과
- [ ] ESLint 에러 0개
- [ ] 테스트 커버리지 80% 이상
- [ ] 함수당 평균 라인 수 < 50줄

### 성능
- [ ] 초기 렌더링 시간 < 2초
- [ ] 사용자 인터랙션 반응 시간 < 100ms
- [ ] Lighthouse 점수 90+ (Performance)

### 유지보수성
- [ ] 새 기능 추가 시간 50% 감소
- [ ] 버그 수정 시간 40% 감소
- [ ] 코드 리뷰 시간 30% 감소

---

## 🚀 시작하기

### 1단계: 현황 파악
```bash
# 코드 분석
npm run lint  # (설정 후)
npm run test  # (설정 후)

# 의존성 업데이트
npm outdated
npm audit
```

### 2단계: 브랜치 생성
```bash
git checkout -b refactor/phase-1-infrastructure
```

### 3단계: Phase 1 실행
- [ ] ESLint/Prettier 설정
- [ ] Vitest 설정
- [ ] 기본 타입 정의
- [ ] README 업데이트

### 4단계: 검토 및 병합
```bash
git commit -m "feat: Phase 1 - Infrastructure setup"
git push origin refactor/phase-1-infrastructure
# PR 생성 및 리뷰
```

---

## 📞 문의 및 토론

리팩토링 진행 중 문제나 의견이 있으면 팀 회의에서 공유하거나
GitHub Issue를 통해 논의하세요.

**작성일:** 2025-11-24  
**최종 수정:** 2025-11-24

