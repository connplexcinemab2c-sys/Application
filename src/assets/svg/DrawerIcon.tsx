import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
const DrawerIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M15.833 6.667H4.167c-.5 0-.834-.334-.834-.834 0-.5.334-.833.834-.833h11.666c.5 0 .834.333.834.833 0 .5-.334.834-.834.834ZM15.833 10.833H4.167c-.5 0-.834-.333-.834-.833 0-.5.334-.833.834-.833h11.666c.5 0 .834.333.834.833 0 .5-.334.833-.834.833ZM15.833 15H4.167c-.5 0-.834-.333-.834-.833 0-.5.334-.834.834-.834h11.666c.5 0 .834.334.834.834 0 .5-.334.833-.834.833Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default DrawerIcon
