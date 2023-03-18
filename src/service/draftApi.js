import $ from "jquery";

const path = "http://localhost";

export default class DraftModule {
  static async addSources(data) {
    let result = await fetch(path + "/thesis/src/api/saveDraft.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }

  static async addDraftNews(cite) {
    let result = $.post(path + "/thesis/src/api/addDraftNews.php", { cite: cite });
    return result;

  }
}
