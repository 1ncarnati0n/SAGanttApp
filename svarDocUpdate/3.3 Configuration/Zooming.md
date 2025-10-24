# Zooming

# **Enabling default zoom settings**

To enable default zooming, set the [`zoom`](https://docs.svar.dev/react/gantt/api/properties/zoom) property to **true**.

Example:

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction App() {
const data = getData();

return <Gantt zoom={true} tasks={data.tasks} />;
}

```

# **Configuring zoom settings**

To configure zoom settings, change the required parameters of the [`zoom`](https://docs.svar.dev/react/gantt/api/properties/zoom) property.

Example:

`*import* { getData } *from* "./common/data";*import* { Gantt } *from* "@svar-ui/react-gantt";*export* *default* *function* App() {  *const* data = getData();  *const* dayStyle = (a) => {    *const* day = a.getDay() === 5 || a.getDay() === 6;    *return* day ? "sday" : "";  };  *function* hoursTemplate(a, b) {    *return* `${format(a, "HH:mm")} - ${format(b, "HH:mm")}`;  }  *const* zoomConfig = {    level: 3,    levels: [      {        minCellWidth: 200,        maxCellWidth: 400,        scales: [{ unit: "year", step: 1, format: "yyyy" }],      },      {        minCellWidth: 150,        maxCellWidth: 400,        scales: [          { unit: "year", step: 1, format: "yyyy" },          { unit: "quarter", step: 1, format: "QQQQ" },        ],      },      {        minCellWidth: 250,        maxCellWidth: 350,        scales: [          { unit: "quarter", step: 1, format: "QQQQ" },          { unit: "month", step: 1, format: "MMMM yyy" },        ],      },      {        minCellWidth: 100,        scales: [          { unit: "month", step: 1, format: "MMMM yyy" },          { unit: "week", step: 1, format: "'week' w" },        ],      },      {        maxCellWidth: 200,        scales: [          { unit: "month", step: 1, format: "MMMM yyy" },          { unit: "day", step: 1, format: "d", css: dayStyle },        ],      },      {        minCellWidth: 25,        maxCellWidth: 100,        scales: [          { unit: "day", step: 1, format: "MMM d", css: dayStyle },          { unit: "hour", step: 6, format: hoursTemplate },        ],      },      {        maxCellWidth: 120,        scales: [          { unit: "day", step: 1, format: "MMM d", css: dayStyle },          { unit: "hour", step: 1, format: "HH:mm" },        ],      },    ],  };  *return* <Gantt tasks={data.tasks} links={data.links} zoom={zoomConfig} />;}`