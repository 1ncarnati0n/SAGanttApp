# Gantt UI Improvement Strategy

This document outlines the strategy to enhance the UI/UX of the Gantt chart using `@svar-ui/react-gantt`.

## 1. Visual Design (CSS)
The goal is to create a "Premium & Modern" look.

### Color Palette
- **Backgrounds**: Use cleaner whites and very light grays for contrast.
- **Borders**: Lighter, subtle borders (`#e2e8f0`) instead of stark black.
- **Task Colors**:
  - **Standard**: Professional blue/indigo tones.
  - **Critical/Urgent**: Soft red/coral (avoid neon).
  - **Milestone**: Distinct diamond shape with clear color.
  - **Progress**: Smooth green or brand color.

### Typography
- Use a system font stack (Inter, San Francisco, Segoe UI) with proper weights.
- **Headers**: Uppercase, smaller tracking, bold (modern dashboard style).
- **Cells**: Readable size (13-14px), good vertical alignment.

### Components
- **Grid**:
  - Add hover effects on rows.
  - Increase cell padding for "breathing room".
- **Timeline (Scales)**:
  - Distinct separation between Year/Month/Day.
  - Weekend highlighting (already present, but refine colors).
- **Task Bars**:
  - Rounded corners (border-radius).
  - Subtle shadows for depth.

## 2. Functional UI Enhancements

### Tooltip
- **Current**: Basic info.
- **Improvement**: A "Card" style tooltip with:
  - Status badge.
  - Date range with duration.
  - Assigned user avatar/name (if available).
  - Progress bar inside tooltip.

### Toolbar
- **Current**: Standard buttons.
- **Improvement**:
  - Group related buttons (Edit, View, Zoom).
  - Use better icons (if possible via CSS or custom render).
  - Add a "Shadow" and "Floating" effect or a clean "Toolbar Strip" look.

### Grid Columns
- **Date Formatting**: Ensure dates are readable (e.g., "Oct 24" instead of "2023-10-24" if space is tight, or keep full if needed).
- **Status Indicator**: Add a small colored dot next to the task name to indicate status/type visually in the grid.

## 3. Implementation Steps
1.  **Refine `gantt.css`**: Apply the new color palette and spacing variables.
2.  **Update `TaskTooltip.tsx`**: Redesign the tooltip layout.
3.  **Update `GanttPreview.tsx`**: Apply column formatting improvements.
