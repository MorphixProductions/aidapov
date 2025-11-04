import { AidaPOV } from './AidaPOV';
import { GAIN, IRIS, SHUTTER } from './commands';
import { delay } from './utils';

declare const process: any;
const password = (process as any).argv[2];

if (password == null)
	throw new Error('Please provide the password as the first argument.');

async function main() {
	const cam = new AidaPOV('10.99.0.122', 'admin', password);

	cam.onError((error) => {
		console.error('Error occurred:', error.message);
	});

	await cam.whenReady();

	// const rtsp = await cam.getRTSPUrl('main');
	// const rtmp = await cam.getRTMPUrl('main');
	// const flv = await cam.getFLVUrl('main');
	// const webrtc = await cam.getWebRTCUrl('main');
	// console.log('Current mode:', { rtsp, rtmp, flv, webrtc });

	const info = await cam.getInfo();
	console.log('Camera info:', info);

	// cam.setSaturation(2);

	// cam.setWideDynamicRange(6);

	// const shutters = Object.keys(SHUTTER);
	// for (let i = 0; i < shutters.length; i++) {
	// 	console.log('Setting shutter to', shutters[i]);
	// 	await cam.setShutter(shutters[i] as keyof typeof SHUTTER);

	// 	await delay(3000);
	// }
}

main();
