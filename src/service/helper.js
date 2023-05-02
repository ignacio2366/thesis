export default class HelperUtils {
  static getDate() {
    const dateNow = new Date();

    var dateString = dateNow.toLocaleString("en-us", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return dateString;
  }

  static getDateTime() {
    var date = new Date();
    const formatter = date.toLocaleString("en-us", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return formatter;
  }
  static convertDateTimetoDate(date) {
    const dateNow = new Date(date);

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour12: true,
    });
    return formatter.format(dateNow);
  }

  static convertDatetoDateTme(date) {
    const newDate = new Date(date);
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return formatter.format(newDate);
  }

  static shortHundredWords(summary) {
    return summary.split(" ").slice(0, 75).join(" ");
  }

  static getFleschReadingEaseLabel(score) {
    if (score >= 80 && score <= 100) {
      return "Easy to Understand";
    } else if (score >= 60 && score <= 79) {
      return "In Standard to Understand";
    } else if (score >= 0 && score <= 59) {
      return "Difficult to Understand";
    } else {
      return "Invalid score";
    }
  }
}
