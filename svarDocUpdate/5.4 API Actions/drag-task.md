# drag-task

# **Description**

Fires when dragging a task

# **Usage**

```jsx
"drag-task": ({
   id: string | number,
   width?: number,
   left?: number,
   top?: number,
   inProgress?: boolean
}) => boolean|void;

```

# **Parameters**

The callback of the **drag-task** action takes an object with the following parameters:

- `id` - (required) an ID of the task that is dragged
- `width` - (optional) specifies the value (in pixels) by which the task width has changed during dragging
- `left` - (optional) specifies the number of pixels the task was dragged to the left
- `top` - (optional) specifies the number of pixels the task was dragged to the top
- `inProgress` - (optional) **true** marks that the process of moving a task is still in progress (a task is being dragged by user); **false** specified that a user has released a mouse after after dragging a task.

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api) {
  api.on("drag-task", ev => {
    console.log("The id of the dragged task:", ev.id);
  });
}

exportdefaultfunction App() {
return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      init={init}
    />
  );
}

```

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)