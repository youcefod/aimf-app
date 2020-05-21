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
import { isSuperAdmin } from "../Utils/Account";
import Loader from "../Components/Loader";

class UserScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.props.getUsers([], 1, true);
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
      !this.props.loading &&
      !this.props.lastPage
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

  renderItem = (item, currentUserIndex) => {
    return (
      <UserCard
        showUser={this.props.showUser}
        data={item}
        backgroundColor="#ffffff"
        currentUserIndex={currentUserIndex}
      />
    );
  };

  render() {
    return (
      <>
        {this.props.action === SHOW_ACTION ? (
          <ShowUser
            style={{
              opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
            }}
            data={this.props.userToShow || {}}
            updateAction={(action) => this.props.updateAction(action)}
            updateState={(data) => this.setState(data)}
            updateUserRole={(id, roles) => this.props.updateUserRole(id, roles)}
            isSuperAdmin={isSuperAdmin(this.props.currentUser)}
            currentUserId={this.props.currentUser.id}
          />
        ) : (
          <SafeAreaView
            style={{
              opacity: this.props.loading || this.props.errorMessage ? 0.6 : 1,
            }}
          >
            <FlatList
              data={this.props.users}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              keyExtractor={(item) => `${item.id}`}
              ItemSeparatorComponent={this.renderSeparator}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={false}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
            />
          </SafeAreaView>
        )}
        <Loader visible={!!this.props.loading} />
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
    lastPage,
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
    lastPage,
    currentUser: state.accountStore.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (users, page, refreshing = false, handleMore = false) =>
      dispatch(getUsers(users, page, refreshing, handleMore)),
    showUser: (data, currentUserIndex) =>
      dispatch(showUser(data, currentUserIndex)),
    updateAction: (action) => dispatch(updateAction(action)),
    updateUserRole: (id, roles) => dispatch(updateUserRole(id, roles)),
  };
};

UserScreen.propTypes = {
  currentUser: PropTypes.object,
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
  lastPage: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
