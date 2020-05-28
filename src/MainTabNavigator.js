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
import AddKhatma from "./screens/KoranScreen/AddKhatma"
import Khatma from "./screens/KoranScreen/Khatma"
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
const navOptionHandler = (nafigation) => ({
  header: null,
});

const KoranStack = createStackNavigator({
  KoranTimeLine: {
    screen: KoranScreen,
    navigationOptions: navOptionHandler,
  },
  AddKhatma: {
    screen: AddKhatma,
    navigationOptions: navOptionHandler,
  },
  Khatma: {
    screen: Khatma,
    navigationOptions: navOptionHandler,
  },
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

const disableYouTubeStack = createStackNavigator({
  Youtube: UnaccessibleScreen,
});

disableYouTubeStack.navigationOptions = {
  tabBarLabel: "Youtube",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="SimpleLineIcons"
      name="social-youtube"
      style={{ opacity: 0.5 }}
      color="#000"
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

// ----------------------------------------------Tab navigators-----------------------------------------------------

export const unActiveUserTabNavigator = createBottomTabNavigator(
  {
    disableHomeStack,
    disableKoranStack,
    disableYouTubeStack,
    ProfileStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (
          navigation.state.routeName === "disableHomeStack" ||
          navigation.state.routeName === "disableKoranStack" ||
          navigation.state.routeName === "disableYouTubeStack"
        ) {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: "ProfileStack",
  }
);

export const activeUserWithYoutubeLiveTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  YouTubeStack,
  ProfileStack,
});

export const activeUserTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  YouTubeStack,
  ProfileStack,
});

export const adminUserTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    KoranStack,
    PostWorkflowStack,
    disableYouTubeStack,
    UserStack,
    ProfileStack,
  },
  {
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.state.routeName === "disableYouTubeStack") {
          return null;
        }
        defaultHandler();
      },
    },
    initialRouteName: "HomeStack",
  }
);

export const adminUserWithYoutubeLiveTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  PostWorkflowStack,
  YouTubeStack,
  UserStack,
  ProfileStack,
});
