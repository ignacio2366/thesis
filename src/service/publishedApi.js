import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class PublishedModule {
  static async getPublished(filter) {
    let result = $.get(path + "/thesis/src/api/getPublished.php", { filter });
    return result;
  }

  static async getSearch(search) {
    let result = $.get(path + "/thesis/src/api/searchPublish.php", { search });
    return result;
  }

  // Update
  static async updatePublished(id, remark, action, date, admin) {
    let result = $.post(path + "/thesis/src/api/updatePublished.php", {
      id,
      remark,
      action,
      date,
      admin,
    });
    return result;
  }

  static async getPublishedUser(filter, name) {
    let result = $.get(path + "/thesis/src/api/getPublishUser.php", {
      filter,
      name,
    });
    return result;
  }

  static async getDraftSources(cite) {
    let result = $.post(path + "/thesis/src/api/getPublishSource.php", {
      cite: cite,
    });
    return result;
  }
}
