import $ from "jquery";

const path = "http://localhost";

export default class CategoryModule {
  static async getCategoriesRecord() {
    let result = $.get(path + "/thesis/src/api/getCategoryRecord.php");
    return result;
  }

  // SET
  static async addCategory(name) {
    let result = $.post(path + "/thesis/src/api/addCategory.php", {
      name: name,
    });
    return result;
  }

  static async editCategory(id, name) {
    let result = $.post(path + "/thesis/src/api/editCategory.php", {
      id: id,
      name: name,
    });
    return result;
  }

  static async inactiveCategory(id) {
    let result = $.post(path + "/thesis/src/api/inactiveCategory.php", {
      id: id,
    });
    return result;
  }
}
