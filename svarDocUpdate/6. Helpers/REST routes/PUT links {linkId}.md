# PUT /links/{linkId}

# **Description**

Updates data on a specified task

The route handles the HTTP PUT request made to the `/links/{linkId}` path.

# **Parameters**

- `linkId` (number) - (required) the id of a link to be updated

# **Payload**

The server needs to receive a JSON object with all fields for a link (both old and new/modified data).

Example:

```json
{
  "id": 17,
  "source": 69,
  "target": 70,
  "type": "e2e"
}

```

# **Response**

A JSON object with the link id is returned.

Example:

```json
{
  "id": 1
}

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)