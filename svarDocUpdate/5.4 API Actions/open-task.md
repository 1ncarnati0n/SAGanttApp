# open-task

# **Description**

Fires when expanding a branch of tasks

# **Usage**

```jsx
"open-task": ({
  id: string | number,
  mode: boolean
}) => boolean|void;

```

# **Parameters**

The callback of the action takes an object with the following parameters:

- `id` - (required) the ID of a task
- `mode` - (required) defines whether a branch of tasks is opened (**true**) or closed (**false**); it's closed by default

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function App() {
function init(api) {
    api.exec("open-task", {
      id: 3,
      mode: true,
    });
  }

return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      init={init}
    />
  );
}

exportdefault App;

```

---