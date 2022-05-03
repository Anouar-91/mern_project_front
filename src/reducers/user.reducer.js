import {GET_USER,UPLOAD_PICTURE, UPDATE_BIO, FOLLOW_USER , UNFOLLOW_USER} from '../actions/user.actions'

const initialState = {};

export default function userReducer(state= initialState, action){
    switch (action.type){
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return action.payload
        case UPDATE_BIO:
            return action.payload
        case FOLLOW_USER:
            return action.payload
        case UNFOLLOW_USER:
            return action.payload
        default:
            return state;
    }
}