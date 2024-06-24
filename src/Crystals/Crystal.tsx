import { CardPage } from "../components/CardPage"
import { DelphicDepths } from "./DelphicDepths"

export function Crystal({ title, archetype, powers, description }) {
  return (
    <>
      <CardPage
        title={title}
        archetype={archetype}
        powers={powers}
        description={description}
      />
    </>
  )
}
