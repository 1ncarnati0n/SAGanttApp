# indent-task

# **Description**

Fires when indenting a task

# **Usage**

```jsx
"indent-task": ({
   id: string | number,
   mode: boolean
}) => boolean|void;

```

# **Parameters**

The callback of the **indent-task** action can take an object with the following parameters:

- `id` - (required) the ID of the indented task
- `mode` - (boolean) if **true**, a task becomes a child of the task above

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

const init = (api) => {
  api.exec("indent-task", {
    id: 3,
    mode: true,
  });
};

<Gantt init={init} tasks={data.tasks} />

```