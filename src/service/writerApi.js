import $ from "jquery";

const path = "http://localhost";

export default class WriterModule {
  static async getCategories() {
    let result = $.get(path + "/thesis/src/api/getCategories.php");
    return result;
  }

  static async addNews(data) {
    for (var pair of data.entries()) {
      console.log(pair[0] + " : " + pair[1]);
    }

    let result = await fetch(path + "/thesis/src/api/addNews.php", {
      method: "POST",
      body: data,
    });
    return result;
  }
}
