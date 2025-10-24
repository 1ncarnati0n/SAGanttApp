# POST /{batchURL}

# **Description**

Sends multiple requests grouped into one batch request

RestDataProvider supports batching that allows putting multiple API calls into one HTTP request using a single batch request. See the instructions about switching to the batch mode here: [Enabling the batch mode](https://docs.svar.dev/react/gantt/guides/working_with_server#enabling-the-batch-mode)

# **Parameters**

The route handles `POST` request made to the `/{batchUrl}` path

For example, `POST https://master--svar-gantt-go--dev.project.io/batch`

# **Payload**

The server needs to receive a JSON array with data for each request:

```json
[
  {
    "data": {...},
    "method":"PUT"|"POST"|"DELETE",
    "url":"path"
  }
]

```

- `data` - data for a single request
- `method` - REST method to be applied to this request as if it was a single request
- `url` - url that should be used as if it was a single request (relative path without the server name)

Example:

```json
[
   {
      "data": {
        "text": "New Task",
        "parent": 20,
        "start": "2024-06-21 00:00:00",
        "duration": 1,
        "end": "2024-06-22 00:00:00",
        "id": "temp://1710851071459",
        "progress": 0,
        "type": "task"
      },
      "method": "POST",
      "url": "tasks"
   },
   {
      "data": {
         "id": "temp://1710929724740",
         "source": 69,
         "target": 70,
         "type": "s2s"
      },
      "method": "POST",
      "url": "links"
   }
]

```

# **Response**

The server returns a JSON array where each object is a response to each individual request in batch. The sequence of responses in the array corresponds to the sequence of requests in the array of the payload.

Example:

```json
[{"id":13},{"id":17}]

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)