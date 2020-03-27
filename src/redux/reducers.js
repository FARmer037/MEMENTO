import { combineReducers } from 'redux'
import { storyReducer, formReducer } from './story/reducer'

export const reducers = combineReducers({
    story: storyReducer,
    form: formReducer
})