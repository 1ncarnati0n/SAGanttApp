# scroll-chart

# **Description**

Fires when a chart is scrolled

# **Usage**

```jsx
"scroll-chart": ({
   left?: number,
   top?: number
}) => boolean |void;

```

# **Parameters**

The callback of the **scroll-chart** event can take an object with the following parameters:

- `left` - (optional) specifies the number of pixels the chart is scrolled to the left
- `top` - (optional) specifies the number of pixels the chart is scrolled to the top

**info**

For handling the events you can use the [Event Bus methods](https://docs.svar.dev/react/gantt/api/overview/methods_overview)

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api) {
  api.on("scroll-chart", ev => {
    console.log("The chart is scrolled");
  });
}

exportdefaultfunction App() {
return <Gantt tasks={data.tasks} init={init} />;
}

```

---