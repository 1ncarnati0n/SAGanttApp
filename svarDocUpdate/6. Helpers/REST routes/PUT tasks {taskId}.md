# PUT /tasks/{taskId}

# **Description**

Updates data for a task, copies or moves a task

The route handles the HTTP PUT request made to the `/tasks/{taskId}` path.

Depending on the payload, the route can handle different operations with tasks: update, copy, move.

# **Parameters**

The next parameter is sent in the request line:

- `taskId` (number) - (required) the id of a task that is updated/copied/moved

# **Payload**

Depending on the payload, the route can handle different operations with tasks: update, copy, move.

### **Payload for the update operation**

The server needs to receive a JSON object with all fields for a task (old and new/modified data). The description of the task object, see here: [`tasks`](https://docs.svar.dev/react/gantt/api/properties/tasks) property.

Example:

```json
{
   "id": 67,
   "text": "New Task",
   "start": "2024-06-10 00:00:00",
   "end": "2024-06-11 00:00:00",
   "duration": 1,
   "progress": 0,
   "parent": 0,
   "type": "task",
   "lazy": false,
   "details": " ",// the description field in the task editor
}

```

### **Payload for the move operation**

The server needs to receive a JSON object with the next parameters:

- `operation` (string) - (required) the operation name which should be "move"
- `target` (string | number) - (required) the id of a task before/after which to move the current task
- `mode` (string) - (required) defines where to move a task; possible values: "before" | "after" | "up" | "down" | "child"

Example:

```json
{
  "operation": "move",
  "target": 20,
  "mode": "after"// "before" | "after" | "up" | "down" | "child"
}

```

### **Payload for the copy operation**

The server needs to receive a JSON object with the next parameters:

- `operation` (string) - (required) the operation name which should be "copy"
- `target` (number) - (required) the id of a task before/after which to copy the current task
- `mode` (string) - (required) defines where to copy a task: "after" or "before" the `target`
- `lazy` (boolean) - (optional) the parameter indicates if it's necessary to copy nested tasks on the backend; if a task that is copied is marked as "lazy" (see the *lazy* parameter in the [`tasks`](https://docs.svar.dev/react/gantt/api/properties/tasks) property) and it has nested tasks that are not yet loaded from the backend, the value is set to **true**, which means that tasks should be copied on the backend; if there are nested tasks in the client data, the parameter is set to **false**, which means that tasks will be copied on the client by sending its "copy-task" actions

Example:

```json
{
  "operation": "copy",
  "target": 20,
  "mode": "after"// "before"
}

```

# **Response**

### **Response for the update operation**

A JSON object with the id of the updated task is returned.

Example:

```json
{
  "id":23
}

```

### **Response for the move operation**

The server returns a JSON object with the id of the moved task.

Example:

```json
{
  "id":34
}

```

### **Response for the copy operation**

The server returns a JSON object with the ID of a newly copied task

Example:

```json
{
  "id":67
}

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500). In case of a failure the error text is returned.

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)