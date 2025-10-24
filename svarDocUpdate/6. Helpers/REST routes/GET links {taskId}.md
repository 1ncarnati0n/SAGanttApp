# GET /links/{taskId}

# **Description**

Gets data on links for a specified task

The route handles the HTTP GET request made to the `/links/{taskId}` path.

# **Parameters**

The next path parameters are sent in the request line:

- `{taskId}` (number) - (required) the id of a task for which data on links is requested

# **Payload**

No payload is required.

# **Response**

The server returns a JSON array with links data for the requested task.

Example:

```json
[
   {
      "id": 9,
      "source": 60,
      "target": 61,
      "type": "e2s"
   },
   {
      "id": 10,
      "source": 48,
      "target": 49,
      "type": "s2s"
   },
   {
      "id": 11,
      "source": 54,
      "target": 56,
      "type": "e2s"
   },
   {
      "id": 12,
      "source": 56,
      "target": 58,
      "type": "s2s"
   },
   {
      "id": 13,
      "source": 49,
      "target": 50,
      "type": "e2s"
   },
   {
      "id": 14,
      "source": 56,
      "target": 57,
      "type": "s2s"
   },
   {
      "id": 15,
      "source": 53,
      "target": 54,
      "type": "s2s"
   },
   {
      "id": 16,
      "source": 64,
      "target": 65,
      "type": "e2s"
   }
]

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)