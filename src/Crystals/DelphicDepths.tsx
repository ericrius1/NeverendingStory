import { MeshTransmissionMaterial, Environment, Gltf } from "@react-three/drei"
import { Frame } from "../components/frame"
import { useControls } from "leva"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"
import { CardPage } from "../components/CardPage"

export function DelphicDepths(props: any) {
  const envMap = useTexture("/envmaps/sea.jpg")
  const normalMap = useTexture("/textures/normals/ocean1.jpg")
  normalMap.wrapS = THREE.RepeatWrapping
  normalMap.wrapT = THREE.RepeatWrapping

  const { normalScale, ...orbConfig } = useControls("Delphic Depths", {
    transmission: { value: 1, min: 0, max: 1 },
    thickness: { value: 5, min: 0, max: 10 },
    backside: { value: false },
    distortion: { value: 1.5, min: 0, max: 3 },
    distortionScale: { value: 8, min: 0, max: 10 },
    temporalDistortion: { value: 0.11, min: 0, max: 1 },
    ior: { value: 1.05, min: 0, max: 2 },
    chromaticAberration: { value: 0.01, min: 0, max: 0.2 },
    normalScale: { value: 1, min: 0, max: 2 },
    normalMapRepeat: {
      value: 10,
      min: 0,
      max: 20,
      onChange: (value) => {
        normalMap.repeat.set(value, value)
      },
    },
  })
  return (
    <group {...props}>
      <Frame
        id="03"
        name="DelphicDepths"
        quote="Destiny Awaits"
        position={[0, 0.83, -0.02]}
        rotation-x={-0.05}
      >
        <Gltf
          src="/glb/sculptures/swirls.glb"
          scale={0.055}
          position={[0.1, 0, -0.88]}
        />
        <mesh position={[0, 0, 1]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshTransmissionMaterial
            {...orbConfig}
            normalScale={normalScale}
            resolution={1024}
            side={2}
            normalMap={normalMap}
          />
        </mesh>
        {/* <Spinner /> */}
        <Environment background resolution={1024} environmentIntensity={5}>
          <mesh rotation-y={Math.PI / 1.5}>
            <sphereGeometry args={[100, 32, 32]} />
            <meshBasicMaterial map={envMap} side={1} />
          </mesh>
        </Environment>
      </Frame>
    </group>
  )
}
