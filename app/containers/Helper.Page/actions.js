/*
 *
 * HelperPage actions
 *
 */

import { SHOW_SHARE, HIDE_SHARE } from './constants';

export function showShare() {
    return {
        type: SHOW_SHARE,
    };
}

export function hideShare() {
    return {
        type: HIDE_SHARE,
    };
}
