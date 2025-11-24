# SAGanttApp 통합 개발 전략
## Gantt 컴포넌트 라이브러리 + 프로젝트 관리 대시보드

> **목표:** contech-dx에 통합 가능한 Gantt 컴포넌트 라이브러리 개발 및 독립 실행 가능한 프로젝트 관리 대시보드 구축

---

## 📋 프로젝트 개요

### 핵심 목표
1. **Gantt 컴포넌트 라이브러리**: contech-dx에서 재사용 가능한 독립 모듈
2. **Supabase 통합**: 데이터 영속성 및 실시간 협업
3. **프로젝트 관리 대시보드**: 멀티 프로젝트 + 멀티 Gantt 차트 관리
4. **환경 통일**: contech-dx와 동일한 기술 스택 및 디자인 시스템
5. **테마 시스템**: SVAR Willow/Willow Dark를 Gantt에만 적용

---

## 🎯 아키텍처 설계

### 1. 레이어 구조

```
┌─────────────────────────────────────────────────────────────┐
│                  SAGanttApp (Next.js 16)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐    ┌──────────────────┐              │
│  │  Dashboard Layer  │    │   Gantt Module   │              │
│  │  (프로젝트 관리)    │───→│  (독립 라이브러리)  │              │
│  └──────────────────┘    └──────────────────┘              │
│         │                         │                          │
│         ↓                         ↓                          │
│  ┌────────────────────────────────────────┐                 │
│  │         Supabase Layer                  │                 │
│  │  (Projects, Gantt Charts, Tasks, Links) │                 │
│  └────────────────────────────────────────┘                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2. 폴더 구조 (목표)

```
src/
├── app/
│   ├── (dashboard)/                # 대시보드 레이아웃 그룹
│   │   ├── layout.tsx              # 공통 레이아웃
│   │   ├── page.tsx                # 프로젝트 목록
│   │   ├── projects/
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx        # 프로젝트 상세 (Gantt 목록)
│   │   │   │   ├── gantt/
│   │   │   │   │   └── [ganttId]/
│   │   │   │   │       └── page.tsx # Gantt 차트 뷰
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx    # 프로젝트 설정
│   │   │   └── new/
│   │   │       └── page.tsx        # 프로젝트 생성
│   │   └── profile/
│   │       └── page.tsx            # 사용자 프로필
│   ├── auth/
│   │   ├── callback/route.ts
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── api/
│   │   └── gantt/
│   │       ├── projects/route.ts
│   │       ├── charts/route.ts
│   │       ├── tasks/route.ts
│   │       └── links/route.ts
│   ├── layout.tsx
│   └── page.tsx                    # 랜딩 페이지
│
├── components/
│   ├── gantt/                      # ✨ Gantt 모듈 (독립 라이브러리)
│   │   ├── core/
│   │   │   ├── GanttChart.tsx      # 메인 차트 컴포넌트
│   │   │   ├── GanttToolbar.tsx
│   │   │   ├── GanttScale.tsx
│   │   │   ├── GanttGrid.tsx
│   │   │   ├── GanttTimeline.tsx
│   │   │   └── GanttEditor.tsx
│   │   ├── controls/
│   │   │   ├── GanttControls.tsx
│   │   │   ├── ViewToggle.tsx
│   │   │   └── SaveButton.tsx
│   │   ├── ui/
│   │   │   ├── TaskTooltip.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── LoadingState.tsx
│   │   ├── themes/
│   │   │   ├── WillowTheme.tsx
│   │   │   ├── WillowDarkTheme.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── config/
│   │   │   ├── editorItems.tsx
│   │   │   ├── taskConfig.ts
│   │   │   └── scaleConfig.ts
│   │   ├── index.ts                # Public API (Export)
│   │   └── README.md               # Gantt 모듈 사용 가이드
│   │
│   ├── dashboard/                  # 대시보드 전용 컴포넌트
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── GanttCard.tsx
│   │   ├── GanttList.tsx
│   │   ├── GanttForm.tsx
│   │   ├── StatisticsPanel.tsx
│   │   └── ActivityFeed.tsx
│   │
│   ├── layout/                     # contech-dx 스타일 레이아웃
│   │   ├── NavBar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── UserDropdown.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── LogoutButton.tsx
│   │
│   └── ui/                         # shadcn/ui 스타일 (contech-dx 동일)
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       ├── Skeleton.tsx
│       ├── Toaster.tsx
│       └── ...
│
├── lib/
│   ├── gantt/                      # ✨ Gantt 로직 (독립 라이브러리)
│   │   ├── hooks/
│   │   │   ├── useGanttSchedule.ts
│   │   │   ├── useGanttData.ts
│   │   │   ├── useGanttEvents.ts
│   │   │   └── useSummaryProgress.ts
│   │   ├── utils/
│   │   │   ├── dateUtils.ts
│   │   │   ├── serializers.ts
│   │   │   ├── decorators.ts
│   │   │   ├── taskCalculations.ts
│   │   │   └── validators.ts
│   │   ├── api/
│   │   │   └── ganttApi.ts
│   │   ├── types/
│   │   │   ├── task.ts
│   │   │   ├── link.ts
│   │   │   └── schedule.ts
│   │   ├── constants.ts
│   │   └── index.ts                # Public API
│   │
│   ├── supabase/                   # contech-dx 패턴
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   │
│   ├── services/                   # 비즈니스 로직 레이어
│   │   ├── projects.ts
│   │   ├── ganttCharts.ts
│   │   ├── tasks.ts
│   │   └── links.ts
│   │
│   ├── permissions/                # 권한 관리 (선택)
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── shared.ts
│   │
│   └── utils.ts
│
├── styles/
│   ├── globals.css                 # contech-dx 스타일
│   ├── gantt-willow.css            # SVAR Willow 테마
│   └── gantt-willow-dark.css       # SVAR Willow Dark 테마
│
└── types/
    ├── supabase.ts                 # Supabase 타입 (auto-generated)
    └── global.ts
