const initialForm = {
    task: '',
    location: '',
    date: '',
    startTime: '',
    endTime: ''
}

export const formReducer = (data = initialForm, action) => {
    switch(action.type) {
        case 'CHANGE_TASK': return {...data, task: action.task}
        case 'CHANGE_LOCATION': return {...data, location: action.location}
        case 'CHANGE_DATE': return {...data, date: action.date}
        case 'CHANGE_START_TIME': return {...data, startTime: action.startTime}
        case 'CHANGE_END_TIME': return {...data, endTime: action.endTime}
        default: return data
    }
}

export const storyReducer = (stories = [], action) => {
    switch (action.type) {
        case 'GET_STORY': return action.stories
        case 'ADD_STORY': return [...stories, action.story]
        default: return stories
    }
}