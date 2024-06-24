import { MeshTransmissionMaterial, Environment } from "@react-three/drei"
import { Frame } from "../components/frame"
import { useControls } from "leva"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export function CrystalsTriumph() {
  const envMap = useTexture("/envmaps/retro.jpg")
  const normalMap = useTexture("/textures/normals/ocean1.jpg")
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping

  const { normalScale, position, rotation, ...orbConfig } = useControls(
    "Crystals Triumph",
    {
      transmission: { value: 1, min: 0, max: 1 },
      thickness: { value: 2, min: 0, max: 500 },
      backside: { value: false },
      distortion: { value: 0.7, min: 0, max: 3 },
      distortionScale: { value: 0.1, min: 0, max: 0.3, step: 0.01 },
      temporalDistortion: { value: 0.3, min: 0, max: 1 },
      ior: { value: 1.54, min: 0, max: 2 },
      metalness: { value: 0.1, min: 0, max: 1 },
      chromaticAberration: { value: 0.3, min: 0, max: 2 },
      rotation: {
        value: { x: -3.95, y: 0.19 },
        joystick: "invertY",
        step: 0.001,
      },
      position: {
        value: { x: -460, y: 382 },
        joystick: "invertY",
        step: 1,
      },
      normalScale: { value: 1, min: 0, max: 2 },
      normalMapRepeat: {
        value: 10,
        min: 0,
        max: 20,
        onChange: (value) => {
          normalMap.repeat.set(value, value)
        },
      },
    }
  )
  return (
    <Frame
      id="01"
      name="CrystalsTriumph"
      quote="Wisdom's Temple"
      position={[-1.15, 0, 0]}
      rotation={[0, 0.5, 0]}
    >
      <mesh position={[position.x, position.y, -1000]}>
        <sphereGeometry args={[90, 32, 32]} />
        <MeshTransmissionMaterial
          {...orbConfig}
          normalMap={normalMap}
          normalScale={normalScale}
        />
      </mesh>
      {/* <Spinner /> */}
      <Environment background resolution={2048}>
        <mesh rotation={[rotation.y, rotation.x, 0]}>
          <sphereGeometry args={[1000, 32, 32]} />
          <meshBasicMaterial map={envMap} side={1} />
        </mesh>
      </Environment>
    </Frame>
  )
}
