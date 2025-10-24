# readonly

# **Description**

Optional. Prevents making changes to the data in Gantt

# **Usage**

```jsx
readonly?: boolean;

```

# **Parameters**

readonly - (optional) if it's set to *true*, it enables the readonly mode of Gantt; if *false*, the mode is disabled (default)

# **Example**

```jsx
import { useState }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

exportconst ReadonlyExample = () => {
const { scales, tasks, links } = getData();

const [readonly, setReadonly] = useState(true);// readonly mode is enabled

return <Gantt tasks={tasks} scales={scales} links={links} readonly={readonly} />;
};

```