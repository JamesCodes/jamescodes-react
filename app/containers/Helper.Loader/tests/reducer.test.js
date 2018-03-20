import { fromJS } from 'immutable';
import HelperLightboxReducer from '../reducer';

describe('HelperLightboxReducer', () => {
    it('returns the initial state', () => {
        expect(HelperLightboxReducer(undefined, {})).toEqual(fromJS({}));
    });
});
