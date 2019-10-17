import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import firebase from "react-native-firebase";
import { Icon } from "native-base";

import TimelineScreen from "./screens/TimelineScreen";
import PostWorkflowScreen from "./screens/PostWorkflowScreen";
import YouTubeScreen from "./screens/YouTubeScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";

// ----------------------------------------------TimelineScreen-----------------------------------------------------
const TimelineStack = createStackNavigator({
  Timeline: TimelineScreen
});

TimelineStack.navigationOptions = {
  tabBarLabel: "Feed",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="SimpleLineIcons"
      name="feed"
      style={{ fontSize: 20, marginBottom: -3 }}
      color={focused ? "#2f95dc" : "#ccc"}
    />
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

// ----------------------------------------------NotificationsScreen-----------------------------------------------------
const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen
});

NotificationsStack.navigationOptions = {
  tabBarLabel: "Notifications",
  tabBarIcon: ({ focused }) => (
    <Icon
      type="EvilIcons"
      name="bell"
      style={{ fontSize: 35, marginBottom: -3 }}
      color={focused ? "#2f95dc" : "#ccc"}
    />
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

const currentUser = firebase.auth().currentUser;

const bottomTabNavigator = currentUser && currentUser._user.isAuthorized
    ?  createBottomTabNavigator({
  TimelineStack,
  PostWorkflowStack,
  YouTubeStack,
  NotificationsStack,
  ProfileStack
}) :
    createBottomTabNavigator({
        ProfileStack
    });

export default bottomTabNavigator;
