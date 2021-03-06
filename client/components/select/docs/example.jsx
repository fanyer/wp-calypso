/**
* External dependencies
*/
var React = require( 'react' ),
	PureRenderMixin = require( 'react-pure-render/mixin' );

var Selects = React.createClass( {
	mixins: [ PureRenderMixin ],

	render: function() {
		return (
			<div className="design-assets__group">
				<h2>
					<a href="/devdocs/design/selects">Selects</a>
				</h2>
				<label>Label
					<select>
						<option>Item One</option>
						<option>Item Two</option>
						<option>Item Three</option>
						<option>Item Four</option>
					</select>
				</label>

				<br/>

				<p>
					Pack my
					<select className="is-compact">
						<option>box</option>
						<option>closet</option>
						<option>suitcase</option>
					</select>
					with
					<select className="is-compact" defaultValue={ 10 }>
						<option>5</option>
						<option>10</option>
						<option>15</option>
					</select>
					dozen liquor jugs.
				</p>
			</div>
		);
	}
} );

module.exports = Selects;
