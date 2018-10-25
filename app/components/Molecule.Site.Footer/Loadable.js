/**
 *
 * Asynchronously loads the component for MoleculeSiteFooter
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});
