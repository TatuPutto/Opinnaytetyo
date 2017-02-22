import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import {Provider} from 'react-redux';

import {store} from './createStore';
import {fetchSelectedGistOnEnter, fetchGistsOnEnter, login} from './hooks';
import {fetchUserInfo, receiveUserInfo} from './actions/actions';
import {getUserInfoFromCookie} from './utility/persistUserInfo';

import Root from './components/container/Root';
import ListingPage from './components/presentational/listing/ListingPage';
import SingleGist from './components/container/SingleGist';
import CreateGist from './components/container/CreateGist';
import EditGist from './components/container/EditGist';

require('../css/basicrules.less');
require('../css/header.less');
require('../css/listing.less');
require('../css/single.less');
require('../css/creategist.less');
require('../css/comments.less');


const userInfo = getUserInfoFromCookie();

if(userInfo.length > 0) {
	store.dispatch(receiveUserInfo(userInfo));
} else {
	window.location.href = "/opinnaytetyo/login";
}


ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='opinnaytetyo' component={Root}>
				<IndexRoute component={ListingPage} onEnter={fetchGistsOnEnter} />
				<Route path='gists' component={ListingPage} onEnter={fetchGistsOnEnter} />
				<Route path='starred' component={ListingPage} onEnter={fetchGistsOnEnter} />
				<Route path='discover(/:page)' component={ListingPage} onEnter={fetchGistsOnEnter} />
				<Route path='search(/:user)' component={ListingPage} onEnter={fetchGistsOnEnter} />
				<Route path='gist/:gistId' component={SingleGist} onEnter={fetchSelectedGistOnEnter} />
				<Route path='edit/:gistId' component={EditGist} onEnter={fetchSelectedGistOnEnter} />
				<Route path='create' component={CreateGist} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('container')
);
