# activeTask

# **Description**

Optional.Defines an active task for which the Editor dialog is opened

# **Usage**

```jsx
activeTask?: number | string;

```

# **Parameters**

- `activeTask` - the ID of an active task (for which the Editor dialog opens at the initialization)

# **Example**

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction Example() {
return <Gantt tasks={data.tasks} activeTask={4} />;
}

```