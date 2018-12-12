import Pricing from '../oanda/pricing';
import { EventEmitter } from 'events';

class Signal {
	private pricing: Pricing;
	private stream: EventEmitter;

	constructor(pricing: Pricing) {
		this.pricing = pricing;
		this.stream = new EventEmitter();
	}

	public runStream() {
		this.pricing.stream(['EUR_USD'], this.stream);
	}

	public stopStream() {
		this.stream.emit('stopTick');
	}

	public get priceStream() {
		return this.stream;
	}
}

export default Signal;