```

---

## 🗄️ Supabase 데이터베이스 스키마

### ERD (Entity Relationship Diagram)

```
┌────────────────┐
│     users      │ (Supabase Auth)
├────────────────┤
│ id (uuid)      │───┐
│ email          │   │
│ created_at     │   │
└────────────────┘   │
                     │
                     │ (owner)
                     ↓
┌────────────────────────────────┐
│          projects              │
├────────────────────────────────┤
│ id (uuid) PK                   │
│ name (text)                    │
│ description (text)             │
│ owner_id (uuid) FK → users.id  │
│ created_at (timestamp)         │
│ updated_at (timestamp)         │
│ archived (boolean)             │
└────────────────────────────────┘
         │
         │ (1:N)
         ↓
┌────────────────────────────────┐
│        gantt_charts            │
├────────────────────────────────┤
│ id (uuid) PK                   │
│ project_id (uuid) FK           │
│ name (text)                    │
│ description (text)             │
│ start_date (date)              │
│ end_date (date)                │
│ created_at (timestamp)         │
│ updated_at (timestamp)         │
│ archived (boolean)             │
└────────────────────────────────┘
         │
         │ (1:N)
         ↓
┌────────────────────────────────┐
│           tasks                │
├────────────────────────────────┤
│ id (uuid) PK                   │
│ gantt_chart_id (uuid) FK       │
│ text (text)                    │
│ type (text)                    │
│ start_date (date)              │
│ end_date (date)                │
│ progress (float)               │
│ parent_id (uuid) FK → tasks.id │
│ position (int)                 │
│ open (boolean)                 │
│ assigned_to (uuid) FK → users  │
│ created_at (timestamp)         │
│ updated_at (timestamp)         │
└────────────────────────────────┘
         │
         │ (N:M via links)
         ↓
┌────────────────────────────────┐
│           links                │
├────────────────────────────────┤
│ id (uuid) PK                   │
│ gantt_chart_id (uuid) FK       │
│ source_task_id (uuid) FK       │
│ target_task_id (uuid) FK       │
│ type (text)                    │
│ created_at (timestamp)         │
└────────────────────────────────┘
```

### SQL Schema

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

-- Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gantt_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = owner_id);

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

-- RLS Policies for tasks (same pattern)
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

-- RLS Policies for links (same pattern)
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

---

## 🎨 UX/UI 기획안

### 1. 정보 아키텍처 (IA)

```
Home (Landing)
└── Login/Signup
    └── Dashboard (프로젝트 목록)
        ├── 프로젝트 A
        │   ├── Gantt 차트 1
        │   ├── Gantt 차트 2
        │   └── 설정
        ├── 프로젝트 B
        │   └── Gantt 차트 1
        └── 새 프로젝트
