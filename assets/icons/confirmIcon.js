import Svg, { Path } from "react-native-svg";
import * as colors from "../../src/constants/colors";

const ConfirmIcon = () => {
  return (
    <Svg width={40} height={40} viewBox="0 0 200 200" fill="none">
      <Path
        d="M0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100Z"
        fill={colors.SMOOTH_YELLOW}
      />
      <Path
        d="M90 114.588L133.333 71L140 77.7059L90 128L60 97.8237L66.6667 91.1179L90 114.588Z"
        fill="white"
      />
    </Svg>
  );
};

export default ConfirmIcon;
