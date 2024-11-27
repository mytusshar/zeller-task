interface Product {
	sku: string;
	name: string;
	price: number;
}

interface PricingRule {
	apply(items: Product[]): number;
}
