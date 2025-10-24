# select-task

# **Description**

Fires when selecting a task

# **Usage**

```jsx
"select-task": ({
   id: string | number,
   toggle?: boolean,
   range?: boolean,
   show?: "x" | "y" | "xy" | boolean
}) => boolean|void;

```

# **Parameters**

The callback of the **select-task** action can take an array where each object has the following parameters:

- `id` - (required) the ID of the selected task
- `toggle` - (optional) if set to **true**, enables the switching of the task state between selected and unselected. If one task is selected, in GUI holding `Ctrl` + left click unselects a task.
- `range` - (optional) if set to **true**, enables selecting the range of tasks starting from the first selected task to the specified task id. In GUI holding `Shift` + left click will select the range of tasks.
- `show` - (optional) defines whether to scroll to the selected task (**true** by default):
    - "x" - scroll horizontally
    - "y" - scroll vertically
    - "xy" - scroll both axes
    - true - scroll in both directions
    - false - do not scroll

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function App() {
const init = (api) => {
    api.on("select-task", ev => {
      console.log("The id of the selected task:", ev.id);
    });
  };

return (
    <Gantt
      tasks={data.tasks}
      init={init}
    />
  );
}

```