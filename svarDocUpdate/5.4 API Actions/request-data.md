# request-data

# **Description**

Fires when data for a task branch is requested

# **Usage**

```jsx
"request-data": ({
  id: string | number
}) => boolean |void;

```

# **Parameters**

The callback of the **request-data** event can take an object with the following parameters:

- `id` - (required) the task ID for which data is requested

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { useEffect }from "react";
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
function init(api) {
    api.on("request-data", ({ id }) => {
      console.log("Data request for: " + id);
    });
  }

return <Gantt tasks={data.tasks} init={init} />;
}

```