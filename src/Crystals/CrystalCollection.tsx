import { useEffect, useState } from "react"
import { Crystal } from "./Crystal"
import { Gltf } from "@react-three/drei"
import { DelphicDepths } from "./DelphicDepths"

const CrystalCollection = () => {
  const [crystals, setCrystals] = useState([])

  useEffect(() => {
    fetch("/crystals/crystal-info.json")
      .then((response) => response.json())
      .then((data) => setCrystals(data))
      .catch((error) => console.error("Error loading card data:", error))
  }, [])

  return (
    <>
      <DelphicDepths position={[2, 0, 0]} />
      <Gltf src="/glb/crystal-display.glb" castShadow receiveShadow />
      {crystals.map((card, index) => {
        return (
          <Crystal
            key={index}
            title={card.title}
            archetype={card.archetype}
            powers={card.powers}
            description={card.description}
          />
        )
      })}
    </>
  )
}

export { CrystalCollection }
