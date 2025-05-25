import Svg, { Circle, Path } from "react-native-svg";

const TrashIcon = () => {
  return (
    <Svg width={40} height={40} viewBox="0 0 125 125" fill="none">
      <Circle cx={62.5} cy={62.5} r={62.5} fill="#F22E52" fillOpacity={0.8} />
      <Path
        d="M75.5 48H88V53H83V85.5C83 86.8807 81.8807 88 80.5 88H45.5C44.1193 88 43 86.8807 43 85.5V53H38V48H50.5V40.5C50.5 39.1193 51.6193 38 53 38H73C74.3807 38 75.5 39.1193 75.5 40.5V48ZM78 53H48V83H78V53ZM55.5 60.5H60.5V75.5H55.5V60.5ZM65.5 60.5H70.5V75.5H65.5V60.5ZM55.5 43V48H70.5V43H55.5Z"
        fill="white"
      />
    </Svg>
  );
};

export default TrashIcon;
