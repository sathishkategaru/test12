import fetch from 'isomorphic-fetch'

export const ADD_TEST = 'ADD_TEST'
export const TEST_STATUS_NEW = 'TEST_STATUS_NEW'
export const addTest = (name, startDate) => {
    return {
        type: ADD_TEST,
        payload: { name, startDate }
    }
}

export const DELETE_TEST = 'DELETE_TEST'
export const deleteTest = (testIndex, testId) => {
    return {
        type: DELETE_TEST,
        payload: { testIndex, testId }
    }
}

export const ADD_SUBJECT = 'ADD_SUBJECT'
export const addSubject = (testIndex, testId) => {
    return {
        type: ADD_SUBJECT,
        payload: { testIndex, testId }
    }
}

export const TEST_STATUS_UPDATED = 'TEST_STATUS_UPDATED'
export const SUBJECT_CHANGE = 'SUBJECT_CHANGE'
export const subjectChange = (testIndex, testId, subjectIndex, name) => {
    return {
        type: SUBJECT_CHANGE,
        payload: { testIndex, testId, subjectIndex, name }
    }
}

export const MAX_MARKS_CHANGE = 'MAX_MARKS_CHANGE'
export const maxMarksChange = (testIndex, testId, subjectIndex, maxMarks) => {
    return {
        type: MAX_MARKS_CHANGE,
        payload: { testIndex, testId, subjectIndex, maxMarks }
    }
}


export const POST_EXAM_DETAILS = 'POST_EXAM_DETAILS'

export const RECEIVE_POST_EXAM_DETAILS = 'RECEIVE_POST_EXAM_DETAILS'

function receivePostExamDetails(json) {
    return {
        type: RECEIVE_POST_EXAM_DETAILS,
        tests: json,
        receivedAt: Date.now()
    }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function postExamDetails({ tests, deletedTests }) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch({ type: POST_EXAM_DETAILS })

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        debugger
        let subjects,
            newTests = tests.new.map(test => {
                subjects = []
                test.subjects.forEach(subject => {
                    if (subject.name && subject.name.trim()) {
                        subjects.push(Object.assign({}, subject))
                    }
                })
                return Object.assign({}, test, { subjects })
            }),
            oldTests = []
        tests.old.forEach(test => {
            if (test.status === TEST_STATUS_UPDATED) {
                subjects = []
                test.subjects.forEach(subject => {
                    if (subject.name && subject.name.trim()) {
                        subjects.push(Object.assign({}, subject))
                    }
                })
                return oldTests.push(Object.assign({}, test, { subjects }))
            }
        })
        let finalData = {tests: {new : newTests, old : oldTests}, deletedTests}
        return fetch(`/exams`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(finalData)
            })
            .then(response => response.json())
            .then(json => {

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receivePostExamDetails(json))
                }
            )
            .catch(err => console.log(err))

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}



export const REQUEST_EXAM_DETAILS = 'REQUEST_EXAM_DETAILS'


export const RECEIVE_EXAM_DETAILS = 'RECEIVE_EXAM_DETAILS'

function receiveExamDetails(json) {
    return {
        type: RECEIVE_EXAM_DETAILS,
        tests: json,
        receivedAt: Date.now()
    }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchExamDetails() {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch({ type: REQUEST_EXAM_DETAILS })

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`/exams`)
            .then(response => response.json())
            .then(json =>

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                dispatch(receiveExamDetails(json))
            )

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}
































export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    }
}

export function invalidateReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    }
}

function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}

function receivePosts(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

function fetchPosts(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit))
        return fetch(`https://www.reddit.com/r/${reddit}.json`)
            .then(response => response.json())
            .then(json => dispatch(receivePosts(reddit, json)))
    }
}

function shouldFetchPosts(state, reddit) {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export function fetchPostsIfNeeded(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit))
        }
    }
}
