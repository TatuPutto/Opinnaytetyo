//Reducer discover-toiminnallisuuden sivunumerointia varten
export function pagination(state = {
	currentPage: 1,
	nextPage: 2,
	lastPage: null	
}, action) {
	switch(action.type) {
		case 'UPDATE_PAGINATION': 
			return {
				currentPage: action.current,
				nextPage: action.next,
				previousPage: action.current - 1,
				lastPage: action.last
			}
			break;
		default:
			return state;
	}
}