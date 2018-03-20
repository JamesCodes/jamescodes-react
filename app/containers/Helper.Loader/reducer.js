/*
 *
 * HelperLightbox reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { LOADER_SHOW, LOADER_HIDE, INITIAL_LOAD_COMPLETE } from './constants';

const initialState = fromJS({
    loading: true,
    message: 'One moment please',
    initialLoad: true,
});

function HelperLoaderReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_SHOW:
            return state.merge(new Map({
                loading: true,
                message: action.message,
            }));
        case LOADER_HIDE:
            return state.merge(new Map({
                loading: false,
            }));
        case INITIAL_LOAD_COMPLETE:
            return state.set('initialLoad', false);
        default:
            return state;
    }
}

export default HelperLoaderReducer;
