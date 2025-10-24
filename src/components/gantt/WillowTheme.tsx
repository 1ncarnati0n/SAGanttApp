import type { ReactNode } from "react";
import { Willow } from "@svar-ui/react-gantt";

export function WillowTheme({ children, fonts = true }: { children: ReactNode; fonts?: boolean }) {
  const render = () => children;
  return <Willow fonts={fonts}>{render as unknown as ReactNode}</Willow>;
}
