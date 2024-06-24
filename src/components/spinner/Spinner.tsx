import { extend, BufferGeometryNode, useFrame } from "@react-three/fiber"
import { SpinnerGeometry } from "./SpinnerGeometry"
import * as THREE from "three"
import { MutableRefObject, useRef } from "react"

const zPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
const yPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1)

// Add types to ThreeElements elements so primitives pick up on it
declare module "@react-three/fiber" {
  interface ThreeElements {
    spinnerGeometry: BufferGeometryNode<SpinnerGeometry, typeof SpinnerGeometry>
  }
}

extend({ SpinnerGeometry })

export const Spinner = () => {
  const slice1 = useRef<MutableRefObject<THREE.Mesh>>(null)
  const slice2 = useRef<MutableRefObject<THREE.Mesh>>(null)

  useFrame((state, delta) => {
    if (slice1.current) {
      slice1.current.rotation.z += delta * 0.33
    }
    if (slice2.current) {
      slice2.current.rotation.z -= delta * 0.2
    }
  })
  return (
    <>
      <mesh ref={slice1} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <spinnerGeometry args={[0.5, 0.6, 500, 2, 0, Math.PI * 2, 20, 0.1]} />
        <meshPhysicalMaterial
          // clippingPlanes={[zPlane, yPlane]}
          // wireframe
          // color={"purple"}
          metalness={1}
          roughness={0.0}
          side={2}
        />
      </mesh>
      <mesh ref={slice2} position={[0, 0, -0.3]} rotation={[0, 0, 0]}>
        <spinnerGeometry args={[0.3, 0.4, 500, 2, 0, Math.PI * 2, 20, 0.1]} />
        <meshPhysicalMaterial metalness={1} roughness={0.0} side={2} />
      </mesh>
    </>
  )
}
