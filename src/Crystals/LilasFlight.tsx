import {
  MeshTransmissionMaterial,
  Environment,
  useTexture,
} from "@react-three/drei"
import { Frame } from "../components/frame"
import { Spinner } from "../components/spinner/Spinner"
import { useControls } from "leva"
import { useLocation } from "wouter"

export function LilasFlight() {
  const [path] = useLocation()
  const envMap = useTexture("/envmaps/hills.jpg")
  console.log(path)
  const { rotation, ...orbConfig } = useControls("Lilas Flight", {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 1 },
    backside: { value: false },
    distortion: { value: 0.3, min: 0, max: 1 },
    distortionScale: { value: 2, min: 0, max: 10 },
    temporalDistortion: { value: 0.3, min: 0, max: 1 },
    ior: { value: 1.05, min: 0, max: 2 },
    chromaticAberration: { value: 0.01, min: 0, max: 0.2 },
    rotation: {
      value: { x: -1.765, y: 0.065 },
      joystick: "invertY",
      step: 0.003,
    },
  })
  return (
    <Frame
      id="02"
      name="LilasFlight"
      quote="Through the Field"
      camPosition={[0, 0, 5]}
      position={[0, 0, 0.001]}
    >
      {/* <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial {...orbConfig} />
      </mesh> */}
      <Spinner />
      <Environment background resolution={2048}>
        <mesh rotation={[rotation.y, rotation.x, 0]}>
          <sphereGeometry args={[100, 32, 32]} />
          <meshBasicMaterial map={envMap} side={1} />
        </mesh>
      </Environment>
    </Frame>
  )
}
