# POST /links

# **Description**

Creates a new link

The route handles the HTTP POST request made to the `/links` path.

# **Payload**

The server needs to receive a JSON object with data for the new link. See parameters description here: [`links`](https://docs.svar.dev/react/gantt/api/properties/links)

```json
{
   "id": "temp://1710929724740",
   "source": 69,
   "target": 70,
   "type": "s2s"
}

```

# **Response**

The server returns a JSON object with the new link ID.

Example:

```json
{
  "id": 17
}

```

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)