import { BufferGeometry } from "three"

/**
 * A class for generating a two-dimensional ring geometry.
 * @example
 * ```typescript
 * const geometry = new THREE.SpinnerGeometry(1, 5, 32);
 * const material = new THREE.MeshBasicMaterial({
 *     color: 0xffff00,
 *     side: THREE.DoubleSide
 * });
 * const mesh = new THREE.Mesh(geometry, material);
 * scene.add(mesh);
 * ```
 */
export class SpinnerGeometry extends BufferGeometry {
  /**
   * @param innerRadius Expects a `Float`. Default `0.5`.
   * @param outerRadius Expects a `Float`. Default `1`.
   * @param thetaSegments Number of segments. A higher number means the ring will be more round. Minimum is 3. Expects a `Integer`. Default `32`.
   * @param phiSegments Number of segments per ring segment. Minimum is `1`. Expects a `Integer`. Default `1`.
   * @param thetaStart Starting angle. Expects a `Float`. Default `0`.
   * @param thetaLength Central angle. Expects a `Float`. Default `Math.PI * 2`.
   * @param frequency Frequency of the waves around the ring. Expects a `Float`. Default `10`.
   * @param amplitude Amplitude of the waves around the ring. Expects a `Float`. Default `0.1`.
   */
  constructor(
    innerRadius?: number,
    outerRadius?: number,
    thetaSegments?: number,
    phiSegments?: number,
    thetaStart?: number,
    thetaLength?: number,
    frequency?: number,
    amplitude?: number
  )

  /**
   * A Read-only _string_ to check if `this` object type.
   * @remarks Sub-classes will update this value.
   * @defaultValue `SpinnerGeometry`
   */
  override readonly type: string | "SpinnerGeometry"

  /**
   * An object with a property for each of the constructor parameters.
   * @remarks Any modification after instantiation does not change the geometry.
   */
  readonly parameters: {
    readonly innerRadius: number
    readonly outerRadius: number
    readonly thetaSegments: number
    readonly phiSegments: number
    readonly thetaStart: number
    readonly thetaLength: number
    readonly frequency: number
    readonly amplitude: number
  }
}
