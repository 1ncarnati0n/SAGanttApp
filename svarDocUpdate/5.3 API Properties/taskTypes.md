# taskTypes

# **Description**

Optional. An array of objects containing the tasks types data

# **Usage**

```jsx
taskTypes?: [
  {
    id: string,
    label?: string
  }
];

```

# **Parameters**

- `id` - (required) the task ID which can be one of the following: "task", "summary", "milestone" or any other custom task type
- `label` - (optional) the task title

# **Example**

```jsx
import { getData }from "./common/data.jsx";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();
const taskTypes = [
  { id: "task", label: "Project Task" },
  { id: "summary", label: "Project" },
];

exportdefaultfunction App() {
return <Gantt tasks={data.tasks} taskTypes={taskTypes} />;
}

```

**info**

Instructions with an example of adding a new custom task type you can find here: [Adding a custom task type](https://docs.svar.dev/react/gantt/guides/configuration/add_custom_task)