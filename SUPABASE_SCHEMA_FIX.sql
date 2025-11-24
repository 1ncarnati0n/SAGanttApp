-- ============================================
-- ConTech Gantt - Supabase Schema Fix
-- ============================================
-- 이 파일을 Supabase SQL Editor에서 실행하세요!

-- ============================================
-- 1. 기존 테이블 삭제 (데이터 주의!)
-- ============================================
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS gantt_charts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- ============================================
-- 2. Projects 테이블 생성
-- ============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date TEXT NOT NULL,        -- DATE 대신 TEXT 사용
  end_date TEXT,                   -- DATE 대신 TEXT 사용 (선택사항)
  status TEXT DEFAULT 'planning',  -- 'planning', 'active', 'completed', 'on_hold'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID                     -- 사용자 ID (선택사항)
);

-- ============================================
-- 3. Gantt Charts 테이블 생성
-- ============================================
CREATE TABLE gantt_charts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  start_date TEXT,                 -- DATE 대신 TEXT 사용
  end_date TEXT,                   -- DATE 대신 TEXT 사용
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. Tasks 테이블 생성
-- ============================================
CREATE TABLE tasks (
  id TEXT PRIMARY KEY,             -- SVAR Gantt의 string ID 사용
  gantt_chart_id UUID REFERENCES gantt_charts(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  text TEXT NOT NULL,              -- Task 이름
  type TEXT NOT NULL,              -- 'task', 'summary', 'milestone', 'urgent', 'progress'
  start_date TEXT NOT NULL,        -- 시작일 (YYYY-MM-DD)
  end_date TEXT,                   -- 종료일 (milestone은 NULL)
  duration NUMERIC DEFAULT 0,      -- 기간 (일)
  progress NUMERIC DEFAULT 0,      -- 진행률 (0-100)
  parent_id TEXT,                  -- 부모 Task ID
  position INTEGER DEFAULT 0,      -- 정렬 순서
  open BOOLEAN DEFAULT TRUE,       -- 하위 Task 표시 여부
  assigned_to TEXT,                -- 담당자
  category TEXT,                   -- 카테고리
  work_type TEXT,                  -- 작업 유형
  user_id UUID,                    -- 생성자
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. Links 테이블 생성
-- ============================================
CREATE TABLE links (
  id TEXT PRIMARY KEY,             -- SVAR Gantt의 string ID 사용
  gantt_chart_id UUID REFERENCES gantt_charts(id) ON DELETE CASCADE,
  source_task_id TEXT NOT NULL,    -- 시작 Task ID
  target_task_id TEXT NOT NULL,    -- 종료 Task ID
  type TEXT NOT NULL,              -- 'e2s', 's2s', 'e2e', 's2e'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. 인덱스 생성 (성능 향상)
-- ============================================
CREATE INDEX idx_gantt_charts_project_id ON gantt_charts(project_id);
CREATE INDEX idx_tasks_gantt_chart_id ON tasks(gantt_chart_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_parent_id ON tasks(parent_id);
CREATE INDEX idx_links_gantt_chart_id ON links(gantt_chart_id);
CREATE INDEX idx_links_source ON links(source_task_id);
CREATE INDEX idx_links_target ON links(target_task_id);

-- ============================================
-- 7. RLS (Row Level Security) 비활성화
-- ============================================
-- 개발 중에는 RLS를 비활성화합니다
-- 프로덕션에서는 적절한 정책을 설정하세요!
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE gantt_charts DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE links DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 8. 완료 메시지
-- ============================================
-- ✅ 스키마 생성 완료!
-- 이제 앱에서 "샘플 프로젝트 생성" 버튼을 클릭하세요.

