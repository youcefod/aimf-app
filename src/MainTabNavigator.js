import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import { Icon } from "native-base";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../config/icons/selection.json";

import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import KoranScreen from "./screens/KoranScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserScreen from "./screens/UserScreen";
import UnaccessibleScreen from "./screens/UnaccessibleScreen";
import YouTubeScreen from "./screens/YouTubeSceen";

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);
// ----------------------------------------------HomeScreen-----------------------------------------------------
const HomeStack = createStackNavigator({
  Timeline: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: "Accueil",
  tabBarIcon: ({ focused }) => (
    <CustomIcon name="minaret" size={25} color="#000" />
  ),
};

const disableHomeStack = createStackNavigator({
  Timeline: UnaccessibleScreen,
});

disableHomeStack.navigationOptions = {
  tabBarLabel: "Accueil",
  tabBarIcon: ({ focused }) => (
    <CustomIcon
      style={{ opacity: 0.5 }}
      name="minaret"
      size={25}
      color="#000"
    />
  ),
};

// ----------------------------------------------PostWorkflowScreen-----------------------------------------------------
const PostWorkflowStack = createStackNavigator({
  PostWorkflow: PostScreen,
});

PostWorkflowStack.navigationOptions = {
  tabBarLabel: "Post",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="AntDesign"
      name="addfile"
      style={{ fontSize: 23, marginBottom: -3 }}
      color={focused ? "#2f95dc" : "#ccc"}
    />
  ),
};

// ----------------------------------------------KoranScreen-----------------------------------------------------
const KoranStack = createStackNavigator({
  Koran: KoranScreen,
});

KoranStack.navigationOptions = {
  tabBarLabel: "Coran",
  tabBarIcon: ({ focused }) => (
    <CustomIcon name="coran" size={25} color="#000" />
  ),
};

const disableKoranStack = createStackNavigator({
  Koran: UnaccessibleScreen,
});

disableKoranStack.navigationOptions = {
  tabBarLabel: "Coran",
  tabBarIcon: ({ focused }) => (
    <CustomIcon name="coran" style={{ opacity: 0.5 }} size={25} color="#000" />
  ),
};

// ----------------------------------------------YouTubeScreen-----------------------------------------------------
const YouTubeStack = createStackNavigator({
  YouTube: YouTubeScreen,
});

YouTubeStack.navigationOptions = {
  tabBarLabel: "Youtube",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="SimpleLineIcons"
      name="social-youtube"
      style={{ fontSize: 30, marginBottom: -3 }}
      color={focused ? "#2f95dc" : "#ccc"}
    />
  ),
};

// ----------------------------------------------ProfileScreen-----------------------------------------------------
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="EvilIcons"
      name="user"
      color={focused ? "#2f95dc" : "#ccc"}
      style={{ fontSize: 35, marginBottom: -3 }}
    />
  ),
};

// ----------------------------------------------UserScreen-----------------------------------------------------
const UserStack = createStackNavigator({
  User: UserScreen,
});

UserStack.navigationOptions = {
  tabBarLabel: "User",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="FontAwesome5"
      name="user-check"
      color={focused ? "#2f95dc" : "#ccc"}
      style={{ marginBottom: -3, fontSize: 18 }}
    />
  ),
};

export const bottomActiveUserTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  YouTubeStack,
  ProfileStack,
});

export const bottomUnActiveUserTabNavigator = createBottomTabNavigator(
  {
    disableHomeStack,
    disableKoranStack,
    ProfileStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (
          navigation.state.routeName === "disableHomeStack" ||
          navigation.state.routeName === "disableKoranStack"
        ) {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: "ProfileStack",
  }
);

export const bottomAdminUserTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  PostWorkflowStack,
  YouTubeStack,
  UserStack,
  ProfileStack,
});
