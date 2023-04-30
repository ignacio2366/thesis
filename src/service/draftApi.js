import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class DraftModule {
  // Find Sources Module
  static async addSources(data) {
    let result = await fetch(path + "/thesis/src/api/saveDraft.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }
  // Add a Newsin Module from drafted
  static async addDraftNews(cite, id) {
    let result = $.post(path + "/thesis/src/api/addDraftNews.php", {
      cite: cite,
      id: id,
    });
    return result;
  }

  // Drafted Module
  static async getDraft() {
    let result = $.post(path + "/thesis/src/api/getDraft.php", {
      id: localStorage.getItem("id"),
    });
    return result;
  }

  // Delete the sources draft
  static async deleteSource(cite, id) {
    let result = $.post(path + "/thesis/src/api/deleteDraft.php", {
      cite: cite,
      id: id,
    });
    return result.json();
  }
  static async deleteCiteNo(no, id) {
    let result = $.post(path + "/thesis/src/api/deleteCiteNo.php", {
      no: no,
      id: id,
    });
    return result;
  }
  // Get draft Sources List

  static async getDraftSources(cite) {

    let result = $.post(path + "/thesis/src/api/getDraftSources.php", {
      cite: cite,
      id: localStorage.getItem("id"),
    });
    return result;
  }
}
