//Käsittelijä-funktio gistien hallintaan.
export function gists(state = {
	fetchMethod: 'gists',
	fetchError: null,
	isFetching: true,
	items: []
}, action) {
	switch(action.type) {
		case 'REMOVE_GIST_FROM_LIST':
			return  {
				...state,
				items: state.items.filter(item => item.id !== action.id)
			};
			break;
		case 'FETCH_GISTS_REQUEST':
			return {...state, fetchMethod: action.fetchMethod, isFetching: true};
			break;
		case 'FETCH_GISTS_SUCCESS':
			return {
				...state,
				items: action.gists,
				fetchedAt: action.fetchedAt,
				isFetching: false,
				fetchError: null,
			};
			break;
		case 'GISTS_FETCH_FAILURE':
			return {...state, items: [], fetchError: action.error, isFetching: false};
			break;
		//Palautetaan vakioarvot tai nykyinen tila gistien osalta,
		//jos action ei vastannut yhtäkään case-tapausta
		default:
			return state;
	}
}
