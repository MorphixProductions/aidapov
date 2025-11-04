import {
	ANTIFLICKER,
	EXPOSURE_MODE,
	GAIN,
	IRIS,
	NOISEREDUCTION3D_MODE,
	SHUTTER,
	WHITEBALANCE_MODE,
	WIDEDYNAMICRANGE_MODE,
} from './commands';
import { requestToken } from './requestToken';
import { NumberRange } from './utils';

export class AidaPOV {
	ready: boolean = false;

	token: string;

	constructor(private ip: string, username: string, password: string) {
		this.ip = ip;

		requestToken(ip, username, password).then(({ valid, login }) => {
			if (!valid) this.throwError(new Error('Invalid login credentials'));
			this.token = login;
			this.ready = true;
		});
	}

	public async getInfo(): Promise<{
		app_version: string;
		bootloader_version: string;
		device_name: string;
		serial_number: string;
		system_version: string;
	}> {
		const body = {
			system: {
				app_version: true,
				bootloader_version: true,
				device_name: true,
				serial_number: true,
				system_version: true,
			},
		};
		const response = await this.request('get', body);
		return response?.system;
	}

	async setExposureMode(mode: (typeof EXPOSURE_MODE)[number]) {
		const body = {
			image: { exposure_mode: mode },
		};
		const response = await this.request('set', body);
		return response?.image?.exposure_mode === mode;
	}

	async getExposureMode(): Promise<(typeof EXPOSURE_MODE)[number]> {
		const body = {
			image: { exposure_mode: true },
		};
		const response = await this.request('get', body);
		return response?.image?.exposure_mode;
	}

	async setShutter(shutter: keyof typeof SHUTTER) {
		const body = {
			image: { shutter: SHUTTER[shutter] },
		};
		const response = await this.request('set', body);
		return response?.image?.shutter === SHUTTER[shutter];
	}

	async getShutter(): Promise<keyof typeof SHUTTER> {
		const body = {
			image: { shutter: true },
		};
		const response = await this.request('get', body);

		if (isNaN(response?.image?.shutter)) return null;

		return Object.keys(SHUTTER).find(
			(key) =>
				SHUTTER[key as keyof typeof SHUTTER] === response.image.shutter
		) as keyof typeof SHUTTER;
	}

	async setExposureGain(gain: keyof typeof GAIN) {
		const body = {
			image: { gain: GAIN[gain] },
		};
		const response = await this.request('set', body);
		return response?.image?.gain === GAIN[gain];
	}

	async getExposureGain(): Promise<keyof typeof GAIN> {
		const body = {
			image: { gain: true },
		};
		const response = await this.request('get', body);
		if (isNaN(response?.image?.gain)) return null;

		return Object.keys(GAIN).find(
			(key) => GAIN[key as keyof typeof GAIN] === response.image.gain
		) as keyof typeof GAIN;
	}

	async setAntiFlicker(frequency: keyof typeof ANTIFLICKER) {
		const body = {
			image: { anti_flicker: ANTIFLICKER[frequency] },
		};
		const response = await this.request('set', body);
		return response?.image?.anti_flicker === ANTIFLICKER[frequency];
	}

	async getAntiFlicker(): Promise<keyof typeof ANTIFLICKER> {
		const body = {
			image: { anti_flicker: true },
		};
		const response = await this.request('get', body);
		if (isNaN(response?.image?.anti_flicker)) return null;
		return Object.keys(ANTIFLICKER).find(
			(key) =>
				ANTIFLICKER[key as keyof typeof ANTIFLICKER] ===
				response.image.anti_flicker
		) as keyof typeof ANTIFLICKER;
	}

	async setWhiteBalanceMode(mode: (typeof WHITEBALANCE_MODE)[number]) {
		const body = {
			image: { WB_mode: mode },
		};
		const response = await this.request('set', body);
		return response?.image?.WB_mode === mode;
	}

	async getWhiteBalanceMode(): Promise<(typeof WHITEBALANCE_MODE)[number]> {
		const body = {
			image: { WB_mode: true },
		};
		const response = await this.request('get', body);
		return response?.image?.WB_mode;
	}

	async setRedGain(value: NumberRange<0, 255>) {
		const body = {
			image: { R_gain: value },
		};
		const response = await this.request('set', body);
		return response?.image?.R_gain === value;
	}

