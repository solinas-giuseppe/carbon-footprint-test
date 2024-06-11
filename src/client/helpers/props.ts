export type CarbonApiResponse = {
	url: string
	green: boolean | string
	bytes: number
	cleanerThan: number
	rating: string
	statistics: {
		adjustedBytes: number
		energy: number
		co2: {
			grid: {
				grams: number
				litres: number
			}
			renewable: {
				grams: number
				litres: number
			}
		}
	}
	timestamp: number
}

export type CarbonObject = {
	cleanerThan: number | undefined
	green: boolean | undefined
	bytes: number | undefined
	grams: number | undefined
	energy: number | undefined
	timestamp: number | undefined
}
