# api.detach()

# **Description**

Allows removing/detaching action handlers

# **Usage**

```jsx
api.detach(tag: number | string ):void;

```

# **Parameters**

- `tag` - the name of the action tag

# **Example**

In the example below we add an object with the **tag** property to the [`api.on()`](https://docs.svar.dev/react/gantt/api/methods/on) handler, and then we use the `api.detach()` method to stop logging the `open-task` action.

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function App() {
function init(api) {
    api.on(
      "open-task",
      ({ id }) => {
        console.log("Opened: " + id);
      },
      { tag: "track" }
    );
  }

function stop() {
    api.detach("track");
  }

return (
    <div>
      <button onClick={stop}>Stop logging</button>
      <Gantt tasks={data.tasks} links={data.links} init={init} />
    </div>
  );
}

```

---