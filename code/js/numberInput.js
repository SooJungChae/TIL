// Index.html
// <input id="modemNo" placeholder="모뎀번호를 입력해주세요." type="number">

var $modemNo = $("#modemNo");

$modemNo.on("keydown", function (e) {
  var evt = e || window.e;
  var keyCode = evt.keyCode || evt.which || evt.key;
  var key = String.fromCharCode(e.keyCode);

  // Allow: Backspace, delete, tab, escape, enter, .
  if ($.inArray(keyCode, [46, 8, 9, 27, 110, 190]) !== -1 ||
    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Command+A
    ((keyCode == 65 || keyCode == 86 || keyCode == 67 ) && (evt.ctrlKey || evt.metaKey)) ||
    // Allow: home, end, left, right, down, up
    (keyCode >= 35 && keyCode <= 40)) {
    return;
  }

  // Check Regex with String format
  if (!numberRegex.test(key)) {
    e.preventDefault();
  }
});

// ref : https://stackoverflow.com/questions/33251052/allow-only-numbers-and-ctrla-ctrlv-ctrlc-to-a-textbox/33251315
