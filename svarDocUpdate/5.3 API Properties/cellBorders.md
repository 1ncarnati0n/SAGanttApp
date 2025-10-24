# cellBorders

# **Description**

Optional. Defines borders style in the Gantt chart

# **Usage**

```jsx
cellBorders?: "column" | "full";

```

# **Parameters**

- `cellBorders` - to show all lines in the grid (horizontal and vertical), set the borders value to "full". To hide horizontal lines, set the value to "columns".

FIXME: The allowed values in Usage ("column" | "full") and the example/description ("columns") are inconsistent. Please standardize to either "column" or "columns".

# **Example**

```jsx
import { useState }from "react";
import { getData, simpleColumns }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
const [cellBorders, setCellBorders] = useState("columns");

return (
    <Gantt
      cellBorders={cellBorders}
      tasks={data.tasks}
    />
  );
}

```

[**Previous**](https://docs.svar.dev/react/gantt/api/properties/autoscale)