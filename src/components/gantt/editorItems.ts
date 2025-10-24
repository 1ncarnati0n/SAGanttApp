import { defaultEditorItems } from "@svar-ui/react-gantt";

import { TASK_TYPES } from "./taskConfig";

const LABEL_MAP: Record<string, { label?: string; placeholder?: string }> = {
  text: { label: "작업명", placeholder: "작업 이름을 입력하세요" },
  details: { label: "설명", placeholder: "세부 내용을 입력하세요" },
  type: { label: "작업 유형" },
  start: { label: "시작일" },
  end: { label: "종료일" },
  duration: { label: "기간(일)", placeholder: "일수" },
  progress: { label: "진행율" },
  links: { label: "연결 관계" },
};

export const editorItems = defaultEditorItems.map((item) => {
  const overrides = LABEL_MAP[item.key as string] ?? {};
  const nextConfig = overrides.placeholder
    ? {
        ...(item.config ?? {}),
        placeholder: overrides.placeholder,
      }
    : item.config;

  if (item.key === "type") {
    return {
      ...item,
      ...(overrides.label ? { label: overrides.label } : {}),
      config: nextConfig,
      options: TASK_TYPES.map(({ id, label }) => ({ id, label })),
    };
  }

  return {
    ...item,
    ...(overrides.label ? { label: overrides.label } : {}),
    config: nextConfig,
  };
});
