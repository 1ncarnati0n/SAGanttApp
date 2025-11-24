# SAGantt App

프로젝트 관리를 위한 SVAR React Gantt 기반 애플리케이션

## 브랜치 구조

- `main` - Vite + React 버전 (원본)
- `nextjs` - Next.js 16 버전 (현재 브랜치)

## 기술 스택

### Next.js 브랜치
- Next.js 16.0.3
- React 19.2.0
- TypeScript
- Tailwind CSS 4
- SVAR React Gantt 2.3.3

### Vite 브랜치 (레거시)
- Vite 7
- React 19
- TypeScript
- Tailwind CSS 3
- SVAR React Gantt 2.3.3

## 시작하기

### Next.js 버전 (권장)

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### Vite 버전

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev:vite

# 프로덕션 빌드
npm run build:vite

# 프리뷰
npm run preview
```

## 주요 기능

- 📊 간트 차트 기반 프로젝트 관리
- 👥 사용자별 작업 할당
- 🔗 작업 간 의존성 관리
- 📅 한국 공휴일 표시
- 🎨 커스텀 테마 (Willow)
- 📱 반응형 디자인

## 디렉토리 구조

```
SAGanttApp/
├── src/                    # Next.js 소스 (nextjs 브랜치)
│   ├── app/               # Next.js App Router
│   ├── components/        # React 컴포넌트
│   ├── data/             # 데이터 파일
│   └── styles/           # 스타일 파일
├── src-vite/             # Vite 소스 (백업)
├── public/               # 정적 파일
├── next.config.ts        # Next.js 설정
└── package.json          # 패키지 설정
```

## 마이그레이션 히스토리

- 2024-11: Vite에서 Next.js 16으로 마이그레이션
- SAGanttNext 프로젝트를 `nextjs` 브랜치로 통합

## 라이선스

Private
