import * as THREE from "three"
import { useEffect, useRef, useState } from "react"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Preload,
  Environment,
  MeshTransmissionMaterial,
  Html,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei"
import { useRoute, useLocation } from "wouter"
import { easing, geometry } from "maath"
import { Spinner } from "./components/spinner/Spinner"
import { Frame } from "./components/frame"
import { LilasFlight } from "./Crystals/LilasFlight"
import { CrystalsTriumph } from "./Crystals/CrystalsTriumph"
import { DelphicDepths } from "./Crystals/DelphicDepths"
import { Perf } from "r3f-perf"
import { Leva } from "leva"
import { CardPage } from "./components/CardPage"
import { Card } from "./components/card/card"
import { Purpurite } from "./Crystals/Purpurite"
import { CrystalCollection } from "./Crystals/CrystalCollection"
extend(geometry)

export default function App() {
  return (
    <>
      <Canvas
        shadows
        // linear
        dpr={[1, 1.5]}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <Leva hidden />
        {/* <color attach="background" args={["#f0f0f0"]} /> */}
        <Environment
          files={["/envmaps/clouds.hdr"]}
          background
          resolution={4096}
        />
        {/* <CrystalsTriumph /> */}
        <directionalLight position={[2, 2, -2]} intensity={0.1} castShadow />
        <PerspectiveCamera
          // makeDefault
          position={[0, 1.5, 4]}
          fov={50}
          near={0.01}
          far={50}
        />
        {/* <LilasFlight /> */}
        {/* <Purpurite /> */}
        <CrystalCollection />

        {/* <Perf position="top-left" /> */}
        <Rig />
        {/* <OrbitControls /> */}
        <Preload all />
      </Canvas>
    </>
  )
}

function Rig({
  position = new THREE.Vector3(0, 2, 5),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls, scene } = useThree()
  const [, params] = useRoute("/cards/:name")
  useEffect(() => {
    const active = scene.getObjectByName(params?.name)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.0, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault dollySpeed={0.2} />
}
