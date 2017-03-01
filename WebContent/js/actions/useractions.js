import {store} from '../createStore';

export const accessToken = '099696c5964f977be8e104bbbb440d8c0821bf4f';

let currentState;
// let accessToken;

// Haetaan access token välimuistista.
export function getAccessToken() {
	currentState = store.getState();
	// accessToken = currentState.user.accessToken;
}


export function requestUserInfo() {
	return {type: 'FETCH_USER_INFO_REQUEST'};
}

export function receiveUserInfo() {
	return {
		type: 'FETCH_USER_INFO_SUCCESS',
		id: '5699778',
		userLogin: 'TatuPutto',
		avatarUrl: 'https://avatars.githubusercontent.com/u/5699778?v=3',
		accessToken: 'd6785ed1efeb0272cad529a2b375369350527b88',
	};
}

export function userInfoFetchFailed() {
	return {type: 'FETCH_USER_INFO_FAILURE'};
}


export function fetchUserInfo() {
	return (dispatch) => {
		dispatch(receiveUserInfo());
		// getAccessToken();
	};
}
