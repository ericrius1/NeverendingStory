import { MeshTransmissionMaterial, useTexture } from "@react-three/drei"
import { useControls } from "leva"
import { useFrame } from "@react-three/fiber"
import { damp } from "maath/easing"
import { useRef } from "react"
export function HyperPlane() {
  const normalMap = useTexture("/textures/normals/sand_n.jpg")

  const targetChromaticAberration = 3
  const material = useRef<MeshTransmissionMaterial>(null)
  const { ...config } = useControls({
    color: "#ffdf4e",
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.33, min: 0, max: 1 },
    distortion: { value: 0.2, min: 0, max: 1 },
    distortionScale: { value: 5, min: 0, max: 10 },
    temporalDistortion: { value: 0.2, min: 0, max: 1 },
    ior: { value: 1.5, min: 0, max: 2 },
    normalScale: { value: 0.5, min: 0, max: 1 },
    chromaticAberration: { value: 0.0, min: 0, max: 2 },
  })

  useFrame(({ clock }, delta) => {
    // console.log(t)
    damp(
      material.current,
      "chromaticAberration",
      targetChromaticAberration,
      3,
      delta
    )
    // console.log(material.current?.uniforms.chromaticAberration.value)
  })
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[2, 1]} />
      <MeshTransmissionMaterial
        ref={material}
        {...config}
        normalMap={normalMap}
      />
    </mesh>
  )
}
