# expand-scale

# **Description**

Fires when the scale does not fill all free space in the chart and it's required to expand scale boundaries

# **Usage**

```jsx
"expand-scale": ({
  minWidth: number,
  date?: Date,
  offset?: number,
}) => boolean|void;

```

# **Parameters**

The callback of the action takes an object with the following parameters:

- `minWidth` - (required) the minimum width of the scale in pixels
- `date` - (optional) the date applied as the center of the zoomed area. The date format should be of the one supported by [date-fns](https://date-fns.org/)
- `offset` - (optional) the cursor location in the x-axis on a page in pixels

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

If the scale is less than than the viewport, the example below will output the minWidth value.

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction App() {
const init = (api) => {
    api.on("expand-scale", (ev) => {
      console.log("Current scale minWidth", ev.minWidth);
    });
  };

return (
    <Gantt tasks={data.tasks} links={data.links} scales={data.scales} init={init} />
  );
}

```

---

**Related articles**: [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)