# 엔터프라이즈급 커스텀 간트차트 아키텍처 분석 및 설계

## 1. 개요 (Overview)
현재 사용 중인 `svar` 라이브러리를 대체하고, OpenAI 스타일의 디자인과 엔터프라이즈급 성능(대용량 데이터 처리, 부드러운 인터랙션)을 갖춘 자체 간트차트 엔진을 개발하기 위한 심층 분석 문서입니다.

## 2. 핵심 요구사항 (Core Requirements)
엔터프라이즈급 간트차트가 갖춰야 할 필수 요소:
- **대용량 데이터 처리 (Performance)**: 1,000개 이상의 태스크를 끊김 없이 렌더링 (60fps 유지).
- **가상화 (Virtualization)**: 화면에 보이는 영역만 렌더링하여 DOM 노드 수를 최소화.
- **유연한 줌/스케일 (Zoom/Scale)**: 일(Day), 주(Week), 월(Month), 년(Year) 단위의 부드러운 전환.
- **복잡한 인터랙션 (Interaction)**: 드래그 앤 드롭(이동, 리사이징), 의존성 연결, 다중 선택.
- **커스텀 디자인 (Styling)**: Tailwind CSS 기반의 완벽한 테마 커스터마이징.

## 3. 기술 아키텍처 (Technical Architecture)

### 3.1. 렌더링 전략 (Rendering Strategy)
세 가지 방식 중 **"Hybrid (DOM + SVG)"** 방식을 제안합니다.

| 방식 | 장점 | 단점 | 추천 여부 |
| :--- | :--- | :--- | :--- |
| **Pure DOM (HTML)** | 접근성 우수, CSS 스타일링 용이, 이벤트 핸들링 쉬움 | 노드 수가 많아지면 느려짐 (가상화 필수) | **Task Bar 렌더링에 사용** |
| **SVG** | 벡터 그래픽, 선 그리기 용이 (의존성 라인) | DOM보다 무거울 수 있음, 텍스트 처리가 까다로움 | **의존성 연결선(Link)에 사용** |
| **Canvas** | 압도적인 성능 (5만+ 태스크 가능) | 접근성 나쁨, 스타일링 어려움, 이벤트 직접 구현 필요 | 비추천 (유지보수 어려움) |

**결론**: 
- **태스크 바(Bar)와 그리드(Grid)**는 `div`를 사용하여 스타일링 유연성과 접근성을 확보합니다.
- **의존성 화살표(Dependency Lines)**는 `svg`를 오버레이하여 자연스러운 곡선 처리를 구현합니다.

### 3.2. 데이터 구조 및 가상화 (Data Structure & Virtualization)
트리 구조(WBS)를 그대로 렌더링하면 성능이 저하됩니다. **"Flat List"** 변환 전략을 사용합니다.

1.  **Flattening**: 계층적인 트리 데이터를 "열려있는(Expanded)" 노드만 포함한 1차원 배열로 변환합니다.
2.  **Windowing (Vertical)**: 스크롤 위치(`scrollTop`)를 기반으로 현재 화면에 보일 `startIndex`와 `endIndex`를 계산하여 해당 범위의 태스크만 렌더링합니다.
3.  **Windowing (Horizontal)**: 시간 축이 길어질 경우, 현재 보이는 날짜 범위만 렌더링합니다.

### 3.3. 상태 관리 (State Management)
복잡한 상호작용을 처리하기 위해 전역 상태 관리가 필요합니다. 외부 라이브러리 의존성을 줄이기 위해 **React Context + useReducer** 패턴을 권장합니다.

- **Store 구조**:
    ```typescript
    interface GanttState {
      tasks: Task[];           // 전체 태스크 데이터
      links: Link[];           // 의존성 데이터
      timeScale: {             // 시간 축 설정
        startDate: Date;
        endDate: Date;
        unit: 'day' | 'week' | 'month';
        cellWidth: number;
      };
      ui: {                    // UI 상태
        scrollTop: number;
        scrollLeft: number;
        expandedTaskIds: Set<string>; // 접힘/펼침 상태
        selectedTaskIds: Set<string>;
      };
    }
    ```

### 3.4. 좌표 계산 시스템 (Coordinate System)
날짜(Date)와 픽셀(Pixel) 간의 정확한 변환 함수가 핵심입니다.

- `getX(date)`: 특정 날짜의 X 좌표 반환.
- `getDate(x)`: 특정 X 좌표의 날짜 반환 (드래그 시 스냅핑 구현에 사용).
- `getWidth(duration)`: 기간에 따른 너비 계산.

## 4. 상세 기능 명세 (Detailed Features)

### 4.1. 타임라인 헤더 (Timeline Header)
- **2단 구조**: 상단(년/월), 하단(일/주)의 2단 헤더로 가독성 확보.
- **Sticky Position**: 스크롤 시 상단 고정.

### 4.2. 좌측 패널 (Task List / Grid)
- **Tree Toggle**: 폴더 접기/펼치기 기능.
- **Resizer**: 좌측 패널과 우측 차트 영역 사이의 너비 조절 핸들.
- **Sync Scroll**: 좌측 패널(수직 스크롤)과 우측 차트(수직 스크롤)의 동기화.

### 4.3. 우측 차트 (Gantt Area)
- **Grid Background**: 주말, 공휴일 색상 구분 표시.
- **Task Bar**:
    - 진행률(Progress) 표시 바.
    - 리사이즈 핸들 (좌/우).
    - 호버 시 툴팁 표시.
- **Drag & Drop**:
    - X축 이동: 날짜 변경.
    - Y축 이동: 순서 변경 (또는 부모 변경 - 고급 기능).

## 5. 단계별 구현 로드맵 (Implementation Roadmap)

### Phase 1: Core Engine (기반 구축)
- [ ] 데이터 구조 설계 및 Flattening 로직 구현.
- [ ] 날짜-픽셀 변환 유틸리티 (`dateUtils`) 구현.
- [ ] 가상화 스크롤 컨테이너 (`VirtualScroll`) 구현.

### Phase 2: Rendering (시각화)
- [ ] 타임라인 헤더 및 그리드 배경 구현.
- [ ] 태스크 바 렌더링 (위치 계산).
- [ ] SVG 의존성 라인 렌더링.

### Phase 3: Interaction (상호작용)
- [ ] 태스크 드래그 이동 및 리사이징.
- [ ] 트리 접기/펼치기.
- [ ] 줌 레벨 변경 (Day/Week/Month).

### Phase 4: Polish (완성도)
- [ ] Tailwind 기반 OpenAI 스타일 테마 적용.
- [ ] 키보드 접근성 및 ARIA 속성 추가.
- [ ] 성능 최적화 (React.memo, useMemo 활용).

## 6. 결론 (Conclusion)
직접 구현은 초기 비용이 들지만, **완벽한 커스터마이징**과 **라이센스 비용 절감**, 그리고 **최적화된 성능**을 얻을 수 있습니다. 특히 현재 프로젝트의 디자인 시스템(OpenAI Style)과 완벽하게 일치하는 UI를 제공할 수 있다는 점이 가장 큰 장점입니다.
