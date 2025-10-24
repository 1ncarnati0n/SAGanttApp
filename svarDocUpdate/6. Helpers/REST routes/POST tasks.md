# POST /tasks

# **Description**

Creates a new task

The route handles the HTTP POST request made to the `/tasks` path.

# **Payload**

The server needs to receive a JSON object with data for the new task: `task` object, task position (`mode`) and id of the target task if needed. The description of the task object see here: [`tasks`](https://docs.svar.dev/react/gantt/api/properties/tasks) property.

```json
{
  "task":{
    "text": "New Task",
    "parent": 20,
    "start": "2024-06-21 00:00:00",
    "duration": 1,
    "end": "2024-06-22 00:00:00",
    "id": "temp://1710851071459",
    "progress": 0,
    "type": "task",
    "details": "",// the description field in the task editor
  },
  "mode": "after",// or "before", "child"
  "target": 123458765//id of target task if mode is provided

}

```

# **Response**

The server returns a JSON object with the new task ID.

Example:

```json
{
  "id":13
}

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)