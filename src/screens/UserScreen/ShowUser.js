import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Button, Icon, Text, Thumbnail } from "native-base";
import * as PropTypes from "prop-types";
import SpinnerButton from "react-native-spinner-button";
import InformationsModal from "../../Components/InformationsModal";
import SettingsSwitch from "../../Components/switch";
import {
  LIST_ACTION,
  MARRIED,
  FEMALE_GENDER,
  UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
  ADMIN_ROLE,
  SUPER_ADMIN_ROLE,
  MEMBER_ROLE,
  NEW_MEMBER_ROLE,
} from "../../Utils/Constants";
import { isAdmin, isSuperAdmin, isAuthorized } from "../../Utils/Account";

class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmUpdateVisible: false,
      isAuthorized: isAuthorized(props.data),
      isSuperAdmin: isSuperAdmin(props.data),
      isAdmin: isAdmin(props.data),
      confirmMessage: "",
      updateUserLoadding: false,
      scrollViewOpacity: 1,
    };
  }

  setConfirmModalVisible = (visible) => {
    if (!visible) {
      this.setState({
        isAuthorized: isAuthorized(),
        isSuperAdmin: isSuperAdmin(this.props.data),
        isAdmin: isAdmin(this.props.data),
      });
    }
    this.setState({
      confirmUpdateVisible: visible,
      scrollViewOpacity: visible ? 0.5 : 1,
    });
  };

  cancelUpdateEnableAdminFields = () => {
    this.setConfirmModalVisible(false);
  };

  updateUserRole = () => {
    const roles = [];
    if (this.state.isSuperAdmin) {
      roles.push(SUPER_ADMIN_ROLE);
    }
    if (!this.state.isSuperAdmin && this.state.isAdmin) {
      roles.push(ADMIN_ROLE);
    }
    if (!this.state.isAdmin && this.state.isAuthorized) {
      roles.push(MEMBER_ROLE);
    }

    if (roles.length === 0) {
      roles.push(NEW_MEMBER_ROLE);
    }
    this.props.updateUserRole(this.props.data.id, roles);
  };

  renderInformation = () => {
    const rows = [];
    const fields = [
      { field: "lastName", label: "Nom" },
      { field: "firstName", label: "Prénom" },
      { field: "brothe", label: "Fils de" },
      { field: "birthday", label: "Date de naissance" },
      { field: "maritalStatus", label: "Situation familiale" },
      { field: "function", label: "Fonction" },
      { field: "email", label: "Email" },
      { field: "phoneNumber", label: "Téléphone" },
      { field: "zipCode", label: "Code postal" },
    ];

    if (this.props.data.maritalStatus === MARRIED) {
      fields.push({ field: "childrenNumber", label: "Nombre d'enfants" });
    }

    fields.forEach((row) => {
      rows.push(
        <View
          key={row.field}
          style={{
            height: 40,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginLeft: 14, color: "#3E3E3E", fontSize: 15 }}>
            {row.label}
          </Text>
          <Text style={{ color: "#3E3E3E", fontSize: 15 }}>
            {this.props.data[row.field]}
          </Text>
        </View>
      );

      rows.push(
        <View
          key={`separator_${row.field}`}
          style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE",
            marginLeft: "14%",
          }}
        />
      );
    });

    if (this.props.data.childrenNumber > 0) {
      rows.push(
        <View
          key="childrens"
          style={{
            height: 40,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Text style={{ marginLeft: 14, color: "#3E3E3E", fontSize: 15 }}>
            Les enfants :
          </Text>
        </View>
      );
      for (let i = 0; i < this.props.data.childrenNumber; i += 1) {
        rows.push(
          <View
            key={`separator_${i}`}
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%",
            }}
          />
        );
        rows.push(
          <View
            key={`children_year_${i}`}
            style={{
              height: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 14, color: "#3E3E3E", fontSize: 14 }}>
              Année de naissance
            </Text>
            <Text style={{ marginRight: 14, color: "#3E3E3E", fontSize: 14 }}>
              {this.props.data.childrenYears[i]}
            </Text>
          </View>
        );
        rows.push(
          <View
            key={`children_schoolLevels_${i}`}
            style={{
              height: 30,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 14, color: "#3E3E3E", fontSize: 14 }}>
              Année scolaire
            </Text>
            <Text style={{ marginRight: 14, color: "#3E3E3E", fontSize: 14 }}>
              {this.props.data.schoolLevels[i]}
            </Text>
          </View>
        );
      }
    }
    return rows;
  };

  render() {
    let logo = require("../../../assets/images/men.png");
    if (this.props.data.gender === FEMALE_GENDER) {
      logo = require("../../../assets/images/women.png");
    }
    return (
      <ScrollView
        centerContent
        style={{
          paddingTop: 20,
          paddingBottom: 14,
          paddingRight: 14,
          opacity: this.state.scrollViewOpacity,
        }}
      >
        <View>
          <Button
            transparent
            onPress={() => {
              this.props.updateAction(LIST_ACTION);
            }}
            style={{ borderRadius: 30, marginLeft: 20, marginBottom: 20 }}
          >
            <Icon
              style={{ color: "#000" }}
              name="md-arrow-back"
              type="Ionicons"
            />
          </Button>
        </View>
        <Thumbnail source={logo} style={{ marginBottom: 14 }} />
        {this.renderInformation()}
        <SettingsSwitch
          title="Autorisé"
          titleStyle={{ marginLeft: -5, color: "#3E3E3E", fontSize: 15 }}
          onValueChange={(value) => {
            this.setState({
              isAuthorized: value,
              confirmMessage:
                "Etes vous sûr de vouloir activer/désactiver cet utilisateur ?",
            });
            this.setConfirmModalVisible(true);
          }}
          value={this.state.isAuthorized}
          trackColor={{
            true: "#c18b64",
            false: "#efeff3",
          }}
        />
        <SettingsSwitch
          title="Admin"
          titleStyle={{ marginLeft: -5, color: "#3E3E3E", fontSize: 15 }}
          onValueChange={(value) => {
            this.setState({
              isAdmin: value,
              confirmMessage: UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
            });
            this.setConfirmModalVisible(true);
          }}
          value={this.state.isAdmin}
          trackColor={{
            true: "#c18b64",
            false: "#efeff3",
          }}
        />
        <SettingsSwitch
          title="Super Admin"
          titleStyle={{ marginLeft: -5, color: "#3E3E3E", fontSize: 15 }}
          onValueChange={(value) => {
            this.setState({
              isSuperAdmin: value,
              confirmMessage: UPDATE_ADMIN_ROLE_CONFIRM_MESSAGE,
            });
            this.setConfirmModalVisible(true);
          }}
          value={this.state.isSuperAdmin}
          trackColor={{
            true: "#c18b64",
            false: "#efeff3",
          }}
        />
        <View style={{ marginBottom: 30 }} />
        <InformationsModal
          visible={this.state.confirmUpdateVisible}
          setVisible={(visible) => this.setConfirmModalVisible(visible)}
          title="Confirmer la modification"
        >
          <Text style={{ color: "#3E3E3E", marginLeft: 5, marginBottom: 50 }}>
            {" "}
            {this.state.confirmMessage}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <SpinnerButton
              buttonStyle={{
                height: 40,
                width: 110,
                borderRadius: 10,
                backgroundColor: "#f8f8f8",
                color: "#3E3E3E",
                marginRight: 4,
                borderWidth: 1,
                borderColor: "#FFD792",
              }}
              onPress={this.cancelUpdateEnableAdminFields}
            >
              <Text>Annuler</Text>
            </SpinnerButton>
            <SpinnerButton
              buttonStyle={{
                height: 40,
                width: 110,
                borderRadius: 10,
                backgroundColor: "#FFD792",
                marginLeft: 4,
              }}
              isLoading={this.state.updateUserLoadding}
              indicatorCount={10}
              spinnerType="SkypeIndicator"
              onPress={this.updateUserRole}
            >
              <Text>Confirmer</Text>
            </SpinnerButton>
          </View>
        </InformationsModal>
      </ScrollView>
    );
  }
}

ShowUser.propTypes = {
  data: PropTypes.object,
  updateAction: PropTypes.func,
  updateUserRole: PropTypes.func,
};

export default ShowUser;
