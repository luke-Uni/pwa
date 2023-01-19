function getConnection() {
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    navigator.msConnection
  );
}

function updateNetworkInfo(info) {
  document.getElementById("networkType").innerHTML = info.type;
  document.getElementById("effectiveNetworkType").innerHTML =
    info.effectiveType;
  document.getElementById("downlinkMax").innerHTML = info.downlinkMax;
}

var info = getConnection();
if (info) {
  info.onchange = function (event) {
    updateNetworkInfo(event.target);
  };
  updateNetworkInfo(info);
}
document.getElementById("status").innerHTML = navigator.onLine
  ? "online"
  : "offline";

var target = document.getElementById("target");

function handleStateChange() {
  var timeBadge = new Date().toTimeString().split(" ")[0];
  var newState = document.createElement("p");
  var state = navigator.onLine ? "online" : "offline";
  newState.innerHTML =
    "" + timeBadge + " Connection state changed to " + state + ".";
  target.appendChild(newState);
}
window.addEventListener("online", handleStateChange);
window.addEventListener("offline", handleStateChange);
