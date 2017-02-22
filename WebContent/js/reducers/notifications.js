export function notifications(state = {
	isOpen: false,
	notificationType: null,
	message: null
}, action) {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return {
				isOpen: true,
				notificationType: action.notificationType,
				message: action.message
			};
			break;
	    case 'CLOSE_NOTIFICATION':
	    	return {
				isOpen: false,
				message: null
			};
			break;
	    default:
	    	return state;
	}
}
