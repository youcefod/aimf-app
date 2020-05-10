import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fce3ba",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  myAccountText: {
    textAlign: "center",
    fontSize: 22,
    color: "#595959",
    marginBottom: 20,
  },
  updateIcon: {
    color: "#595959",
    fontSize: 20,
    marginLeft: 2,
  },
  fullnameText: {
    textAlign: "center",
    fontSize: 20,
    color: "#595959",
    marginBottom: 20,
  },
  logoutButton: {
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "#cb8347",
  },
});

export default styles;
