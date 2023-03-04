import $ from "jquery";

const path = "http://localhost";

export default class WriterModule {
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
}
