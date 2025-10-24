# SAGanttR1

React 19와 최신 SVAR Gantt 2.3 컴포넌트를 활용한 공동주택 골조공사 공정 관리 시스템 개발

## 주요 기능
- **React 19 + Vite + Tailwind CSS** 기반의 최신 프론트엔드 스택.
- **@svar-ui/react-gantt** Willow 테마 적용 및 기본 컬럼/에디터 커스터마이징.
- **일·주·월 간트 보기 전환**, 셀 너비(`CELL_WIDTH_MAP`) 자동 조정.
- **베이스라인(계획 일정) 토글** 및 작업/링크 실시간 상태 추적.
- **모의 저장 API**: `/api/mock` 엔드포인트를 통해 `public/mock.json`에 즉시 반영.
- **TypeScript + Vitest** 세팅으로 안정적인 개발/테스트 환경 제공.

## 프로젝트 구조
```
SAGanttR1/
├── public/           # 정적 자산 및 mock.json
├── src/
│   ├── components/
│   │   └── gantt/    # 간트 컨트롤, 테마, 편집기, 훅 등 핵심 로직
│   ├── styles/       # 간트 전용 커스텀 스타일
│   ├── App.tsx
│   └── main.tsx
├── svarDocUpdate/    # SVAR Gantt 2.3 업데이트 번역/요약 문서
├── package.json
└── vite.config.ts    # 개발 서버용 mock API 플러그인 포함
```

## 설치 및 실행
1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행 (기본 포트: 5173)
   ```bash
   npm run dev
   ```
3. 프로덕션 번들링
   ```bash
   npm run build
   ```
4. 번들 검증용 프리뷰 서버
   ```bash
   npm run preview
   ```

### 테스트
```bash
npm run test       # Vitest 단일 실행
npm run test:watch # 변경 감지 모드
```

## 간트 데이터 흐름
- `src/components/gantt/useGanttSchedule.ts`가 간트 API, 작업/링크 상태, 저장 로직을 한곳에서 관리합니다.
- 초기 데이터는 개발 서버의 `/api/mock`(GET)에서 불러오며, `public/mock.json`을 읽어 옵니다.
- 저장 버튼 클릭 시 `/api/mock`(POST)으로 직렬화된 간트 데이터를 전송하고 `mock.json`을 갱신합니다.  
  - 개발 모드(`import.meta.env.DEV`)에서만 동작하며, 실패 시 브라우저 알림을 표시합니다.
- 타입/날짜/수치 값은 직렬화 단계에서 안전하게 변환되어 JSON 파일에 기록됩니다.

## 커스터마이징 포인트
- `src/components/gantt/taskConfig.ts`: 작업 유형(`TASK_TYPES`), 보기별 셀 너비(`CELL_WIDTH_MAP`), 셀 높이 설정.
- `src/components/gantt/editorItems.ts`: 작업 편집기 필드 레이블/플레이스홀더 및 옵션 재정의.
- `src/styles/gantt.css`: Willow 기본 테마 위에 추가되는 간트 전용 스타일.
- `tailwind.config.ts`: Tailwind 색상 팔레트 확장(`gantt-primary`, `gantt-accent` 등).
- `public/mock.json`: 기본 공정 데이터 샘플. 저장 시 덮어쓰니 버전 관리를 권장합니다.

## 참고 자료
- `svarDocUpdate/` 디렉터리에 SVAR Gantt 2.3 요약 문서를 포함. 컴포넌트별 사용법/설정이 필요할 때 참고.

## 권장 개발 환경
- Node.js 18 이상
- 최신 Chrome/Edge 브라우저 (ESM 및 React 19 지원)