# api.exec()

# **Description**

Allows triggering Gantt actions

# **Usage**

```jsx
api.exec(
   action: string,
   config: object
):void;

```

# **Parameters**

- `action` - (required) an action to be fired
- `config` - (required) the config object with parameters (see the action to be fired)

# **Actions**

**info**

The full list of the Gantt actions can be found [**here**](https://docs.svar.dev/react/gantt/api/overview/actions_overview)

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
    apiRef.current?.exec("update-task", { id: 3, task: { text: "" } });
  }

return (
    <Gantt tasks={data.tasks} onShowEditor={clearTaskText} ref={apiRef} />
  );
}

```

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)