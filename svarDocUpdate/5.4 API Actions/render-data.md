# render-data

# **Description**

Fires when data is rendered when scrolling

# **Usage**

```jsx
onRenderData: ({
from: number,
   start: number,
   end: number
}) => boolean |void;

```

# **Parameters**

The callback of the event handler prop receives an object with the following parameters:

- `from` - (required) the point in pixels where visible rows start
- `start` - (required) the ID of the first visible row
- `end` - (required) the ID of the last row within the visible area

**info**

For handling the events you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function App() {
const handleRenderData = (ev) => {
    console.log("The ID of the last visible row", ev.end);
  };

return (
    <Gantt
      onRenderData={handleRenderData}
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
    />
  );
}

```