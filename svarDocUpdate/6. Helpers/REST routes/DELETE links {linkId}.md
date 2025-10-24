# DELETE /links/{linkId}

# **Description**

Deletes data on a link

The route handles the HTTP DELETE request made to the `/links/{linkId}` path.

# **Parameters**

The following path parameters are sent in the request line:

- `linkId` (number) - (required) the id of a link to be deleted

# **Payload**

No payload is required.

# **Response**

The server returns an empty object.

The HTTP status code shows whether the request succeeds (response.status == 200) or fails (response.status == 500).

---

**Related articles**:

- [Working with server](https://docs.svar.dev/react/gantt/guides/working_with_server)