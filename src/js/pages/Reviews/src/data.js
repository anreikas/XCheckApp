
const user = {
    githubId: "torvalds",
    roles: ["author", "student", "supervisor", "course_manager"]
};

const task = [
    {
        id: "simple-task-v1",
        author: "cardamo",
        state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
        categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
        items: [{
                id: "basic_p1",
                minScore: 0,
                maxScore: 20,
                category: "Basic Scope",
                title: "Basic things",
                description: "You need to make things right, not wrong"
            },
            {
                id: "basic_p1",
                minScore: 0,
                maxScore: 30,
                category: "Basic Scope",
                title: "Basic things",
                description: "You need to make things right, not wrong"
            },
            {
                id: "extra_p1",
                minScore: 0,
                maxScore: 30,
                category: "Extra Scope",
                title: "More awesome things",
                description: "Be creative and make up some more awesome things"
            },
            {
                id: "fines_p1",
                minScore: -10,
                maxScore: 0,
                category: "Fines",
                title: "App crashes",
                description: "App causes BSoD!"
            }
        ]
    },
    {
        id: "simple-task-v2",
        author: "cardamo",
        state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
        categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
        items: [{
                id: "basic_p1",
                minScore: 0,
                maxScore: 20,
                category: "Basic Scope",
                title: "Basic things",
                description: "You need to make things right, not wrong"
            },
            {
                id: "extra_p1",
                minScore: 0,
                maxScore: 30,
                category: "Extra Scope",
                title: "More awesome things",
                description: "Be creative and make up some more awesome things"
            },
            {
                id: "fines_p1",
                minScore: -10,
                maxScore: 0,
                category: "Fines",
                title: "App crashes",
                description: "App causes BSoD!"
            }
        ]
    }
];

const taskScore = {
    task: "simple-task-v1",
    items: {
        basic_p1: {
            score: 20,
            comment: "Well done!"
        },
        extra_p1: {
            score: 15,
            comment: "Some things are done, some are not"
        },
        fines_p1: {
            score: 0,
            comment: "No ticket today"
        },
    }
};

const crossCheckSession = {
    id: "rss2020Q3react-xcheck",
    state: "DRAFT", // enum [DRAFT, REQUESTS_GATHERING, CROSS_CHECK, COMPLETED]
    taskId: "simple-task-v1",
    coefficient: 0.7,
    startDate: "2020-07-07",
    endDate: "2020-07-14",
    discardMinScore: true,
    discardMaxScore: false,
    minReiewsAmount: 1, // how many peer reviews are required to set a score
    desiredReviewersAmount: 2, // how many peers are assigned to evaluate each solution
    attendees: [ // shuffled randomly when state is cahnged from REQUESTS_GATHERING to CROSS_CHECL
        {
            githubId: "ButterBrot777",
            reviewerOf: ["torvalds", "cardamo"]
        },
        {
            githubId: "torvalds",
            reviewerOf: ["cardamo"]
        },
        {
            githubId: "cardamo",
            reviewerOf: ["ButterBrot777"]
        }
    ]
}

const reviewRequest = {
    id: "rev-req-1",
    crossCheckSessionId: "rss2020Q3react-xcheck", // may be null if this review is not a part of any session 
    author: "grigotiy",
    task: "simple-task-v1",
    state: "PUBLISHED", // enum [DRAFT, PUBLISHED, COMPLETED]
    selfGrade: {taskScore},
};


const review = [{
    id: "rev-id-1",
    requestId: "rev-req-1",
    author: "nikolay",
    state: "PUBLISHED", // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
    grade: taskScore
},
{
    id: "rev-id-1",
    requestId: "rev-req-1",
    author: "oleg",
    state: "PUBLISHED", // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
    grade: taskScore
},
{
    id: "rev-id-1",
    requestId: "rev-req-1",
    author: "stepan",
    state: "PUBLISHED", // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
    grade: taskScore
}
]

const dispute = {
    reviewId: "rev-id-1",
    state: "ONGOING", // enum [ONGOING, ACCEPTED, REJECTED]
    idem: "extra_p1",
    comment: "Check out the 'All things' page to see all things that were implemented",
    suggestedScore: 30
};

// const reviewTable = [{
//         name: 'Song-bird',
//         deadline: 'december 10, 2020',
//         author: 'Nikolay',
//         status: 'done',
//         score: 10,
//     },
//     {
//         name: 'Song-bird',
//         deadline: 'december 10, 2020',
//         author: 'Sasha',
//         status: 'pending',
//         score: 100,
//     },
//     {
//         name: 'Song-bird',
//         deadline: 'december 10, 2020',
//         author: 'Boris',
//         status: 'done',
//         score: 50,
//     },
//     {
//         name: 'Song-bird',
//         deadline: 'december 10, 2020',
//         author: 'Andrey',
//         status: 'pending',
//         score: 80,
//     }
// ]


export {
    user,
    task,
    taskScore,
    crossCheckSession,
    reviewRequest,
    review,
    dispute
}
