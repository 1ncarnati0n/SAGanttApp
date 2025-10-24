# sort-tasks

# **Description**

Fires when sorting tasks

# **Usage**

```jsx
"sort-tasks": ({
  key:string,
  order:"asc"|"desc",
  add?: boolean,
}) => boolean |void;

```

# **Parameters**

The callback of the **sort-tasks** action can take an object with the following parameters:

- `key` - (required) data field name
- `order` - (required) the sorting direction that can be "asc" or "desc"
- `add` - (optional) enables/disables multi-sorting when a new sorting rule is added to an existing sorting order

**info**

Sorting is enabled by default for all columns except "add-task" (unless overridden in the columns config).

# **Example**

The example below shows how to disable sorting for all columns except the one with id: "text", which remains sortable.

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction App() {
const data = getData();

const init = (api) => {
    api.intercept("sort-tasks", (config) => {
return config.key === "text";
    });
  };

return <Gantt tasks={data.tasks} links={data.links} init={init} />;
}

```

---

**Related articles**:

- [columns](https://docs.svar.dev/react/gantt/api/properties/columns)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)
- [Sort tasks via UI](https://docs.svar.dev/react/gantt/guides/user-interface/#sort-tasks)