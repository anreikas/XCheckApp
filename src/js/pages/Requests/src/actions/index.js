import { tasksAPI, reviewRequests } from '../../../../utils';

export const getTasks = async (dispatch) => {
  const tasks = await tasksAPI.getTasks();

  dispatch(
    tasks.map((el) => ({
      ...el,
      key: el.id,
    })),
  );
};

export const getTaskById = async (taskId, dispatch) => {
  const task = await reviewRequests.getTask(taskId);

  if (typeof dispatch === 'function') {
    dispatch(task);
  }

  return task;
};

/*
* {
    "id": "rev-id-1",
    "requestId": "rev-req-1",
    "author": "ButterBrot777",
    "state": "DISPUTED",
    "grade": {}
  }
* */

export const sendReview = async (review) => {
  const { requestId } = review;
  const data = await reviewRequests.postReview({
    ...review,
    id: `req-${requestId}-rev-${Date.now()}`,
  });

  return data;
};

export const sendRequest = async (request, dispatch) => {
  const { id } = request;
  let existRequest;
  let result = null;

  try {
    existRequest = await reviewRequests.getRequestById(id);
  } catch (e) {
    existRequest = null;
  }

  if (existRequest) {
    result = await reviewRequests.updateRequest(request);
  } else {
    result = await reviewRequests.postRequest(request);
  }

  if (typeof dispatch === 'function') {
    dispatch(result);
  }

  return result;
};

/*

{
  "id": "basic_p1",
  "minScore": 0,
  "maxScore": 20,
  "category": "Basic Scope",
  "title": "Basic things",
  "description": "You need to make things right, not wrong",
  "selfScore": 20,
  "reviews": [
    {
      "score": 20,
      "comment": "Well done!"
    }
  ]
},
*/
/*
{
  "id": "rev-req-1",
    "crossCheckSessionId": "rss2020Q3react-xcheck",
    "author": "cardamo",
    "task": "simple-task-v1",
    "state": "PUBLISHED",
    "selfGrade": {
      "id": "self-grade-1",
      "author": "rgovin",
      "requestId": "rev-req-1",
      "task": "simple-task-v2",
      "items": {
        "basic_p1": {
          "score": 20,
          "comment": "Well done!"
        },
        "extra_p1": {
          "score": 15,
          "comment": "Some things are done, some are not"
        },
        "fines_p1": {
          "score": 10,
          "comment": "No ticket today"
        },
        "fines_p2": {
          "score": 20,
          "comment": "No ticket today"
        }
      }
    }
}
 */
/*
{
    "id": "simple-task-v1",
    "author": "cardamo",
    "state": "DRAFT",
    "categoriesOrder": [
      "Basic Scope",
      "Extra Scope",
      "Fines"
    ],
    "items": [
      {
        "id": "basic_p1",
        "minScore": 0,
        "maxScore": 20,
        "category": "Basic Scope",
        "title": "Basic things",
        "description": "You need to make things right, not wrong"
      },
      {
        "id": "extra_p1",
        "minScore": 0,
        "maxScore": 30,
        "category": "Extra Scope",
        "title": "More awesome things",
        "description": "Be creative and make up some more awesome things"
      },
      {
        "id": "fines_p1",
        "minScore": -10,request
        "maxScore": 0,
        "category": "Fines",
        "title": "App crashes",
        "description": "App causes BSoD!"
      }
    ]
  }
*/
/*

formCheck
{
"taskId": "",
"categoriesOrder": [
    "Basic Scope",
    "Extra Scope",
    "Fines"
  ],
items: [
  {
    "id": "basic_p1",
    "minScore": 0,
    "maxScore": 20,
    "category": "Basic Scope",
    "title": "Basic things",
    "description": "You need to make things right, not wrong",
    "selfScore": 20,
    "reviewScore": 20,
    "reviews": [
      {
        "score": 20,
        "comment": "Well done!"
      }
     ]
  }
],
*/
/*
* "items": {
    "basic_p1": {
      "score": 20,
      "comment": "Well done!"
    },
    "extra_p1": {
      "score": 15,CheckForm
      "comment": "Some things are done, some are not"
    },
    "fines_p1": {
      "score": 10,
      "comment": "No ticket today"
    },
    "fines_p2": {
      "score": 20,
      "comment": "No ticket today"
    }
*
* */

export const createCheckForm = async (request, dispatch) => {
  const {
    task: taskId,
    selfGrade: { items: selfGradeItems = {} },
    deployUrl,
    prUrl,
  } = request;
  const task = await getTaskById(taskId);
  const { items: taskItems, categoriesOrder } = task;
  const comment = '';
  let score = 0;
  const checkForm = {
    taskId,
    categoriesOrder,
    items: taskItems.map((item) => {
      const { id } = item;
      const selfGradeItem = selfGradeItems[id];
      if (selfGradeItem) {
        const { score: selfScore } = selfGradeItem;

        score = selfScore;
      }

      return {
        ...item,
        selfScore: score,
        comment,
      };
    }),
    deployUrl,
    prUrl,
  };

  if (typeof dispatch === 'function') {
    dispatch(checkForm);
  }

  return checkForm;
};

export const getRequestByTaskId = async (taskId, author) => {
  const request = await reviewRequests.getRequestByTaskId(taskId, author);

  return request;
};

export const createRequest = async (taskId, author, state = 'PUBLISHED') => {
  const [existRequest] = await getRequestByTaskId(taskId, author);

  return existRequest || {
    id: `rev-req-${Date.now()}`,
    crossCheckSessionId: '',
    author,
    task: taskId,
    state,
    selfGrade: {},
  };
};

// export const getMySavedTasks = async (dispatch) => {
//   const tasks = await tasksAPI.getTasks();
//   dispatch(
//     tasks.map((el) => ({
//       ...el,
//       key: el.id,
//     })),
//   );
// };
