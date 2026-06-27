# API Endpoint Agreement

Base URL: `/api/tasks`

## 1. Get All Tasks
- **Method**: `GET`
- **URL**: `/api/tasks`
- **Query Params (Optional)**: `?status=todo&priority=high`
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "60d5ecb8b392d70015345678",
      "title": "Buy groceries",
      "description": "Milk, eggs, and bread",
      "status": "todo",
      "priority": "medium",
      "createdAt": "2026-06-28T10:00:00.000Z"
    }
  ]
}
```

## 2. Get Single Task
- **Method**: `GET`
- **URL**: `/api/tasks/:id`
- **Response**: Same format as above, but `data` is a single object.
- **Error Response (404)**:
```json
{
  "success": false,
  "message": "Task not found"
}
```

## 3. Create Task
- **Method**: `POST`
- **URL**: `/api/tasks`
- **Request Body**:
```json
{
  "title": "Review PRs",
  "description": "Look at the frontend updates",
  "priority": "high",
  "dueDate": "2026-06-30"
}
```
- **Response (201)**:
```json
{
  "success": true,
  "data": {
    "_id": "60d5ecb8b392d70015345679",
    "title": "Review PRs",
    "description": "Look at the frontend updates",
    "status": "todo",
    "priority": "high",
    "dueDate": "2026-06-30T00:00:00.000Z",
    "createdAt": "2026-06-28T10:05:00.000Z",
    "__v": 0
  }
}
```
- **Error Response (400 - Validation Failed)**:
```json
{
  "success": false,
  "message": "Task title is required"
}
```

## 4. Update Task
- **Method**: `PUT`
- **URL**: `/api/tasks/:id`
- **Request Body**:
```json
{
  "status": "completed"
}
```
- **Response (200)**: Returns the updated task object in `data`.

## 5. Delete Task
- **Method**: `DELETE`
- **URL**: `/api/tasks/:id`
- **Response (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```
