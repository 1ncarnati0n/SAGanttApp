# add-task

# **Description**

Fires when adding a new task

# **Usage**

```jsx
"add-task": (ev: {
  id?: string | number,
  task: Partial<ITask>,
  target?: string | number,
  mode?: "before" | "after" | "child",
  show?: "x" | "y" | "xy" | boolean
}) => boolean | void;

```

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Parameters**

The callback of the **add-task** action can take an object with the following parameters:

- `id` - (optional) the id of a new task
- `target` - (required) the task ID before or after which a new task will be added
- `task` - (required) the task object. The list of parameters you can see here: [tasks](https://docs.svar.dev/react/gantt/api/properties/tasks).
- `mode` - (required) specifies where to place a task: **before** - before the task which id is specified, after it (**after**), or creates the child task for the target (**child**)
- `show` - (optional) determines whether and how to scroll to the new task after creation:
    - "x" - scroll horizontally
    - "y" - scroll vertically
    - "xy" - scroll both axes
    - true - scroll in both directions
    - false - do not scroll

# **Example**

Use the [`api.exec`](https://docs.svar.dev/react/gantt/api/methods/exec) method to trigger the action:

```jsx
import { useState }from "react";
import { getData }from "./common/data";
import { Gantt, Toolbar }from "@svar-ui/react-gantt";
import { Button }from "@svar-ui/react-core";

exportdefaultfunction App() {
const data = getData();
const [api, setApi] = useState(null);

function init(apiInstance) {
// store Gantt API instance
    setApi(apiInstance);
  }

function handleAdd() {
// trigger the add-task action
    api?.exec("add-task", { task: {} });
  }

return (
    <>
      <Toolbar>
        <Button type="primary" onClick={handleAdd}>Add task</Button>
      </Toolbar>

      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        columns={data.columns}
        init={init}
      />
    </>
  );
}

```

In the example below we use the [`api.intercept()`](https://docs.svar.dev/react/gantt/api/methods/intercept) method to change the **task** variable value replacing it with the relevant data from the **add-task** action:

```jsx
import { useState }from "react";
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction App() {
const data = getData();
const [task, setTask] = useState(null);

function init(api) {
    api.intercept("add-task", data => {
      setTask(data.task);
    });
  }

return (
    <Gantt
      tasks={data.tasks}
      init={init}
    />
  );
}

```

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)