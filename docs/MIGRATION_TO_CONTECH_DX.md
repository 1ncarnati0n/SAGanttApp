# 🚀 ConTech-DX 이식 가이드

**목적**: SAGanttApp의 Gantt 차트 시스템을 contech-dx 프로젝트에 통합

---

## 📊 현재 상태 (SAGanttApp)

### ✅ 완성된 기능
1. **프로젝트 관리**
   - 프로젝트 생성/조회/수정/삭제
   - 프로젝트 목록 Dashboard
   - 프로젝트 상세 페이지

2. **Gantt 차트**
   - Gantt 차트 생성/조회
   - Task 표시 (6가지 타입)
   - Link (의존성) 표시
   - Timeline 렌더링
   - Progress 표시

3. **데이터 레이어**
   - Mock Storage (LocalStorage)
   - Supabase 연동 준비 완료
   - Service Layer 구조화

4. **UI/UX**
   - contech-dx 디자인 시스템 적용
   - 다크/라이트 테마
   - 반응형 디자인

---

## 🎯 이식 전략

### 옵션 A: Gantt 모듈만 이식 (추천) ⭐
**장점**: 
- 빠른 통합
- contech-dx 기존 구조 유지
- 점진적 개선 가능

**이식 대상**:
```
SAGanttApp/src/
├── lib/gantt/              → contech-dx/src/lib/gantt/
│   ├── types/             (5개 파일)
│   ├── utils/             (5개 파일)
│   ├── hooks/             (5개 파일)
│   ├── constants.ts
│   └── index.ts
│
├── components/
│   ├── GanttChart.tsx     → contech-dx/src/components/gantt/
│   ├── GanttWrapper.tsx   → contech-dx/src/components/gantt/
│   └── gantt/             → contech-dx/src/components/gantt/
│       ├── types.ts
│       ├── taskConfig.ts
│       └── ...
│
└── styles/
    ├── gantt.css          → contech-dx/src/styles/
    └── svar-gantt-fixed.css
```

### 옵션 B: 전체 프로젝트 관리 시스템 이식
**장점**:
- 완전한 프로젝트 관리 기능
- Dashboard 포함
- 프로젝트-Gantt 통합

**이식 대상**: 
- 옵션 A + Dashboard + 프로젝트 관리 페이지

---

## 📦 필수 패키지

### SAGanttApp에서 사용 중인 패키지
```json
{
  "@svar-ui/react-gantt": "^2.3.3",
  "@supabase/ssr": "^0.7.0",
  "@supabase/supabase-js": "^2.84.0",
  "axios": "^1.13.2",
  "date-fns": "^4.1.0"
}
```

### contech-dx에 설치 필요 여부 확인
- `@svar-ui/react-gantt` - **필수**
- Supabase 패키지 - contech-dx에 이미 있는지 확인
- axios - contech-dx에 이미 있는지 확인
- date-fns - contech-dx에 이미 있는지 확인

---

## 🗂️ 이식 단계 (옵션 A 기준)

### Phase 1: Gantt 모듈 복사 (30분)

#### Step 1.1: 디렉토리 생성
```bash
cd contech-dx
mkdir -p src/lib/gantt/{types,utils,hooks,constants}
mkdir -p src/components/gantt
mkdir -p src/styles
```

#### Step 1.2: 파일 복사
```bash
# Gantt 라이브러리
cp -r SAGanttApp/src/lib/gantt/* contech-dx/src/lib/gantt/

# Gantt 컴포넌트
cp SAGanttApp/src/components/GanttChart.tsx contech-dx/src/components/gantt/
cp SAGanttApp/src/components/GanttWrapper.tsx contech-dx/src/components/gantt/
cp -r SAGanttApp/src/components/gantt/* contech-dx/src/components/gantt/

# 스타일
cp SAGanttApp/src/styles/gantt.css contech-dx/src/styles/
cp SAGanttApp/src/styles/svar-gantt-fixed.css contech-dx/src/styles/
```

#### Step 1.3: 패키지 설치
```bash
cd contech-dx
npm install @svar-ui/react-gantt@^2.3.3
# 기타 필요한 패키지 확인 후 설치
```

---

### Phase 2: contech-dx 통합 (1시간)

#### Step 2.1: Gantt 페이지 생성
```typescript
// contech-dx/src/app/projects/[id]/gantt/[chartId]/page.tsx

import { GanttWrapper } from '@/components/gantt/GanttWrapper';
import { useGanttSchedule } from '@/lib/gantt/hooks';

export default function GanttChartPage({ params }) {
  const { schedule, initGantt } = useGanttSchedule({ 
    ganttChartId: params.chartId 
  });

  return (
    <div className="h-screen">
      <GanttWrapper
        tasks={schedule?.tasks || []}
        links={schedule?.links || []}
        onGanttReady={initGantt}
      />
    </div>
  );
}
```

