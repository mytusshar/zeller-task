import { AppleTVDeal, BulkDiscountOnIPad } from '../src/pricing-rules';
import { Checkout } from '../src/checkout';

test('All apple tv gets offer', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('atv');
	co.scan('atv');
	co.scan('atv');
	co.scan('vga');

	expect(co.total()).toBe(109.5 * 2 + 30.0);
});

test('One apple tv doest not qualify for offer, rest do', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('atv');
	co.scan('atv');
	co.scan('atv');
	co.scan('atv');

	expect(co.total()).toBe(109.5 * 2 + 1 * 109.5);
});

test('All apple TVs gets offer, other items does not', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('atv');
	co.scan('atv');
	co.scan('mbp');
	co.scan('atv');
	co.scan('vga');
	co.scan('atv');
	co.scan('ipd');
	co.scan('atv');
	co.scan('atv');

	expect(co.total()).toBe(109.5 * 4 + 1399.99 + 549.99 + 30.0);
});

test('iPad gets offer, but apple tv doest not', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('atv');
	co.scan('ipd');
	co.scan('ipd');
	co.scan('atv');
	co.scan('ipd');
	co.scan('ipd');
	co.scan('ipd');

	expect(co.total()).toBe(5 * 499.99 + 109.5 * 2);
});

test('iPad does not qualify for offer', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('ipd');
	co.scan('ipd');
	co.scan('ipd');
	co.scan('ipd');

	expect(co.total()).toBe(4 * 549.99);
});

test('Apple TV and iPad both qualify for offers', () => {
	const pricingRules = [new AppleTVDeal(), new BulkDiscountOnIPad()];
	const co = new Checkout(pricingRules);

	co.scan('atv');
	co.scan('ipd');
	co.scan('ipd');
	co.scan('ipd');
	co.scan('atv');
	co.scan('ipd');
	co.scan('atv');
	co.scan('ipd');
	co.scan('atv');

	expect(co.total()).toBe(5 * 499.99 + 109.5 * 2 + 1 * 109.5);
});
