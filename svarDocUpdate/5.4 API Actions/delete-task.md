# delete-task

# **Description**

Fires when deleting a task

# **Usage**

```jsx
"delete-task": ({
  id:  string | number,
  source?: string | number
}) => boolean|void;

```

# **Parameters**

The callback of the **delete-task** action can take an object with the following parameters:

- `id` - (required) the ID of a task to be deleted
- `source` - (optional) the ID of a source task that is deleted

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

Use the [`api.exec`](https://docs.svar.dev/react/gantt/api/methods/exec) method to trigger the action:

```jsx
import { useState }from "react";
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";
import { Button }from "@svar-ui/react-core";

const data = getData();

exportdefaultfunction Example() {
const [api, setApi] = useState(null);
const [selected, setSelected] = useState(null);

function handleDelete() {
    api?.exec("delete-task", { id: selected });
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

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)