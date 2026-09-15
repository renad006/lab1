# Filter & Search Todos — Practice Assignment 1

## What I Implemented

### Backend (`backend/controllers/todoController.js`)
- Modified `getTodos` to read an optional `done` query parameter from `req.query`.
- If `done` is not provided, the filter object stays empty and `GET /api/todos` returns all todos, exactly as before.
- If `done=true` or `done=false` is passed, the string is converted to a boolean and used to filter results via `Todo.find(filter)`.

### Frontend
- **`frontend/src/api/todos.js`**: `fetchTodos` now accepts an optional `filter` argument (`'all'`, `'active'`, or `'done'`) and appends the corresponding `done` query param to the GET request using axios `params`.
- **`frontend/src/App.jsx`**: Added a `filter` state (default `'all'`). The `useEffect` that fetches todos now depends on `filter`, so changing the filter re-fetches from the server with the new query param.
- **`frontend/src/todoList.jsx`**: Added All / Active / Done buttons that call `onFilterChange` to update the filter state in `App.jsx`.

## How Filtering Works
- **All** → `GET /api/todos` (no query param)
- **Active** → `GET /api/todos?done=false`
- **Done** → `GET /api/todos?done=true`

## Server-side vs Client-side Trade-off
This implementation filters on the **server**, re-fetching from the API every time the filter changes. 

- **Pros of server-side filtering**: less data sent over the network when there are many todos, filtering logic lives in one place (the database query) and stays consistent regardless of client, and it scales well if the todo list grows large.
- **Cons of server-side filtering**: an extra network round-trip every time the user switches filters, and slightly higher latency compared to instant client-side filtering.
- **Client-side alternative**: filtering the already-loaded todos array in React (`todos.filter(t => t.done)`) would feel instant since no network request is needed, but requires loading all todos upfront regardless of filter, which doesn't scale as well for large datasets.

For this exercise, server-side filtering was implemented to practice passing query parameters end to end between the frontend and backend.
