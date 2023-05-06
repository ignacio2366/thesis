import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class WriterModule {
  //get the settings of rates
  static async setting() {
    let result = $.post(path + "/thesis/src/api/setting.php");
    return result;
  }
  static async getCategories() {
    let result = $.get(path + "/thesis/src/api/getCategories.php");
    return result;
  }

  static async addNews(data) {
    let result = await fetch(path + "/thesis/src/api/addNews.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }
  static async updateNews(data) {
    let result = await fetch(path + "/thesis/src/api/updateNews.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }

  static async getDraftedNews(cite) {
    let result = $.post(path + "/thesis/src/api/getDraftedNews.php", {
      cite: cite,
      id: localStorage.getItem("id"),
    });
    return result;
  }
}