	async getRedGain(): Promise<NumberRange<0, 255>> {
		const body = {
			image: { R_gain: true },
		};
		const response = await this.request('get', body);
		return response?.image?.R_gain;
	}

	async setBlueGain(value: NumberRange<0, 255>) {
		const body = {
			image: { B_gain: value },
		};
		const response = await this.request('set', body);
		return response?.image?.B_gain === value;
	}

	async getBlueGain(): Promise<NumberRange<0, 255>> {
		const body = {
			image: { B_gain: true },
		};
		const response = await this.request('get', body);
		return response?.image?.B_gain;
	}

	async setColorTemperature(value: number) {
		if (value < 1800 || value > 10000) {
			this.throwError(
				new Error('Color temperature must be between 1800 and 10000')
			);
		}

		const body = {
			image: { color_temperature: value },
		};
		const response = await this.request('set', body);
		return response?.image?.color_temperature === value;
	}

	async getColorTemperature(): Promise<number> {
		const body = {
			image: { color_temperature: true },
		};
		const response = await this.request('get', body);
		return response?.image?.color_temperature;
	}

	async setMirror(enabled: boolean) {
		const body = {
			image: { mirror: enabled ? 1 : 0 },
		};
		const response = await this.request('set', body);
		return response?.image?.mirror === (enabled ? 1 : 0);
	}

	async getMirror(): Promise<boolean> {
		const body = {
			image: { mirror: true },
		};
		const response = await this.request('get', body);
		return response?.image?.mirror === 1;
	}

	async setFlip(enabled: boolean) {
		const body = {
			image: { flip: enabled ? 1 : 0 },
		};
		const response = await this.request('set', body);
		return response?.image?.flip === (enabled ? 1 : 0);
	}

	async getFlip(): Promise<boolean> {
		const body = {
			image: { flip: true },
		};
		const response = await this.request('get', body);
		return response?.image?.flip === 1;
	}

	async setBacklightCompensation(enabled: boolean) {
		const body = {
			image: { backlight_compensation: enabled ? 1 : 0 },
		};
		const response = await this.request('set', body);
		return response?.image?.backlight_compensation === (enabled ? 1 : 0);
	}

	async getBacklightCompensation(): Promise<boolean> {
		const body = {
			image: { backlight_compensation: true },
		};
		const response = await this.request('get', body);
		return response?.image?.backlight_compensation === 1;
	}

	async setGamma(value: NumberRange<0, 4>) {
		const body = {
			image: { gamma: value },
		};
		const response = await this.request('set', body);
		return response?.image?.gamma === value;
	}

	async getGamma(): Promise<NumberRange<0, 4>> {
		const body = {
			image: { gamma: true },
		};
		const response = await this.request('get', body);
		return response?.image?.gamma;
	}

	async setWideDynamicRange(mode: (typeof WIDEDYNAMICRANGE_MODE)[number]) {
		const body = {
			image:
				mode == 'Off'
					? { WDR_enable: 0, WDR_level: 1 }
					: { WDR_enable: 1, WDR_level: mode },
		};
		const response = await this.request('set', body);
		return response?.image?.WDR_mode === mode;
	}

	async getWideDynamicRange(): Promise<
		(typeof WIDEDYNAMICRANGE_MODE)[number]
	> {
		const body = {
			image: { WDR_enable: true, WDR_level: true },
		};
		const response = await this.request('get', body);

		if (response?.image?.WDR_enable === 0) return 'Off';
		return response?.image?.WDR_level;
	}

	async setBrightness(value: NumberRange<0, 15>) {
		const body = {
			image: { brightness: value },
		};
		const response = await this.request('set', body);
		return response?.image?.brightness === value;
	}

	async getBrightness(): Promise<NumberRange<0, 15>> {
		const body = {
			image: { brightness: true },
		};
		const response = await this.request('get', body);
		return response?.image?.brightness;
	}

	async setSharpness(value: NumberRange<0, 15>) {
		const body = {
			image: { sharpness: value },
		};
		const response = await this.request('set', body);
		return response?.image?.sharpness === value;
	}

	async getSharpness(): Promise<NumberRange<0, 15>> {
		const body = {
			image: { sharpness: true },
		};
		const response = await this.request('get', body);
		return response?.image?.sharpness;
	}

