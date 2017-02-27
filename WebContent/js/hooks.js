import {
	fetchSelectedGist,
	fetchGists,
	fetchStarredGists,
	fetchLatestPublicGists,
	fetchGistsBySpecificUser,
} from './actions/actions';

import {store} from './createStore';


// Haetaan hakuehtoja vastaavat gistit näkymään saavuttaessa.
export function fetchGistsOnEnter(nextState) {
	// Määritetään polkunimen perusteella mitä haetaan.
	let fetchMethod = nextState.location.pathname.match(
			/gists|starred|discover|search/g);
	fetchMethod = fetchMethod == null ? 'gists' : fetchMethod[0];

	// Haetaanko gistit, vai käytetäänkö välimuistista löytyviä gistejä.
	//if(shouldFetch(store.getState(), fetchMethod, nextState.params.page)) {
		if(fetchMethod === 'discover') {
			return store.dispatch(fetchLatestPublicGists(nextState.params.page));
		} else if(fetchMethod === 'search') {
			return store.dispatch(fetchGistsBySpecificUser(nextState.params.user));
		} else if(fetchMethod === 'starred') {
			return store.dispatch(fetchStarredGists());
		} else {
			return store.dispatch(fetchGists());
		}
	//}
}

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
