# X Check App
***

## JSON-SERVER

`npm i` 
`npm start` 

URL: `https://x-check.herokuapp.com/`

API: `https://github.com/typicode/json-server`

The database is contain the following entities:

    users              : [user, ...],
    tasks              : [task, ...],
    tasksScore         : [taskScore, ...],
    crossCheckSessions : [crossCheckSession, ...],
    reviewRequests     : [reviewRequest, ...],
    reviews            : [review, ...],
    disputes           : [dispute, ...],

For getting all users data try to use 
```javascript
const res = fetch('https://x-check.herokuapp.com/users');
```

For getting one user data by githubId name 
```javascript
const res = fetch('https://x-check.herokuapp.com/users?githubId=torvalds');
```

For write new item need to use post method
```javascript
const url = 'https://x-check.herokuapp.com/users';
const data = {
    githubId: "torvalds",
    roles: ["author", "student", "supervisor", "course_manager"],
};

fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
});
```

