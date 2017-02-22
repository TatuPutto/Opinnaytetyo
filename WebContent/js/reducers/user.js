//Reducer-funktio käyttäjätietojen hallintaan
export function user(state = {
	userLogin: 'Anonyymi',
	avatarUrl: 'https://avatars3.githubusercontent.com/u/5699778?v=3&s=40',
	accessToken: null
}, action) {
	switch(action.type) {
		case 'FETCH_USER_INFO_SUCCESS':
			return {
				id: action.id,
				userLogin: action.userLogin,
				avatarUrl: action.avatarUrl,
				accessToken: action.accessToken
			}
			break;
		default:
			return state;
	}
}
