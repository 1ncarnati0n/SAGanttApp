# lengthUnit

# **Description**

Optional. Defines the minimal unit for task bars (the task length) in a chart

# **Usage**

```jsx
lengthUnit?: "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year";

```

# **Parameters**

- `lengthUnit` - the minimal unit of the task bars (task length) in a chart. It should be equal to or smaller than the [`scales`](https://docs.svar.dev/react/gantt/api/properties/scales) unit. Possible values: "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year".

# **Example**

```jsx
import { useState }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction Example() {
const [lengthUnit, setLengthUnit] = useState("week");

return (
    <Gantt
      tasks={data.tasks}
      lengthUnit={lengthUnit}
    />
  );
}

```