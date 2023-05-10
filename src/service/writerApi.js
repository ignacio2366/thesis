import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class WriterModule {
  //get the settings of rates
  static async setting() {
    let result = $.post(path + "/api/setting.php");
    return result;
  }
  static async getCategories() {
    let result = $.get(path + "/api/getCategories.php");
    return result;
  }

  static async addNews(data) {
    let result = await fetch(path + "/api/addNews.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }
  static async updateNews(data) {
    let result = await fetch(path + "/api/updateNews.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }

  static async getDraftedNews(cite) {
    let result = $.post(path + "/api/getDraftedNews.php", {
      cite: cite,
      id: localStorage.getItem("id"),
    });
    return result;
  }
}
