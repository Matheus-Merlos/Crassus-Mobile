import Svg, { Circle } from "react-native-svg";

export default function MoreIcon() {
  return (
    <Svg width={38} height={10} viewBox="0 0 76 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill="#F28705" />
      <Circle cx={38} cy={10} r={10} fill="#F28705" />
      <Circle cx={66} cy={10} r={10} fill="#F28705" />
    </Svg>
  );
}
