export const EXPOSURE_MODE = ['auto', 'manual'] as const;

export const SHUTTER = {
	'1/60': 6,
	'1/90': 7,
	'1/100': 8,
	'1/125': 9,
	'1/180': 10,
	'1/250': 11,
	'1/350': 12,
	'1/500': 13,
	'1/725': 14,
	'1/1000': 15,
	'1/1500': 16,
	'1/2000': 17,
	'1/3000': 18,
	'1/4000': 19,
	'1/6000': 20,
	'1/10000': 21,
};

export const GAIN = {
	'0dB': 0,
	'2dB': 1,
	'4dB': 2,
	'6dB': 3,
	'8dB': 4,
	'10dB': 5,
	'12dB': 6,
	'14dB': 7,
	'16dB': 8,
	'18dB': 9,
	'20dB': 10,
	'22dB': 11,
	'24dB': 12,
	'26dB': 13,
	'28dB': 14,
	'30dB': 15,
};

export const IRIS = {
	Close: 0,
	'F14.0': 1,
	'F11.0': 2,
	'F9.6': 3,
	'F8.0': 4,
	'F6.8': 5,
	'F5.6': 6,
	'F4.8': 7,
	'F4.0': 8,
	'F3.4': 9,
	'F2.8': 10,
	'F2.4': 11,
	'F2.0': 12,
	'F1.8': 13,
};

export const ANTIFLICKER = {
	Off: 0,
	'50Hz': 1,
	'60Hz': 2,
};

export const WHITEBALANCE_MODE = [
	'auto',
	'indoor',
	'outdoor',
	'one push',
	'auto tracking',
	'manual',
	'temperature',
] as const;

export const WIDEDYNAMICRANGE_MODE = ['Off', 1, 2, 3, 4, 5, 6] as const;

export const NOISEREDUCTION3D_MODE = {
	Off: 5,
	Auto: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 4,
};