```

### 2. 화면 구성

#### 2.1 대시보드 (프로젝트 목록)

```
┌─────────────────────────────────────────────────────────────────┐
│  🏗️ SAGantt                [테마] [프로필▼]                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📊 프로젝트 대시보드                                              │
│  ─────────────────────────────────────────────────────────────   │
│                                                                   │
│  [+ 새 프로젝트]                            [검색] [필터▼]         │
│                                                                   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ 프로젝트 A    │ │ 프로젝트 B    │ │ 프로젝트 C    │             │
│  │              │ │              │ │              │             │
│  │ 🎯 3개 차트  │ │ 🎯 1개 차트  │ │ 🎯 5개 차트  │             │
│  │ 👤 홍길동    │ │ 👤 김철수    │ │ 👤 이영희    │             │
│  │ 📅 2025-01   │ │ 📅 2025-02   │ │ 📅 2024-12   │             │
│  │              │ │              │ │              │             │
│  │ [열기]  [⋮]  │ │ [열기]  [⋮]  │ │ [열기]  [⋮]  │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.2 프로젝트 상세 (Gantt 목록)

```
┌─────────────────────────────────────────────────────────────────┐
│  🏗️ SAGantt > 프로젝트 A           [테마] [프로필▼]              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ← 대시보드                                                       │
│                                                                   │
│  📁 프로젝트 A                                 [설정⚙️]            │
│  건축 공정 관리 프로젝트                                           │
│  ─────────────────────────────────────────────────────────────   │
│                                                                   │
│  [+ 새 Gantt 차트]                          [검색] [필터▼]        │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ 📊 지하 골조 공정                    [열기] [복사] [삭제]   │     │
│  │ 2025-01-01 ~ 2025-03-31              56% 완료            │     │
│  │ ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░                                      │     │
│  │ 마지막 수정: 2025-11-20                                   │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ 📊 지상 골조 공정                    [열기] [복사] [삭제]   │     │
│  │ 2025-04-01 ~ 2025-06-30              23% 완료            │     │
│  │ ▓▓▓▓░░░░░░░░░░░░░░                                      │     │
│  │ 마지막 수정: 2025-11-18                                   │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### 2.3 Gantt 차트 뷰

```
┌─────────────────────────────────────────────────────────────────┐
│  🏗️ SAGantt > 프로젝트 A > 지하 골조 공정                         │
│  [← 뒤로]                             [테마] [전체화면] [프로필▼] │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [일▼] [주] [월]  |  [계획 일정 표시]  |  [저장💾]  (변경 있음)    │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  📊 SVAR Gantt 차트 영역                                  │     │
│  │  (Willow/Willow Dark 테마 적용)                           │     │
│  │                                                           │     │
│  │  ┌─────┬──────────┬─────────────────────────────────┐    │     │
│  │  │작업 │시작-종료  │ 2025-01 │ 2025-02 │ 2025-03 │    │     │
│  │  ├─────┼──────────┼─────────────────────────────────┤    │     │
│  │  │벽체 │01-04~31  │▓▓▓▓▓░░░░░░                      │    │     │
│  │  │슬래브│01-10~24  │    ▓▓▓▓▓░░░░                   │    │     │
│  │  │검측 │01-24     │         ◆                       │    │     │
│  │  └─────┴──────────┴─────────────────────────────────┘    │     │
│  │                                                           │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### 3. 주요 UX 플로우

#### 플로우 1: 새 프로젝트 생성

```
대시보드 → [+ 새 프로젝트] 클릭
  ↓
┌─────────────────────────────────┐
│ 📁 새 프로젝트 생성                │
│ ─────────────────────────────── │
│                                 │
│ 프로젝트 명: [________________] │
│ 설명: [______________________] │
│       [______________________] │
│                                 │
│       [취소]       [생성 →]     │
└─────────────────────────────────┘
  ↓
프로젝트 상세 페이지 (빈 상태)
```

#### 플로우 2: Gantt 차트 생성 및 편집

```
프로젝트 상세 → [+ 새 Gantt 차트] 클릭
  ↓
┌─────────────────────────────────┐
│ 📊 새 Gantt 차트 생성             │
│ ─────────────────────────────── │
│                                 │
│ 차트 명: [________________]      │
│ 설명: [______________________]  │
│ 시작일: [2025-01-01]            │
│ 종료일: [2025-12-31]            │
│                                 │
│ 템플릿 선택:                     │
│ ○ 빈 차트                        │
│ ○ 건설 공정 기본                 │
│ ○ IT 프로젝트 기본               │
│                                 │
│       [취소]       [생성 →]     │
└─────────────────────────────────┘
  ↓
Gantt 차트 뷰 (선택한 템플릿 적용)
  ↓
작업 추가/편집 (SVAR Editor 사용)
  ↓
[저장💾] 클릭 → Supabase에 저장
```

