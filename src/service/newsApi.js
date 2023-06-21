import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class NewsModule {
  static async getLatestNews(page) {
    let result = $.get(path + "/api/getLatestNews.php",{page: page});
    return result;
  }

  static async getNewsLeftPanel() {
    let result = $.get(path + "/api/getNewsLeftPanel.php");
    return result;
  }

  static async getCategories() {
    let result = $.get(path + "/api/getCategories.php");
    return result;
  }

  static async searchNews(search) {
    let result = $.get(path + "/api/searchNews.php", {
      search: search,
    });
    return result;
  }

  static async categoriesNews(category) {
    let result = $.get(path + "/api/categoryNews.php", {
      category: category,
    });
    return result;
  }

  static async sentimentNews(sentiment) {
    let result = $.get(path + "/api/sentimentNews.php", {
      sentiment: sentiment,
    });
    return result;
  }

  // Story Module
  static async getSimilarStory(category) {
    let result = $.post(path + "/api/getSimilarStory.php", {
      category: category,
    });

    return result;
  }
  static async addVisitor(cite) {
    let result = $.post(path + "/api/addVisitor.php", {
      cite: cite,
    });
    return result;
  }
  static async getStoryNews(cite) {
    let result = $.post(path + "/api/getNewsStory.php", {
      cite: cite,
    });
    return result;
  }

  static async getComments(cite) {
    let result = $.post(path + "/api/getComment.php", {
      cite: cite,
    });
    return result;
  }

  static async addComment(data) {
    let result = await fetch(path + "/api/addComment.php", {
      method: "POST",
      body: data,
    });
    return result.json();
  }
}
