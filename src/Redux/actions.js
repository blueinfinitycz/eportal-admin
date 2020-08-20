import {
    REQUEST_START,
    REQUEST_SUCCESS,
    REQUEST_ERROR,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
    LOGOUT_REQUEST_FAILURE,
    JSON_DATA
} from  '../globalVariables'

import axios from 'axios'


export const loginAct = (data) => {
    console.log('LOGIN REDUX REQ:', data)
    return dispatch => {
        dispatch(requestStart())
        axios.post('/login',{
            login: data.login,
            pass: data.pass
        })
        .then(res =>{console.log('LOGIN REDUX RES: ',res); dispatch(requestSuccess(res)); dispatch(loginRequestSuccess(res))})
        .catch(error => {dispatch(requestError()); dispatch(loginRequestFailure(error))})
    }
}

export const logoutAct = () => {
    return dispatch => {
        dispatch(requestStart())
        axios.post('/logout')
        .then(res => {dispatch(requestSuccess(res));dispatch(logoutRequestSuccess(res))})
        .catch(error => {dispatch(requestError()); dispatch(logoutRequestFailure(error))})
    }
}

export const getData = (url) => {
    return dispatch => {
        dispatch(requestStart())
        console.log('URL: ', url)
        axios.post(url)
        .then(res => {
            console.log('JSON RES: ', res)
            dispatch(requestSuccess(res));
            dispatch(jsonDataReq(res.data))
        })
        .catch(error =>{console.log('ERROR: ',error);dispatch(requestError(error))})
    }
}

export const crudOperation = (url,urlAllData,data) => {
    return dispatch => {
        dispatch(requestStart())
        // console.log("NA KTEROU URL ODESILAM DATA: ", url, "ZISKAVAM DATA: ", urlAllData)
        axios.post(url,{data: JSON.stringify(data)})
        .then(res => dispatch(getData(urlAllData)))
        .catch(error =>{dispatch(requestError(error))})
    }
}

const requestStart = (data) => ({type: REQUEST_START, ...data})
const requestSuccess = (data) => ({type: REQUEST_SUCCESS, ...data})
const requestError = (data) => ({type: REQUEST_ERROR, ...data})

const loginRequestSuccess = (data) =>({type: LOGIN_REQUEST_SUCCESS, payload: data})
const logoutRequestSuccess = (data) =>({type: LOGOUT_REQUEST_SUCCESS, payload: data})
const loginRequestFailure = (error) => ({type: LOGIN_REQUEST_FAILURE, payload: error})
const logoutRequestFailure = (error) => ({type: LOGOUT_REQUEST_FAILURE, payload: error})
const jsonDataReq = data => ({type:JSON_DATA, payload: data})