# delete-link

# **Description**

Fires when deleting a link

# **Usage**

```jsx
"delete-link": ({
   id:  string | number;
}) => boolean|void;

```

# **Parameters**

The callback of the **delete-link** action can take an object with the following parameters:

- `id` - (required) the ID of a link to be deleted

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api) {
  api.on("delete-link", ev => {
    console.log("The id of the deleted link:", ev.id);
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