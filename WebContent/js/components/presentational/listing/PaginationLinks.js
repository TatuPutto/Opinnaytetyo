import React from 'react';
import {Link} from 'react-router';


class PaginationLinks extends React.Component {
	render() {
		const {currentPage, nextPage, previousPage, lastPage} = this.props;
		let links = [];

		if(currentPage > 1) {
			const link = <Link key={'previousPage'} to={'/opinnaytetyo/discover/' + previousPage}>
				<button><i className='fa fa-chevron-left'></i></button>
			</Link>
			links.push(link);
		}

		if(currentPage > 3) {
			const link = <Link key={1} to='/opinnaytetyo/discover'>
				<button>1</button>
			</Link>
			links.push(link);
		}

		for(let i = -2; i < 3; i++) {
			const page = Number(currentPage) + i;
			const isCurrentPage = Number(currentPage) + i === Number(currentPage);
			const isCurrentPageClass = isCurrentPage ? 'current-page' : null;

			if(page > 0 && page < 30) {
				const link = <Link key={page} to={'/opinnaytetyo/discover/' + page}>
					<button className={isCurrentPageClass} disabled={isCurrentPage}>
						{page}
					</button>
				</Link>
				links.push(link);
			}
		}

		if(currentPage < 28) {
			const link = <Link key={30} to='/opinnaytetyo/discover/30'>
				<button>30</button>
			</Link>
			links.push(link);
		}

		if(currentPage < 30) {
			const page = Number(currentPage) + 1;
			const link = <Link key={'nextPage'} to={'/opinnaytetyo/discover/' + page}>
				<button><i className='fa fa-chevron-right'></i></button>
			</Link>
			links.push(link);
		}

		return (
			<div className='pagination'>
				<div className='pagination-links'>
					{links}
				</div>
			</div>
		);


	}
}

export default PaginationLinks;
