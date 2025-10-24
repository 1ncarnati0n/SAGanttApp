# links

# **Description**

Optional. Defines links between tasks in Gantt

An array of objects containing the links data

# **Usage**

```jsx
links?:
  {
    id?: string | number,
    source: string | number,
    target: string | number,
    type: "s2s" | "s2e" | "e2s" | "e2e"
  }[];

```

# **Parameters**

- `id` - (optional) the link ID
- `source` - (required) the source task ID
- `target` - (required) the target task ID
- `type` - (required) the link type; possible link type values:
    - e2s - "End-to-start"
    - s2s - "Start-to-start"
    - e2e - "End-to-end"
    - s2e - "Start-to-end"

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const { tasks, scales, columns } = getData();

const links = [
  { id: 1, source: 3, target: 4, type: "e2s" },
  { id: 2, source: 1, target: 2, type: "e2s" },
  { id: 21, source: 8, target: 1, type: "s2s" },
  { id: 22, source: 1, target: 6, type: "s2s" },
];

exportdefaultfunction App() {
return <Gantt tasks={tasks} scales={scales} columns={columns} links={links} />;
}

```