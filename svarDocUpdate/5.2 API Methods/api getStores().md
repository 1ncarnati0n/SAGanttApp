# api.getStores()

# **Description**

Gets an object with the DataStore properties of Gantt

# **Usage**

```jsx
api.getStores(): object;

```

# **Returns**

The method returns an object with the DataStore parameters:

```jsx
{
  data: DataStore// ( object of parameters )
}

```

# **Example**

The example below shows how to output DataStore to the console:

```jsx
import { Gantt }from "@svar-ui/react-gantt";
import { getData }from "./common/data";

exportdefaultfunction Example() {
const data = getData();

function init(api) {
const stores = api.getStores();
    console.log("DataStore:", stores);
  }

return <Gantt init={init} tasks={data.tasks} links={data.links} />;
}

```

---

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)