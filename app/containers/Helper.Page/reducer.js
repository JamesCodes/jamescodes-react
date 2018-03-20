/*
 *
 * HelperPage reducer
 *
 */

import { fromJS } from 'immutable';

const initialState = fromJS({});

function HelperPageReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default HelperPageReducer;
