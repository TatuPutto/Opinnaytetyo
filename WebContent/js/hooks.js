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
//	if(shouldFetch(store.getState(), fetchMethod, nextState.params.page)) {
		if(fetchMethod === 'discover') {
			return store.dispatch(fetchLatestPublicGists(nextState.params.page));
		} else if(fetchMethod === 'search') {
			return store.dispatch(fetchGistsBySpecificUser(nextState.params.user));
		} else if(fetchMethod === 'starred') {
			return store.dispatch(fetchStarredGists());
		} else {
			return store.dispatch(fetchGists());
			//return store.dispatch(fetchGists(fetchMethod, page, user));
		}

	// }
}

// Haetaan gist näkymään saavuttaessa.
export function fetchSelectedGistOnEnter(nextState) {
	const state = store.getState();
	const activeGistId = state.activeGist.id;
	const requestedGistId = nextState.params.gistId;



	// Haetaan gist, jos tilaan ei ole tallennettu gistiä
	// tai käyttäjän pyytämä gist ei vastaa tilaan tallennettua gist.
	if(activeGistId === null || activeGistId !== requestedGistId) {
		return store.dispatch(fetchSelectedGist(requestedGistId));
	}
}
