# autoScale

# **Description**

Optional. Allows the timescale to change dynamically its start/end dates

# **Usage**

```jsx
autoScale?: boolean;

```

# **Parameters**

- `true` (default) - scale can change dynamically when data is added, it may change when data is modified. Tasks can be moved out via drag and drop. The initial behaviour depends on data:
    - no initial data: [`start`](https://docs.svar.dev/react/gantt/api/properties/start) and [`end`](https://docs.svar.dev/react/gantt/api/properties/end) define the initial visible range of the timescale
    - some initial data: start and end are taken from data, but the scale cannot be smaller than the defined start and end
- `false` - start and end define a fixed, unchangeable range of the scale that does not react on data changed. Tasks cannot be moved outside of this range via drag and drop

If the `start` or/and `end` are not provided, the scale defaults to a range from the current date plus one month.

# **Example**

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const tasks = getData();

exportdefaultfunction App() {
return (
    <Gantt
      tasks={tasks}
      start={new Date(2023, 2, 1)}
      end={new Date(2024, 3, 12)}
      autoScale={true}
    />
  );
}

```

**Related articles**: [Configuring timescale](https://docs.svar.dev/react/gantt/guides/configuration/configure_scales)