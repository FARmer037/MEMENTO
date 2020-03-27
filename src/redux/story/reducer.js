const initialForm = {
    title: '',
    story: ''
}

export const formReducer = (data = initialForm, action) => {
    switch(action.type) {
        case 'CHANGE_TITLE': return {...data, title: action.title}
        case 'CHANGE_STORY': return {...data, story: action.story}
        case 'RESET_TITLE': return {...data, title: action.title}
        case 'RESET_STORY': return {...data, story: action.story}
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