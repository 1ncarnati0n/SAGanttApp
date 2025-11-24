# 🚀 빠른 테스트 가이드

**목적**: Supabase 설정 없이 앱을 즉시 테스트하기

---

## 방법 1: Mock 모드로 즉시 테스트 (추천) ⚡

### Step 1: .env.local 파일 수정
```bash
# 기존 Supabase 설정을 주석 처리
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Mock 모드 활성화
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Step 2: 서버 재시작
```bash
# 현재 실행 중인 서버 중단 (Ctrl+C)
npm run dev
```

### Step 3: 테스트
1. http://localhost:3000/dashboard 접속
2. ✅ "Mock 모드" 배지 확인
3. ✅ 샘플 프로젝트 자동 생성됨
4. 클릭하여 Gantt 차트 확인!

---

## 방법 2: Supabase 설정 (프로덕션용) 🗄️

### Step 1: Supabase SQL 실행
1. `SUPABASE_SCHEMA_FIX.sql` 파일 열기
2. 내용 전체 복사
3. Supabase Dashboard → SQL Editor
4. 붙여넣기 → RUN 클릭

### Step 2: .env.local 확인
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### Step 3: 서버 재시작
```bash
npm run dev
```

### Step 4: 샘플 데이터 생성
1. http://localhost:3000/dashboard 접속
2. "샘플 프로젝트 생성" 버튼 클릭
3. ✅ 성공!

---

## 테스트 시나리오

### ✅ 1. 프로젝트 목록 확인
- Dashboard에 프로젝트 카드 표시
- 프로젝트 이름, 설명, 날짜 표시

### ✅ 2. 프로젝트 상세 페이지
- 프로젝트 클릭
- Gantt 차트 목록 표시
- "새 Gantt 차트" 버튼 작동

### ✅ 3. Gantt 차트 보기
- Gantt 차트 클릭
- 14개 Task 표시 (건설 프로젝트)
- Timeline 표시
- Task 의존성(Link) 표시

### ✅ 4. 새 프로젝트 생성
- Dashboard → "새 프로젝트" 버튼
- 양식 입력
- 생성 확인

### ✅ 5. 새 Gantt 차트 생성
- 프로젝트 상세 → "새 Gantt 차트" 버튼
- 양식 입력
- 생성 확인

---

## 문제 해결

### ❌ "Mock 모드" 배지가 사라지지 않음
→ `.env.local`에서 `NEXT_PUBLIC_USE_MOCK_DATA=true` 제거

### ❌ Gantt 차트가 비어있음
→ 샘플 데이터 생성 버튼 클릭 (Supabase 모드)
→ 또는 Mock 모드로 전환 (자동 샘플 데이터)

### ❌ 서버 에러 발생
→ 터미널에서 에러 메시지 확인
→ Supabase 연결 문제인 경우 Mock 모드로 전환

---

**작성일**: 2025-11-24

