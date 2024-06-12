import { render, cleanup } from '@testing-library/svelte'
import { describe, afterEach, it, expect } from 'vitest'
import CircleProgress from '../src/client/components/smaller/CircleProgress.svelte'

describe('CircleProgress', () => {
	afterEach(() => {
		cleanup()
	})

	it('correctly animates when animated prop is true', async () => {
		const { container } = render(CircleProgress, { animated: true, percentage: 50 })
		const animatedCircle = container.querySelector('.animated-circle')
		expect(animatedCircle).toBeTruthy()
	})

	it('does not animate when animated prop is false', async () => {
		const { container } = render(CircleProgress, { animated: false, percentage: 50 })
		const animatedCircle = container.querySelector('.animated-circle')
		expect(animatedCircle).toBeNull()
	})

	it('correctly calculates dash offset based on percentage prop', async () => {
		const percentage = 50 // Example percentage
		const { container } = render(CircleProgress, { percentage })
		const circle = container.querySelector('svg')
		expect(circle.style.getPropertyValue('--dash-offset')).toEqual(
			expect.stringContaining(`${percentage}`)
		)
	})

	it('renders SVG elements with correct attributes', async () => {
		const { container } = render(CircleProgress, { percentage: 100 })
		const svg = container.querySelector('svg')
		const circles = container.querySelectorAll('circle')
		expect(svg).toBeTruthy()
		expect(circles.length).toBe(2)
	})

	it('handles extreme percentage values (0, 100) correctly', async () => {
		const { container } = render(CircleProgress, { percentage: 0 })
		let svg = container.querySelector('svg')
		expect(svg.style.getPropertyValue('--dash-offset')).toEqual(expect.stringContaining('0'))

		const { container: container2 } = render(CircleProgress, { percentage: 100 })
		let svg2 = container2.querySelector('svg')
		expect(svg2.style.getPropertyValue('--dash-offset')).toEqual(expect.stringContaining('100'))
	})
})
