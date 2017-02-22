import {fetchSelectedGist, fetchGists, fetchMoreGists, fetchAccessToken, shouldFetch,
		selectFetchMethod} from './actions/actions';

import {store} from './createStore';

// Haetaan gist näkymään saavuttaessa.


export function fetchSelectedGistOnEnter(nextState) {
	let requestedGistId = nextState.params.gistId;
	let state = store.getState();

	// Haetaan gist, jos tilaan ei ole tallennettu gistiä
	// tai käyttäjän pyytämä gist ei vastaa tilaan tallennettua gist.
	if(!state.activeGist.gist.hasOwnProperty('id') ||
			state.activeGist.gistId !== requestedGistId) {
		return store.dispatch(fetchSelectedGist(requestedGistId));
	}
}


//Haetaan hakuehtoja vastaavat gistit näkymään saavuttaessa.
export function fetchGistsOnEnter(nextState) {
	//Määritetään polkunimen perusteella mitä haetaan.
	let fetchMethod = nextState.location.pathname.match(/gists|starred|discover|search/g);
/*
	if(fetchMethod == null) {
		fetchMethod = 'gists';
	} else {
		fetchMethod = fetchMethod[0];
	}
*/
	fetchMethod = fetchMethod == null ? 'gists' : fetchMethod[0];


	//Haetaanko gistit, vai käytetäänkö välimuistista löytyviä gistejä.
	if(shouldFetch(store.getState(), fetchMethod, nextState.params.page)) {
		if(fetchMethod === 'discover') {
			return store.dispatch(fetchGists('discover', nextState.params.page));
		} else if(fetchMethod === 'search') {
			return store.dispatch(fetchGists('search', null, nextState.params.user));
		}
		return store.dispatch(fetchGists(fetchMethod));
	}
}

export function login() {
	// Yritetään hakea käyttäjätietoja local storagesta
	// let userInfo = getUserInfoFromStorage();
	window.location.href = 'http://localhost:8080/Opinnaytetyo_spring_react/authorize';
}
