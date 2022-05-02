function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getUrl() {
  const url = ScriptApp.getService().getUrl();
  return url;
}