#### 플로우 3: 테마 전환

```
Gantt 차트 뷰에서 [테마 토글] 클릭
  ↓
┌─────────────────────┐
│ 🎨 테마 선택         │
│ ───────────────────  │
│ ○ Willow (Light)    │
│ ● Willow Dark       │
└─────────────────────┘
  ↓
차트 영역만 테마 변경
(나머지 UI는 contech-dx 테마 유지)
```

### 4. 반응형 디자인

#### 데스크톱 (1440px+)
- 3열 카드 그리드
- 전체 Gantt 차트 표시

#### 태블릿 (768px ~ 1439px)
- 2열 카드 그리드
- Gantt 차트 스크롤 가능

#### 모바일 (< 768px)
- 1열 카드 리스트
- Gantt 차트 터치 제스처 지원
- 햄버거 메뉴

---

## 🔧 기술 스택 통일

### contech-dx와 동일하게 적용

| 항목 | contech-dx | SAGanttApp (목표) |
|------|-----------|-----------------|
| Framework | Next.js 16.0.1 | Next.js 16.0.3 ✅ |
| React | 19.2.0 | 19.2.0 ✅ |
| TypeScript | 5.x | 5.x ✅ |
| Tailwind CSS | 4.x | 4.x ✅ |
| Supabase | @supabase/ssr 0.7.0 | ❌ → 추가 필요 |
| UI Components | Radix UI + shadcn | ❌ → 추가 필요 |
| Icons | Lucide React | ❌ → 추가 필요 |
| Theme | next-themes 0.4.6 | ❌ → 추가 필요 |
| Toast | Sonner 2.0.7 | ❌ → 추가 필요 |
| Form | React Hook Form + Zod | ❌ → 추가 필요 |
| Animation | Framer Motion | ❌ → 추가 필요 |

### 추가 설치 필요한 패키지

```bash
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
```

---

## 🎨 테마 시스템 설계

### 1. 전략: Hybrid Theme System

```
전체 앱 (contech-dx 테마)
└── next-themes (Light/Dark)
    └── globals.css 스타일

Gantt 차트 영역 (SVAR Willow 테마)
└── 독립 Context (WillowThemeProvider)
    └── gantt-willow.css / gantt-willow-dark.css
```

### 2. 구현 방법

#### globals.css (contech-dx 스타일)

```css
@import "tailwindcss";
@source "../../src";

@theme {
  /* contech-dx 색상 */
  --color-background: #ffffff;
  --color-foreground: #000000;
  /* ... */
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
}

/* Gantt 영역만 제외 */
body:not(.gantt-area) {
  @apply bg-[var(--background)] text-[var(--foreground)];
}
```

#### gantt-willow.css (Willow Light)

```css
/* SVAR Willow 테마 변수 */
.wx-willow-theme {
  --wx-gantt-task-color: #ff826b;
  --wx-gantt-task-fill-color: #d6412a;
  --wx-gantt-summary-color: #e7e7e7b4;
  /* ... */
}
```

#### gantt-willow-dark.css (Willow Dark)

```css
/* SVAR Willow Dark 테마 */
.wx-willow-dark-theme {
  --wx-background: #1a1a1a;
  --wx-gantt-task-color: #ff9b87;
  --wx-gantt-summary-color: #2a2a2a;
  /* ... */
}
```

#### GanttThemeProvider.tsx

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type GanttTheme = "willow" | "willow-dark";

const GanttThemeContext = createContext<{
  theme: GanttTheme;
  setTheme: (theme: GanttTheme) => void;
}>({
  theme: "willow",
  setTheme: () => {},
});

export function GanttThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<GanttTheme>("willow");

  return (
    <GanttThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme === "willow-dark" ? "wx-willow-dark-theme" : "wx-willow-theme"}>
        {children}
      </div>
    </GanttThemeContext.Provider>
  );
}

export const useGanttTheme = () => useContext(GanttThemeContext);
```

#### 사용 예시

```tsx
// app/(dashboard)/projects/[id]/gantt/[ganttId]/page.tsx

import { GanttThemeProvider } from "@/components/gantt/themes/GanttThemeProvider";
import { GanttChart } from "@/components/gantt";

