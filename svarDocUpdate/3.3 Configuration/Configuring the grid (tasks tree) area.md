# Configuring the grid (tasks tree) area

The grid with tasks tree can be used for quick navigation.

By default, the tasks tree area contains 4 columns:

- Task name
- Start date
- Duration
- '+' column. A special column with the '+' button which allows users to add tasks

# **Configuring columns**

Columns with default parameters are applied by default and you don't need to specify the columns objects.

Default columns array you can see here: [columns](https://docs.svar.dev/react/gantt/api/properties/columns#default-config).

# **Adding a column**

If you want to add a new column, add the columns object to the array and specify its **id** parameter in the **task** object. **id** is the mandatory parameter which defines the content of cells and the cell will take the value of the matching property from a task by default.

```jsx
import { Gantt }from "@svar-ui/react-gantt";

const columns = [
  { id: "holder", header: "Holder", width: 90, align: "center" },
//other columns
];

const tasks = [
  {
    id: 1,
    start:new Date(2022, 2, 4),
    end:new Date(2023, 2, 4),
    progress: 20,
    parent: 1,
    type: "task",
    holder: "Nick",
  },
//other tasks
];

<Gantt tasks={tasks} columns={columns} />

```

# **Configuring columns width**

To add columns with the fixed width, set the **width** value, the default value is *120*. To make the width of columns flexible, apply the **flexgrow** parameter of the [`columns`](https://docs.svar.dev/react/gantt/api/properties/columns) property. It specifies how much space (width) relative to the grid width the column will take (it will take no effect on columns with the set width); the property is specified as a number and if `flexgrow` is set to 1 in one column only, the column will take the full available width.

Example:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

const columns = [
  { id: "text", header: "Task name", flexgrow: 2 },
  {
    id: "start",
    header: "Start date",
    flexgrow: 1,
    align: "center",
  },
  {
    id: "duration",
    header: "Duration",
    align: "center",
    flexgrow: 1,
  },
  {
    id: "add-task",
    header: "",
    width: 50,
    align: "center",
  },
];

<Gantt
  tasks={data.tasks}
  links={data.links}
  scales={data.scales}
  columns={columns}
/>

```

# **Disabling the tasks reordering**

By default, a user can reorder tasks in the grid area with drag&drop. To disable the tasks ordering feature, you can apply the [`api.intercept()`](https://docs.svar.dev/react/gantt/api/methods/intercept) method to handle the [`drag-task`](https://docs.svar.dev/react/gantt/api/actions/drag-task) action.

Example (React):

```jsx
import { useEffect, useRef }from "react";
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

function MyGantt() {
const data = getData();
const api = useRef(null);

  useEffect(() => {
if (!api.current)return;
// intercept returns false to prevent the action
    api.current.intercept("drag-task", (ev) => {
if (typeof ev.top !== "undefined")return false;
    });
  }, []);

return <Gantt ref={api} columns={data.columns} tasks={data.tasks} />;
}

```

Another way to disable the feature is to switch to the [read-only](https://docs.svar.dev/react/gantt/guides/read_only_mode) mode.

# **Hiding the grid area**

To hide the area with tasks tree, set the [`columns`](https://docs.svar.dev/react/gantt/api/properties/columns) property to *false*:

```jsx
import { getData }from "./data";
import { Gantt }from "@svar-ui/react-gantt";

const data = getData();

<Gantt columns={false} tasks={data.tasks} />;

```

# **Adding a header menu**

You can add a header menu to columns in the grid area to dynamically hide and show them via the [HeaderMenu](https://docs.svar.dev/react/gantt/helpers/header_menu). To add a header menu, import HeaderMenu from "@svar-ui/react-gantt" and then place the Gantt element inside the HeaderMenu component. Pass the same `api` reference to both components.

```jsx
import { useRef }from "react";
import { Gantt, HeaderMenu }from "@svar-ui/react-gantt";

function Page({/* props */ }) {
const api = useRef(null);
// columns can be an object mapping column ids to boolean visibility
const columns = { start: true, duration: true };

return (
    <HeaderMenu api={api} columns={columns}>
      <Gantt ref={api} /* ...other props */ />
    </HeaderMenu>
  );
}

```

The description of HeaderMenu properties you can see [here](https://docs.svar.dev/react/gantt/helpers/header_menu).

The example below shows how to add a header menu to the grid columns and make possible to hide the "start" and "duration" columns:

```jsx
import { useRef }from "react";
import { getData }from "../data";
import { Gantt, HeaderMenu }from "@svar-ui/react-gantt";

function Page() {
const data = getData();
const columns = { start: true, duration: true };
const api = useRef(null);

return (
    <HeaderMenu api={api} columns={columns}>
      <Gantt
        ref={api}
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
      />
    </HeaderMenu>
  );
}

```

# **Adding custom HTML content to cells**

Gantt allows adding custom HTML to grid (tasks tree) cells.

# **Adding components**

Basically, what you need is four simple steps:

- create a component (using HTML or ready-made components from the [*@svar-ui/react-core*](https://docs.svar.dev/react/core/getting_started#step-1-install-library-dependencies) library)
- in the component, access Gantt grid properties via the function component props if needed
- import the configured component to the application page with Gantt
- add this component to the needed cell in Gantt grid

# **Accessing Gantt grid properties in components**

Components in grid cells receive the following props:

- `api` - [Grid API](https://docs.svar.dev/react/grid/api/overview/api_overview), using which you can call actions or listen to them
- `row` - task data object
- `column` - column data (its id, dimensions, etc.)

The example below demonstrates how to customize cells by adding images to them.

File: custom/AvatarCell.jsx

```jsx
import { useMemo }from "react";
import { users }from "../data/users";// adjust import to your data source

exportdefaultfunction AvatarCell({ row }) {
const url = "https://svar.dev/demos/grid/assets/avatars/";

const user = useMemo(
    () => users.find((u) => u.id === row.assigned),
    [row.assigned]
  );

const avatar = useMemo(
    () => (user ? `${url}${user.label.replace(" ", "_")}.png` : ""),
    [user]
  );

return (
    <div className="container">
      <div className="avatar">
        {avatar && (
          <div className="user-avatar">
            <img className="user-photo" alt="" src={avatar} />
          </div>
        )}
      </div>
      <div>{user?.label ?? ""}</div>
    </div>
  );
}

```

CSS (separate file or global stylesheet):

```css
.container {
  display: flex;
  align-items: center;
  padding: 0 4px;
}

.avatar {
  width: 40px;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dfe2e6;
  text-align: center;
}

.user-photo {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #dfe2e6;
}

```

Now you can import your component and apply it to a cell by adding its component reference to the `cell` property of a column:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";
import AvatarCellfrom "../custom/AvatarCell.jsx";

function Page({ skinSettings }) {
const data = getData();

const columns = [
    { id: "text", header: "Task name", width: 220 },
    { id: "assigned", header: "Assigned", width: 160, cell: AvatarCell },
    { id: "start", header: "Start Date", width: 100 },
  ];

return (
    <Gantt
      {...skinSettings}
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

```

# **Applying in-built inline editors**

To apply the inline editor to column cells, set the `editor` parameter of the [`columns`](https://docs.svar.dev/react/gantt/api/properties/columns) property to the required value ("text" | "combo" | "datepicker" | "richselect").

Example:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

function Page({ skinSettings }) {
const data = getData();

const columns = [
    {
      id: "text",
      header: "Task name",
      width: 170,
      sort: true,
      editor: "text",
    },
    {
      id: "start",
      header: "Start date",
      width: 120,
      align: "center",
      sort: true,
      editor: "datepicker",
    },
  ];

return (
    <Gantt
      {...skinSettings}
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

```

# **Customizing built-in editors**

You can apply a template and custom React component to the cell editor (except the "text" type editor). In this case, column `editor` should be an object with `type` and `config`. `config` allows to set a custom component in the `cell` property.

Please note that for the "combo" editor, the cell component will be applied to dropdown options only, while for "datepicker" to the input field.

First, you need to prepare a custom component file. Components used inside editor cells receive the `data` prop:

- `data` - inline editor's data (for example, for combo and richselect it's an item from options, for datepicker - date value)

Let's consider a custom component for values of inline editors in the "start" column. The component will show formatted date and a calendar icon.

File: custom/DateCell.jsx

```jsx
exportdefaultfunction DateCell({ data }) {
const options = { year: "numeric", month: "numeric", day: "numeric" };

if (!data)returnnull;

return (
    <div className="container">
      <span>{data.toLocaleString("en-US", options)}</span>
      <i className="icon wxi-calendar" />
    </div>
  );
}

```

CSS (separate file or global stylesheet):

```css
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: inline-flex;
  align-items: center;
  font-size: 20px;
  color: #b5b5b5;
}

```

Apply this component in the `cell` property of an inline editor config:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";
import DateCellfrom "../custom/DateCell.jsx";

function Page() {
const data = getData();

const columns = [
    { id: "text", header: "Task name", flexgrow: 1 },
    {
      id: "start",
      header: "Start date",
      width: 120,
      align: "center",
      editor: {
        type: "datepicker",
        config: {
          cell: DateCell,
        },
      },
    },
  ];

return (
    <Gantt
      tasks={data.tasks}
      links={data.links}
      scales={data.scales}
      columns={columns}
    />
  );
}

```

[**Previous**](https://docs.svar.dev/react/gantt/guides/configuration/configure_summary)