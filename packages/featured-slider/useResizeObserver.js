/**
 * @template {HTMLElement} T
 * @typedef {import('react').Ref<T>} Ref<T>
 */

/**
 * @template {HTMLElement} T
 * @arg {{ ref?: Ref<T>, width?: number, height?: number }} [opts]
 */
function useResizeObserver(opts) {
	opts = Object(opts)
	const [observer] = useState(
		() =>
			new ResizeObserver(([{ contentRect: { width, height } }]) =>
				setState({ ref: resize.ref, width, height })
			)
	)
	/** @type {[{ ref: Ref<T>, width: number, height: number }, React.Dispatch<React.SetStateAction<{ ref: Ref<T>, width: number, height: number }>]} */
	const [resize, setState] = useState({
		/** @type {Ref<T>} */
		ref: (current) =>
			current ? observer.observe(current) : observer.disconnect(),
		width: Number(opts.width) || 0,
		height: Number(opts.height) || 0,
	})
	return resize
}