export default function GanttPage() {
  return (
    <GanttThemeProvider>
      <div className="gantt-area">
        <GanttThemeToggle />
        <GanttChart ganttId={params.ganttId} />
      </div>
    </GanttThemeProvider>
  );
}
```

---

## 📦 Gantt 모듈 독립화 전략

### 1. Public API 설계

#### components/gantt/index.ts

```typescript
// Core Components
export { GanttChart } from "./core/GanttChart";
export { GanttToolbar } from "./core/GanttToolbar";

// Hooks
export { useGanttSchedule } from "../../lib/gantt/hooks/useGanttSchedule";
export { useGanttData } from "../../lib/gantt/hooks/useGanttData";

// Theme
export { GanttThemeProvider, useGanttTheme } from "./themes/GanttThemeProvider";

// Types
export type {
  Task,
  Link,
  Schedule,
  ViewType,
  SaveState,
} from "../../lib/gantt/types";

// Constants
export { TASK_TYPES, CELL_WIDTH_MAP, CELL_HEIGHT } from "./config/taskConfig";
```

### 2. contech-dx에서 사용 예시

```tsx
// contech-dx/src/components/ProjectGantt.tsx

import {
  GanttChart,
  GanttThemeProvider,
  useGanttSchedule,
  type Task,
} from "@/lib/gantt"; // 또는 npm 패키지로 배포

