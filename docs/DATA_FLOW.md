# Data Flow

Here is how data moves through the app during standard operations.

## Create a Task
1. User opens the modal and fills out the task form in the UI.
2. React runs local validation (checks for a title, valid dates, etc.).
3. If valid, the frontend sends a `POST /api/tasks` request via the `fetch` API.
4. The Express router hits the POST endpoint and extracts the request body.
5. Mongoose validates the data against the `Task` schema.
6. The new task is saved to MongoDB.
7. Express sends a `201 Created` JSON response back to the client.
8. React receives the success response, closes the modal, and re-fetches the task list to update the UI.

## Read Tasks
1. The React `App` component mounts (or filters change).
2. Frontend sends a `GET /api/tasks` request with any active filter query params.
3. Express parses the query params and queries MongoDB via Mongoose.
4. MongoDB returns the matching tasks sorted by newest first.
5. Express sends the array of tasks back to the client.
6. React stores the tasks in state and maps over them to render the `TaskCard` components.

## Update a Task
1. User clicks edit, changes a field, and submits. (Or clicks the quick "complete" button).
2. Frontend sends a `PUT /api/tasks/:id` request with the updated fields.
3. Express looks up the task by ID and applies the updates.
4. Mongoose re-runs validations to ensure the updates are legal.
5. MongoDB saves the changes.
6. Express sends back the updated task.
7. React re-fetches the list to ensure the UI is perfectly in sync.

## Delete a Task
1. User clicks the delete button and confirms the prompt.
2. Frontend sends a `DELETE /api/tasks/:id` request.
3. Express instructs MongoDB to remove the document with that ID.
4. MongoDB deletes it.
5. Express sends a success message.
6. React re-fetches the task list, and the deleted task disappears from the UI.
