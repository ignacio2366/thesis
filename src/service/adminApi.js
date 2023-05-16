import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class AdminModule {
  // Side Navigation
  static getAccount = async () => {
    let result = await $.post(path + "/api/getAccount.php", {
      id: localStorage.getItem("id"),
    });

    return result;
  };

  static getCredentials = async (id) => {
    let result = await $.post(path + "/api/editCredentials.php", {
      id: id,
    });

    return result;
  };

  static setPassword = async (password) => {
    let result = await $.post(path + "/api/updatePassword.php", {
      id: localStorage.getItem("id"),
      password: password,
    });

    return result;
  };
  // Admin Module
  static getCategories = async () => {
    let result = $.get(path + "/api/getCategories.php");
    return result;
  };

  static getUser = async (status) => {
    let result = $.post(path + "/api/getUser.php", {
      status: status,
    });
    return result;
  };

  // Set
  static addAccount = async (data) => {
    let result = await fetch(path + "/api/addAccount.php", {
      method: "POST",
      body: data,
    });
    return result;
  };

  static editAccount = async (data) => {
    let result = await fetch(path + "/api/editAccount.php", {
      method: "POST",
      body: data,
    });
    return result;
  };

  static setInActive = async (id, status) => {
    let result = await $.post(path + "/api/setInActive.php", {
      id: id,
      status: status,
    });
    return result;
  };

  // Reset Password
  static resetPassword = async (id) => {
    let result = await $.post(path + "/api/resetPassword.php", {
      id: id,
    });

    return result;
  };
}