export function ProjectGantt({ projectId }: { projectId: string }) {
  return (
    <GanttThemeProvider>
      <GanttChart
        ganttId={projectId}
        onSave={(data) => console.log("Saved:", data)}
        theme="willow-dark"
      />
    </GanttThemeProvider>
  );
}
```

### 3. NPM 패키지 배포 (선택)

```json
// package.json
{
  "name": "@your-org/sagantt",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": "./dist/index.js",
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "next": "^16.0.0",
    "@svar-ui/react-gantt": "^2.3.3"
  }
}
```

---

## 🚀 단계별 개발 로드맵 (8주)

### Week 1-2: 환경 통일 및 기초 인프라

**목표:** contech-dx와 동일한 환경 구축

- [ ] **Day 1-2: 패키지 설치 및 설정**
  - Supabase, Radix UI, next-themes, Sonner 등 설치
  - ESLint, Prettier 설정
  - tsconfig 통일

- [ ] **Day 3-4: 디자인 시스템 이식**
  - `globals.css` contech-dx 스타일 적용
  - shadcn/ui 컴포넌트 이식 (Button, Card, Dialog, Input 등)
  - 테마 시스템 설정

- [ ] **Day 5-7: Supabase 설정**
  - Supabase 프로젝트 생성
  - 데이터베이스 스키마 생성 (SQL 실행)
  - 환경 변수 설정 (`.env.local`)
  - Supabase 클라이언트 설정

- [ ] **Day 8-10: 레이아웃 구축**
  - NavBar, Sidebar 컴포넌트 생성
  - ThemeProvider, ThemeToggle 생성
  - 라우팅 구조 설정

---

### Week 3-4: Gantt 모듈 리팩토링

**목표:** 기존 코드를 독립 모듈로 재구성

- [ ] **Day 11-13: 타입 시스템 개선**
  - `any` 제거, 명확한 인터페이스 정의
  - Zod 스키마 작성

- [ ] **Day 14-16: 코드 분리**
  - `lib/gantt/utils/` 생성 및 유틸 함수 이전
  - `lib/gantt/hooks/` 생성 및 Hook 분리
  - `lib/gantt/api/` 생성

- [ ] **Day 17-19: Supabase 연동**
  - `lib/services/ganttCharts.ts` 작성
  - `lib/services/tasks.ts` 작성
  - `lib/services/links.ts` 작성
  - API Route 작성 (`app/api/gantt/`)

- [ ] **Day 20-21: 테스트 작성**
  - Vitest 설정
  - 유틸 함수 유닛 테스트

---

### Week 5-6: 대시보드 구축

**목표:** 프로젝트 관리 UI 완성

- [ ] **Day 22-24: 프로젝트 CRUD**
  - `components/dashboard/ProjectCard.tsx`
  - `components/dashboard/ProjectList.tsx`
  - `components/dashboard/ProjectForm.tsx`
  - `app/(dashboard)/page.tsx` (프로젝트 목록)
  - `app/(dashboard)/projects/new/page.tsx` (생성)

- [ ] **Day 25-27: Gantt 차트 CRUD**
  - `components/dashboard/GanttCard.tsx`
  - `components/dashboard/GanttList.tsx`
  - `components/dashboard/GanttForm.tsx`
  - `app/(dashboard)/projects/[id]/page.tsx` (Gantt 목록)

- [ ] **Day 28-30: 통계 및 대시보드 강화**
  - `components/dashboard/StatisticsPanel.tsx`
  - `components/dashboard/ActivityFeed.tsx`
  - 검색/필터 기능

---

### Week 7: Gantt 테마 시스템

**목표:** Willow/Willow Dark 테마 완성

- [ ] **Day 31-33: 테마 분리**
  - `gantt-willow.css` 작성
  - `gantt-willow-dark.css` 작성
  - `GanttThemeProvider` 구현

- [ ] **Day 34-35: 테마 토글**
  - `GanttThemeToggle` 컴포넌트
  - 사용자 설정 저장 (localStorage)

- [ ] **Day 36-37: 스타일 정리**
  - 전체 앱 vs Gantt 영역 스타일 충돌 해결
  - CSS 변수 정리

---

### Week 8: 통합 테스트 및 배포 준비

**목표:** 전체 시스템 안정화

- [ ] **Day 38-40: 통합 테스트**
  - E2E 테스트 (Playwright)
  - 권한 테스트
  - 동시 편집 테스트

- [ ] **Day 41-43: 성능 최적화**
  - 메모이제이션 적용
  - Lazy loading
  - 이미지 최적화

- [ ] **Day 44-46: 문서화**
  - README 완성
  - API 문서
  - 사용자 가이드

- [ ] **Day 47-49: 배포**
  - Vercel 배포
  - 환경 변수 설정
  - CI/CD 설정

- [ ] **Day 50-56: 버그 수정 및 폴리싱**

---

## 📋 체크리스트

### Phase 1: 환경 설정 (Week 1-2)
- [ ] Supabase 프로젝트 생성
- [ ] 필수 패키지 설치
- [ ] contech-dx 스타일 이식
- [ ] 데이터베이스 스키마 생성
- [ ] 레이아웃 구조 설정

### Phase 2: Gantt 리팩토링 (Week 3-4)
- [ ] 타입 시스템 개선
- [ ] 코드 모듈화
- [ ] Supabase API 연동
- [ ] 유닛 테스트 작성

### Phase 3: 대시보드 (Week 5-6)
- [ ] 프로젝트 관리 UI
- [ ] Gantt 차트 관리 UI
- [ ] 통계 패널
- [ ] 검색/필터

### Phase 4: 테마 시스템 (Week 7)
- [ ] Willow 테마 구현
- [ ] Willow Dark 테마 구현
- [ ] 테마 토글 UI

### Phase 5: 최종 점검 (Week 8)
- [ ] 통합 테스트
- [ ] 성능 최적화
- [ ] 문서화
- [ ] 배포

---

## 🎯 성공 지표 (KPI)

### 코드 품질
- [ ] TypeScript strict mode 통과
- [ ] ESLint 에러 0개
- [ ] 테스트 커버리지 70% 이상

### 성능
- [ ] 대시보드 초기 로딩 < 2초
- [ ] Gantt 차트 렌더링 < 1.5초
- [ ] Lighthouse 점수 85+ (Performance)

### 기능
- [ ] 프로젝트 CRUD 완성
- [ ] Gantt 차트 CRUD 완성
- [ ] Task/Link 실시간 동기화
- [ ] 테마 전환 정상 작동

### 사용성
- [ ] 모바일 반응형 완성
- [ ] 키보드 단축키 지원
- [ ] 접근성 WCAG 2.1 AA

---

## 💡 핵심 기술 도전 과제

### 1. 테마 시스템 격리
**도전:** Gantt 영역만 Willow 테마, 나머지는 contech-dx 테마  
**해결:** CSS 변수 스코프 + Context API

### 2. 실시간 동기화
**도전:** 여러 사용자가 동시에 Gantt 수정  
**해결:** Supabase Realtime Subscriptions

### 3. 대용량 데이터 처리
**도전:** 수백 개의 Task가 있는 Gantt 차트  
**해결:** Virtual Scrolling (SVAR 기본 지원 확인), Lazy Loading

### 4. 모듈 독립성
**도전:** Gantt 모듈을 contech-dx에 쉽게 통합  
**해결:** 명확한 Public API, Dependency Injection

---

## 📞 다음 단계

1. **Supabase 프로젝트 생성** 및 환경 변수 설정
2. **패키지 설치** 시작
3. **데이터베이스 스키마 실행**
4. **첫 번째 컴포넌트** (ProjectList) 구현

---

**작성일:** 2025-11-24  
**최종 수정:** 2025-11-24  
**작성자:** AI Assistant (Claude)

