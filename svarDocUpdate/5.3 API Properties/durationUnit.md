# durationUnit

# **Description**

Optional. Defines duration unit for tasks

# **Usage**

```jsx
durationUnit:"hour" | "day";

```

# **Parameters**

- `hour` - sets the task duration to the hour unit, which allows users to select date and time
- `day` (default) - the task duration will be measured in days

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

<Gantt tasks={data.tasks} durationUnit="hour" />

```

**info**

`durationUnit` change requires data reload. When dynamically changing the `durationUnit` (e.g., from "hour" to "day"), users must also recalculate and reload task data (start, end, and duration) to ensure correct rendering.

Example:

```jsx
import { useState, useRef, useMemo }from "react";
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";
import { RadioButtonGroup }from "@svar-ui/react-core";

exportdefaultfunction DurationUnitExample() {
const { tasks: initialTasks, links: initialLinks } = useMemo(() => getData(), []);

const [tasks, setTasks] = useState(initialTasks);
const [links] = useState(initialLinks);
const [durationUnit, setDurationUnit] = useState("hour");
const apiRef = useRef();

const options = [
    { id: "hour", label: "Hour" },
    { id: "day", label: "Day" },
  ];

function handleUnitChange(v) {
// v is expected to carry the new value as v.value
const value = v.value;

// here we use api.serialize() to get serialized tasks
const sTasks = apiRef.current.serialize().map((task) => {
// and then we recalculate task duration
if (task.start && task.end) {
const ms = 1000 * 60 * 60 * (value === "day" ? 24 : 1);
const duration = Math.floor((task.end - task.start) / ms);
return { ...task, duration };
      }
return task;
    });

    setTasks(sTasks);
    setDurationUnit(value);
  }

return (
    <div>
      <RadioButtonGroup
        options={options}
        value={durationUnit}
        type="inline"
        onChange={handleUnitChange}
      />
      <Gantt
        ref={apiRef}
        tasks={tasks}
        links={links}
        durationUnit={durationUnit}
      />
    </div>
  );
}

```