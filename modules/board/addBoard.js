import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    isAddBoard: false
}

const ADD_REQUEST = 'board/ADD_REQUEST';
const ADD_SUCCESS = 'board/ADD_SUCCESS';
const ADD_FAILURE = 'board/ADD_FAILURE';
const DELETE_REQUEST = 'board/DELETE_REQUEST';
const DELETE_SUCCESS = 'board/DELETE_SUCCESS';
const DELETE_FAILURE = 'board/DELETE_FAILURE';

export const addRequest = createAction(ADD_REQUEST, data => data)
export const deleteRequest = createAction(DELETE_REQUEST, data => data)

export function* addBoardSaga() {
    yield takeLatest(ADD_REQUEST, add);
    yield takeLatest(DELETE_REQUEST, deleteboard);
}
function* add(action) {
    try {
        const response = yield call(addBoardAPI, action.payload)
        console.log("게시판 등록 서버다녀옴: " + JSON.stringify(response.data))
        yield put({type: ADD_SUCCESS, payload: response.data})
        yield put(window.location.href = "/board/list")
    } catch (error) {
        yield put({type: ADD_FAILURE, payload: error.message})
    }
}
const addBoardAPI = payload => axios.post(`${SERVER}/board/addboard`, payload, {headers})

function* deleteboard(action) {
    try {
        console.log(`게시글 삭제`)
    } catch (error) {
    }
}

const addboard = handleActions({
    [HYDRATE]: (state, action) => 
    ({...state, ...action.payload})}, 
    initialState
)
export default addboard
    //[name] 과 같은거임 (동적 키 할당)


/* handleActions 를 사용하기 전 학습용 백업
const auth = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            console.log(' ### HYDRATE Issue 발생 ### ')
            return {
                ...state,
                ...action.payload
            }
        case REGISTER_SUCCESS:
            console.log(' ### 회원가입 성공 ### ' + JSON.stringify(action.payload))
            return {
                ...state,
                user: action.payload
            }
        case REGISTER_FAILURE:
            console.log(' ### 회원가입 실패 ### ' + action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
export default auth*/