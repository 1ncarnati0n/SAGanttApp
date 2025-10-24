# taskTemplate

# **Description**

Optional. Defines your own template for tasks bars

# **Usage**

```jsx
taskTemplate?: Component<{
    data: ITask;
    api: IApi;
    onaction: (ev: {
        action: string;
        data: { [key: string]: any };
    }) =>void;
}>;

```

`ITask` is the [tasks](https://docs.svar.dev/react/gantt/api/properties/tasks) object.

# **Parameters**

- `taskTemplate` - the React component to be applied as a template to the content of the task bar. The component will receive the following props:
- `data` - (required) the [tasks](https://docs.svar.dev/react/gantt/api/properties/tasks) object
- `api` - (required) the API gateway object for interacting with the Gantt API
- `onaction` - (required) callback prop for handling custom actions triggered inside the task template:
    - `action` - (required) string representing the action name
    - `data` - (required) object with additional data related to the action

Below is an example of a React component that calls the provided onaction prop to send the `custom-click` action to the Gantt container.

```jsx
// MyTaskContent.jsx
exportdefaultfunction MyTaskContent({ data, api, onaction }) {
function doClick(ev) {
// stop propagation so parent task selection/dragging is not triggered
        ev.stopPropagation();

        onaction?.({
            action: "custom-click",
            data: {
                clicked: !data.clicked,
                id: data.id,
            },
        });
    }

if (data.type !== "milestone") {
return (
            <div className="task-content">
                <div className="wx-text-out text-right">{data.text || ""}</div>
                <button onClick={doClick}>
                    {data.clicked ? "Was clicked" : "Click Me"}
                </button>
            </div>
        );
    }else {
return (
            <div className="task-content">
                <div className="wx-text-out text-left">{data.text || ""}</div>
            </div>
        );
    }
}

```

CSS (optional; can be included in your stylesheet):

```css
.task-content button {
    font-size: 10px;
    position: relative;
    z-index: 2;
/* use your project's variable or font settings */
    font: var(--wx-gantt-bar-font);
    padding: 0 2px;
}

.text-right {
    left: 100%;
    top: -2px;
}

.text-left {
    right: 100%;
    top: -2px;
}

.text-right,
.text-left,
.task-content button {
    padding: 0 2px;
    font-size: 12px;
}

```

In the next example we import the component above and listen to the `custom-click` action that the template triggers. The Gantt React component exposes a prop event for that action (camel-cased to follow React conventions) which you can handle to call the Gantt API. We use a ref to obtain the Gantt API instance.

`*import* { getData } *from* "../data";*import* { Gantt } *from* "@svar-ui/react-gantt";*import* MyTaskContent *from* "../custom/MyTaskContent.jsx";*import* { useRef } *from* "react";*const* data = getData();*export* *default* *function* App() {    *const* apiRef = useRef();    *function* doClick(ev) {        *// ev is the payload sent from the task template via onaction*        apiRef.current?.exec("update-task", {            id: ev.id,            task: {                clicked: ev.clicked,            },        });    }    *return* (        <Gantt            onCustomClick={doClick}            taskTemplate={MyTaskContent}            tasks={data.tasks}            links={data.links}            scales={data.scales}            ref={apiRef}        />    );}`