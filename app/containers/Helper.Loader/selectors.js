import { createSelector } from 'reselect';

/**
 * Direct selector to the HelperLoader state domain
 */
const selectHelperLoaderDomain = (state) => state.get('HelperLoader');

/**
 * Select active Loader ID
 */
const selectLoadingState = createSelector(
    selectHelperLoaderDomain,
    (LoaderDomain) => LoaderDomain.get('loading')
);

/**
 * Select loading message
 */
const selectLoadingMessage = createSelector(
    selectHelperLoaderDomain,
    (LoaderDomain) => LoaderDomain.get('message')
);

/**
 * Select initialLoad
 */
const selectInitialLoadState = createSelector(
    selectHelperLoaderDomain,
    (LoaderDomain) => LoaderDomain.get('initialLoad')
);

/**
 * Default selector used by HelperLoader
 */

const makeSelectHelperLoader = () => createSelector(
    selectLoadingState,
    selectLoadingMessage,
    selectInitialLoadState,
    (loading, message, initialLoad) => ({
        loading,
        message,
        initialLoad,
    })
);

export default makeSelectHelperLoader;
export { selectHelperLoaderDomain };
