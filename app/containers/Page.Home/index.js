/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import LoaderContext from 'containers/Helper.Loader/context';
import { Helmet } from 'react-helmet';
import content from 'content/home.json';
import styles from './styles.scss';

export default class HomePage extends React.PureComponent {
    static contextType = LoaderContext;

    componentDidMount() {
        const { loaderActions } = this.context;
        loaderActions.hide();
    }

    render() {
        return (
            <div className={styles.Home}>
                <Helmet>
                    <title>{content.page.title}</title>
                    <meta
                        name="description"
                        content={content.page.description}
                    />
                </Helmet>
                JamesCodes React Boilerplate
            </div>
        );
    }
}
