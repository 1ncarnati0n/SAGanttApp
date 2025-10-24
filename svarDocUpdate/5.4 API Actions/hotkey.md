# hotkey

# **Description**

Fires when applying a hotkey

# **Usage**

```jsx
hotkey:({
   key: string,
   event: object,
   eventSource?: string
}) =>void;

```

# **Parameters**

The callback of the action takes an object with the following parameters:

- `key` - (required) a hotkey name, for the combination of hotkeys use "+", e.g. "shift+arrowup"
- `event` - (required) keyboard event
- `eventSource` - (optional) the source of the event call: it can be "grid" or "chart"; it`s required for "arrowup"/"arrowdown"

# **Example**

```jsx
import { Gantt }from "@svar-ui/react-gantt";
import { getData }from "./common/data";

const data = getData();

const init = (api) => {
  api.on("hotkey", (ev) => console.log(ev.key));
};

exportdefaultfunction App() {
return <Gantt init={init} tasks={data.tasks} />;
}

```

---

**Related articles**:

- [Navigation keys](https://docs.svar.dev/react/gantt/guides/user-interface/#hotkeys)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)
- [api.on()](https://docs.svar.dev/react/gantt/api/methods/on)