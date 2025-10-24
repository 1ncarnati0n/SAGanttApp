# cellWidth

# **Description**

Optional. Defines the width of a cell in pixels

# **Usage**

```jsx
cellWidth?: number;

```

# **Parameters**

- `cellWidth` - the width of a cell in pixels; *100* is set by default

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
return <Gantt tasks={data.tasks} cellWidth={90} />;
}

```

[**Previous**cellHeight](https://docs.svar.dev/react/gantt/api/properties/cellheight)