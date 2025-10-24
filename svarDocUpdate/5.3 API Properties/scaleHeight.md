# scaleHeight

# **Description**

Optional. Defines the height of the header cell in pixels

# **Usage**

```jsx
scaleHeight?: number;

```

# **Parameters**

- `scaleHeight` - the height of the timescale in pixels; *36* is set by default

# **Example**

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction App() {
const data = getData();

return <Gantt tasks={data.tasks} scaleHeight={50} />;
}

```

---

**Related articles**:

- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)
- [Configuring timescale](https://docs.svar.dev/react/gantt/guides/configuration/configure_scales)