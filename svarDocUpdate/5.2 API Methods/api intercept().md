# api.intercept()

# **Description**

Allows intercepting and blocking/modifying actions

# **Usage**

```jsx
api.intercept(
   action: string,
   callback:function
):void;

```

# **Parameters**

- `action` - (required) an action to be fired
- `callback` - (required) a callback to be performed (the callback arguments will depend on the action to be fired)

**info**

The full list of actions can be found [**here**](https://docs.svar.dev/react/gantt/api/overview/actions_overview). Use the [`api.on()`](https://docs.svar.dev/react/gantt/api/methods/on) method if you want to listen to the actions without modifying them. To make changes to the actions, apply the `api.intercept()` method.

# **Example**

In the example below we use `api.intercept()` to hide the default Editor by returning **false**.

```jsx
import { getData }from "./common/data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

function init(api) {
  api.intercept("show-editor", data => {
return false;
  });
}

<Gantt tasks={data.tasks} init={init} />

```

**Related articles:**

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)
- [How to access Gantt API](https://docs.svar.dev/react/gantt/api/how_to_access_api)