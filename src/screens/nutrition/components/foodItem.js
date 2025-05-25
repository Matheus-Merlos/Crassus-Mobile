import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import * as colors from "../../../constants/colors";
import TrashIcon from "../../../../assets/icons/trashIcon";

const ICON_MAP = {
  CAFE: (
    <Svg width={24} height={24} viewBox="0 0 75 84" fill="none">
      <Path
        d="M75 0V83.3333H66.6667V54.1667H50V25C50 11.1929 61.1929 0 75 0ZM66.6667 10.5417C63.2083 12.5 58.3333 17.375 58.3333 25V45.8333H66.6667V10.5417ZM25 49.5833V83.3333H16.6667V49.5833C7.15733 47.6529 0 39.2458 0 29.1667V4.16667H8.33333V33.3333H16.6667V4.16667H25V33.3333H33.3333V4.16667H41.6667V29.1667C41.6667 39.2458 34.5092 47.6529 25 49.5833Z"
        fill={colors.SMOOTH_YELLOW}
      />
    </Svg>
  ),
  ALMOCO: (
    <Svg width={24} height={24} viewBox="0 0 75 84" fill="none">
      <Path
        d="M75 0V83.3333H66.6667V54.1667H50V25C50 11.1929 61.1929 0 75 0ZM66.6667 10.5417C63.2083 12.5 58.3333 17.375 58.3333 25V45.8333H66.6667V10.5417ZM25 49.5833V83.3333H16.6667V49.5833C7.15733 47.6529 0 39.2458 0 29.1667V4.16667H8.33333V33.3333H16.6667V4.16667H25V33.3333H33.3333V4.16667H41.6667V29.1667C41.6667 39.2458 34.5092 47.6529 25 49.5833Z"
        fill={colors.SMOOTH_YELLOW}
      />
    </Svg>
  ),
  JANTA: (
    <Svg width={24} height={24} viewBox="0 0 84 86" fill="none">
      <Path
        d="M25.3333 4.25016C25.3333 1.94898 23.4678 0.0834961 21.1667 0.0834961C18.8655 0.0834961 17 1.94898 17 4.25016V8.41683C17 8.44541 17.0018 8.47037 17.0034 8.49362C17.016 8.67487 17.0215 8.75279 16.137 9.6372L16.0532 9.72091C14.9416 10.8298 12.8333 12.9331 12.8333 16.7502V20.9168C12.8333 23.218 14.6988 25.0835 17 25.0835C19.3012 25.0835 21.1667 23.218 21.1667 20.9168V16.7502C21.1667 16.7216 21.1649 16.6966 21.1633 16.6734C21.1506 16.4921 21.1452 16.4142 22.0296 15.5298L22.1135 15.4461C23.225 14.3372 25.3333 12.2339 25.3333 8.41683V4.25016ZM71.1667 4.25016C71.1667 1.94898 69.3013 0.0834961 67 0.0834961C64.6988 0.0834961 62.8333 1.94898 62.8333 4.25016V8.41683C62.8333 8.44541 62.835 8.47037 62.8367 8.49362C62.8492 8.67487 62.855 8.75279 61.9704 9.6372L61.8867 9.72091C60.775 10.8298 58.6667 12.9331 58.6667 16.7502V20.9168C58.6667 23.218 60.5321 25.0835 62.8333 25.0835C65.1346 25.0835 67 23.218 67 20.9168V16.7502C67 16.7216 66.9983 16.6966 66.9967 16.6734C66.9842 16.4921 66.9783 16.4142 67.8629 15.5298L67.9467 15.4461C69.0583 14.3372 71.1667 12.2339 71.1667 8.41683V4.25016ZM44.0833 0.0834961C46.3846 0.0834961 48.25 1.94898 48.25 4.25016V8.41683C48.25 12.2339 46.1417 14.3372 45.03 15.4461L44.9463 15.5298C44.0617 16.4142 44.0675 16.4921 44.08 16.6734C44.0817 16.6966 44.0833 16.7216 44.0833 16.7502V20.9168C44.0833 23.218 42.2179 25.0835 39.9167 25.0835C37.6154 25.0835 35.75 23.218 35.75 20.9168V16.7502C35.75 12.9331 37.8583 10.8298 38.97 9.72091L39.0538 9.6372C39.9383 8.75279 39.9325 8.67487 39.92 8.49362C39.9183 8.47037 39.9167 8.44541 39.9167 8.41683V4.25016C39.9167 1.94898 41.7821 0.0834961 44.0833 0.0834961ZM8.66667 39.6668H75.3333C75.3333 58.0764 60.4096 73.0002 42 73.0002C23.5905 73.0002 8.66667 58.0764 8.66667 39.6668ZM4.5 31.3335C2.19884 31.3335 0.333336 33.199 0.333336 35.5002V39.6668C0.333336 56.7527 10.6175 71.4368 25.3333 77.8664V81.3335C25.3333 83.6347 27.1988 85.5002 29.5 85.5002H54.5C56.8013 85.5002 58.6667 83.6347 58.6667 81.3335V77.8664C73.3825 71.4368 83.6667 56.7527 83.6667 39.6668V35.5002C83.6667 33.199 81.8013 31.3335 79.5 31.3335H4.5Z"
        fill={colors.SMOOTH_YELLOW}
      />
    </Svg>
  ),
};
const FoodItem = ({ name, amount, onDelete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {ICON_MAP.ALMOCO}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default FoodItem;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: colors.WHITE_ISH,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
    padding: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E25C6B",
    marginHorizontal: 16, // Esta margem já está criando o espaçamento lateral
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    padding: 5,
  },
  textContainer: {
    marginLeft: 15,
  },
  name: {
    fontFamily: "Inter-Bold",
    fontSize: 14,
    color: "#000",
  },
  amount: {
    fontSize: 12,
    color: "#6B6B6B",
  },
  deleteButton: {
    backgroundColor: "#E25C6B",
    borderRadius: 999,
  },
});
