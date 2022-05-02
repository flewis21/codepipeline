function doGet(e) {
  if (!e.parameter.page) {
    const home = HtmlService.createTemplateFromFile("index");
    home.message = "";
    return home.evaluate();
  } else if (e.parameter["page"] == "sipoc") {
    console.log(JSON.stringify(e));
    const valueStream = HtmlService.createTemplateFromFile("sipoc");
    return valueStream.evaluate();
  } else if (e.parameter["page"] == "index") {
    const home = HtmlService.createTemplateFromFile("index");
    home.message = e.parameter["message"];
    return home.evaluate();
  }
}
