export const TOGGLE_SIDE_MENU = 'TOGGLE_SIDE_MENU';
export const GET_PAGE_HEIGHT = 'GET_PAGE_HEIGHT';
export const SET_CURR_COMPONENT = 'SET_CURR_COMPONENT';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const DELETE_COMPONENT = 'DELETE_COMPONENT';
export const GET_TIMESTAMP = 'GET_TIMESTAMP';
export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const EMPTY_SELECTED_COMPONENT = 'EMPTY_SELECTED_COMPONENT';

export function toggleSideMenu(isShow) {
    return {
        type: TOGGLE_SIDE_MENU,
        isShow
    };
}

export function getPageHeight() {
    return {
        type: GET_PAGE_HEIGHT
    };
}

export function setCurrComponent(index) {
    return (dispatch, getState) => {
        dispatch(getTimestamp());
        dispatch({
            type: SET_CURR_COMPONENT,
            index
        });
    };
}

function S4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function guid() {
    return S4() + S4() + S4() + S4();
}

export function addComponent({name, url}) {
    return (dispatch, getState) => {
        dispatch(setCurrComponent(0));
        dispatch({
            type: ADD_COMPONENT,
            name,
            url
        });
    };
}

export function deleteComponent(index, isListLast) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_COMPONENT,
            index
        });
        if (typeof isListLast === 'undefined' || isListLast) {
            dispatch(setCurrComponent(0));
        }
    };
}

export function getTimestamp() {
    return {
        type: GET_TIMESTAMP
    };
}

export function selectComponent(index, isSelect) {
    return {
        type: SELECT_COMPONENT,
        index,
        isSelect
    };
}

export function emptySelectComponent() {
    return {
        type: EMPTY_SELECTED_COMPONENT
    };
}