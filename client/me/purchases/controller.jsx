/**
 * External Dependencies
 */
import { partial } from 'lodash';
import page from 'page';
import React from 'react';
import i18n from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import AddCardDetails from './payment/add-card-details';
import CancelPrivateRegistration from './cancel-private-registration';
import CancelPurchase from './cancel-purchase';
import ConfirmCancelDomain from './confirm-cancel-domain';
import EditCardDetails from './payment/edit-card-details';
import Main from 'components/main';
import ManagePurchase from './manage-purchase';
import NoSitesMessage from 'components/empty-content/no-sites-message';
import notices from 'notices';
import paths from './paths';
import PurchasesHeader from './list/header';
import PurchasesList from './list';
import { receiveSite } from 'state/sites/actions';
import { recordPageView, renderPage, setTitle } from 'lib/react-helpers';
import { setAllSitesSelected, setSelectedSiteId } from 'state/ui/actions';
import sitesFactory from 'lib/sites-list';
import supportPaths from 'lib/url/support';
import titles from './titles';
import userFactory from 'lib/user';

const recordPurchasesPageView = partial( recordPageView, partial.placeholder, 'Purchases' );
const setPurchasesTitle = partial( setTitle, titles.purchases );
const sites = sitesFactory();
const user = userFactory();

/**
 * Populates `state.sites` and `state.ui` with the currently selected site.
 * TODO: Remove this once `sites-list` is removed from Calypso.
 *
 * @param {String} siteSlug - The slug of a site.
 * @param {Function} dispatch - Redux dispatcher
 */
const setSelectedSite = ( siteSlug, dispatch ) => {
	const setSelectedSiteCalls = () => {
		sites.setSelectedSite( siteSlug );
		const selectedSite = sites.getSelectedSite();
		dispatch( receiveSite( selectedSite ) );
		dispatch( setSelectedSiteId( selectedSite.ID ) );
	};

	if ( sites.select( siteSlug ) ) {
		setSelectedSiteCalls();
	} else if ( ! sites.initialized ) {
		sites.once( 'change', setSelectedSiteCalls );
	} else {
		// this is an edge case where the user has a purchase on a site they no
		// longer have access to.
		dispatch( setAllSitesSelected() );
	}
};

export default {
	addCardDetails( context ) {
		setPurchasesTitle(
			titles.addCardDetails
		);

		recordPurchasesPageView(
			paths.addCardDetails(),
			'Add Card Details'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<AddCardDetails
				purchaseId={ parseInt( context.params.purchaseId, 10 ) } />
		);
	},

	cancelPrivateRegistration( context ) {
		setPurchasesTitle(
			titles.cancelPrivateRegistration
		);

		recordPurchasesPageView(
			paths.cancelPrivateRegistration(),
			'Cancel Private Registration'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<CancelPrivateRegistration
				purchaseId={ parseInt( context.params.purchaseId, 10 ) }
			/>
		);
	},

	cancelPurchase( context ) {
		setPurchasesTitle(
			titles.cancelPurchase
		);

		recordPurchasesPageView(
			paths.cancelPurchase(),
			'Cancel Purchase'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<CancelPurchase
				purchaseId={ parseInt( context.params.purchaseId, 10 ) }
			/>
		);
	},

	confirmCancelDomain( context ) {
		setPurchasesTitle(
			titles.confirmCancelDomain
		);

		recordPurchasesPageView(
			paths.confirmCancelDomain(),
			'Confirm Cancel Domain'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<ConfirmCancelDomain
				purchaseId={ parseInt( context.params.purchaseId, 10 ) }
			/>
		);
	},

	editCardDetails( context ) {
		setPurchasesTitle(
			titles.editCardDetails
		);

		recordPurchasesPageView(
			paths.editCardDetails(),
			'Edit Card Details'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<EditCardDetails
				cardId={ context.params.cardId }
				purchaseId={ parseInt( context.params.purchaseId, 10 ) } />
		);
	},

	list( context ) {
		setPurchasesTitle();

		recordPurchasesPageView(
			paths.list()
		);

		renderPage(
			context,
			<PurchasesList
				sites={ sites }
				noticeType={ context.params.noticeType }
			/>
		);
	},

	listNotice( context ) {
		page.redirect( paths.list() );

		const { noticeType } = context.params;

		if ( noticeType === 'cancel-success' ) {
			notices.success( i18n.translate(
				'Your purchase was canceled and refunded. The refund may take up to ' +
				'7 days to appear in your PayPal/bank/credit card account.'
			), { persistent: true } );
		}

		if ( noticeType === 'cancel-problem' ) {
			notices.error( i18n.translate(
				'There was a problem canceling your purchase. ' +
				'Please {{a}}contact support{{/a}} for more information.',
				{
					components: {
						a: <a href={ supportPaths.CALYPSO_CONTACT } />
					}
				}
			), { persistent: true } );
		}
	},

	managePurchase( context ) {
		setPurchasesTitle(
			titles.managePurchase
		);

		recordPurchasesPageView(
			paths.managePurchase(),
			'Manage Purchase'
		);

		setSelectedSite( context.params.site, context.store.dispatch );

		renderPage(
			context,
			<ManagePurchase
				purchaseId={ parseInt( context.params.purchaseId, 10 ) }
				destinationType={ context.params.destinationType }
			/>
		);
	},

	noSitesMessage( context, next ) {
		if ( user.get().site_count > 0 ) {
			return next();
		}

		setPurchasesTitle();

		recordPurchasesPageView(
			context.path,
			'No Sites'
		);

		renderPage(
			context,
			<Main>
				<PurchasesHeader section={ 'purchases' } />
				<NoSitesMessage />
			</Main>
		);
	}
};
