import Svg, { Path } from "react-native-svg";

const EditIcon = ({ color }) => {
  return (
    <Svg width="24" height="26" viewBox="0 0 76 84" fill="none">
      <Path
        d="M18.1777 67.1022H0.5V49.4243L48.1458 1.77848C49.7733 0.151314 52.4112 0.151314 54.0383 1.77848L65.8237 13.5636C67.4508 15.1908 67.4508 17.829 65.8237 19.4561L18.1777 67.1022ZM0.5 75.4356H75.5V83.7689H0.5V75.4356Z"
        fill={color}
      />
    </Svg>
  );
};

export default EditIcon;
