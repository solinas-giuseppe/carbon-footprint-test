export const buttonBase = 'block text-semibold focus:outline-none'

const roundedRegular = [
	'[&.button-xl]:rounded-4',
	'[&.button-lg]:rounded-4',
	'[&.button-md]:rounded-4',
	'[&.button-sm]:rounded-2'
]
const roundedFocus = [
	...roundedRegular,
	'[&.button-xl]:focus:rounded-5',
	'[&.button-lg]:focus:rounded-5',
	'[&.button-md]:focus:rounded-5',
	'[&.button-sm]:focus:rounded-5'
]
export const buttonPrimary = [
	'bg-primary-600',
	'text-base-000',
	'hover:bg-primary-900',
	'disabled:bg-primary-100',
	'disabled:text-primary-900',
	'focus:shadow-blue',
	...roundedFocus
]
export const buttonSecondary = [
	'bg-primary-100',
	'text-primary-900',
	'disabled:bg-primary-100',
	'disabled:opacity-75',
	'disabled:text-primary-400',
	'focus:shadow-green',
	...roundedRegular
]
export const buttonSecondaryNeutral = [
	'border-[0.094rem]',
	'border-base-500',
	'text-base-700',
	'disabled:text-base-500',
	'focus:shadow-green',
	...roundedFocus
]
export const buttonTertiary = [
	'!p-0.5',
	'rounded-1',
	'text-primary-600',
	'underline-offset-[20%]',
	'hover:underline',
	'hover:font-semibold',
	'disabled:text-base-500',
	'focus:shadow-blue',
	'focus:font-semibold',
	'focus:text-primary-900',
	'focus:bg-base-000'
]
export const buttonXl = 'button-xl px-4 py-2 text-tlg leading-155'
export const buttonLg = 'button-lg px-3 py-1.75 text-tmd leading-150'
export const buttonMd = 'button-md px-2.5 py-1.25 text-tmd leading-150'
export const buttonSm = 'button-sm px-2 py-0.7 text-tsm leading-142'
