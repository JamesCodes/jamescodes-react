/**
 *
 * Asynchronously loads the component for MoleculeSiteNavigation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
