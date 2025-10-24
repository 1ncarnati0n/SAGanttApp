# Configuring chart sizes

How to configure scales, see [Configuring scales](https://docs.svar.dev/react/gantt/guides/configuration/configure_scales)

# **Setting the cell width and height**

To set the cell width, use the [`cellWidth`](https://docs.svar.dev/react/gantt/api/properties/cellwidth) property. The default value is 100.

```jsx
import { useState }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction CellWidthExample() {
const data = getData();
const [cellWidth, setCellWidth] = useState(150);

return (
    <Gantt tasks={data.tasks} scales={data.scales} cellWidth={cellWidth} />
  );
}

```

To set the cell height, use the [`cellHeight`](https://docs.svar.dev/react/gantt/api/properties/cellheight) property. The default value is 38.

```jsx
import { useState }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction CellHeightExample() {
const data = getData();
const [cellHeight, setCellHeight] = useState(38);

return (
    <Gantt tasks={data.tasks} scales={data.scales} cellHeight={cellHeight} />
  );
}

```

# **Setting the task length unit**

You can use the [`lengthUnit`](https://docs.svar.dev/react/gantt/api/properties/lengthunit) property to set the minimal unit of task length displayed in a chart, which is *day* by default. The **lengthUnit** should be equal to or smaller than the scales unit. Possible `lengthUnit` values: hour, day, week, month, quarter.

Example:

```jsx
import { useState }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction LengthUnitExample() {
const data = getData();
const [lengthUnit, setLengthUnit] = useState("hour");

return (
    <Gantt tasks={data.tasks} lengthUnit={lengthUnit} />
  );
}

```