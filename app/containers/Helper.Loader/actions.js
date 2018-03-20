/*
 *
 * HelperLightbox actions
 *
 */

import { LOADER_SHOW, LOADER_HIDE, INITIAL_LOAD_COMPLETE } from './constants';

export function showLoader(message = 'Loading') {
    return {
        type: LOADER_SHOW,
        message,
    };
}

export function hideLoader() {
    return {
        type: LOADER_HIDE,
    };
}

export function initialLoadComplete() {
    return {
        type: INITIAL_LOAD_COMPLETE,
    };
}
