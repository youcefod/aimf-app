import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import UserCard from "./UserScreen/UserCard";
import { SHOW_ACTION } from "../Utils/Constants";
import ShowUser from "./UserScreen/ShowUser";
import {
  getUsers,
  showUser,
  updateAction,
  updateUserRole,
} from "../store/reducers/userRedux";
import ErrorModal from "../Components/ErrorModal";

class UserScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      opacity: 1,
    };
  }

  componentDidMount() {
    this.props.getUsers([], 1);
  }

  handleRefresh = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getUsers([], 1, true);
    }
  };

  handleLoadMore = () => {
    if (
      !this.props.refreshing &&
      !this.props.handleMore &&
      !this.props.loading
    ) {
      this.props.getUsers(this.props.users, this.props.page + 1, false, true);
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
        }}
      />
    );
  };

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View
        style={{
          marginBottom: 100,
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE",
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  updateCard = (data) => {
    const { users } = this.state;

    this.state.users.map((user) => {
      if (user.id === data.id) {
        return data;
      }
      return user;
    });

    this.setState({ users });
  };

  renderItem = (item) => {
    return (
      <UserCard
        showUser={this.props.showUser}
        data={item}
        backgroundColor="#ffffff"
      />
    );
  };

  render() {
    return (
      <>
        {this.props.action === SHOW_ACTION ? (
          <ShowUser
            data={this.props.userToShow || {}}
            updateAction={(action) => this.props.updateAction(action)}
            updateState={(data) => this.setState(data)}
            updateUserRole={(id, roles) => this.props.updateUserRole(id, roles)}
          />
        ) : (
          <SafeAreaView style={{ opacity: this.state.opacity }}>
            <FlatList
              data={this.props.users}
              renderItem={({ item }) => this.renderItem(item)}
              keyExtractor={(item) => `${item.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={
                this.props.refreshing !== undefined
                  ? this.props.refreshing
                  : false
              }
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          </SafeAreaView>
        )}
        {this.props.errorMessage && (
          <ErrorModal visible message={this.props.errorMessage} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { errorMessage } = state.errorMessageStore;
  const {
    users,
    loading,
    refreshing,
    handleMore,
    page,
    action,
    userToShow,
  } = state.userStore;
  return {
    users,
    loading,
    refreshing,
    handleMore,
    page,
    errorMessage,
    action,
    userToShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (users, page, refreshing = false, handleMore = false) =>
      dispatch(getUsers(users, page, refreshing, handleMore)),
    showUser: (data) => dispatch(showUser(data)),
    updateAction: (action) => dispatch(updateAction(action)),
    updateUserRole: (id, roles) => dispatch(updateUserRole(id, roles)),
  };
};

UserScreen.propTypes = {
  page: PropTypes.number,
  users: PropTypes.array,
  getUsers: PropTypes.func,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  handleMore: PropTypes.bool,
  action: PropTypes.string,
  showUser: PropTypes.func,
  updateAction: PropTypes.func,
  updateUserRole: PropTypes.func,
  userToShow: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
