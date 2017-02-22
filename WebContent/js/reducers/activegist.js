
//Käsittelijä-funktio aktiivisen gistin hallintaan.
export function activeGist(state = {
	gist: {},
	gistId: null,
	isStarred: null,
	isFetching: false,
	fetchError: null,
	comments: []
}, action) {
	switch(action.type) {
		//Mitätöidään aktiivinen gist.
		case 'INVALIDATE_GIST':
			return {...state, gist: {}, gistId: null};
			break;
		//Aktiivisen gistin hakeminen aloitettiin.
		case 'REQUEST_SELECTED_GIST':
			return {...state, gistId: action.gistId, isFetching: true};
			break;
		//Aktiivisen gistin hakeminen onnistui.
		case 'RECEIVE_SELECTED_GIST':
			return {...state, gist: action.activeGist, isFetching: false};
			break;
		//Aktiivisen gistin hakeminen onnistui.
		case 'GIST_FETCH_FAILED':
			return {...state, gist: {}, isFetching: false, fetchError: action.error};
			break;
		case 'STARRED':
			return {
				...state,
				isStarred: true,
				isStarring: false
			};
			break;
		case 'NOT_STARRED':
			return {
				...state,
				isStarred: false,
				isStarring: false
			};
			break;
		case 'STARRING':
			return {
				...state,
				isStarring: true
			};
			break;
		case 'RECEIVE_COMMENTS':
			return {...state, comments: action.comments};
			break;
		default:
			return state;
	}
}
