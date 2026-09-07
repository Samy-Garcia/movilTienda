// src/style/globalStyles.js
import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  screenContainerNoPadding: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  linkText: {
    color: colors.black,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
