# 최신 React/Next.js 호환 커스텀 간트차트 기술 구현 가이드

사용자님의 요청에 따라, 최신 **Next.js (App Router)**, **React 18+**, **TypeScript** 환경에서 가장 호환성이 좋고 유지보수가 쉬운 기술 스택과 구현 방식을 제안합니다.

## 1. 핵심 기술 스택 (Recommended Tech Stack)

| 구분 | 추천 기술 | 선정 이유 |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | 서버 컴포넌트(데이터 페칭)와 클라이언트 컴포넌트(인터랙션)의 명확한 분리. |
| **State Management** | **Zustand** | Redux보다 훨씬 가볍고, Context API보다 렌더링 최적화가 쉬움. 드래그 앤 드롭 같은 빈번한 상태 변화에 유리. |
| **Virtualization** | **@tanstack/react-virtual** | "Headless" 가상화 라이브러리. UI(DOM)를 강제하지 않고 로직만 제공하여 커스텀 디자인에 최적. |
| **Date Library** | **date-fns** | 가볍고 Tree-shaking이 잘 되며, 함수형 프로그래밍 스타일에 적합. |
| **Styling** | **Tailwind CSS** | 이미 프로젝트에 적용됨. `class-variance-authority (cva)`와 함께 사용하여 컴포넌트 변형(Variant) 관리 용이. |
| **Icons** | **Lucide React** | 깔끔하고 일관된 SVG 아이콘 세트. |

## 2. Next.js & React 호환성 구현 전략

### 2.1. 서버/클라이언트 컴포넌트 분리 (Server/Client Separation)
간트차트는 고도의 상호작용이 필요하므로 **Client Component**여야 합니다. 하지만 데이터 로딩은 **Server Component**에서 처리하여 초기 로딩 속도를 높일 수 있습니다.

```tsx
// app/dashboard/gantt/page.tsx (Server Component)
import { getProjectTasks } from '@/lib/api';
import { GanttChart } from '@/components/CustomGantt';

export default async function GanttPage({ params }) {
  const initialData = await getProjectTasks(params.id);
  
  // 초기 데이터를 props로 전달
  return <GanttChart initialData={initialData} />;
}
```

```tsx
// components/CustomGantt/GanttChart.tsx (Client Component)
'use client';

import { useGanttStore } from './store';

export function GanttChart({ initialData }) {
  // Zustand 스토어 초기화
  const initialize = useGanttStore(state => state.initialize);
  useEffect(() => initialize(initialData), [initialData]);
  
  return ( ... );
}
```

### 2.2. Zustand를 활용한 고성능 상태 관리
Context API는 상태가 하나만 바뀌어도 구독하는 모든 컴포넌트가 리렌더링될 위험이 있습니다. Zustand는 필요한 상태만 "구독(Selector)"하여 렌더링을 최소화할 수 있습니다.

```typescript
// store/useGanttStore.ts
import { create } from 'zustand';

interface GanttState {
  zoomLevel: 'day' | 'week' | 'month';
  setZoomLevel: (level: 'day' | 'week' | 'month') => void;
  // ...
}

export const useGanttStore = create<GanttState>((set) => ({
  zoomLevel: 'day',
  setZoomLevel: (level) => set({ zoomLevel: level }),
}));
```

### 2.3. Headless 가상화 (@tanstack/react-virtual)
직접 스크롤 로직을 짜는 것은 버그가 생기기 쉽습니다. 검증된 라이브러리를 사용하여 안정성을 확보합니다.

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function TaskList({ tasks }) {
  const parentRef = useRef(null);
  
  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40, // 행 높이
    overscan: 5, // 미리 렌더링할 개수
  });

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {/* 태스크 내용 */}
            {tasks[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 3. 타입스크립트(TypeScript) 활용
엄격한 타입 정의로 개발 생산성을 높입니다.

- **Generics**: 태스크 데이터가 어떤 형태이든 받을 수 있도록 제네릭 컴포넌트로 설계 가능.
- **Utility Types**: `Pick`, `Omit` 등을 활용하여 API 응답 타입과 내부 UI 타입을 효율적으로 변환.

## 4. 결론: "쉽게 사용한다"는 것의 의미
이 기술 스택을 사용하면 다음과 같은 이점이 있습니다:

1.  **복붙 가능성**: `zustand`나 `react-virtual`은 보일러플레이트 코드가 적어 코드를 이해하고 수정하기 쉽습니다.
2.  **디버깅 용이**: React DevTools와 Zustand DevTools를 통해 상태 변화를 투명하게 볼 수 있습니다.
3.  **미래 호환성**: Next.js의 방향성(Server Components)과 React의 방향성(Concurrent Rendering)을 모두 준수하므로 오랫동안 사용할 수 있습니다.

지금 바로 이 스택으로 구현을 시작할까요?
