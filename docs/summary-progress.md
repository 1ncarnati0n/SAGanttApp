# Summary Tasks Auto Progress & Date Parsing Fix

- **문제 원인 파악**  
  - `mock.json`에서 날짜를 `"YYYY-MM-DD"` 형태로 저장하면 `new Date("YYYY-MM-DD")`가 UTC 자정(00:00Z)으로 파싱됨.  
  - 한국 표준시(+09:00) 기준으로는 오전 09시가 되어 셀 경계를 넘기면서 간트 차트 막대가 하루 더 길게 렌더링되는 버그 발생.

- **핵심 개선 사항 (`src/components/gantt/useGanttSchedule.ts`)**  
  - 날짜 파서를 보강해 `"YYYY-MM-DD"` 패턴을 직접 분해 후 `new Date(year, monthIndex, day)`로 생성.  
  - 로컬 자정 기준으로 Date 객체를 만들기 때문에 `start`/`end` 차이가 정확히 유지되고, 막대 폭과 일수가 일치함.  
  - 동일 파일에 요약 작업 자동 진행률 로직을 추가해 자식 작업 변경 시 가중 평균 값으로 요약 진행률 갱신.

- **UI 표시 정합성 (`src/components/GanttPreview.tsx`, `TaskTooltip.tsx`)**  
  - 라이브러리 내부 값(`end = 실제 종료 다음날`)을 사용자에게는 다시 하루 뺀 값으로 보여주도록 포맷팅.  
  - 표와 툴팁 모두 동일한 계산을 사용해 시각적으로도 일관성 유지.

- **데이터 정비 (`public/mock.json`)**  
  - 저장 포맷을 공식 권장대로 유지(실제 종료 다음날을 `end`에 기록).  
  - 날짜 파싱이 개선되면서 1일 작업도 정확히 1칸으로 표시됨.  
  - 자동 요약 진행률 로직과 함께 사용할 때도 안정적으로 동작.
