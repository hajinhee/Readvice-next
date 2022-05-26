import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import counter, {counterSaga} from './common/counter';
import register, {registerSaga} from './auth/register';
import login, {loginSaga} from './auth/login';
import addboard, {addBoardSaga} from './board/addBoard';
import {HYDRATE} from "next-redux-wrapper"
const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return {
                    ...state,
                    ...action.payload
                };
            default:
                return state;
        }
    },
    counter,
    login,
    register,
    addboard
});
export function* rootSaga() {
    yield all([counterSaga(), registerSaga(), loginSaga(), addBoardSaga()]);
}

export default rootReducer;