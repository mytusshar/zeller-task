import { productCatalogue } from './product-catalogue';

export class AppleTVDeal implements PricingRule {
	apply(items: Product[]): number {
		const atvItems = items.filter((item) => item.sku === 'atv');
		const itemPrice = productCatalogue['atv'].price;
		const itemsNotApplicableToDeal = atvItems.length % 3;
		const itemsApplicableToDeal =
			atvItems.length - itemsNotApplicableToDeal;
		const total =
			(itemsApplicableToDeal / 3) * 2 * itemPrice +
			itemsNotApplicableToDeal * itemPrice;
		return total;
	}
}

export class BulkDiscountOnIPad implements PricingRule {
	apply(items: Product[]): number {
		const ipdItems = items.filter((item) => item.sku === 'ipd');
		if (ipdItems.length > 4) {
			return ipdItems.length * 499.99;
		}
		return ipdItems.reduce((total, item) => total + item.price, 0);
	}
}
