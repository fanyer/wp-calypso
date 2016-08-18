/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';

export default function PlanFeaturesItem( { children, onClick, description } ) {
	const handleClickEvent = ( event ) => {
		onClick( event.currentTarget, description );
	};

	return (
		<div className="plan-features__item">
			<Gridicon
				className="plan-features__item-checkmark"
				size={ 18 } icon="checkmark" />
			{ children }
			<span
				onClick={ handleClickEvent }
				className="plan-features__item-tip-info"
			>
				<Gridicon icon="info-outline" size={ 18 } />
			</span>
		</div>
	);
}
