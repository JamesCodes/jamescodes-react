import { fromJS } from 'immutable';
import HelperPageReducer from '../reducer';

describe('HelperPageReducer', () => {
    it('returns the initial state', () => {
        expect(HelperPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});
