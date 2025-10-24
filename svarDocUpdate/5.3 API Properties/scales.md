# scales

# **Description**

Optional. Defines the timescale of Gantt

An array of objects containing the timescales data

# **Usage**

```jsx
scales?: {
  unit: string,
  step: number,
  format?: (date: Date, next?: Date) => string | string,
  css?: (date: Date) => string
}[];

```

# **Parameters**

- `unit` - (required) scale unit ("minute" |"hour" | "day" | "week" | "month" | "quarter" | "year") or a custom one
- `step` - (required) number of units per cell
- `format` - (optional) defines the format for each scale unit; it can be defined as a string of the format supported by [date-fns](https://date-fns.org/v2.29.3/docs/format) and as a function for custom formatting. The function receives two parameters: the unit start and end dates. It should return the string with the formatted date.
- `css` - (optional) css class for scales; it can be a string with the css class name or function; as a function it receives the date and should return the string with the css class name

# **Example**

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction App({ skinSettings }) {
const data = getData();

const dayStyle = a => {
const day = a.getDay() === 5 || a.getDay() === 6;
return day ? "sday" : "";
  };

const complexScales = [
    { unit: "year", step: 1, format: "yyyy" },
    { unit: "month", step: 2, format: "MMMM yyy" },
    { unit: "week", step: 1, format: "w" },
    { unit: "day", step: 1, format: "d", css: dayStyle },
  ];

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

---

**Related articles**:

- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)
- [Configuring timescale](https://docs.svar.dev/react/gantt/guides/configuration/configure_scales)