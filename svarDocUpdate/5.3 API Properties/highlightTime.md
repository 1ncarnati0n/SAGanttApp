# highlightTime

# **Description**

Optional. Highlights specific time areas in the chart

# **Usage**

```jsx
highlightTime?: (date: Date, unit: "day" | "hour") => string;

```

# **Parameters**

The function takes date and unit ("day" | "hour") as input parameters and it can return a custom css class to highlight units on the scale. A unit can be ""day"" or ""hour". If min.unit is day, the function will be called for each day. If min.unit is hour, then the function will be called for each hour. The function can also return the built-in "wx-weekend" class or custom one.

# **Example**

The example below shows how to highlight days off:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

const scales = [
    { unit: "year", step: 1, format: "yyyy" },
    { unit: "month", step: 2, format: "MMMM yyy" },
    { unit: "week", step: 1, format: "wo" },
    { unit: "day", step: 1, format: "d, EEEE" },
    { unit: "hour", step: 1, format: "HH:mm" },
];

function isDayOff(date) {
const d = date.getDay();
return d === 0 || d === 6;
}
function isHourOff(date) {
const h = date.getHours();
return h < 8 || h === 12 || h > 17;
}
function highlightTime(d, u) {
if (u === "day" && isDayOff(d))return "wx-weekend";
if (u === "hour" && (isDayOff(d) || isHourOff(d)))return "wx-weekend";
return "";
}

exportdefaultfunction App() {
return (
        <Gantt
            tasks={data.tasks}
            links={data.links}
            scales={scales}
            cellWidth={40}
            highlightTime={highlightTime}
        />
    );
}

```

[**Previous**](https://docs.svar.dev/react/gantt/api/properties/end)