	async setContrast(value: NumberRange<0, 15>) {
		const body = {
			image: { contrast: value },
		};
		const response = await this.request('set', body);
		return response?.image?.contrast === value;
	}

	async getContrast(): Promise<NumberRange<0, 15>> {
		const body = {
			image: { contrast: true },
		};
		const response = await this.request('get', body);
		return response?.image?.contrast;
	}

	async setSaturation(value: NumberRange<0, 15>) {
		const body = {
			image: { saturation: value },
		};
		const response = await this.request('set', body);
		return response?.image?.saturation === value;
	}

	async getSaturation(): Promise<NumberRange<0, 15>> {
		const body = {
			image: { saturation: true },
		};
		const response = await this.request('get', body);
		return response?.image?.saturation;
	}

	async set2dNoiseReduction(enabled: boolean) {
		const body = {
			image: { noise_reduction_2D: enabled ? 1 : 0 },
		};
		const response = await this.request('set', body);
		return response?.image?.noise_reduction_2D === (enabled ? 1 : 0);
	}

	async get2dNoiseReduction(): Promise<boolean> {
		const body = {
			image: { noise_reduction_2D: true },
		};
		const response = await this.request('get', body);
		return response?.image?.noise_reduction_2D === 1;
	}

	async set3dNoiseReduction(mode: keyof typeof NOISEREDUCTION3D_MODE) {
		const body = {
			image: { noise_reduction_3D: NOISEREDUCTION3D_MODE[mode] },
		};
		const response = await this.request('set', body);
		return (
			response?.image?.noise_reduction_3D === NOISEREDUCTION3D_MODE[mode]
		);
	}

	async get3dNoiseReduction(): Promise<keyof typeof NOISEREDUCTION3D_MODE> {
		const body = {
			image: { noise_reduction_3D: true },
		};
		const response = await this.request('get', body);
		if (isNaN(response?.image?.noise_reduction_3D)) return null;
		return Object.keys(NOISEREDUCTION3D_MODE).find(
			(key) =>
				NOISEREDUCTION3D_MODE[
					key as keyof typeof NOISEREDUCTION3D_MODE
				] === response.image.noise_reduction_3D
		) as keyof typeof NOISEREDUCTION3D_MODE;
	}

	async getRTSPUrl(type: 'main' | 'sub' = 'main'): Promise<string> {
		const body = {
			venc: { main: type === 'main', sub: type === 'sub' },
		};
		const response = await this.request('get', body);
		return response?.venc?.[type]?.rtspUrl;
	}

	async getRTMPUrl(type: 'main' | 'sub' = 'main'): Promise<string> {
		const body = {
			venc: { main: type === 'main', sub: type === 'sub' },
		};
		const response = await this.request('get', body);
		return response?.venc?.[type]?.rtmpUrl;
	}

	async getFLVUrl(type: 'main' | 'sub' = 'main'): Promise<string> {
		const body = {
			venc: { main: type === 'main', sub: type === 'sub' },
		};
		const response = await this.request('get', body);
		return response?.venc?.[type]?.httpFlvUrl;
	}

	async getWebRTCUrl(type: 'main' | 'sub' = 'main'): Promise<string> {
		const body = {
			venc: { main: type === 'main', sub: type === 'sub' },
		};
		const response = await this.request('get', body);
		return response?.venc?.[type]?.webRtcUrl;
	}

	private throwError(error: Error) {
		if (typeof this._onError === 'function') return this._onError(error);
		throw error;
	}

	private _onError: ((error: Error) => void) | null = null;
	public async onError(callback: (error: Error) => void) {
		this._onError = callback;
	}

	public async whenReady() {
		if (this.ready) return;

		return new Promise<void>((resolve) => {
			const interval = setInterval(() => {
				if (!this.ready) return;

				clearInterval(interval);
				resolve();
			}, 100);
		});
	}

	private async request(func: 'get' | 'set', bodyData: any) {
		try {
			const endPoint = `http://${this.ip}/cgi-bin/web.fcgi?func=${func}`;
			const body = { key: this.token, ...bodyData };
			const request = await fetch(endPoint, {
				method: 'POST',
				body: JSON.stringify(body),
			});
			return await request.json();
		} catch (error) {
			this.throwError(error);
			return null;
		}
	}
}
