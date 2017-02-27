import React from 'react';
import $ from 'jquery';

class Suggestions extends React.Component {

    componentDidMount() {
        // Suljetaan dropdown, jos klikataan komponentin ulkopuolelle.
        $(document).on('click', () => this.props.hideSuggestions());
    }

    componentWillUnmount() {
        // Poistetaan kuuntelija, kun komponentti irrotetaan DOM:sta.
        $(document).off('click');
    }

    render() {
        const inputWidth = $('.filter-input').outerWidth();
        const suggestions = this.props.suggestions.map((suggestion) => {
			return (
				<li key={suggestion} onClick={this.props.autoComplete}>
					{suggestion}
				</li>
			);
		});

        return (
            <div className='suggestions' style={{width: inputWidth}}>
                <ul>
                    {suggestions}
                </ul>
            </div>
        );
    }
}

export default Suggestions;
