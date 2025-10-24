# api.getState()

# **Description**

Gets the state object that stores current values of most Gantt properties

You can apply the method to get the state of tasks, links, columns, scales, etc. See the parameters of the returned object below.

# **Usage**

```jsx
api.getState(): object;

```

# **Returns**

The method returns an object with the following parameters:

```jsx
{
   tasks,
   links,
   start,
   columns,
   end,
   lengthUnit,
   cellWidth,
   cellHeight,
   scaleHeight,
   scales,
   taskTypes,
   zoom,
   selected,
}

```

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
function init(api) {
const { tasks, links } = api.getState();
    console.log(tasks);// output the state of tasks
    console.log(links);// output the state of links
  }

return <Gantt tasks={data.tasks} links={data.links} init={init} />;
}

```

---

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)