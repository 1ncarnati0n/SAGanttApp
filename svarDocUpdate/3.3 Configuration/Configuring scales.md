# Configuring scales

# **Adding scales and changing main properties**

You can specify any number of scales by setting the scale objects in the scales array. To configure scales, change the [`scales`](https://docs.svar.dev/react/gantt/api/properties/scales) parameters values.

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

const scales = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" },
];

exportdefaultfunction Example() {
return <Gantt tasks={data.tasks} scales={scales} />;
}

```

# **Setting the start and end dates of the timescale**

You can set the date range by using the [`start`](https://docs.svar.dev/react/gantt/api/properties/start) and [`end`](https://docs.svar.dev/react/gantt/api/properties/end) properties during initialization:

```jsx
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();
const start =new Date(2022, 2, 5);
const end =new Date(2023, 3, 1);

exportdefaultfunction Example() {
return <Gantt tasks={data.tasks} start={start} end={end} />;
}

```

**info**

If the date range is not set, Gantt uses the dates of the loaded tasks and adds offsets before the first and after the last task in the scale. The offset is equal to one minimal unit of the current scale. The timescale changes dynamically when the tasks' dates are changed. But if the `start` and `end` values are set, the date range is fixed.

# **Styling cells**

To style the cells of the time scale, use the **css** attribute in the corresponding scale object.

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

const dayStyle = (a) => {
const day = a.getDay() === 5 || a.getDay() === 6;
return day ? "sday" : "";
};

const complexScales = [
  { unit: "year", step: 1, format: "yyyy" },
  { unit: "month", step: 2, format: "MMMM yyy" },
  { unit: "week", step: 1, format: "w" },
  { unit: "day", step: 1, format: "d", css: dayStyle },
];

const skinSettings = {};// replace with your skin settings if any

exportdefaultfunction Example() {
return (
    <Gantt
      {...skinSettings}
      tasks={data.tasks}
      links={data.links}
      scales={complexScales}
      start={new Date(2020, 2, 1)}
      end={new Date(2020, 3, 12)}
      cellWidth={60}
    />
  );
}

```

# **Configuring the scale height**

To configure the height of scales, apply the [`scaleHeight`](https://docs.svar.dev/react/gantt/api/properties/scaleheight) property and change its value in pixels:

```jsx
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();
const scaleHeight = 50;

exportdefaultfunction Example() {
return <Gantt tasks={data.tasks} scaleHeight={scaleHeight} />;
}

```

# **Setting autoScale**

[`autoScale`](https://docs.svar.dev/react/gantt/api/properties/autoscale) allows adjusting the timescale dynamically based on the provided [`start`](https://docs.svar.dev/react/gantt/api/properties/start) or/and [`end`](https://docs.svar.dev/react/gantt/api/properties/end) values.

If you provide the start and/or end values and set the `autoScale` to true, the values will be used to define initial visible timescale range and the scale will change dynamically during interaction (for example, it will expand when tasks are added via drag and drop).

In case the start and/or end values are set and the `autoScale` is set to false, the timescale is fixed and unchanged. If the `start` or/and `end` are not provided, the scale defaults to a range from the current date plus one month.

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

exportdefaultfunction Example() {
return (
    <Gantt
      tasks={data.tasks}
      start={new Date(2023, 2, 1)}
      end={new Date(2024, 3, 12)}
      autoScale={true}
    />
  );
}

```

# **Adding a custom scale unit**

You can set your custom scale unit by applying the [`registerScaleUnit`](https://docs.svar.dev/react/gantt/helpers/registerscaleunit) helper.

Example of custom halfYear unit:

```jsx
import { Gantt, registerScaleUnit }from "@svar-ui/react-gantt";
import {
  getYear,
  addMonths,
  startOfMonth,
  endOfMonth,
}from "date-fns";

// Get the start date of the half-year
const halfYearStart = (date) => {
const d =new Date(date);
const month = d.getMonth();
const startMonth = month < 6 ? 0 : 6;// January or July
  d.setMonth(startMonth);
return startOfMonth(d);
};

// Get the end date of the half-year
const halfYearEnd = (date) => {
const d =new Date(date);
const month = d.getMonth();
const endMonth = month < 6 ? 5 : 11;// June or December
  d.setMonth(endMonth);
return endOfMonth(d);
};

// Add N half-years to a date
const addHalfYears = (date, amount) => {
const start = halfYearStart(date);
return addMonths(start, amount * 6);
};

// Check if two dates are in the same half-year
const isSameHalfYear = (a, b) => {
const sa = halfYearStart(a);
const sb = halfYearStart(b);
return getYear(sa) === getYear(sb) && sa.getMonth() === sb.getMonth();
};

// Register the custom "halfYear" unit
registerScaleUnit("halfYear", {
  start: halfYearStart,
  end: halfYearEnd,
  isSame: isSameHalfYear,
  add: addHalfYears,
});

// Define the scale using the new unit
const scale = [
  { unit: "year", step: 1, format: "yyyy" },
  {
    unit: "halfYear",
    step: 1,
    format: (d) => (d.getMonth() < 6 ? "H1" : "H2"),
  },
  { unit: "month", step: 1, format: "MMM" },
];

exportdefaultfunction Example() {
return <Gantt scales={scale} />;
}

```