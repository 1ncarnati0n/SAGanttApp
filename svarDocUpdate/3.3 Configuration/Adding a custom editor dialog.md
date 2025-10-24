# Adding a custom editor dialog

For the instructions about applying a default editor component, refer to [Configuring the task editor](https://docs.svar.dev/react/gantt/guides/configuration/configure_editor).

To add your custom editor, you should:

- Import the custom **Form** component for adding/editing tasks
- Use the `api.intercept`(/api/methods/intercept) method to disable opening the default editor by blocking the [`show-editor`](https://docs.svar.dev/react/gantt/api/actions/show-editor) action (return **false**)
- Add the **Form** tag, define tasks and taskTypes, and add the action handler function that triggers the [`update-task`](https://docs.svar.dev/react/gantt/api/actions/update-task) or [`delete-task`](https://docs.svar.dev/react/gantt/api/actions/delete-task) action.

```jsx
import { useState, useRef }from "react";
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";
import { Form }from "../custom/Form.jsx";

exportdefaultfunction CustomEditorExample() {
const data = getData();
const taskTypes = [
    { id: "task", label: "Task" },
    { id: "milestone", label: "Milestone" },
    { id: "summary", label: "Project" },
  ];

// current selected task shown in custom Form
const [task, setTask] = useState(null);

// refs to hold api and store objects provided by Gantt
const apiRef = useRef(null);
const storeRef = useRef(null);

// init is passed to <Gantt /> and is called with the api instance
function init(api) {
    apiRef.current = api;
    storeRef.current = api.getState().tasks;

// intercept "show-editor" action to prevent default editor from opening
// and show our custom Form instead
    api.intercept("show-editor", (data) => {
      setTask(storeRef.current.byId(data.id));
return false;// block default editor
    });
  }

// handler for actions emitted by the custom Form component
function formAction(ev) {
const { action, data } = ev;

switch (action) {
case "close-form":
        setTask(null);
break;

default:
// forward the action to the Gantt API (e.g. "update-task", "delete-task")
        apiRef.current?.exec(action, data);
break;
    }
  }

return (
    <>
      <Gantt
        tasks={data.tasks}
        links={data.links}
        scales={data.scales}
        init={init}
      />

      {task && (
        <Form task={task} taskTypes={taskTypes} onAction={formAction} />
      )}
    </>
  );
}

```