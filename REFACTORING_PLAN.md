# SAganttApp 리팩토링 계획

## 1. 개요
이 문서는 SAganttApp을 contech-dx 프로젝트의 품질 기준에 맞춰 리팩토링하기 위한 전략과 실행 계획을 기술합니다.

## 2. 목표
- 모든 ESLint 오류 및 경고 해결
- TypeScript 타입 안정성 확보 (`no-explicit-any` 준수)
- React 컴포넌트 렌더링 최적화
- 프로젝트 구조 일관성 유지

## 3. 단계별 실행 계획

### Phase 1: 기반 설정 및 노이즈 제거 (완료)
- [x] `package.json`, `tsconfig.json` 동기화
- [x] `globals.css` 디자인 시스템 통일
- [x] `.claude` 디렉토리 린트 제외 설정

### Phase 2: 데이터 모델링 및 타입 정의 (현재 단계)
- [ ] **API Mock Data 타입 정의**: `src/app/api/mock/route.ts`
  - `Task`, `Link`, `Scale` 인터페이스 정의
  - `any` 타입 제거
- [ ] **Editor 아이템 타입 정의**: `src/components/gantt/editorItems.tsx`
  - `renderOption` 등에서의 타입 단언 안전하게 처리

### Phase 3: 핵심 컴포넌트 안정화
- [ ] **GanttChart 컴포넌트**: `src/components/GanttChart.tsx`
  - 외부 라이브러리(`@svar-ui/react-gantt`) 타입 호환성 문제 해결
  - 불가피한 `any` 사용 시 `eslint-disable`로 명시적 처리
  - `formatDisplayEnd` 등 헬퍼 함수 타입 구체화

### Phase 4: React 패턴 최적화
- [ ] **Dashboard 페이지**: `src/app/dashboard/page.tsx`
  - `useEffect` 내 `setState` 호출 패턴을 `useState` 초기화 로직으로 변경
- [ ] **Hooks 최적화**: 의존성 배열 누락 등 수정

## 4. 컨벤션
- 가능한 구체적인 타입을 사용하되, 외부 라이브러리 제약 시 `unknown` 또는 `eslint-disable`을 활용한다.
- 컴포넌트 props는 `interface` 대신 `type`을 사용하거나 명확한 `interface`를 정의한다.
