# update-link

# **Description**

Fires when updating a link

# **Usage**

```jsx
"update-link": ({
  id:  string | number,
  link: Partial<ILink>
}) => boolean | void;

```

# **Parameters**

The callback of the **update-link** action can take an object with the following parameters:

- `id` - (required) the id of a link
- `link` - (required) the [links](https://docs.svar.dev/react/gantt/api/properties/links) object

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

In the example below we apply the [`api.exec`](https://docs.svar.dev/react/gantt/api/methods/exec) method to trigger the action with a button click:

```jsx
import { useRef }from "react";
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";
import { Button }from "@svar-ui/react-core";

exportconst Example = () => {
const data = getData();
const apiRef = useRef(null);

const updateLink = () => {
// access the Gantt API via ref
    apiRef.current.exec("update-link", {
      id: 1,
      link: { type: 3 }
    });
  };

return (
    <>
      <Button onClick={updateLink} type="primary">Update Link</Button>

      <Gantt
        tasks={data.tasks}
        links={data.links}
        ref={apiRef}
      />
    </>
  );
};

```

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)