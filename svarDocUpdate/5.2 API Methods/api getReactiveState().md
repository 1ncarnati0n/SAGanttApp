# api.getReactiveState()

# **Description**

Gets the state object with the reactive properties of Gantt

This method allows you to subscribe to the returned properties in the same way as actions.

# **Usage**

```jsx
api.getReactiveState(): object;

```

# **Returns**

The method returns an object with the following reactive properties:

```jsx
{
   tasks,
   links,
   start,
   columns,
   end,
   lengthUnit,
   cellWidth,
   cellHeight,
   scaleHeight,
   scales,
   taskTypes,
   zoom,
   selected,
   activeTask,
};

```

# **Example**

In the example below we subscribe to the **selected** property in order to show toolbar buttons for the selected task.

```jsx
import { useState }from "react";
import { useStoreLater }from "@svar-ui/lib-react";
import { Gantt, Toolbar }from "@svar-ui/react-gantt";
import { Button }from "@svar-ui/react-core";

import { getData }from "./common/data";

exportdefaultfunction Example() {
const data = getData();

const [api, setApi] = useState(null);
const selected = useStoreLater(api, "selected");

function handleDelete() {
    api.exec("delete-task", { id: selected });
  }

return (
    <>
      <Toolbar>
        {selected && <Button onClick={handleDelete}>Delete task</Button>}
      </Toolbar>

      <Gantt tasks={data.tasks} init={setApi} />
    </>
  );
}

```

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)