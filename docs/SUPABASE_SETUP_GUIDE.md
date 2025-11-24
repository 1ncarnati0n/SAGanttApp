# 🗄️ Supabase 설정 가이드

**목적**: SAGantt 앱에서 Supabase를 사용하기 위한 완전한 설정 가이드

---

## 📋 목차

1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 스키마 생성](#2-데이터베이스-스키마-생성)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [샘플 데이터 생성](#4-샘플-데이터-생성)
5. [문제 해결](#5-문제-해결)

---

## 1. Supabase 프로젝트 생성

### Step 1.1: Supabase 계정 생성
1. https://supabase.com 접속
2. "Start your project" 클릭
3. GitHub 또는 이메일로 가입

### Step 1.2: 새 프로젝트 생성
1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: `contech-gantt-dev` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)` 또는 가까운 지역
   - **Pricing Plan**: Free (무료) 또는 Pro
3. "Create new project" 클릭
4. ⏳ 프로젝트 생성 대기 (약 2분)

### Step 1.3: API 키 확인
1. 프로젝트 Dashboard → Settings (톱니바퀴 아이콘)
2. "API" 메뉴 클릭
3. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbG...` (긴 토큰)

---

## 2. 데이터베이스 스키마 생성

### Step 2.1: SQL Editor 열기
1. Supabase Dashboard 왼쪽 메뉴
2. "SQL Editor" 클릭
3. "New query" 버튼 클릭

### Step 2.2: 스키마 SQL 실행
프로젝트 루트의 `SUPABASE_SCHEMA_FIX.sql` 파일 내용을 복사하여 붙여넣고 **"Run"** 클릭!

```sql
-- ============================================
-- ConTech Gantt - Supabase Schema
-- ============================================

-- 1. Projects 테이블
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS gantt_charts CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  status TEXT DEFAULT 'planning',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID
);

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
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_parent_id ON tasks(parent_id);
CREATE INDEX idx_links_gantt_chart_id ON links(gantt_chart_id);

-- RLS 비활성화 (개발용)
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE gantt_charts DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE links DISABLE ROW LEVEL SECURITY;
```

### Step 2.3: 테이블 확인
1. 왼쪽 메뉴 "Table Editor" 클릭
2. 다음 테이블들이 생성되었는지 확인:
   - ✅ `projects` (4개 필수 컬럼: id, name, start_date, status)
   - ✅ `gantt_charts` (4개 필수 컬럼: id, project_id, name, created_at)
   - ✅ `tasks` (18개 컬럼)
   - ✅ `links` (5개 컬럼)

---

## 3. 환경 변수 설정

### Step 3.1: .env.local 파일 생성
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력:

```env
# Supabase 연결 정보
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# 선택사항: Mock 데이터 강제 사용
# NEXT_PUBLIC_USE_MOCK_DATA=false
```

**⚠️ 주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

### Step 3.2: 환경 변수 확인
```bash
# 환경 변수가 올바른지 확인
cat .env.local
```

### Step 3.3: 서버 재시작
```bash
# 환경 변수 적용을 위해 서버 재시작
# Ctrl+C로 중단 후 다시 실행
npm run dev
```

---

## 4. 샘플 데이터 생성

### Step 4.1: Dashboard 접속
1. 브라우저에서 http://localhost:3000/dashboard 접속
2. "샘플 프로젝트 생성" 버튼이 보이는지 확인

### Step 4.2: 샘플 프로젝트 생성
1. "샘플 프로젝트 생성" 버튼 클릭
2. ⏳ 로딩 (약 1-2초)
3. ✅ 성공 메시지: "샘플 프로젝트가 생성되었습니다!"
4. 페이지 자동 새로고침

### Step 4.3: 생성된 데이터 확인
**Dashboard에서**:
- ✅ "고층 오피스 빌딩 건설 프로젝트" 카드 표시

**프로젝트 클릭 시**:
- ✅ "건설 공정 일정표" Gantt 차트 표시

**Gantt 차트 클릭 시**:
- ✅ 14개 Task 표시:
  - 설계 단계 (기본설계, 실시설계)
  - 기초공사 (터파기, 기초 콘크리트, 지하주차장)
  - 골조공사 (철골공사, 슬라브공사)
  - 마감공사 (외벽 마감, 내부 마감)
  - 준공 (마일스톤)

**Supabase Table Editor에서**:
1. `projects` 테이블: 1개 행
2. `gantt_charts` 테이블: 1개 행
3. `tasks` 테이블: 14개 행
4. `links` 테이블: 9개 행

---

## 5. 문제 해결

### ❌ "Could not find the 'end_date' column"
**원인**: Supabase 테이블 스키마가 오래된 버전  
**해결**: 
1. SQL Editor에서 `SUPABASE_SCHEMA_FIX.sql` 재실행
2. 서버 재시작: `npm run dev`

### ❌ "Invalid API key"
**원인**: 환경 변수가 잘못됨  
**해결**:
1. Supabase Dashboard → Settings → API에서 키 재확인
2. `.env.local` 파일 수정
3. 서버 재시작

### ❌ "Mock 모드" 배지가 계속 표시됨
**원인**: 환경 변수가 로드되지 않음  
**해결**:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일 이름 확인 (`.env.local`, 앞에 점 있어야 함)
3. 서버 재시작 (Ctrl+C → `npm run dev`)

### ❌ 테이블이 생성되지 않음
**원인**: SQL 실행 중 에러  
**해결**:
1. SQL Editor에서 에러 메시지 확인
2. CASCADE 에러 시: 기존 테이블 수동 삭제 후 재시도
3. 권한 에러 시: 프로젝트 Owner인지 확인

### ❌ "Failed to create project" 에러
**원인**: RLS(Row Level Security)가 활성화됨  
**해결**:
1. SQL Editor에서 실행:
```sql
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE gantt_charts DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE links DISABLE ROW LEVEL SECURITY;
```
2. 개발 완료 후 프로덕션에서는 적절한 RLS 정책 설정

---

## 6. 검증 체크리스트

### ✅ Supabase 설정 완료 확인

- [ ] Supabase 프로젝트 생성됨
- [ ] 4개 테이블 생성됨 (projects, gantt_charts, tasks, links)
- [ ] `.env.local` 파일 설정됨
- [ ] 환경 변수가 올바르게 로드됨 (Mock 모드 배지 없음)
- [ ] "샘플 프로젝트 생성" 버튼 클릭 성공
- [ ] Dashboard에 샘플 프로젝트 표시됨
- [ ] Gantt 차트 열기 성공
- [ ] 14개 Task가 표시됨

---

## 7. 다음 단계

### 이제 다음 작업을 진행할 수 있습니다:

1. **새 프로젝트 생성**
   - Dashboard → "새 프로젝트" 버튼
   - 이름, 설명, 날짜 입력

2. **새 Gantt 차트 생성**
   - 프로젝트 상세 페이지 → "새 Gantt 차트" 버튼
   - 이름, 설명, 날짜 입력

3. **Gantt 차트 편집** (향후 구현)
   - Task 추가/수정/삭제
   - Link 추가/수정/삭제
   - 실시간 저장

---

## 8. 참고 자료

- **Supabase 공식 문서**: https://supabase.com/docs
- **Next.js + Supabase 가이드**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **프로젝트 문서**: `docs/SESSION_SUMMARY.md`

---

**작성일**: 2025-11-24  
**버전**: 1.0.0

