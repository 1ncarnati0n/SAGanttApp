# cellHeight

# **Description**

Optional. Defines the height of a cell in pixels

# **Usage**

```jsx
cellHeight?: number;

```

# **Example**

The default value is 38px.

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
return <Gantt tasks={data.tasks} cellHeight={32} />;
}

```