#### Step 2.2: 스타일 import
```typescript
// contech-dx/src/app/layout.tsx

import '@/styles/gantt.css';
import '@/styles/svar-gantt-fixed.css';
```

#### Step 2.3: Supabase 스키마 추가
```sql
-- contech-dx Supabase에 추가

CREATE TABLE gantt_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date TEXT,
  end_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tasks (
  id TEXT PRIMARY KEY,
  gantt_chart_id UUID REFERENCES gantt_charts(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  type TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  duration NUMERIC DEFAULT 0,
  progress NUMERIC DEFAULT 0,
  parent_id TEXT,
  position INTEGER DEFAULT 0,
  open BOOLEAN DEFAULT TRUE,
  assigned_to TEXT,
  category TEXT,
  work_type TEXT,
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE links (
  id TEXT PRIMARY KEY,
  gantt_chart_id UUID REFERENCES gantt_charts(id) ON DELETE CASCADE,
  source_task_id TEXT NOT NULL,
  target_task_id TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_gantt_charts_project_id ON gantt_charts(project_id);
CREATE INDEX idx_tasks_gantt_chart_id ON tasks(gantt_chart_id);
CREATE INDEX idx_links_gantt_chart_id ON links(gantt_chart_id);
```

---

### Phase 3: 기존 프로젝트 연동 (1시간)

#### Step 3.1: contech-dx 프로젝트에 "Gantt 차트" 버튼 추가
```typescript
// contech-dx 프로젝트 상세 페이지에 추가

<Button onClick={() => router.push(`/projects/${projectId}/gantt`)}>
  Gantt 차트 보기
</Button>
```

#### Step 3.2: Service Layer 연결
```typescript
// contech-dx/src/lib/services/ganttCharts.ts

import { createClient } from '@/lib/supabase/client';

export async function getGanttChartsByProjectId(projectId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('gantt_charts')
    .select('*')
    .eq('project_id', projectId);
  
  if (error) throw error;
  return data;
}

// tasks, links도 동일하게 구현
```

---

### Phase 4: 테스트 & 검증 (30분)

#### 테스트 체크리스트:
- [ ] Gantt 페이지 접속
- [ ] Task 표시 확인
- [ ] Timeline 확인
- [ ] 스타일 적용 확인
- [ ] 다크 모드 확인
- [ ] Supabase 데이터 연동 확인

---

## 🔧 예상 문제 & 해결

### 문제 1: 경로 에러
**증상**: `Cannot find module '@/lib/gantt'`
**해결**: `tsconfig.json`의 `paths` 설정 확인

### 문제 2: 스타일 깨짐
**증상**: Gantt 차트 레이아웃 이상
**해결**: `globals.css`에서 Tailwind 초기화 확인

### 문제 3: Supabase 타입 에러
**증상**: TypeScript 타입 에러
**해결**: contech-dx의 Supabase 타입 재생성
```bash
npx supabase gen types typescript --project-id "your-project-id" > src/types/supabase.ts
```

---

## 📋 이식 후 체크리스트

### 필수 항목:
- [ ] Gantt 모듈 복사 완료
- [ ] 패키지 설치 완료
- [ ] Supabase 스키마 추가 완료
- [ ] Gantt 페이지 생성 완료
- [ ] 기본 기능 작동 확인

### 선택 항목:
- [ ] Dashboard 통합
- [ ] 프로젝트 관리 기능 추가
- [ ] 권한 관리 연동
- [ ] 실시간 협업 기능
- [ ] 알림 시스템 연동

---

## 🎯 다음 단계

### 즉시 시작 가능:
1. **contech-dx 프로젝트 구조 확인**
   ```bash
   cd contech-dx
   tree -L 3 src/
   ```

2. **필요한 패키지 확인**
   ```bash
   cat package.json | grep -E "supabase|axios|date-fns"
   ```

3. **이식 스크립트 실행**
   ```bash
   # 제공될 자동화 스크립트 사용
   ./scripts/migrate-gantt.sh
   ```

---

## 💡 권장 사항

### 단계적 이식 (추천):
1. **Week 1**: Gantt 모듈만 이식 (옵션 A)
2. **Week 2**: 기존 프로젝트 연동
3. **Week 3**: Dashboard 통합 (필요 시)
4. **Week 4**: 고급 기능 추가

### 한 번에 이식:
- 모든 파일 복사 → 경로 수정 → 테스트
- 시간: 3-4시간
- 리스크: 중간 정도

---

**준비되셨나요?** 🚀

다음 중 선택하세요:
1. **지금 바로 이식 시작** → contech-dx 구조 확인부터
2. **이식 스크립트 생성** → 자동화 스크립트 만들기
3. **더 자세한 계획** → 특정 부분 상세 설명

---

**작성일**: 2025-11-24  
**버전**: 1.0.0  
**예상 소요 시간**: 2-3시간

