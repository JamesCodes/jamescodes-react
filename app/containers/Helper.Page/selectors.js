import { createSelector } from 'reselect';

/**
 * Direct selector to the HelperPage state domain
 */
const selectHelperPageDomain = (state) => state.get('HelperPage');

/**
 * Default selector used by HelperLoader
 */
const makeSelectHelperPage = () => createSelector(selectHelperPageDomain, (helperPageDomain) => ({
    helperPageDomain,
}));

export default makeSelectHelperPage;
export { selectHelperPageDomain };
