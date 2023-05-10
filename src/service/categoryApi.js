import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class CategoryModule {
  static async getCategoriesRecord(status) {
    let result = $.post(path + "/api/getCategoryRecord.php", {
      status: status,
    });
    return result;
  }

  // SET
  static async addCategory(name) {
    let result = $.post(path + "/api/addCategory.php", {
      name: name,
    });
    return result;
  }

  static async editCategory(id, name, category) {
    let result = $.post(path + "/api/editCategory.php", {
      id: id,
      name: name,
      category: category,
    });
    return result;
  }

  static async inactiveCategory(id, status) {
    let result = $.post(path + "/api/inactiveCategory.php", {
      id: id,
      status: status,
    });
    return result;
  }
}
