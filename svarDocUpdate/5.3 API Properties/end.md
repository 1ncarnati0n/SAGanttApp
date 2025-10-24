# end

# **Description**

Optional. Sets the end date of the timescale

# **Usage**

```jsx
end?: Date;

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
      start={new Date(2022, 2, 1)}
      end={new Date(2023, 3, 1)}
    />
  );
}

```