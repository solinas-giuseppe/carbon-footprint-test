import type { CarbonApiResponse, CarbonObject } from './props'

const roundToNonZero = (number) => {
	let decimals = 0
	while (Math.abs(Number(number.toFixed(decimals))) === 0) {
		decimals++
	}
	return Number(number.toFixed(decimals))
}

export const parseCarbonResult = (carbonResult: CarbonApiResponse): CarbonObject => {
	const { cleanerThan, green, bytes, statistics } = carbonResult || {}
	const { co2, energy } = statistics || {}
	const { grid } = co2
	const { grams } = grid || {}
	return {
		cleanerThan,
		green: String(green) === 'true',
		bytes,
		grams: grams !== undefined ? Math.round(grams * 100) / 100 : undefined,
		energy: energy !== undefined ? roundToNonZero(energy) : undefined,
		timestamp: parseInt(import.meta.env.DEFAULT_TIMESTAMP) || new Date().getTime()
	}
}
