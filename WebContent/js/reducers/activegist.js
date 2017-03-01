
//Käsittelijä-funktio aktiivisen gistin hallintaan.
export function activeGist(state = {
	id: null,
	name: null,
	description: null,
	createdAt: null,
	updatedAt: null,
	createdAtUnformatted: null,
	updatedAtUnformatted: null,
	files: [],
	//comments: [],
	owner: null,
	isPublic: null,
	forkInfo: null,
	isStarred: null,
	isFetching: false,
	isFetchingFiles: false,
	isForking: false,
	fetchError: null,
}, action) {
	switch(action.type) {
		//Mitätöidään aktiivinen gist.
		case 'INVALIDATE_GIST':
			return {
				id: null,
				name: null,
				description: null,
				createdAt: null,
				updatedAt: null,
				createdAtUnformatted: null,
				updatedAtUnformatted: null,
				files: [],
				owner: null,
				createdAt: null,
				updatedAt: null,
				isPublic: null,
				forkInfo: null,
				isFetching: false,
			};
			break;
		//Aktiivisen gistin hakeminen aloitettiin.
		case 'REQUEST_SELECTED_GIST':
			return {
				...state,
				id: action.id,
				isFetching: true,
				name: null,
				description: null,
				createdAt: null,
				updatedAt: null,
				createdAtUnformatted: null,
				updatedAtUnformatted: null,
				files: [],
				owner: null,
				createdAt: null,
				updatedAt: null,
				isPublic: null,
				forkInfo: null,
			};
			break;
		//Aktiivisen gistin hakeminen onnistui.
		case 'RECEIVE_SELECTED_GIST':
			return {
				...state,
				name: action.gist.files[0].filename,
				description: action.gist.description,
				files: action.gist.files,
				owner: action.gist.owner,
				createdAt: action.gist.createdAt,
				updatedAt: action.gist.updatedAt,
				createdAtUnformatted: action.gist.createdAtUnformatted,
				updatedAtUnformatted: action.gist.updatedAtUnformatted,
				isPublic: action.gist.isPublic,
				forkInfo: action.gist.forkInfo,
				isFetching: false,
			};
			break;
/*
		case 'RECEIVE_SELECTED_GIST_INFO':
			return {
				...state,
				id: action.gist.id,
				name: action.gist.files[0].filename,
				description: action.gist.description,
				owner: action.gist.owner,
				isPublic: action.gist.isPublic,
				isFetching: false,
			};
			break;

		case 'REQUEST_SELECTED_GIST_FILES':
			return {...state, isFetchingFiles: true};
			break;

		case 'RECEIVE_SELECTED_GIST_FILES':
			return {...state, files: action.files, isFetchingFiles: false};
			break;

*/
		//Aktiivisen gistin hakeminen onnistui.
		case 'GIST_FETCH_FAILED':
			return {...state, gist: {}, isFetching: false, fetchError: action.error};
			break;
		case 'STARRED':
			return {
				...state,
				isStarred: true,
			};
			break;
		case 'NOT_STARRED':
			return {
				...state,
				isStarred: false,
			};
			break;
		case 'FORKING':
			return {
				...state,
				isForking: true,
			};
			break;
		case 'FORKED':
			return {
				...state,
				isForking: false,
			};
			break;
	/*	case 'RECEIVE_COMMENTS':
			return {...state, comments: action.comments};
			break;*/
		default:
			return state;
	}
}
