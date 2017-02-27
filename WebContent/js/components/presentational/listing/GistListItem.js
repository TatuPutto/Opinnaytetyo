import React from 'react';
import {Link} from 'react-router';

class GistListItem extends React.Component {

	render() {
		const {
			owner,
			id,
			activeGistId,
			updatedAt,
			language,
			setActive,
			addFilter,
			color,
		} = this.props;
		let {filename, description} = this.props;


		if(filename) {
			// Lyhennetään gistin nimeä, jos nimi on yli 80 merkkiä pitkä
			filename = ((owner.length + filename.length) < 80) ?
					filename : filename.substring(0, 80) + '...';
		}

		if(description) {
			// Lyhennetään kuvausta, jos kuvaus on yli 150 merkkiä pitkä
			description = (description.length <= 150) ?
					description : description.substring(0, 150) + '...';
		}

		// Määritetään ohjelmointikielen sisältävän <span> elementin taustaväri.
		const languageSpanColor = {backgroundColor: color};

		//Tarkistetaan onko tämä gist asetettu aktiiviseksi.
		const isActive = activeGistId === id ?
				'single-gist active' : 'single-gist';

		//Palautetaan gistin tietojen pohjalta muodostettu <li>-elementti.
		return (
			<li className={isActive} id={id} onClick={() => setActive(id)}>
				<div className='content-wrapper'>
					<h2 className='title'>
						<Link to={'/opinnaytetyo/search/' + owner}>
							{owner}
						</Link>
						&nbsp;/&nbsp;
						<Link to={'/opinnaytetyo/gist/' + id}>
							{filename}
						</Link>
					</h2>
					<div className='description'>
						{description}
					</div>
					<span className='created'>
						Luotu: {updatedAt}
					</span>
					{language &&
						<span
							className='language'
							onClick={() => addFilter(language)}
							style={{backgroundColor: color}}
						>
							<i className='fa fa-tag' /> {language}
						</span>
					}
				</div>
			</li>
		);
	}


}

export default GistListItem;
