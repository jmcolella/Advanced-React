import { ParsedUrlQuery } from 'querystring';
import App, { AppContext, AppInitialProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';

import Page from '../components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface Props extends AppInitialProps {
  apollo: ApolloClient<unknown>;
}
interface PageProps {
  query?: ParsedUrlQuery;
}
class MyApp extends App<Props> {
  static getInitialProps = async function ({ Component, ctx }: AppContext) {
    let pageProps: PageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;

    return { pageProps };
  };

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withData(MyApp);
