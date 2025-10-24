# api.setNext()

# **Description**

Allows adding some action into the Event Bus order

# **Usage**

```jsx
api.setNext(next: any):void;

```

# **Parameters**

- `next` - (required) the action to be included into the **Event Bus** order

# **Example**

You need to include **RestDataProvider** into the **Event Bus** order to perform operations with tasks and send the corresponding requests to the server.

Example:

```jsx
import { useState, useEffect }from "react";
import { Gantt }from "@svar-ui/react-gantt";
import { RestDataProvider }from "@svar-ui/gantt-data-provider";
import { getData }from "./common/data";

const url = "https://some_backend_url";
const server =new RestDataProvider(url);

exportconst App = () => {
const [tasks, setTasks] = useState([]);
const [links, setLinks] = useState([]);

  useEffect(() => {
    server.getData().then(data => {
      setTasks(data.tasks);
      setLinks(data.links);
    });
  }, []);

const init = (api) => {
    api.setNext(server);
  };

return (
    <Gantt
      tasks={tasks}
      links={links}
      init={init}
    />
  );
};

```

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)