/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Helpers
 */
import withHelperPage from 'containers/Helper.Page';
import withLoader from 'containers/Helper.Loader';

/**
 * Pages
 */
import PageHome from 'containers/Page.Home/Loadable';
import PageNotFound from 'containers/Page.NotFound/Loadable';

/**
 * Wrap the component with generic helper containers
 * @param  {Component}  component   The component that needs to be wrapped
 * @param  {Object}     options     Options to be used by the HOCs
 * @return {Component}              The wrapped component
 */
const wrapComponent = (component, options) => withLoader(withHelperPage(component, options));

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={wrapComponent(PageHome)} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
    );
}
