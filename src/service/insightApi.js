import $ from "jquery";

const path = process.env.REACT_APP_PHP_URL;

export default class InsightModule {
  //get the settings of rates
  static async setting() {
    let result = $.post(path + "/thesis/src/api/setting.php");
    return result;
  }
  static async setSetting(plagiarism, positive, negative, word) {
    let result = $.post(path + "/thesis/src/api/setSetting.php", {
      plagiarism: plagiarism,
      positive: positive,
      negative: negative,
      word: word,
    });
    return result;
  }
  //

  static async getMonth() {
    let result = $.post(path + "/thesis/src/api/getMonth.php");
    return result;
  }

  static async getMediaMonth(month) {
    let result = $.post(path + "/thesis/src/api/mediaMonitor.php", {
      month: month,
    });
    return result;
  }

  static async getLineGraph(month) {
    let result = $.post(path + "/thesis/src/api/mediaLineGraph.php", {
      month: month,
    });
    return result;
  }

  static async getDataGraph(month) {
    let result = $.post(path + "/thesis/src/api/mediaChart.php", {
      month: month,
    });
    return result;
  }

  static async getHeadline(month) {
    let result = $.post(path + "/thesis/src/api/mediaHeadline.php", {
      month: month,
    });
    return result;
  }

  static async getOpinion(month) {
    let result = $.post(path + "/thesis/src/api/mediaOpinion.php", {
      month: month,
    });
    return result;
  }
}
