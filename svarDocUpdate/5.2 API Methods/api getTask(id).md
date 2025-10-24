# api.getTask(id)

# **Description**

Gets an object with the task configuration

# **Usage**

```jsx
api.getTask(id): ITask;

```

# **Parameters**

- `id` - the id of a task

# **Returns**

The method returns an object with the [tasks](https://docs.svar.dev/react/gantt/api/properties/tasks) parameters.

Example of the object that is returned:

```jsx
{
  id: 3,
  start: Thu Mar 05 2020 00:00:00 GMT+0300 (Moscow Standard Time),
  end: Sat Mar 07 2020 00:00:00 GMT+0300 (Moscow Standard Time),
  text: 'Task 3',
  progress: 6,
  type: "summary",
  duration: 2,
  parent: 0
}

```

# **Example**

The example shows how to output to console data on the task with "id:3".

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function App() {
function init(api) {
const task = api.getTask(3);
    console.log("Task:", task);
  }

return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      init={init}
    />
  );
}

exportdefault App;

```

---

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)