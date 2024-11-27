import { productCatalogue } from './product-catalogue';

export class Checkout {
	private items: Product[] = [];
	private pricingRules: PricingRule[];

	constructor(pricingRules: PricingRule[]) {
		this.pricingRules = pricingRules;
	}

	scan(sku: string): void {
		const product = productCatalogue[sku];
		if (product) {
			this.items.push(product);
		} else {
			throw new Error(`Product with SKU ${sku} not found.`);
		}
	}

	total(): number {
		let total = 0;
		const itemsToProcess = [...this.items];

		for (const rule of this.pricingRules) {
			total += rule.apply(itemsToProcess);
		}

		// items not handled by rules
		const unprocessedItems = this.items.filter(
			(item) => !this.pricingRules.some((rule) => rule.apply([item]) > 0)
		);
		total += unprocessedItems.reduce((sum, item) => sum + item.price, 0);

		return parseFloat(total.toFixed(2));
	}
}
