import { Checkout } from './checkout';
import { AppleTVDeal, BulkDiscountOnIPad } from './pricing-rules';

/********* case 1 ********/
const pricingRules1 = [new AppleTVDeal(), new BulkDiscountOnIPad()];
const co1 = new Checkout(pricingRules1);

co1.scan('atv');
co1.scan('atv');
co1.scan('atv');
co1.scan('atv');

const total1 = co1.total();
console.log(`Order total 1: ${total1} ## Expected: ${109.5 * 2 + 1 * 109.5}`);

/********* case 2 ********/
const pricingRules2 = [new AppleTVDeal(), new BulkDiscountOnIPad()];
const co2 = new Checkout(pricingRules2);

// co2.scan('atv');
// co2.scan('atv');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
co2.scan('ipd');
const total2 = co2.total();
console.log('Order total 2: ', total2);
