import {
  BufferGeometry,
  Float32BufferAttribute,
  RingGeometry,
  Vector2,
  Vector3,
} from "three"

class SpinnerGeometry extends BufferGeometry {
  constructor(
    innerRadius = 0.5,
    outerRadius = 1,
    thetaSegments = 32,
    phiSegments = 1,
    thetaStart = 0,
    thetaLength = Math.PI * 2,
    frequency = 20, // frequency of waves around the ring. 1 will just be a circle, 2 will be 2 waves, 10 will be 10, etc
    amplitude = 0.1
  ) {
    super()

    this.type = "SpinnerGeometry"

    this.parameters = {
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      thetaSegments: thetaSegments,
      phiSegments: phiSegments,
      thetaStart: thetaStart,
      thetaLength: thetaLength,
      frequency: frequency,
      amplitude: amplitude,
    }

    thetaSegments = Math.max(3, thetaSegments)
    phiSegments = Math.max(1, phiSegments)

    // buffers

    const indices = []
    const vertices = []
    const normals = []
    const uvs = []

    // some helper variables

    let radius = innerRadius
    const radiusStep = (outerRadius - innerRadius) / phiSegments
    const vertex = new Vector3()
    const uv = new Vector2()

    // generate vertices, normals and uvs

    for (let j = 0; j <= phiSegments; j++) {
      for (let i = 0; i <= thetaSegments; i++) {
        // values are generate from the inside of the ring to the outside

        const segment = thetaStart + (i / thetaSegments) * thetaLength

        // vertex

        const ripple = Math.cos(segment * frequency)
        const finalRadius = radius + ripple * amplitude

        vertex.x = finalRadius * Math.cos(segment)
        vertex.y = finalRadius * Math.sin(segment)

        vertices.push(vertex.x, vertex.y, vertex.z)

        // normal

        normals.push(0, 0, 1)

        // uv

        uv.x = (vertex.x / outerRadius + 1) / 2
        uv.y = (vertex.y / outerRadius + 1) / 2

        uvs.push(uv.x, uv.y)
      }

      // increase the radius for next row of vertices

      radius += radiusStep
    }

    // indices

    for (let j = 0; j < phiSegments; j++) {
      const thetaSegmentLevel = j * (thetaSegments + 1)

      for (let i = 0; i < thetaSegments; i++) {
        const segment = i + thetaSegmentLevel

        const a = segment
        const b = segment + thetaSegments + 1
        const c = segment + thetaSegments + 2
        const d = segment + 1

        // faces

        indices.push(a, b, d)
        indices.push(b, c, d)
      }
    }

    // build geometry

    this.setIndex(indices)
    this.setAttribute("position", new Float32BufferAttribute(vertices, 3))
    this.setAttribute("normal", new Float32BufferAttribute(normals, 3))
    this.setAttribute("uv", new Float32BufferAttribute(uvs, 2))
  }

  copy(source) {
    super.copy(source)

    this.parameters = Object.assign({}, source.parameters)

    return this
  }
}

export { SpinnerGeometry }
