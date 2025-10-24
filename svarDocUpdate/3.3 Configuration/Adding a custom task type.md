# Adding a custom task type

# **Default types**

Task types can be added via the [`taskTypes`](https://docs.svar.dev/react/gantt/api/properties/tasktypes) property. Default types are the following:

- Task
- Milestone
- Summary task

The description of each type you can find here: [Task types](https://docs.svar.dev/react/gantt/guides/user-interface/#task-types).

# **Adding a custom type**

To add a new task type, add a new object to the [`taskTypes`](https://docs.svar.dev/react/gantt/api/properties/tasktypes) array:

Example:

```jsx
const taskTypes = [
    { id: "task", label: "Task" },
    { id: "summary", label: "Summary task" },
    { id: "milestone", label: "Milestone" },
    { id: "urgent", label: "Urgent" },
    { id: "narrow", label: "Narrow" },
    { id: "progress", label: "Progress" },
    { id: "round", label: "Rounded" },
];

```

You can also customize the look of a task type by adding CSS rules for each task type using its id.

Example:

```jsx
import { getData }from "../data";
import { Gantt }from "@svar-ui/react-gantt";

exportdefaultfunction Demo() {
const { links, scales, columns } = getData();

const tasks = [
    {
      id: 1,
      start:new Date(2024, 3, 2),
      end:new Date(2024, 3, 17),
      text: "Project planning",
      progress: 30,
      parent: 0,
      type: "summary",
      open: true,
      details: "Outline the project's scope and resources.",
    },
    {
      id: 10,
      start:new Date(2024, 3, 2),
      end:new Date(2024, 3, 5),
      text: "Marketing analysis",
      progress: 100,
      parent: 1,
      type: "task",
      details: "Analyze market trends and competitors.",
    },
    {
      id: 11,
      start:new Date(2024, 3, 5),
      end:new Date(2024, 3, 7),
      text: "Discussions",
      progress: 100,
      parent: 1,
      type: "task",
      details: "Team discussions on project strategies.",
    },
    {
      id: 110,
      start:new Date(2024, 3, 6),
      end:new Date(2024, 3, 9),
      text: "Initial design",
      progress: 60,
      parent: 11,
      type: "urgent",
      details: "Draft initial design concepts.",
    },
    {
      id: 111,
      start:new Date(2024, 3, 9),
      text: "Presentation",
      progress: 0,
      parent: 11,
      type: "milestone",
      details: "Present initial designs to stakeholders.",
    },
    {
      id: 112,
      start:new Date(2024, 3, 7),
      end:new Date(2024, 3, 12),
      text: "Prototyping",
      progress: 10,
      parent: 11,
      type: "narrow",
    },
    {
      id: 113,
      start:new Date(2024, 3, 8),
      end:new Date(2024, 3, 17),
      text: "User testing",
      progress: 0,
      parent: 11,
      type: "progress",
    },
  ];

const taskTypes = [
    { id: "task", label: "Task" },
    { id: "summary", label: "Summary task" },
    { id: "milestone", label: "Milestone" },
    { id: "urgent", label: "Urgent" },
    { id: "narrow", label: "Narrow" },
    { id: "progress", label: "Progress" },
  ];

return (
    <div className="demo">
      <Gantt links={links} scales={scales} columns={columns} tasks={tasks} taskTypes={taskTypes} />
    </div>
  );
}

```

CSS (place in a CSS/SCSS file imported by your component):

```css
.demo {
  overflow: hidden;
  height: 100%;
}

/* style rules for the "narrow" type */
.demo .wx-gantt .wx-bar.wx-task.narrow {
  background-color: #676a81;
  color: transparent;
  height: 10px !important;
  margin-top: 10px;
  border: 1px solid #63667a;
}
.demo .wx-gantt .wx-bar.wx-task.narrow .wx-progress-percent {
  background-color: #1a2630;
}
.demo .wx-gantt .wx-bar.wx-task.narrow .wx-link {
  background-color: #384047;
  border-radius: 0px;
}
.demo .wx-gantt .wx-bar.wx-task.narrow .wx-link .wx-inner {
  border-radius: 0px;
}

.demo .wx-gantt .wx-progress-percent {
  background-color: #ffc107;
}

/* style rules for the "progress" type */
.demo .wx-gantt .wx-bar.wx-task.progress {
  background-color: transparent;
  color: var(--wx-color-font);
  border-radius: 50px;
  border: 1px solid #00bcd4;
}
.demo .wx-gantt .wx-bar.wx-task.progress .wx-progress-percent {
  background-color: #00bcd4;
}
.demo .wx-gantt .wx-bar.wx-task.progress .wx-progress-wrapper {
  border-radius: 50px;
}

/* style rules for the "urgent" type */
.demo .wx-gantt .wx-bar.wx-task.urgent {
  background-color: #f49a82;
  border: 1px solid #f45e36;
}
.demo .wx-gantt .wx-bar.wx-task.urgent .wx-progress-percent {
  background-color: #f45e36;
}

```