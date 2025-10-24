# start

# **Description**

Optional. Sets the start date of the timescale

# **Usage**

```jsx
start?: Date;

```

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
return (
    <Gantt
      tasks={data.tasks}
      start={new Date(2023, 2, 1)}
    />
  );
}

```