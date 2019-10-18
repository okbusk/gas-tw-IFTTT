function cut() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('tweetcreate');
  var row = sheet.getLastRow();
  for (var i = 1; i < row + 1; i++) {
    var source1 = sheet.getRange(i, 1).getValue();
    var source2 = sheet.getRange(i, 2).getValue();
    var myRegexp1 = /"([\s\S]*?)"/;
    var myRegexp2 = /"「([\s\S]*?)」"/;
    var title1 = source1.match(myRegexp1);
    var title2 = source2.match(myRegexp2);
    Logger.log(title1)
    sheet.getRange(i, 1).setValue(title1[1]);
    sheet.getRange(i, 2).setValue(title2[1]);
  }
}
// GASのトリガーから実行する関数
function monibottweet() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('TWEET');
  var lastRow = sheet.getLastRow();
  //2行目～最終行の間で、ランダムな行番号を算出する
  var row = Math.ceil(Math.random() * (lastRow - 1)) + 1;
  Logger.log(row);
  //ランダムに算出した行番号のタイトルとURLを取得
  var title = sheet.getRange(row, 1).getValue();
  Logger.log(title);
  var postMessage = title;
  Logger.log(postMessage);
  // ITFFFに連携
  callIFTTT(title);
}
// IFTTTのWebhooksを呼び出す
function callIFTTT(value1) {
  // トリガーのURL
  var url = '';
  // ヘッダー設定
  var headers = {
    "Content-Type": "application/json"
  };
  // post内容
  var data = {
    "value1": value1
  };
  // postの設定
  var options = {
    "method": "post",
    "headers": headers,
    // JavaScriptオブジェクトをJSON文字列に変換
    "payload": JSON.stringify(data)
  };
  // 呼び出し
  UrlFetchApp.fetch(url, options);
}
