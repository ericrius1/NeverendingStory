import {
  MeshPortalMaterial,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei"
import {
  Root,
  Container,
  Content,
  setPreferredColorScheme,
  Text,
} from "@react-three/uikit"
import { geometry } from "maath"
import { Suspense } from "react"
import { Defaults, colors } from "./default/theme"

setPreferredColorScheme("dark")
const cardGeometry = new geometry.RoundedPlaneGeometry(0.7, 0.7, 0.077)

export function CardPage({ title, archetype, powers, description }) {
  console.log("title")
  return (
    <Root
      flexDirection="column"
      pixelSize={0.01}
      transformTranslateY={-83}
      transformTranslateZ={0}
      transformRotateX={-5}
      // transformRotateY={180}
    >
      <Defaults>
        <Container
          height={160}
          padding={10}
          width={100}
          backgroundColor={0xffffff}
          dark={{ backgroundColor: 0x0 }}
          cursor="pointer"
          flexDirection="column"
          alignItems="center"
          zIndexOffset={10}
          borderRadius={10}
        >
          <Suspense fallback={null}>
            <Content height={20}>
              <mesh geometry={cardGeometry} position={[0, 0, 0.0]}>
                <MeshPortalMaterial>
                  <Environment
                    files={["/envmaps/clouds.hdr"]}
                    resolution={2048}
                    background
                  />
                  <PerspectiveCamera position={[0, 0, -3]} />
                  <ambientLight intensity={Math.PI} />
                  <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshPhysicalMaterial
                      metalness={1}
                      roughness={0.0}
                      color={"purple"}
                    />
                  </mesh>
                </MeshPortalMaterial>
              </mesh>
            </Content>
          </Suspense>

          <Container
            flexDirection="column"
            justifyContent="center"
            padding={5}
            gap={1}
          >
            <Text fontSize={10} textAlign="center" letterSpacing={-0.4}>
              {title}
            </Text>
            <Text fontSize={5} fontWeight={"bold"} textAlign={"center"}>
              {archetype}
            </Text>
            <Text
              fontSize={4}
              letterSpacing={-0.4}
              color={colors.primary}
              textAlign="center"
            >
              {powers}
            </Text>
            <Text
              marginTop={8}
              fontSize={3}
              lineHeight="120%"
              textAlign="center"
              letterSpacing={-0.2}
            >
              {description}
            </Text>
          </Container>
        </Container>
      </Defaults>
    </Root>
  )
}
