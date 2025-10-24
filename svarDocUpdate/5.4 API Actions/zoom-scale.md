# zoom-scale

# **Description**

Fires when zooming a chart

# **Usage**

```jsx
"zoom-scale": ({
   dir: number,
   date: Date,
   offset?: number,
}) => boolean |void;

```

# **Parameters**

The callback of the **zoom-scale** action can take an object with the following parameters:

- `dir` - (required) direction of zooming: 1 (zoom in) or -1 (zoom out)
- `date` - (required) the date applied as the center of the zoomed area. The date format should be of the one supported by [date-fns](https://date-fns.org/)
- `offset` - (optional) the cursor location in the x-axis on a page in pixels

**info**

For handling the actions you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api) {
  api.on("zoom-scale", ev => {
    console.log("The chart was zoomed");
  });
}

exportdefaultfunction App() {
return <Gantt tasks={data.tasks} init={init} />;
}

```

---