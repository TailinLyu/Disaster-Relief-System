import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Event } from './components/Event';
import {AddRequest} from './components/AddRequest';
import {Dashboard} from './components/Dashboard';
import { Admin } from './components/Admin';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import {AddPledge} from './components/AddPledge';
import './custom.css';
export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <AuthorizeRoute path='/add-event' component={Event} />
        <AuthorizeRoute path='/add-request' component={AddRequest} />
        <AuthorizeRoute path='/dashboard' component={Dashboard} />
        <AuthorizeRoute path='/add-pledge' component={AddPledge} />>
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <AuthorizeRoute path='/admin' component={Admin} />
      </Layout>
    );
  }
}
