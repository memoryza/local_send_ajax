import { combineReducers } from 'redux';
import {
    TOGGLE_SIDE_MENU,
    GET_PAGE_HEIGHT,
    SET_CURR_COMPONENT,
    ADD_COMPONENT,
    DELETE_COMPONENT,
    GET_TIMESTAMP,
    TOGGLE_EDIT,
    SELECT_COMPONENT,
    EMPTY_SELECTED_COMPONENT
} from '../actions';

function toggleSideMenu(state = false, action) {
    return action.type === TOGGLE_SIDE_MENU ? (typeof action.isShow !== 'undefined' ? action.isShow : !state) : state;
}

function pageHeight() {
    return window.innerHeight || Math.max(document.body.clientHeight, document.documentElement.clientHeight, screen.height || 0);
}

function getPageHeight(state = pageHeight(), action) {
    return action.type === GET_PAGE_HEIGHT ? pageHeight() : state;
}

const initialComponentIndex = localStorage.currComponentIndex ? +localStorage.currComponentIndex : 0;

function currComponentIndex(state = initialComponentIndex, action) {
    if (action.type === SET_CURR_COMPONENT) {
        localStorage.currComponentIndex = action.index;
        return action.index;
    }
    return state;
}

const initialComponents = JSON.parse(localStorage.components || '[]');
let newComponents;

function components(state = initialComponents, action) {
    switch (action.type) {
        case ADD_COMPONENT:
            newComponents = [{
                name: action.name,
                url: action.url
            }, ...state];
            localStorage.components = JSON.stringify(newComponents);
            return newComponents;
        case DELETE_COMPONENT:
            newComponents = state.filter((item, index) => {
                return index !== action.index;
            });
            localStorage.components = JSON.stringify(newComponents);
            return newComponents;
        default:
            return state;
    }
}

function timeStamp(state = Date.now(), action) {
    return action.type === GET_TIMESTAMP ? Date.now() : state;
}

function selectedComponents(state = [], action) {
    if (action.type === SELECT_COMPONENT) {
        if (action.isSelect) {
            return [
                ...state,
                action.index
            ];
        } else {
            return state.filter((item, index) => {
                return item !== action.index;
            });
        }
    } else if (action.type === EMPTY_SELECTED_COMPONENT) {
        return [];
    }
    return state;
}

const rootReducer = combineReducers({
    isShowMenu: toggleSideMenu,
    pageHeight: getPageHeight,
    components,
    currComponentIndex,
    timeStamp,
    selectedComponents
});

export default rootReducer;