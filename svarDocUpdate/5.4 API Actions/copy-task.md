# copy-task

# **Description**

Fires when copying a task

# **Usage**

```jsx
"copy-task": ({
   id: string | number,
   target?: string | number,
   eventSource?: string,
   mode?: "before" | "after" | "child",
   source?: string | number,
   lazy?: boolean
}) => boolean|void;

```

# **Parameters**

The callback of the **copy-task** action can take an object with the following parameters:

- `id` - (required) the ID of a newly copied task
- `target` - (optional) the task ID before or after which a new task will be copied to
- `source` - (optional) the ID of a task that is copied
- `eventSource` - (optional) the name of an action that triggered the "copy-task" action
- `mode` - (optional) specifies where to place a task: **before** - before the task which id is specified or after it (**after**)
- `lazy` - (optional) the parameter indicates if it's necessary to copy nested tasks on the backend; if a task that is copied is marked as "lazy" (see the *lazy* parameter in the [`tasks`](https://docs.svar.dev/react/gantt/api/properties/tasks) property) and it has nested tasks that are not yet loaded from the backend, the value is set to **true**, which means that tasks should be copied on the backend; if there are nested tasks in the client data, the parameter is set to **false**, which means that tasks will be copied on the client by sending its "copy-task" actions

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api){
  api.on("copy-task", ev => {
    console.log("The id of the copied task:", ev.id);
  });
}

exportdefaultfunction App() {
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