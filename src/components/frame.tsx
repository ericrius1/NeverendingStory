import {
  useCursor,
  MeshPortalMaterial,
  Text,
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { easing } from "maath"
import { useRef, useState } from "react"
import { useRoute, useLocation } from "wouter"
import { suspend } from "suspend-react"
import * as THREE from "three"

import { useControls } from "leva"

const regular = import("/DancingScript.woff")
export function Frame({
  id,
  name,
  quote,
  bg,
  width = 1,
  height = 1.6180339875,
  camPosition = [0, 0, 1],
  children,
  ...props
}) {
  const portal = useRef()
  const [, setLocation] = useLocation()
  const [, params] = useRoute("/cards/:name")
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  const { letterSpacing } = useControls("Frame", {
    letterSpacing: { value: -0.1, min: -0.2, max: 0.2 },
  })
  useFrame((state, dt) =>
    easing.damp(portal.current, "blend", params?.name === name ? 1 : 0, 0.2, dt)
  )
  return (
    <group {...props}>
      <Text
        font={suspend(regular).default}
        fontSize={0.101}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        letterSpacing={letterSpacing}
        position={[-0.455, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.1}
        letterSpacing={letterSpacing}
        anchorX="right"
        position={[0.4, -0.659, 0.01]}
        material-toneMapped={false}
      >
        {id}
      </Text>
      <Text
        font={suspend(regular).default}
        fontSize={0.055}
        anchorX="right"
        position={[0.0, -0.677, 0.01]}
        material-toneMapped={false}
        letterSpacing={0.01}
      >
        {quote}
      </Text>

      <mesh
        name={name}
        onDoubleClick={(e) => {
          e.stopPropagation()
          return setLocation("/cards/" + e.object.name)
        }}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.name === name}
          side={THREE.DoubleSide}
        >
          {children}
          {/* <PerspectiveCamera position={camPosition} fov={50} /> */}
          {/* <OrbitControls zoomSpeed={0.2} rotateSpeed={0.1} panSpeed={0.1} /> */}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}
