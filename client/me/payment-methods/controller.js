/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import AddCreditCard from 'me/payment-methods/add-credit-card';
import * as paths from './paths';
import { recordPageView, renderPage, setTitle } from 'lib/react-helpers';
import * as titles from './titles';

export function addCreditCard( context ) {
	setTitle(
		titles.paymentMethods,
		titles.addCreditCard
	);

	recordPageView(
		paths.addCreditCard(),
		'Payment Methods',
		'Add Credit Card'
	);

	renderPage(
		context,
		<AddCreditCard />
	);
}
