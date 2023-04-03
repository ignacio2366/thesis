import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class NewsModule {
  static async getLatestNews() {
    let result = $.get(path + "/thesis/src/api/getLatestNews.php");
    return result;
  }

  static async getNewsLeftPanel() {
    let result = $.get(path + "/thesis/src/api/getNewsLeftPanel.php");
    return result;
  }

  static async getCategories() {
    let result = $.get(path + "/thesis/src/api/getCategories.php");
    return result;
  }

  static async searchNews(search) {
    let result = $.get(path + "/thesis/src/api/searchNews.php", {
      search: search,
    });
    return result;
  }

  static async categoriesNews(category) {
    let result = $.get(path + "/thesis/src/api/categoryNews.php", {
      category: category,
    });
    return result;
  }

  // Story Module
  static async getStoryNews(cite) {
    let result = $.post(path + "/thesis/src/api/getNewsStory.php", {
      cite: cite,
    });
    return result;
  }

}
