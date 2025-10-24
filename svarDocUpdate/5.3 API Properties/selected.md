# selected

# **Description**

Optional. Marks tasks as selected

# **Usage**

```jsx
selected?: number | string;

```

# **Parameters**

- `selected` - an array of tasks IDs

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      selected={[1, 2, 3]}
    />
  );
}

```