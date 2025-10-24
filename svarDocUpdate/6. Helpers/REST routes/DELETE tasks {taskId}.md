# DELETE /tasks/{taskId}

# **Description**

Deletes data on a task

The route handles the HTTP DELETE request made to the `/tasks/{taskId}` path.

# **Parameters**

The following path parameters are sent in the request line:

- `taskId` (number) - (required) the id of a task to be deleted

# **Payload**

No payload is required.

# **Response**

The server returns an empty object.

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)