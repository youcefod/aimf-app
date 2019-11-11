import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { Icon  } from "native-base";
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from '../config/icons/selection.json';

import HomeScreen from "./screens/HomeScreen";
import PostWorkflowScreen from "./screens/PostWorkflowScreen";
import YouTubeScreen from "./screens/YouTubeScreen";
import KoranScreen from "./screens/KoranScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);
// ----------------------------------------------HomeScreen-----------------------------------------------------
const HomeStack = createStackNavigator({
  Timeline: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Accueil",
  tabBarIcon: ({ focused }) => (
      <CustomIcon name="minaret" size={25} color={"#000"}/>
  )
};

// ----------------------------------------------PostWorkflowScreen-----------------------------------------------------
const PostWorkflowStack = createStackNavigator({
  PostWorkflow: PostWorkflowScreen
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
  )
};

// ----------------------------------------------YouTubeScreen-----------------------------------------------------
const YouTubeStack = createStackNavigator({
  YouTube: YouTubeScreen
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
  )
};

// ----------------------------------------------KoranScreen-----------------------------------------------------
const KoranStack = createStackNavigator({
  Koran: KoranScreen
});

KoranStack.navigationOptions = {
  tabBarLabel: "Coran",
  tabBarIcon: ({ focused }) => (
      <CustomIcon name="coran" size={25} color={"#000"}/>
  )
};

// ----------------------------------------------ProfileScreen-----------------------------------------------------
const ProfileStack = createStackNavigator({
  Profile: ProfileScreen
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
  )
};

// ----------------------------------------------AdminScreen-----------------------------------------------------
const AdminStack = createStackNavigator({
  Admin: AdminScreen
});

AdminStack.navigationOptions = {
  tabBarLabel: "Admin",
  tabBarIcon: ({ focused }) => (
      <Icon
          type="FontAwesome5"
          name="user-check"
          color={focused ? "#2f95dc" : "#ccc"}
          style={{ marginBottom: -3, fontSize: 18 }}
      />
  )
};

export const bottomActiveUserTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  YouTubeStack,
  ProfileStack
});

export const bottomAdminUserTabNavigator = createBottomTabNavigator({
  HomeStack,
  KoranStack,
  YouTubeStack,
  PostWorkflowStack,
  AdminStack,
  ProfileStack
});
export const bottomNotActiveUserTabNavigator =
    createBottomTabNavigator({
        ProfileStack
    });