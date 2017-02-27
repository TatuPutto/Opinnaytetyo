//Käsittelijä-funktio gistien hallintaan.
export function gists(state = {
	fetchMethod: 'gists',
	fetchError: null,
	isFetching: true,
	items: []
}, action) {
	switch(action.type) {
		//Poistetaan id:tä vastaava gist listattavista gisteistä.
		case 'REMOVE_GIST_FROM_LIST':
			return  {
				...state,
				items: state.items.filter(item => item.id !== action.id)
			};
			break;
/*
		//@actions.js
		//Ilmoitetaan haun alkamisesta.
		function requestGists(fetchMethod) {
			return {type: 'FETCH_GISTS_REQUEST', fetchMethod};
		}
*/
		//@gists.js - gistien osalta tilaa hallitseva käsittelijä-funktio.
		//Päivitetään sovelluksen tila vastaamaan haun tilannetta.
		case 'FETCH_GISTS_REQUEST':
			return {...state, fetchMethod: action.fetchMethod, isFetching: true};
			break;

/*

		//@actions.js
		function receiveGists(gists) {
			return {type: 'FETCH_GISTS_SUCCESS', gists, fetchedAt: new Date().getTime() / 1000};
		}
*/
		//@gists.js
		case 'FETCH_GISTS_SUCCESS':
			return {
				...state,
				items: action.gists,
				fetchedAt: action.fetchedAt,
				isFetching: false,
				fetchError: null,
			};
			break;


/*
		//@actions.js
		function gistsFetchFailed(error) {
			return {type: 'GISTS_FETCH_FAILURE', isFetching: false, error};
		}
*/
		//@gists.js
		case 'GISTS_FETCH_FAILURE':
			return {...state, items: [], fetchError: action.error, isFetching: false};
			break;


		//Palautetaan vakioarvot tai nykyinen tila gistien osalta,
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
