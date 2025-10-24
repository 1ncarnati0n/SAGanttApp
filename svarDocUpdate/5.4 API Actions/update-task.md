# update-task

# **Description**

Fires when updating a task

# **Usage**

```jsx
"update-task": ({
   id:  string | number,
   task: Partial<ITask>,
   diff?: number,
   inProgress?: boolean,
   eventSource?: string
}) => boolean | void;

```

# **Parameters**

The callback of the **update-task** action can take an object with the following parameters:

- `id` - (required) the task ID
- `task` - (required) the [tasks](https://docs.svar.dev/react/gantt/api/properties/tasks) object
- `diff` - (optional) the number of units for the **start** or/and **end** date values to be changed (in the [`tasks`](https://docs.svar.dev/react/gantt/api/properties/tasks) object)
- `inProgress` - (optional) if **true**, marks that the task update is in progress
- `eventSource` - (optional) the name of an action that triggered the update

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

The example below shows how to clear the task text when opening the Editor dialog for it.

```jsx
import { useRef }from "react";
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction Example() {
const apiRef = useRef(null);

function clearTaskText() {
if (apiRef.current) {
      apiRef.current.exec("update-task", { id: 3, task: { text: "" } });
    }
  }

return (
    <div>
      <button onClick={clearTaskText}>Clear task text</button>
      <Gantt tasks={data.tasks} ref={apiRef} />
    </div>
  );
}

```

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)