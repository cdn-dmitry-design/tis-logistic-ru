try {
(function () {
var STORE = "tislogistic-theme";
var ATTR = "data-tis-theme";
var theme = "dark";
try {
var saved = localStorage.getItem(STORE);
if (saved === "light" || saved === "dark") theme = saved;
} catch (e) {}
document.documentElement.setAttribute(ATTR, theme);
if (document.body) {
document.body.classList.toggle("dark-theme", theme === "dark");
document.body.classList.toggle("white-theme", theme === "light");
} else {
document.addEventListener(
"DOMContentLoaded",
function () {
document.body.classList.toggle("dark-theme", theme === "dark");
document.body.classList.toggle("white-theme", theme === "light");
},
{ once: true }
);
}
})();
} catch (tisErr) { try { console.warn("[tis] theme-init.js", tisErr); } catch (e) {} }
try {
(function () {
"use strict";
var STORE = "tislogistic-theme";
var ATTR = "data-tis-theme";
var DARK = "dark";
var LIGHT = "light";
var TRACK = ".theme:not(.theme-knob):not(.theme-sun):not(.theme-moon)";
var PART = ".theme-knob, .theme-sun, .theme-moon";
var MOBILE = ".tis-switch-theme";
var DESKTOP_FALLBACK = '#t-header [data-elem-id="1784473846259000010"]';
var MOON =
"https://static.tildacdn.com/tild3165-3530-4733-b163-643066376561/8fe3c51c.svg";
var SUN =
"https://static.tildacdn.com/tild6261-3162-4966-a137-323630623361/2d81e7e0.svg";
var SKIP =
".theme,.theme-knob,.theme-sun,.theme-moon,.tis-switch-theme,.theme-keep,[data-theme-ignore],.tis-yellow-btn,.tis-muted-btn,[data-tis-scanned],#rec2483529621,#rec2483526831,#rec2465288061,#rec2483544181";
var SCAN_SEL =
'#allrecords .tn-atom, #allrecords .tis-shape-bg, #allrecords .tn-molecule, #allrecords .t-title, #allrecords .t-name, #allrecords .t-text, #allrecords .t-descr, #allrecords .t-btn, #allrecords [data-elem-type="button"] .tn-atom, #allrecords [data-elem-type="shape"] > .tn-atom';
var BACKGROUNDS = {
"rgb(247, 247, 247)": "--tis-page",
"rgb(255, 255, 255)": "--tis-surface",
"rgb(238, 238, 238)": "--tis-soft",
"rgb(217, 217, 217)": "--tis-map",
"rgb(51, 51, 51)": "--tis-soft",
"rgb(51, 51, 56)": "--tis-soft",
"rgb(27, 27, 31)": "--tis-page",
"rgb(42, 42, 47)": "--tis-surface",
"rgb(66, 66, 74)": "--tis-map",
};
var TEXT = {
"rgb(0, 0, 0)": "--tis-text",
"rgb(17, 17, 17)": "--tis-text",
"rgb(30, 30, 30)": "--tis-text",
"rgb(34, 34, 34)": "--tis-text",
"rgb(76, 76, 76)": "--tis-muted",
"rgb(84, 84, 84)": "--tis-muted",
"rgb(85, 85, 85)": "--tis-muted",
"rgb(92, 92, 92)": "--tis-muted",
"rgb(173, 173, 185)": "--tis-muted",
};
var BORDERS = {
"rgb(215, 215, 215)": "--tis-border",
"rgb(217, 217, 217)": "--tis-border",
"rgb(222, 222, 222)": "--tis-border",
"rgb(223, 223, 223)": "--tis-border",
"rgb(224, 224, 224)": "--tis-border",
"rgb(118, 118, 118)": "--tis-border",
"rgb(119, 119, 119)": "--tis-border",
"rgb(0, 0, 0)": "--tis-border-strong",
"rgb(17, 17, 17)": "--tis-border-strong",
"rgb(30, 30, 30)": "--tis-border-strong",
"rgb(34, 34, 34)": "--tis-border-strong",
"rgb(241, 184, 59)": "--tis-accent-alt",
"rgb(177, 41, 37)": "--tis-red",
};
var YELLOW_RGB = "rgb(241, 184, 59)";
var didScan = false;
function normColor(value) {
if (!value) return "";
var v = String(value).trim().toLowerCase();
if (v === "transparent" || v === "rgba(0, 0, 0, 0)") return "";
if (v.indexOf("rgb") === 0) {
var m = v.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
if (!m) return "";
return "rgb(" + m[1] + ", " + m[2] + ", " + m[3] + ")";
}
if (v.charAt(0) === "#" && (v.length === 4 || v.length === 7)) {
var hex = v.slice(1);
if (hex.length === 3) {
hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
}
return (
"rgb(" +
parseInt(hex.slice(0, 2), 16) +
", " +
parseInt(hex.slice(2, 4), 16) +
", " +
parseInt(hex.slice(4, 6), 16) +
")"
);
}
return "";
}
function inlineBg(el) {
var st = el.getAttribute("style") || "";
var m = st.match(/background(?:-color)?\s*:\s*([^;]+)/i);
return m ? normColor(m[1]) : "";
}
function savedTheme() {
try {
return localStorage.getItem(STORE);
} catch (e) {
return null;
}
}
function remember(theme) {
try {
localStorage.setItem(STORE, theme);
} catch (e) {}
}
function currentTheme() {
return document.documentElement.getAttribute(ATTR) === DARK ? DARK : LIGHT;
}
function tracks() {
return Array.prototype.slice.call(document.querySelectorAll(TRACK));
}
function syncControls(theme) {
var dark = theme === DARK;
tracks().forEach(function (control) {
control.classList.toggle("is-dark", dark);
control.setAttribute("data-theme-state", theme);
control.setAttribute("aria-pressed", String(dark));
control.setAttribute(
"aria-label",
dark ? "Включить светлую тему" : "Включить тёмную тему"
);
control.setAttribute("role", "button");
if (!control.hasAttribute("tabindex")) control.setAttribute("tabindex", "0");
});
document.querySelectorAll(MOBILE).forEach(function (control) {
control.classList.toggle("is-dark", dark);
control.setAttribute("data-theme-state", theme);
control.setAttribute("aria-pressed", String(dark));
var checkbox = control.matches('input[type="checkbox"]')
? control
: control.querySelector('input[type="checkbox"]');
if (checkbox) checkbox.checked = !dark;
var icon = control.querySelector(".tis-switch-icon[src]");
if (icon) icon.src = dark ? SUN : MOON;
});
}
function applyTheme(theme, save) {
var next = theme === DARK ? DARK : LIGHT;
document.documentElement.setAttribute(ATTR, next);
if (document.body) {
document.body.classList.toggle("dark-theme", next === DARK);
document.body.classList.toggle("white-theme", next === LIGHT);
}
syncControls(next);
if (save) remember(next);
document.dispatchEvent(
new CustomEvent("tis:themechange", { detail: { theme: next } })
);
}
function toggle() {
applyTheme(currentTheme() === DARK ? LIGHT : DARK, true);
}
function runChunked(queue, processItem, done) {
function run() {
var start =
typeof performance !== "undefined" && performance.now
? performance.now()
: Date.now();
var n = 0;
while (queue.length && n < 40) {
var elapsed =
(typeof performance !== "undefined" && performance.now
? performance.now()
: Date.now()) - start;
if (elapsed > 40 && n > 0) break;
processItem(queue.shift());
n++;
}
if (queue.length) {
setTimeout(run, 0);
} else if (typeof done === "function") {
done();
}
}
setTimeout(run, 0);
}
function scanOnce() {
if (didScan || currentTheme() !== DARK) return;
didScan = true;
var nodes = Array.prototype.slice.call(document.querySelectorAll(SCAN_SEL));
var plan = [];
function measureOne(el) {
if (!(el instanceof Element)) return;
if (el.hasAttribute("data-tis-scanned")) return;
try {
if (el.closest(SKIP)) return;
} catch (e) {
return;
}
var style = getComputedStyle(el);
var bg = inlineBg(el) || normColor(style.backgroundColor);
if (bg === YELLOW_RGB) {
plan.push({ el: el, yellow: true });
return;
}
var ops = [];
var token = BACKGROUNDS[bg];
if (token) ops.push(["--tis-dark-bg", token, "tis-dark-bg"]);
token = TEXT[normColor(style.color)];
if (token) ops.push(["--tis-dark-color", token, "tis-dark-color"]);
if (style.borderTopStyle !== "none" && style.borderTopWidth !== "0px") {
token = BORDERS[normColor(style.borderTopColor)];
if (token) ops.push(["--tis-dark-border", token, "tis-dark-border"]);
}
if (ops.length) plan.push({ el: el, ops: ops });
}
function applyOne(item) {
item.el.setAttribute("data-tis-scanned", "1");
if (item.yellow) {
item.el.classList.add("tis-yellow-btn");
item.el.setAttribute("data-theme-ignore", "");
return;
}
for (var k = 0; k < item.ops.length; k++) {
item.el.style.setProperty(item.ops[k][0], "var(" + item.ops[k][1] + ")");
item.el.classList.add(item.ops[k][2]);
}
}
runChunked(nodes, measureOne, function () {
runChunked(plan.slice(), applyOne);
});
}
function releaseNativeButton() {
var root = document.querySelector(
'#rec2467434721 [data-elem-id="1783961348875000001"]'
);
if (!root) return;
root.setAttribute("data-theme-ignore", "");
var atom = root.querySelector(".tn-atom");
if (atom) atom.setAttribute("data-theme-ignore", "");
}
function syncRailRouteYellowBtns() {
["#rec2480170411", "#rec2502597221"].forEach(function (sel) {
var rec = document.querySelector(sel);
if (!rec) return;
rec.querySelectorAll('[class*="tis-route-btn-"]').forEach(function (btn) {
var active = btn.classList.contains("is-route-active");
var atom = btn.querySelector(".tn-atom");
[btn, atom].forEach(function (node) {
if (!node) return;
if (active) {
node.classList.add("tis-yellow-btn");
node.setAttribute("data-theme-ignore", "");
} else {
node.classList.remove("tis-yellow-btn");
}
});
});
});
}
function markMutedDetailsButtons() {
try {
document.querySelectorAll('[data-elem-type="button"]').forEach(function (el) {
if (el.hasAttribute("data-tis-muted-done")) return;
var text = (el.innerText || "").replace(/\s+/g, " ").trim();
if (
text !== "Подробнее" &&
text.indexOf("Подробнее ") !== 0 &&
text !== "Read more" &&
text.indexOf("Read more ") !== 0
)
return;
el.setAttribute("data-tis-muted-done", "1");
if (el.classList.contains("tis-yellow-btn") || el.querySelector(".tis-yellow-btn"))
return;
el.classList.add("tis-muted-btn");
var atom = el.querySelector(".tn-atom");
if (atom) atom.classList.add("tis-muted-btn");
});
} catch (e) {}
}
function ensureTrackClass() {
var desktop = document.querySelector(DESKTOP_FALLBACK);
if (desktop && !desktop.classList.contains("theme")) desktop.classList.add("theme");
}
function pointInRect(x, y, rect) {
return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}
function unionRect(elements) {
var left = Infinity,
top = Infinity,
right = -Infinity,
bottom = -Infinity,
found = false;
elements.forEach(function (el) {
if (!el || !el.getBoundingClientRect) return;
var r = el.getBoundingClientRect();
if (r.width < 1 && r.height < 1) return;
found = true;
left = Math.min(left, r.left);
top = Math.min(top, r.top);
right = Math.max(right, r.right);
bottom = Math.max(bottom, r.bottom);
});
if (!found) return null;
return { left: left, top: top, right: right, bottom: bottom };
}
function findControlFromEvent(event) {
var target = event.target;
if (!(target instanceof Element)) return null;
var mobile = target.closest(MOBILE);
if (mobile) return mobile;
var track = target.closest(TRACK);
if (track) return track;
var part = target.closest(PART);
if (part) {
var scope =
part.closest("#t-header, #rec2483004181, .t396__artboard, header") || document;
return scope.querySelector(TRACK) || document.querySelector(TRACK);
}
var x = event.clientX,
y = event.clientY,
list = tracks();
for (var i = 0; i < list.length; i++) {
var t = list[i];
var scope2 =
t.closest("#t-header, #rec2483004181, .t396__artboard, header") || document;
var group = [t].concat(Array.prototype.slice.call(scope2.querySelectorAll(PART)));
var box = unionRect(group);
if (box && pointInRect(x, y, box)) return t;
}
return null;
}
var initial = savedTheme();
applyTheme(initial === LIGHT ? LIGHT : DARK, false);
function init() {
ensureTrackClass();
applyTheme(currentTheme(), false);
releaseNativeButton();
syncRailRouteYellowBtns();
markMutedDetailsButtons();
if (currentTheme() === DARK) {
setTimeout(scanOnce, 0);
}
document.addEventListener(
"click",
function (event) {
var routeBtn =
event.target && event.target.closest
? event.target.closest(
"#rec2480170411 [class*='tis-route-btn-'], #rec2502597221 [class*='tis-route-btn-']"
)
: null;
if (routeBtn) {
setTimeout(syncRailRouteYellowBtns, 0);
}
var control = findControlFromEvent(event);
if (!control) return;
event.preventDefault();
event.stopPropagation();
toggle();
if (currentTheme() === DARK) {
didScan = false;
scanOnce();
}
},
true
);
document.addEventListener("keydown", function (event) {
var control =
event.target && event.target.closest
? event.target.closest(TRACK + ", " + MOBILE)
: null;
if (!control || (event.key !== "Enter" && event.key !== " ")) return;
event.preventDefault();
toggle();
});
window.TisTheme = {
apply: applyTheme,
toggle: toggle,
current: currentTheme,
scan: function () {
didScan = false;
scanOnce();
},
};
}
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
init();
}
})();
} catch (tisErr) { try { console.warn("[tis] theme.js", tisErr); } catch (e) {} }
try {
(function () {
"use strict";
var PAIRS = [
{
light: "https://static.tildacdn.com/tild6364-3337-4364-a635-386631633931/Africa-light.jpg",
dark: "https://static.tildacdn.com/tild6633-6465-4633-b835-653330386230/Africa-dark2x.jpg",
},
{
light: "https://static.tildacdn.com/tild3632-6335-4338-b130-373661633738/Brazil-light.jpg",
dark: "https://static.tildacdn.com/tild6630-3235-4536-b761-353863333563/Brazil-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3637-6539-4333-b865-323035646436/Cambodia-light.jpg",
dark: "https://static.tildacdn.com/tild3264-3962-4262-a233-353864636638/Cambodia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3865-3232-4161-b634-626462303038/Canada-light.jpg",
dark: "https://static.tildacdn.com/tild3362-3065-4135-b238-333661313465/Canada-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3130-3732-4030-b336-366334643130/Chile-light.jpg",
dark: "https://static.tildacdn.com/tild6362-6333-4233-b561-393033363439/Chile-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3339-3733-4433-b264-623939396465/China-light.jpg",
dark: "https://static.tildacdn.com/tild3430-6333-4138-b431-313263633734/China-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3835-3864-4262-b961-653761633666/Europe-light.jpg",
dark: "https://static.tildacdn.com/tild3662-6161-4034-b663-643239356465/Europe-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3533-6333-4265-b062-643464653136/India-light.jpg",
dark: "https://static.tildacdn.com/tild3064-3836-4333-a531-353739633061/India-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3632-6563-4134-b135-353834653364/Indonesia-light.jpg",
dark: "https://static.tildacdn.com/tild3562-6131-4232-b038-373231646666/Indonesia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6538-6633-4665-b838-666261323763/Japan-light.jpg",
dark: "https://static.tildacdn.com/tild3631-6261-4431-a133-653561653838/Japan-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6532-3061-4537-b161-303863623261/Korea-light.jpg",
dark: "https://static.tildacdn.com/tild6437-6532-4732-b466-306231386134/Korea-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6236-6134-4334-a331-343839326238/Malaysia-light.jpg",
dark: "https://static.tildacdn.com/tild3535-3563-4837-b564-373138313537/Malaysia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3764-6565-4131-b331-623864393130/Taiwan-light.jpg",
dark: "https://static.tildacdn.com/tild3765-3332-4666-b833-653539626266/Taiwan-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3639-6466-4761-b839-366462373365/Tyrkey-light.jpg",
dark: "https://static.tildacdn.com/tild3031-3064-4533-a565-393833373533/Tyrkey-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3036-6563-4266-b766-656236346631/USA-light.jpg",
dark: "https://static.tildacdn.com/tild6335-3932-4362-b562-346638336266/USA-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3538-3636-4032-b037-643232633837/UAE-light.jpg",
dark: "https://static.tildacdn.com/tild6631-6532-4430-a364-373639666466/UAE-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6661-6261-4138-b837-646464326634/Vietnam-light.jpg",
dark: "https://static.tildacdn.com/tild3637-6361-4063-b934-383361323137/Vietnam-dark.jpg",
},
];
var EN_PAIRS = [
{
light: "https://static.tildacdn.com/tild3065-3934-4637-b433-623431616431/Africa.jpg",
dark: "https://static.tildacdn.com/tild3965-3939-4535-b062-316234386265/Africa-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3932-6564-4837-a434-616465663364/Brazil.jpg",
dark: "https://static.tildacdn.com/tild6336-3866-4535-b831-346435313930/Brazil-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6435-3931-4465-b233-366337303532/Cambodia.jpg",
dark: "https://static.tildacdn.com/tild6565-3833-4633-a539-653563313430/Cambodia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6137-3134-4036-b932-633731333465/Canada.jpg",
dark: "https://static.tildacdn.com/tild3765-3062-4662-a338-316264643835/Canada-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3935-3131-4363-b235-653636356664/Chile.jpg",
dark: "https://static.tildacdn.com/tild3237-3961-4061-a535-616237666662/Chile-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6664-3865-4535-b133-353861356166/China.jpg",
dark: "https://static.tildacdn.com/tild3463-3665-4532-b561-343835313635/China-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3065-3832-4664-b134-626464653633/Europe.jpg",
dark: "https://static.tildacdn.com/tild3436-3639-4237-b931-323838306231/Europe-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3730-3066-4833-b436-646135626632/India.jpg",
dark: "https://static.tildacdn.com/tild3531-6366-4164-a130-613565326662/India-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3533-3530-4066-b666-653464663731/Indonesia.jpg",
dark: "https://static.tildacdn.com/tild6434-3261-4863-a131-326531343432/Indonesia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3765-6531-4137-b164-306335393535/Japan-light.jpg",
dark: "https://static.tildacdn.com/tild6532-3164-4730-b961-393831333430/Japan-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3637-6662-4133-b239-396466316462/Korea.jpg",
dark: "https://static.tildacdn.com/tild3363-6433-4636-a665-623035306434/Korea-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6465-3631-4162-b763-646662356666/Malaysia-light.jpg",
dark: "https://static.tildacdn.com/tild3936-6566-4265-b763-356462653130/Malaysia-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3032-6363-4165-a465-613633393563/Taiwan.jpg",
dark: "https://static.tildacdn.com/tild6332-6638-4161-a339-343230336162/Taiwan-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3935-6361-4239-b836-663530636239/Tyrkey.jpg",
dark: "https://static.tildacdn.com/tild3162-3536-4334-b361-366661333938/Tyrkey-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3634-6464-4130-b634-353565353139/USA.jpg",
dark: "https://static.tildacdn.com/tild3566-3434-4864-b031-653162393565/USA-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6364-6562-4137-b436-343330663666/UAE.jpg",
dark: "https://static.tildacdn.com/tild6161-3130-4937-b832-616530386436/UAE-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6464-3833-4536-a433-653232653133/Vietnam-light.jpg",
dark: "https://static.tildacdn.com/tild6538-6666-4366-b961-656161363466/Vietnam-dark.jpg",
},
];
var SEA_PAIRS = [
{
light: "https://static.tildacdn.com/tild3139-6161-4734-a137-323764356665/Dong-light.png",
dark: "https://static.tildacdn.com/tild3032-3164-4338-a538-343430356130/Dong-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6266-3939-4335-b866-633663663565/East-light.png",
dark: "https://static.tildacdn.com/tild6266-3630-4030-b464-336333656163/East-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3037-3538-4264-b939-316436636632/FESCO-light.png",
dark: "https://static.tildacdn.com/tild3133-6637-4762-b362-343634623066/FESCO-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3639-6634-4539-b665-376265393832/GANG-light.png",
dark: "https://static.tildacdn.com/tild3438-3263-4532-b262-363262396131/GANG-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6331-6530-4262-a134-373666613139/GFL-light.png",
dark: "https://static.tildacdn.com/tild6336-3562-4261-a466-373635663335/GFL-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3465-6234-4465-b739-353364383036/Golden-light.png",
dark: "https://static.tildacdn.com/tild3339-3165-4665-a230-303637313638/Golden-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3538-6464-4237-b738-306565306365/Huaxin-light.png",
dark: "https://static.tildacdn.com/tild6465-3037-4934-b736-666138613964/Huaxin-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3634-6166-4261-b361-663431646536/Hub-light.png",
dark: "https://static.tildacdn.com/tild3866-3630-4165-b763-396461316566/Hub-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3634-6663-4734-b532-373562333264/JT-light.png",
dark: "https://static.tildacdn.com/tild6664-6564-4235-b631-356666313631/JT-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6464-3537-4862-b534-616439653964/JunAn-light.png",
dark: "https://static.tildacdn.com/tild6330-3438-4365-a566-383836666138/JunAn-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6133-3534-4933-b063-376232656234/MAS-light.png",
dark: "https://static.tildacdn.com/tild3632-3966-4534-a461-666461613334/MAS-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6464-6538-4466-b166-393265323637/MSC-light.png",
dark: "https://static.tildacdn.com/tild3630-6537-4434-b031-353565393231/MSC-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3737-6662-4262-a636-326635653130/NAVIS-light.png",
dark: "https://static.tildacdn.com/tild6338-3934-4331-b833-633561313962/NAVIS-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3964-3236-4437-b730-656563663334/OVP-light.png",
dark: "https://static.tildacdn.com/tild3265-6165-4162-b931-383562623637/OVP-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6239-3463-4463-a563-623233333336/Panda-light.png",
dark: "https://static.tildacdn.com/tild3866-6633-4230-a431-363836653338/Panda-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6136-6131-4665-a430-623363323637/RED-light.png",
dark: "https://static.tildacdn.com/tild3838-3534-4334-b934-353666323131/RED-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3933-6531-4562-b863-303332316238/Ruscon-light.png",
dark: "https://static.tildacdn.com/tild3330-3462-4065-b363-373164653938/Ruscon-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3734-3938-4261-b961-303231633638/SASCO-light.png",
dark: "https://static.tildacdn.com/tild3662-3661-4861-a339-643464643564/SASCO-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6565-3030-4366-b135-306432323738/SCO-light.png",
dark: "https://static.tildacdn.com/tild3534-3565-4464-b461-396231343034/SCO-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3530-3732-4762-a139-613036663962/SINOKOR-light.png",
dark: "https://static.tildacdn.com/tild6436-6332-4362-a338-353263306332/SINOKOR-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3734-3364-4537-a230-303836396662/SINO-light.png",
dark: "https://static.tildacdn.com/tild3630-6633-4937-a661-366264336563/SINO-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild6663-3932-4630-a531-636435353261/SITC-light.png",
dark: "https://static.tildacdn.com/tild3730-6232-4231-a562-373837363664/SITC-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3461-3466-4136-a633-666564356331/Torgmoll-light.png",
dark: "https://static.tildacdn.com/tild3939-3239-4562-a533-633264326537/Torgmoll-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3264-6162-4230-a166-363339633133/Tranzit-light.png",
dark: "https://static.tildacdn.com/tild6432-6135-4366-b463-666438383538/Tranzit-dark.jpg",
},
{
light: "https://static.tildacdn.com/tild3030-6362-4635-b931-373363336536/Zhonggu-light.png",
dark: "https://static.tildacdn.com/tild3134-3766-4734-a264-383935623061/Zhonggu-dark.jpg",
},
];
var FRAME_ORIG_RU = [
"https://static.tildacdn.com/tild3865-3064-4136-a366-383461393166/Frame_1204.svg",
"https://static.tildacdn.com/tild3238-3835-4966-a365-343934633133/Frame_1236.svg",
"https://static.tildacdn.com/tild3438-3134-4130-a661-373562656230/Frame_1232.svg",
"https://static.tildacdn.com/tild6132-3866-4439-a238-343461346564/Frame_1210.svg",
"https://static.tildacdn.com/tild3165-3231-4430-a361-323634633966/Frame_1234.svg",
"https://static.tildacdn.com/tild6234-3831-4666-a135-326661616265/Frame_1233.svg",
"https://static.tildacdn.com/tild3134-3931-4264-b832-636661623635/Frame_1229.svg",
"https://static.tildacdn.com/tild6263-3633-4333-b863-376238376339/Frame_1207.svg",
"https://static.tildacdn.com/tild6132-3630-4938-b138-396239376138/Frame_1213.svg",
"https://static.tildacdn.com/tild6266-6261-4239-b537-306362353262/Frame_1199.svg",
"https://static.tildacdn.com/tild6161-6133-4233-a565-386239346236/Frame_1235.svg",
"https://static.tildacdn.com/tild6137-3630-4831-a166-663836393136/Frame_1212.svg",
"https://static.tildacdn.com/tild3861-6231-4665-b435-313664613463/Frame_1205.svg",
"https://static.tildacdn.com/tild3030-3661-4533-b039-323137363661/Frame_1191.svg",
"https://static.tildacdn.com/tild3964-3866-4363-a332-326536336131/Frame_1215.svg",
"https://static.tildacdn.com/tild6263-6233-4736-a232-313266383531/Frame_1196.svg",
"https://static.tildacdn.com/tild3835-3339-4938-b333-383031663732/Frame_1202.svg",
];
var FRAME_ORIG_EN = [
"https://static.tildacdn.com/tild6162-3330-4536-a134-396462633232/Frame_221223718.svg",
"https://static.tildacdn.com/tild6332-6465-4065-b135-303134343536/Frame_221223719.svg",
"https://static.tildacdn.com/tild3330-3062-4835-b362-303964623234/Frame_221223720.svg",
"https://static.tildacdn.com/tild3433-6564-4461-a266-356230666337/Frame_221223721.svg",
"https://static.tildacdn.com/tild3066-3034-4463-b837-326232383264/Frame_221223722.svg",
"https://static.tildacdn.com/tild3336-6234-4630-b062-643261663839/Frame_221223723.svg",
"https://static.tildacdn.com/tild6565-6661-4037-a665-623632343135/Frame_221223724.svg",
"https://static.tildacdn.com/tild6633-3661-4132-b732-313866623231/Frame_221223725.svg",
"https://static.tildacdn.com/tild6333-6238-4239-b461-313834326532/Frame_221223726.svg",
"https://static.tildacdn.com/tild3031-3462-4032-a563-356465616663/Frame_221223727.svg",
"https://static.tildacdn.com/tild6639-6566-4666-a232-306437626139/Frame_221223728.svg",
"https://static.tildacdn.com/tild3661-3732-4232-b238-363239666533/Frame_221223729.svg",
"https://static.tildacdn.com/tild6430-6362-4366-a332-653537396364/Frame_221223730.svg",
"https://static.tildacdn.com/tild6134-3839-4739-a334-623765656134/Frame_221223731.svg",
"https://static.tildacdn.com/tild6638-6331-4566-b636-393637303761/Frame_221223732.svg",
"https://static.tildacdn.com/tild3038-6536-4238-b931-373337323037/Frame_221223733.svg",
"https://static.tildacdn.com/tild3731-3263-4333-a364-363134353335/Frame_221223734.svg",
];
var byFullUrl = {};
var byFrameUrl = {};
var byTokenRu = {};
var byTokenEn = {};
var byTokenSea = {};
var observed = typeof WeakSet !== "undefined" ? new WeakSet() : null;
var io = null;
function registerPairs(list, tokenMap) {
for (var i = 0; i < list.length; i++) {
var p = list[i];
byFullUrl[normUrl(p.light)] = p;
byFullUrl[normUrl(p.dark)] = p;
tokenMap[fileToken(p.light)] = p;
tokenMap[fileToken(p.dark)] = p;
var base = fileToken(p.light)
.replace(/2x$/i, "")
.replace(/-dark$/i, "")
.replace(/-light$/i, "");
if (base) tokenMap[base] = p;
}
}
function registerFrames(frames, list) {
for (var f = 0; f < frames.length; f++) {
byFrameUrl[normUrl(frames[f])] = list[f % list.length];
}
}
function fileToken(url) {
var name = String(url).split("/").pop() || "";
return name.replace(/\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i, "").toLowerCase();
}
function normUrl(url) {
return String(url || "")
.split("?")[0]
.replace(/^http:\/\//i, "https://")
.toLowerCase();
}
registerPairs(PAIRS, byTokenRu);
registerPairs(EN_PAIRS, byTokenEn);
registerPairs(SEA_PAIRS, byTokenSea);
registerFrames(FRAME_ORIG_RU, PAIRS);
registerFrames(FRAME_ORIG_EN, EN_PAIRS);
function isEnSite() {
try {
if (/tisl-ogistic-en/i.test(location.hostname || "")) return true;
if (/\/en(\/|$)/i.test(location.pathname || "")) return true;
if ((document.documentElement.lang || "").toLowerCase().indexOf("en") === 0) return true;
if (document.querySelector('#tis-countries-slider img[src*="Frame_221223"]')) return true;
if (document.querySelector('#tis-countries-slider img[src*="/Africa.jpg"]')) return true;
if (document.querySelector('#tis-countries-slider img[src*="Africa-dark.jpg"][src*="tild3965"]'))
return true;
} catch (e) {}
return false;
}
function activePairs() {
return isEnSite() ? EN_PAIRS : PAIRS;
}
function activeTokens() {
return isEnSite() ? byTokenEn : byTokenRu;
}
function theme() {
return document.documentElement.getAttribute("data-tis-theme") || "dark";
}
function lookupToken(token, tokens) {
if (!token || !tokens) return null;
if (tokens[token]) return tokens[token];
var base = token.replace(/2x$/i, "").replace(/-dark$/i, "").replace(/-light$/i, "");
if (base && tokens[base]) return tokens[base];
if (base && tokens[base + "-light"]) return tokens[base + "-light"];
if (base && tokens[base + "-dark"]) return tokens[base + "-dark"];
if (base && tokens[base + "-dark2x"]) return tokens[base + "-dark2x"];
return null;
}
function pairForSrc(src) {
if (!src) return null;
var full = normUrl(src);
if (byFullUrl[full]) return byFullUrl[full];
if (byFrameUrl[full]) return byFrameUrl[full];
var token = fileToken(src);
return (
lookupToken(token, activeTokens()) ||
lookupToken(token, byTokenSea) ||
lookupToken(token, byTokenRu) ||
lookupToken(token, byTokenEn) ||
null
);
}
function wantedUrl(pair, isDark) {
return isDark ? pair.dark : pair.light;
}
function applyImg(img, pairHint) {
try {
var probe =
img.getAttribute("data-tis-asset-orig") ||
img.getAttribute("data-light-src") ||
img.getAttribute("data-dark-src") ||
img.getAttribute("data-tis-svg-orig") ||
img.getAttribute("src") ||
img.currentSrc ||
"";
var pair = pairHint || pairForSrc(probe);
if (!pair && img.getAttribute("data-light-src") && img.getAttribute("data-dark-src")) {
pair = {
light: img.getAttribute("data-light-src"),
dark: img.getAttribute("data-dark-src"),
};
}
if (!pair) return;
if (!img.getAttribute("data-tis-asset-orig")) {
img.setAttribute("data-tis-asset-orig", pair.light);
}
if (!img.getAttribute("data-light-src")) img.setAttribute("data-light-src", pair.light);
if (!img.getAttribute("data-dark-src")) img.setAttribute("data-dark-src", pair.dark);
var isDark = theme() === "dark";
var next = wantedUrl(pair, isDark);
var cur = img.getAttribute("src") || "";
if (cur !== next) {
img.decoding = "async";
img.src = next;
}
img.setAttribute("data-tis-asset-swap", "1");
if (isDark) img.setAttribute("data-tis-svg-dark", "1");
else img.removeAttribute("data-tis-svg-dark");
} catch (e) {}
}
function isNearViewport(el) {
try {
var r = el.getBoundingClientRect();
var margin = 200;
return r.bottom >= -margin && r.top <= (window.innerHeight || 0) + margin;
} catch (e) {
return true;
}
}
function ensureObserver() {
if (io || typeof IntersectionObserver === "undefined") return io;
io = new IntersectionObserver(
function (entries) {
for (var i = 0; i < entries.length; i++) {
var entry = entries[i];
if (!entry.isIntersecting) continue;
var img = entry.target;
io.unobserve(img);
applyImg(img);
}
},
{ rootMargin: "200px 0px", threshold: 0.01 }
);
return io;
}
function watchOrApply(img, pairHint) {
if (!img) return;
if (pairHint) {
img.setAttribute("data-light-src", pairHint.light);
img.setAttribute("data-dark-src", pairHint.dark);
}
if (isNearViewport(img)) {
applyImg(img, pairHint);
return;
}
var obs = ensureObserver();
if (obs) {
if (observed && observed.has(img)) return;
if (observed) observed.add(img);
obs.observe(img);
} else {
applyImg(img, pairHint);
}
}
function scanGallery(selector, pairs, excludeClosest) {
var root =
document.querySelector("#tis-countries-slider, .tis-countries, #tis-sea-lines-slider, .tis-sea-lines") ||
document;
if (!document.querySelector(selector.split(",")[0].trim())) {
var first = selector.split(",")[0].trim();
if (!document.querySelector(first.replace(/ img$/, "").replace(/\.tis-[^\s,]+$/, ""))) {
}
}
var imgs = document.querySelectorAll(selector);
if (!imgs.length) return;
var orderIdx = 0;
imgs.forEach(function (img) {
if (excludeClosest && img.closest(excludeClosest)) return;
var src =
img.getAttribute("data-tis-asset-orig") ||
img.getAttribute("data-tis-svg-orig") ||
img.getAttribute("src") ||
img.currentSrc ||
"";
var pair = pairForSrc(src);
if (!pair && (/Frame_/i.test(src) || /\.(jpe?g|png|webp)/i.test(src))) {
pair = pairs[orderIdx % pairs.length];
}
if (pair) watchOrApply(img, pair);
orderIdx += 1;
});
}
function hasAssetContainers() {
return Boolean(
document.querySelector(
"#tis-countries-slider, .tis-countries, #tis-sea-lines-slider, .tis-sea-lines, .tis-countries__image, .tis-sea-lines__image"
)
);
}
function scan() {
try {
if (!hasAssetContainers() && !document.querySelector("img[data-light-src], img[src*='-light.'], img[src*='-dark']")) {
return;
}
scanGallery(
".tis-countries__image, #tis-countries-slider img",
activePairs(),
".tis-sea-lines, #tis-sea-lines-slider"
);
scanGallery(
".tis-sea-lines__image, #tis-sea-lines-slider img",
SEA_PAIRS,
".tis-countries, #tis-countries-slider"
);
document
.querySelectorAll("img[data-light-src][data-dark-src], img[data-tis-asset-swap='1']")
.forEach(function (img) {
if (img.closest(".tis-sea-lines, #tis-sea-lines-slider")) return;
if (img.closest(".tis-countries, #tis-countries-slider")) return;
watchOrApply(img);
});
} catch (e) {}
}
function swapVisibleOnly() {
try {
document
.querySelectorAll(
"img[data-tis-asset-swap='1'], img[data-light-src][data-dark-src], .tis-countries__image, .tis-sea-lines__image, #tis-countries-slider img, #tis-sea-lines-slider img"
)
.forEach(function (img) {
if (!isNearViewport(img)) return;
applyImg(img);
});
} catch (e) {}
}
var timer = null;
function schedule() {
if (timer) return;
timer = setTimeout(function () {
timer = null;
scan();
}, 120);
}
function on(el, ev, fn, opts) {
try {
if (el && typeof el.addEventListener === "function") el.addEventListener(ev, fn, opts);
} catch (e) {}
}
function boot() {
if (!hasAssetContainers()) {
on(document, "tis:themechange", swapVisibleOnly);
return;
}
scan();
on(document, "tis:themechange", swapVisibleOnly);
try {
var roots = document.querySelectorAll(
"#tis-countries-slider, .tis-countries, #tis-sea-lines-slider, .tis-sea-lines"
);
if (roots.length && typeof MutationObserver !== "undefined") {
var mo = new MutationObserver(schedule);
roots.forEach(function (root) {
mo.observe(root, { childList: true, subtree: true });
});
}
} catch (e) {}
}
if (document.readyState === "loading") on(document, "DOMContentLoaded", boot, { once: true });
else boot();
})();
} catch (tisErr) { try { console.warn("[tis] theme-asset-swap.js", tisErr); } catch (e) {} }
try {
(function () {
"use strict";
var RULES = [
{
match: /c0a89d0b\.svg|Group_221222299\.svg|tild3962-6331-4133-b563-363431363235\/SVG\.svg|tild6135-6234-4566-a439-396430346461\/c0a89d0b\.svg|tild3136-3664-4636-b737-646265346365\/1\.svg/i,
kind: "process",
},
{
match: /b54b6bca\.svg|7b630607\.svg|1935bec3\.svg|086582a2\.svg|08fe5c54\.svg|301b058f\.svg|77054099\.svg|ad594942\.svg|b8fb4c51\.svg/i,
kind: "ved-number",
},
{
match: /ba2074e3\.svg|f3806e20\.svg|a09cb8ef\.svg|e8bae713\.svg|3744dd61\.svg|f66d02d9\.svg|d60b91e7\.svg|ac82a16e\.svg|21334eec\.svg/i,
kind: "icon-bright",
},
{
match:
/b0d0f5f9\.svg|b6a7124c\.svg|f2f5eba1\.svg|5366ea8d\.svg|e5943591\.svg|e744cb80\.svg|b956a809\.svg|0dc722e1\.svg|7ab359f9\.svg|a550526a\.svg|7f64f049\.svg|47c1f238\.svg|b6e8a609\.svg|4a0d5efe\.svg|1b92d01f\.svg|97d62813\.svg|52c22a37\.svg|f7a1d9ca\.svg|8c1df43f\.svg|bc761e8b\.svg|25f5672f\.svg|7f5d7bb4\.svg|7f51620f\.svg|561049f9\.svg/i,
kind: "service-card",
},
{
match: /981a8cb8\.svg|tild6231-3534-4132-b630-663931313337\/390\.svg|tild6135-6664-4538-a131-306133656139\/480\.svg|tild3731-3436-4339-a238-313533383761\/640\.svg/i,
kind: "lcl-scene",
},
{
match:
/bee1aacf\.svg|1440-1200\.svg|tild3035-3765-4531-b130-643734303531\/390\.svg|tild3236-3566-4636-b263-326135353764\/480\.svg|tild3335-3931-4332-b163-373666333137\/640\.svg|tild6636-3433-4166-b831-336433666538\/960\.svg/i,
kind: "coastal-ports",
},
{
match: /\/(390|480|640|960)\.svg(\?|$)|1440-1200\.svg/i,
kind: "table",
},
{
match: /Frame_\d+\.svg|\/photo\.svg(\?|$)/i,
kind: "frame-card",
classNeed: /tis-sea-lines__image/,
},
{
match: /Section\.svg/i,
kind: "coastal",
},
];
var cache = {};
var pending = {};
function theme() {
return document.documentElement.getAttribute("data-tis-theme") || "dark";
}
function ruleFor(src, img, skipKinds) {
if (!src) return null;
for (var i = 0; i < RULES.length; i++) {
var rule = RULES[i];
if (skipKinds && skipKinds.indexOf(rule.kind) !== -1) continue;
if (!rule.match.test(src)) continue;
if (rule.classNeed) {
var cls = (img && (img.className || "")) || "";
if (!rule.classNeed.test(String(cls))) continue;
}
return rule;
}
return null;
}
var TABLE_RECS = {
rec2480313751: 1,
rec2480430071: 1,
rec2480443071: 1,
rec2470194161: 1,
rec2501811991: 1 ,
};
function pathBBox(d) {
if (!d) return null;
var cmds = d.match(/[a-zA-Z][^a-zA-Z]*/g);
if (!cmds) return null;
var x = 0,
y = 0,
sx = 0,
sy = 0;
var minX = Infinity,
minY = Infinity,
maxX = -Infinity,
maxY = -Infinity;
function add(px, py) {
if (px < minX) minX = px;
if (py < minY) minY = py;
if (px > maxX) maxX = px;
if (py > maxY) maxY = py;
}
for (var c = 0; c < cmds.length; c++) {
var raw = cmds[c];
var type = raw.charAt(0);
var abs = type === type.toUpperCase();
type = type.toUpperCase();
var nums = (raw.slice(1).match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []).map(parseFloat);
var i = 0;
if (type === "M") {
while (i + 1 < nums.length) {
if (abs) {
x = nums[i];
y = nums[i + 1];
} else {
x += nums[i];
y += nums[i + 1];
}
if (i === 0) {
sx = x;
sy = y;
}
add(x, y);
i += 2;
abs = true;
}
} else if (type === "L") {
while (i + 1 < nums.length) {
if (abs) {
x = nums[i];
y = nums[i + 1];
} else {
x += nums[i];
y += nums[i + 1];
}
add(x, y);
i += 2;
}
} else if (type === "H") {
for (; i < nums.length; i++) {
x = abs ? nums[i] : x + nums[i];
add(x, y);
}
} else if (type === "V") {
for (; i < nums.length; i++) {
y = abs ? nums[i] : y + nums[i];
add(x, y);
}
} else if (type === "C") {
while (i + 5 < nums.length) {
var x1, y1, x2, y2, x3, y3;
if (abs) {
x1 = nums[i];
y1 = nums[i + 1];
x2 = nums[i + 2];
y2 = nums[i + 3];
x3 = nums[i + 4];
y3 = nums[i + 5];
} else {
x1 = x + nums[i];
y1 = y + nums[i + 1];
x2 = x + nums[i + 2];
y2 = y + nums[i + 3];
x3 = x + nums[i + 4];
y3 = y + nums[i + 5];
}
add(x1, y1);
add(x2, y2);
x = x3;
y = y3;
add(x, y);
i += 6;
}
} else if (type === "Z") {
x = sx;
y = sy;
}
}
if (!isFinite(minX)) return null;
return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
}
function inside(bb, x, y, pad) {
return (
x >= bb.minX - pad &&
x <= bb.maxX + pad &&
y >= bb.minY - pad &&
y <= bb.maxY + pad
);
}
function pathSamplePoint(d) {
var bb = pathBBox(d);
if (!bb) return null;
return { x: (bb.minX + bb.maxX) / 2, y: (bb.minY + bb.maxY) / 2 };
}
function recolorProcess(text) {
var yellow = [];
text.replace(/<path\b[^>]*fill="#F1B83B"[^>]*>/gi, function (tag) {
var d = (tag.match(/\bd="([^"]*)"/) || [])[1];
var bb = pathBBox(d);
if (bb) yellow.push(bb);
return tag;
});
text.replace(/<rect\b[^>]*fill="#F1B83B"[^>]*>/gi, function (tag) {
var x = parseFloat((tag.match(/\bx="([^"]*)"/) || [])[1]);
var y = parseFloat((tag.match(/\by="([^"]*)"/) || [])[1]);
var w = parseFloat((tag.match(/\bwidth="([^"]*)"/) || [])[1]);
var h = parseFloat((tag.match(/\bheight="([^"]*)"/) || [])[1]);
if (isFinite(x) && isFinite(y) && isFinite(w) && isFinite(h)) {
yellow.push({ minX: x, minY: y, maxX: x + w, maxY: y + h });
}
return tag;
});
function keepDark(d) {
var pt = pathSamplePoint(d);
if (!pt || !yellow.length) return false;
for (var i = 0; i < yellow.length; i++) {
var bb = yellow[i];
var w = bb.maxX - bb.minX;
var h = bb.maxY - bb.minY;
if (w > 200 || h > 200) continue;
if (inside(bb, pt.x, pt.y, 6)) return true;
}
return false;
}
return text.replace(/<path\b[^>]*>/gi, function (tag) {
if (/fill="#F1B83B"|stroke="#F1B83B"/i.test(tag)) return tag;
var d = (tag.match(/\bd="([^"]*)"/) || [])[1] || "";
if (keepDark(d)) return tag;
return tag
.replace(/fill="#1[Ee]1[Ee]1[Ee]"/g, 'fill="#FFFFFF"')
.replace(/stroke="#1[Ee]1[Ee]1[Ee]"/g, 'stroke="#FFFFFF"');
});
}
function recolorTable(text) {
return text
.replace(/fill="white"/gi, 'fill="#2A2A2F"')
.replace(/fill="#[Ff]{3,6}"/g, 'fill="#2A2A2F"')
.replace(/fill="#[Dd][Ff][Dd][Ff][Dd][Ff]"/g, 'fill="#777777"')
.replace(/stroke="#[Dd][Ff][Dd][Ff][Dd][Ff]"/g, 'stroke="#777777"');
}
function recolorFrameCard(text) {
var embedded = /<image[\s>]/i.test(text);
var plate = embedded ? "#D5D5D0" : "#2A2A2F";
return text
.replace(/fill="white"/gi, 'fill="' + plate + '"')
.replace(/fill="#1[Ee]1[Ee]1[Ee]"/g, 'fill="#FFFFFF"')
.replace(/stroke="#1[Ee]1[Ee]1[Ee]"/g, 'stroke="#FFFFFF"');
}
function recolorCoastal(text) {
return text
.replace(/fill="white"/gi, 'fill="#2A2A2F"')
.replace(/fill="#[Ee]{6}"/g, 'fill="#333338"')
.replace(/fill="#5[Cc]5[Cc]5[Cc]"/g, 'fill="#2A2A2F"');
}
function recolorCoastalPorts(text) {
return text
.replace(/<rect([^>]*?)fill="white"/gi, '<rect$1fill="#2A2A2F"')
.replace(/fill="#[Ee]{6}"/g, 'fill="#333338"')
.replace(/fill="#5[Cc]5[Cc]5[Cc]"/g, 'fill="#FFFFFF"');
}
function recolorLclScene(text) {
return text
.replace(/fill="#[Ee]{6}"/g, 'fill="#333338"')
.replace(/fill="#5[Cc]5[Cc]5[Cc]"/g, 'fill="#ADADB9"')
.replace(/fill="#D9D9D9"/gi, 'fill="#42424A"');
}
function recolorVedNumber(text) {
return text.replace(/opacity="0\.5"/gi, 'opacity="1"');
}
function recolorIconBright(text) {
return text
.replace(/fill="#1[Ee]1[Ee]1[Ee]"/g, 'fill="#FFFFFF"')
.replace(/stroke="#1[Ee]1[Ee]1[Ee]"/g, 'stroke="#FFFFFF"')
.replace(/stroke="#5[Cc]5[Cc]5[Cc]"/g, 'stroke="#ADADB9"')
.replace(/fill="#5[Cc]5[Cc]5[Cc]"/g, 'fill="#ADADB9"')
.replace(/stroke="#848484"/g, 'stroke="#ADADB9"')
.replace(/fill="#848484"/g, 'fill="#ADADB9"');
}
function recolorServiceCard(text) {
return text
.replace(/fill="#1[Ee]1[Ee]1[Ee]"/g, 'fill="#FFFFFF"')
.replace(/stroke="#1[Ee]1[Ee]1[Ee]"/g, 'stroke="#FFFFFF"')
.replace(/fill="#EBEBEB"/gi, 'fill="#FFFFFF"')
.replace(/stroke="#EBEBEB"/gi, 'stroke="#FFFFFF"');
}
function recolor(text, kind) {
if (kind === "table") return recolorTable(text);
if (kind === "frame-card") return recolorFrameCard(text);
if (kind === "coastal") return recolorCoastal(text);
if (kind === "coastal-ports") return recolorCoastalPorts(text);
if (kind === "lcl-scene") return recolorLclScene(text);
if (kind === "ved-number") return recolorVedNumber(text);
if (kind === "icon-bright") return recolorIconBright(text);
if (kind === "service-card") return recolorServiceCard(text);
return recolorProcess(text);
}
function toDataUri(svgText) {
return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText);
}
function applyToImg(img) {
try {
if (img.getAttribute("data-tis-svg-hover") === "1") return;
if (img.getAttribute("data-tis-asset-swap") === "1") return;
if (/tis-countries__image/.test(String(img.className || ""))) return;
var probe = img.getAttribute("data-tis-svg-orig") || img.currentSrc || img.src || "";
var rule = ruleFor(probe, img);
if (!rule) {
if (img.getAttribute("data-tis-svg-dark") === "1") {
var stale = img.getAttribute("data-tis-svg-orig");
if (stale && stale.indexOf("data:") !== 0) {
img.src = stale;
img.removeAttribute("data-tis-svg-dark");
img.removeAttribute("data-tis-svg-light");
}
}
return;
}
if (rule.kind === "table") {
var rec = img.closest(".r");
var rid = rec && rec.id;
if (!rid || !TABLE_RECS[rid]) {
if (
rid === "rec2469575431" ||
rid === "rec2501774181" ||
img.closest(
"#rec2469575431 [data-elem-id='1784674231801'], #rec2469575431 [data-elem-id='1784674152980'], #rec2469575431 [data-elem-id='1784674007147'], #rec2469575431 [data-elem-id='1784673849551'], #rec2501774181 [data-elem-id='1784674231801'], #rec2501774181 [data-elem-id='1784674152980'], #rec2501774181 [data-elem-id='1784674007147'], #rec2501774181 [data-elem-id='1784673849551']"
)
) {
rule = { kind: "coastal-ports" };
} else {
rule = ruleFor(probe, img, ["table"]);
if (!rule) return;
}
}
}
if (rule.kind === "service-card") {
var inServicesIndex = img.closest(
"#rec2467753711, #rec2501169051, #rec2467755141, #rec2501169061"
);
var isMutedIcon = img.closest(".tis-service-muted-part");
if (inServicesIndex && !isMutedIcon) {
var keep = img.getAttribute("data-tis-svg-orig");
if (keep && keep.indexOf("data:") !== 0) {
img.removeAttribute("data-tis-svg-dark");
img.removeAttribute("data-tis-svg-light");
img.removeAttribute("data-tis-svg-hover");
if ((img.getAttribute("src") || "").indexOf("data:") === 0) img.src = keep;
}
return;
}
}
if (!img.getAttribute("data-tis-svg-orig")) {
if (probe.indexOf("data:") === 0) return;
img.setAttribute("data-tis-svg-orig", probe);
}
var orig = img.getAttribute("data-tis-svg-orig");
if (!orig || orig.indexOf("data:") === 0) return;
if (theme() !== "dark") {
if (img.getAttribute("data-tis-svg-dark") === "1") {
img.src = orig;
img.removeAttribute("data-tis-svg-dark");
img.removeAttribute("data-tis-svg-light");
img.removeAttribute("data-tis-svg-hover");
}
return;
}
if (img.getAttribute("data-tis-svg-dark") === "1") {
var curSrc = img.getAttribute("src") || img.currentSrc || "";
if (curSrc.indexOf("data:") === 0) return;
if (img.getAttribute("data-tis-svg-hover") === "1") return;
img.removeAttribute("data-tis-svg-dark");
}
if (pending[orig]) return;
if (cache[orig]) {
img.src = cache[orig];
img.setAttribute("data-tis-svg-light", cache[orig]);
img.setAttribute("data-tis-svg-dark", "1");
return;
}
pending[orig] = true;
fetch(orig)
.then(function (r) {
return r.text();
})
.then(function (text) {
var url = toDataUri(recolor(text, rule.kind));
cache[orig] = url;
pending[orig] = false;
document
.querySelectorAll("img[data-tis-svg-orig], img[src*='.svg'], img[data-original*='.svg']")
.forEach(function (el) {
var o = el.getAttribute("data-tis-svg-orig") || "";
var src = el.currentSrc || el.src || "";
if (o === orig || (ruleFor(src, el) && src.indexOf(orig.split("/").pop()) !== -1)) {
if (!el.getAttribute("data-tis-svg-orig")) el.setAttribute("data-tis-svg-orig", orig);
el.setAttribute("data-tis-svg-light", url);
el.setAttribute("data-tis-svg-dark", "1");
if (el.getAttribute("data-tis-svg-hover") === "1") return;
el.src = url;
}
});
})
.catch(function () {
pending[orig] = false;
});
} catch (e) {}
}
function bgUrl(el) {
try {
var style = el.getAttribute("style") || "";
var m = style.match(/url\(['"]?([^'")]+)['"]?\)/i);
if (m) return m[1];
var cs = window.getComputedStyle(el).backgroundImage || "";
m = cs.match(/url\(["']?([^"')]+)["']?\)/i);
return m ? m[1] : "";
} catch (e) {
return "";
}
}
function applyToBg(el) {
try {
var probe = el.getAttribute("data-tis-svg-orig") || bgUrl(el);
var rule = ruleFor(probe, null);
if (!rule || rule.kind !== "coastal") return;
if (!el.getAttribute("data-tis-svg-orig")) {
if (!probe || probe.indexOf("data:") === 0) return;
el.setAttribute("data-tis-svg-orig", probe);
}
var orig = el.getAttribute("data-tis-svg-orig");
if (!orig || orig.indexOf("data:") === 0) return;
if (theme() !== "dark") {
if (el.getAttribute("data-tis-svg-dark") === "1") {
el.style.backgroundImage = 'url("' + orig + '")';
el.removeAttribute("data-tis-svg-dark");
}
return;
}
if (el.getAttribute("data-tis-svg-dark") === "1") {
var bg = el.style.backgroundImage || "";
if (bg.indexOf("data:") !== -1) return;
el.removeAttribute("data-tis-svg-dark");
}
if (pending[orig]) return;
function paint(url) {
el.style.setProperty("background-image", 'url("' + url + '")', "important");
el.setAttribute("data-tis-svg-dark", "1");
}
if (cache[orig]) {
paint(cache[orig]);
return;
}
pending[orig] = true;
fetch(orig)
.then(function (r) {
return r.text();
})
.then(function (text) {
var url = toDataUri(recolor(text, rule.kind));
cache[orig] = url;
pending[orig] = false;
document
.querySelectorAll(".tn-atom, .t-bgimg, [style*='Section.svg']")
.forEach(function (node) {
var o = node.getAttribute("data-tis-svg-orig") || bgUrl(node);
if (o === orig || (o && o.indexOf("Section.svg") !== -1)) {
if (!node.getAttribute("data-tis-svg-orig")) node.setAttribute("data-tis-svg-orig", orig);
node.style.setProperty("background-image", 'url("' + url + '")', "important");
node.setAttribute("data-tis-svg-dark", "1");
}
});
})
.catch(function () {
pending[orig] = false;
});
} catch (e) {}
}
function scan() {
try {
if (theme() !== "dark") return;
document
.querySelectorAll(
"img[src*='.svg'], img[data-tis-svg-orig], img[data-original*='.svg'], " +
"#rec2477273441 .tn-atom, #rec2477273441 .t-bgimg, " +
"[data-elem-id='1784218924084'] .tn-atom, [style*='Section.svg'], " +
"img[src*='bee1aacf'], img[src*='Section.svg']"
)
.forEach(function (el) {
if (el.tagName === "IMG") applyToImg(el);
else applyToBg(el);
});
} catch (e) {}
}
function on(el, ev, fn, opts) {
try {
if (el && typeof el.addEventListener === "function") el.addEventListener(ev, fn, opts);
} catch (e) {}
}
function boot() {
if (typeof requestIdleCallback === "function") {
requestIdleCallback(scan, { timeout: 2500 });
} else {
setTimeout(scan, 200);
}
on(document, "tis:themechange", scan);
}
if (document.readyState === "loading") {
on(document, "DOMContentLoaded", boot, { once: true });
} else {
boot();
}
})();
} catch (tisErr) { try { console.warn("[tis] svg-theme.js", tisErr); } catch (e) {} }
try {
(function () {
"use strict";
function clearEnter() {
document.documentElement.classList.remove("tis-page-enter");
document.documentElement.classList.remove("tis-page-exit");
}
clearEnter();
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", clearEnter, { once: true });
}
window.addEventListener("pageshow", clearEnter);
})();
document.addEventListener("DOMContentLoaded", function () {
var trigger = document.querySelector(".dv-services-trigger");
var line = document.querySelector(".dv-services-line");
if (!trigger || !line) return;
trigger.addEventListener("mouseenter", function () {
line.classList.add("dv-line-hidden");
});
trigger.addEventListener("mouseleave", function () {
line.classList.remove("dv-line-hidden");
});
});
} catch (tisErr) { try { console.warn("[tis] page-transition.js", tisErr); } catch (e) {} }
try {
var MUTED_SERVICE_SHAPE_IDS = {
"1783971412205000037": 1,
"1783971412281000041": 1,
"1783971412347000045": 1,
};
function shapeHasLink(el) {
if (!el) return false;
if (el.tagName === "A" && el.getAttribute("href")) return true;
if (el.getAttribute("href")) return true;
var a = el.querySelector("a[href]");
if (a && a.getAttribute("href")) return true;
var field = el.getAttribute("data-field-link-value") || el.getAttribute("data-field-lid-value");
if (field && field !== "/" && field !== "#") return true;
return false;
}
function ensureServicesIndexShapes() {
var sels = [
"#rec2467753711",
"#rec2501169051",
"#rec2467755141",
"#rec2501169061",
];
sels.forEach(function (sel) {
var rec = document.querySelector(sel);
if (!rec) return;
rec.querySelectorAll("a.tn-group, a.t396__group, .tn-elem[data-elem-type='shape']").forEach(function (el) {
if (el.classList.contains("none")) return;
var id = el.getAttribute("data-elem-id") || "";
if (MUTED_SERVICE_SHAPE_IDS[id]) return;
if (!shapeHasLink(el)) {
el.classList.remove("tis-shape");
el.querySelectorAll(".tis-shape-bg").forEach(function (bg) {
bg.classList.remove("tis-shape-bg");
});
return;
}
if (!el.classList.contains("tis-shape")) el.classList.add("tis-shape");
});
});
}
function rectContainsCenter(outer, inner) {
const cx = inner.left + inner.width / 2;
const cy = inner.top + inner.height / 2;
return (
cx >= outer.left &&
cx <= outer.right &&
cy >= outer.top &&
cy <= outer.bottom
);
}
function restoreOriginalSvg(img) {
if (!img) return;
var orig = img.getAttribute("data-tis-svg-orig");
if (!orig || orig.indexOf("data:") === 0) return;
img.removeAttribute("data-tis-svg-hover");
img.removeAttribute("data-tis-svg-dark");
img.removeAttribute("data-tis-svg-light");
if (img.getAttribute("src") !== orig) img.src = orig;
}
function collectOverlapParts(card) {
const artboard = card.closest(".t396__artboard");
if (!artboard) return [];
const cardRect = card.getBoundingClientRect();
if (!cardRect.width || !cardRect.height) return [];
const parts = [];
artboard.querySelectorAll("[data-elem-id]").forEach(function (el) {
if (el === card || card.contains(el)) return;
if (el.classList.contains("tis-shape") || el.classList.contains("tis-arrow")) return;
if (el.classList.contains("tis-service-muted") || el.classList.contains("tis-service-muted-part")) {
return;
}
const type = el.getAttribute("data-elem-type");
if (type !== "image" && type !== "text") return;
const rect = el.getBoundingClientRect();
if (rect.width < 2 || rect.height < 2) return;
if (!rectContainsCenter(cardRect, rect)) return;
el.classList.add("tis-shape-part");
parts.push(el);
restoreOriginalSvg(el.querySelector("img"));
});
return parts;
}
function linkOverlappingParts(card) {
if (card.querySelector("img")) return;
collectOverlapParts(card);
if (card.getAttribute("data-tis-parts-bound") === "1") return;
card.setAttribute("data-tis-parts-bound", "1");
var activeParts = [];
var hoverOn = false;
function applyActiveParts() {
activeParts.forEach(function (part) {
part.classList.remove("tis-shape-part-active");
});
activeParts = collectOverlapParts(card);
activeParts.forEach(function (part) {
part.classList.add("tis-shape-part-active");
});
return activeParts.length;
}
function setActive(on) {
hoverOn = on;
card.classList.toggle("tis-shape-active", on);
if (on) {
if (!applyActiveParts()) {
requestAnimationFrame(function () {
if (!hoverOn) return;
if (!applyActiveParts()) {
setTimeout(function () {
if (hoverOn) applyActiveParts();
}, 80);
}
});
}
} else {
activeParts.forEach(function (part) {
part.classList.remove("tis-shape-part-active");
});
activeParts = [];
}
}
card.addEventListener("mouseenter", function () {
setActive(true);
});
card.addEventListener("mouseleave", function () {
setActive(false);
});
card.addEventListener("focusin", function () {
setActive(true);
});
card.addEventListener("focusout", function () {
setActive(false);
});
}
function linkMutedServiceCards() {
const mutedIds = [
"1783971412205000037",
"1783971412281000041",
"1783971412347000045",
];
["#rec2467755141", "#rec2501169061"].forEach(function (sel) {
const rec = document.querySelector(sel);
if (!rec) return;
mutedIds.forEach(function (id) {
const shape = rec.querySelector('[data-elem-id="' + id + '"]');
if (!shape) return;
shape.classList.add("tis-service-muted");
shape.classList.remove("tis-shape");
const shapeRect = shape.getBoundingClientRect();
if (!shapeRect.width || !shapeRect.height) return;
rec.querySelectorAll("[data-elem-id]").forEach(function (el) {
if (el === shape) return;
const type = el.getAttribute("data-elem-type");
if (type !== "image" && type !== "text") return;
const rect = el.getBoundingClientRect();
if (rect.width < 2 || rect.height < 2) return;
if (!rectContainsCenter(shapeRect, rect)) return;
el.classList.add("tis-service-muted-part");
});
});
});
}
function ensureShapeBg(card) {
if (card.querySelector(".tis-shape-bg")) return;
var fallbackLayer =
card.querySelector(".tn-atom") ||
card.querySelector(".tn-group__wrapper") ||
card.firstElementChild;
if (fallbackLayer) fallbackLayer.classList.add("tis-shape-bg");
}
function wireShapeCard(card) {
ensureShapeBg(card);
linkOverlappingParts(card);
card.setAttribute("data-tis-shape-ready", "1");
}
function bootShapes() {
ensureServicesIndexShapes();
document.querySelectorAll(".tis-shape:not([data-tis-shape-ready]), .tis-arrow:not([data-tis-shape-ready])").forEach(wireShapeCard);
linkMutedServiceCards();
}
function scheduleShapeBoot() {
if (typeof requestIdleCallback === "function") {
requestIdleCallback(bootShapes, { timeout: 800 });
} else {
setTimeout(bootShapes, 1);
}
}
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", scheduleShapeBoot, { once: true });
} else {
scheduleShapeBoot();
}
} catch (tisErr) { try { console.warn("[tis] shapes.js", tisErr); } catch (e) {} }
try {
document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector("#rec2483004181");if(!e)return;function t(){e.classList.toggle("tis-scroll-black",window.scrollY>=50)}t(),window.addEventListener("scroll",t,{passive:true})});
} catch (tisErr) { try { console.warn("[tis] header-scroll.js", tisErr); } catch (e) {} }
try {
document.addEventListener("DOMContentLoaded",function(){const t=/^tis-menu-btn-(\d+)$/,e=[];[{menu:"#rec2483156561",trigger:".tis-menu-trigger-1",shape:".tis-menu-shape-1"},{menu:"#rec2483477951",trigger:".tis-menu-trigger-2",shape:".tis-menu-shape-2"}].forEach(function(n){const i=document.querySelector(n.menu),o=document.querySelectorAll(n.trigger);if(!i||!o.length)return;let s=null,r=o[0],u=null;function c(e){if(!(e instanceof Element))return null;let n=e;for(;n&&i.contains(n);){const e=Array.from(n.classList).find(function(e){return t.test(e)});if(e)return{element:n,number:e.match(t)[1]};if(n===i)break;n=n.parentElement}return null}function a(t){if(!(t instanceof Element))return!1;const e=t.closest(n.shape);return Boolean(e&&i.contains(e))}function l(t){return i.classList.contains("tis-menu-open")&&Boolean(c(t)||a(t))}function d(){i.querySelectorAll(".tis-menu-btn-active,.tis-menu-text-active,.tis-menu-icon-active,.tis-menu-item-active").forEach(function(t){t.classList.remove("tis-menu-btn-active","tis-menu-text-active","tis-menu-icon-active","tis-menu-item-active")}),u=null}function f(t){if(!i.classList.contains("tis-menu-open")||u===t)return;d();const e=i.querySelector(".tis-menu-btn-"+t),n=i.querySelector(".tis-menu-text-"+t),o=i.querySelector(".tis-menu-icon-"+t);e&&e.classList.add("tis-menu-btn-active"),n&&n.classList.add("tis-menu-text-active"),o&&o.classList.add("tis-menu-icon-active"),u=t}function m(t){const e=t.closest(".r"),n=(e?e.querySelector(".t396__artboard"):null)||e||document.querySelector("#t-header"),o=n?Math.max(0,Math.round(n.getBoundingClientRect().bottom)):81;i.style.setProperty("--tis-menu-top",o+"px")}function p(){window.clearTimeout(s),s=null}function v(){p(),d(),i.classList.remove("tis-menu-open"),i.setAttribute("aria-hidden","true"),o.forEach(function(t){t.setAttribute("aria-expanded","false")})}function h(t){window.innerWidth<1200||(e.forEach(function(t){t.menu!==i&&t.close()}),r=t,p(),d(),m(t),i.classList.add("tis-menu-open"),i.setAttribute("aria-hidden","false"),o.forEach(function(t){t.setAttribute("aria-expanded","true")}))}function E(){p(),s=window.setTimeout(v,180)}v(),o.forEach(function(t){t.setAttribute("aria-expanded","false"),t.addEventListener("pointerenter",function(){h(t)}),t.addEventListener("pointerleave",E),t.addEventListener("focusin",function(){h(t)})}),i.addEventListener("pointerover",function(t){if(!i.classList.contains("tis-menu-open"))return;const e=c(t.target);if(e)return p(),void f(e.number);a(t.target)&&p()}),i.addEventListener("pointerout",function(t){if(!i.classList.contains("tis-menu-open"))return;const e=c(t.target),n=c(t.relatedTarget);if(!e||!n||e.number!==n.number){if(n)return p(),void f(n.number);e&&d(),l(t.relatedTarget)?p():l(t.target)&&v()}}),e.push({menu:i,close:v,position:function(){m(r)}})}),document.addEventListener("keydown",function(t){"Escape"===t.key&&e.forEach(function(t){t.close()})}),window.addEventListener("resize",function(){e.forEach(function(t){window.innerWidth<1200?t.close():t.position()})}),window.addEventListener("scroll",function(){e.forEach(function(t){t.menu.classList.contains("tis-menu-open")&&t.position()})},{passive:!0})})
} catch (tisErr) { try { console.warn("[tis] mega-menu.js", tisErr); } catch (e) {} }
try {
(() => {
const menu = document.getElementById("tis-mobile-menu");
if (!menu || menu.dataset.tisMenuReady === "1") return;
menu.dataset.tisMenuReady = "1";
const body = document.body;
const panel = menu.querySelector(".tis-menu-panel");
const accordion = menu.querySelector(".tis-menu-accordion");
const accordionButton = menu.querySelector(".tis-menu-accordion-button");
let previousFocus = null;
const openMenu = () => {
if (innerWidth > 1199) return;
previousFocus = document.activeElement;
menu.classList.add("tis-menu-open");
menu.setAttribute("aria-hidden", "false");
body.classList.add("tis-menu-lock");
setTimeout(() => menu.querySelector(".tis-menu-close")?.focus(), 100);
};
const closeMenu = () => {
menu.classList.remove("tis-menu-open");
menu.setAttribute("aria-hidden", "true");
body.classList.remove("tis-menu-lock");
previousFocus?.focus?.();
};
const toggleAccordion = () => {
if (!accordion || !accordionButton) return;
const isOpen = accordion.classList.toggle("is-open");
accordionButton.setAttribute("aria-expanded", String(isOpen));
};
document.addEventListener("click", (event) => {
const target = event.target instanceof Element ? event.target : null;
if (!target) return;
const menuOpener = target.closest('a[href="#tis-menu"]');
if (menuOpener) {
event.preventDefault();
openMenu();
return;
}
if (target.closest("[data-tis-close]")) {
closeMenu();
return;
}
const menuLink = target.closest("#tis-mobile-menu a");
if (menuLink) {
setTimeout(closeMenu, 0);
}
});
accordionButton?.addEventListener("click", toggleAccordion);
document.addEventListener("keydown", (event) => {
if (event.key === "Escape" && menu.classList.contains("tis-menu-open")) {
closeMenu();
}
if (event.key !== "Tab" || !menu.classList.contains("tis-menu-open") || !panel) {
return;
}
const focusable = [
...panel.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])'),
].filter((element) => !element.disabled && element.offsetParent !== null);
const first = focusable[0];
const last = focusable[focusable.length - 1];
if (event.shiftKey && document.activeElement === first) {
event.preventDefault();
last.focus();
} else if (!event.shiftKey && document.activeElement === last) {
event.preventDefault();
first.focus();
}
});
window.addEventListener("resize", () => {
if (innerWidth > 1199) closeMenu();
});
})();
} catch (tisErr) { try { console.warn("[tis] mobile-menu.js", tisErr); } catch (e) {} }
try {
document.addEventListener("DOMContentLoaded", function () {
var init = function () {
document.querySelectorAll(".t-input-group_sb .t-select__wrapper").forEach(function (w) {
if (w.dataset.tisSelect) return;
var s = w.querySelector("select");
if (!s) return;
w.dataset.tisSelect = "1";
var c = document.createElement("div");
c.className = "tis-custom-select";
var b = document.createElement("div");
b.className = "tis-custom-select__control";
var l = document.createElement("div");
l.className = "tis-custom-select__dropdown";
var setText = function (t) {
if (t === "Выберите ближайший к вам филиал") {
b.innerHTML =
'<span class="tis-custom-select__label">Выберите ближайший<span class="tis-mobile-break"></span>к вам филиал</span>';
} else {
b.innerHTML = '<span class="tis-custom-select__label">' + t + "</span>";
}
};
var render = function () {
var o = s.options[s.selectedIndex] || s.options[0];
setText(o ? o.text : "");
l.querySelectorAll(".tis-custom-select__option").forEach(function (e) {
e.classList.toggle("is-selected", Number(e.dataset.index) === s.selectedIndex);
});
};
Array.prototype.forEach.call(s.options, function (o, i) {
if (!o.value) return;
var e = document.createElement("div");
e.className = "tis-custom-select__option";
e.dataset.index = String(i);
e.textContent = o.text;
e.addEventListener("click", function () {
s.selectedIndex = i;
s.dispatchEvent(new Event("change", { bubbles: true }));
render();
c.classList.remove("is-open");
});
l.appendChild(e);
});
b.addEventListener("click", function (ev) {
ev.stopPropagation();
document.querySelectorAll(".tis-custom-select.is-open").forEach(function (x) {
if (x !== c) x.classList.remove("is-open");
});
c.classList.toggle("is-open");
});
s.addEventListener("change", render);
c.appendChild(b);
c.appendChild(l);
w.appendChild(c);
render();
});
};
init();
if (document.body) {
new MutationObserver(init).observe(document.body, { childList: true, subtree: true });
}
document.addEventListener("click", function () {
document.querySelectorAll(".tis-custom-select.is-open").forEach(function (e) {
e.classList.remove("is-open");
});
});
document.addEventListener("keydown", function (ev) {
if (ev.key !== "Escape") return;
document.querySelectorAll(".tis-custom-select.is-open").forEach(function (el) {
el.classList.remove("is-open");
});
});
});
} catch (tisErr) { try { console.warn("[tis] custom-select.js", tisErr); } catch (e) {} }
try {
(function(){function init(){var slides=[{image:"https://static.tildacdn.com/tild6236-3161-4635-b639-663232666538/_____3.webp",title:"Доставка <br>груза",text:"несмотря на санкционные<br>ограничения"},{image:"https://static.tildacdn.com/tild6161-3037-4236-b464-336261613233/_____4.webp",title:"Отправка <br>генеральных <br>грузов",text:"любой сложности"},{image:"https://static.tildacdn.com/tild3037-6261-4134-b336-303233643864/_____5.webp",title:"Широкая <br>партнёрская сеть",text:"и особые условия отправки вашего груза за счёт<br>предоставления специальных условий, которые подразумевают<br>снижение ставки фрахта и себестоимости перевозки в целом"},{image:"https://static.tildacdn.com/tild3539-3062-4561-b333-396232376666/____.webp",title:"Подготовка груза <br>к транспортировке",text:"перегрузов, сортировки, креплений и приведение груза<br>в транспортабельное состояние, в том числе и опасных грузов"},{image:"https://static.tildacdn.com/tild3861-6239-4165-a531-383164313833/_____2.webp",title:"Работаем с любой <br>судоходной <br>линией",text:""}],mount=document.getElementById("tis-advantages-slider");if(!mount||mount.dataset.ready==="1")return;mount.dataset.ready="1";var prev='<button class="tis-advantages__button tis-advantages__button--prev" type="button" aria-label="Предыдущий слайд"><svg width="6" height="9" viewBox="0 0 6 9"><path d="M6 7.9425L2.2915 4.5L6 1.0575L4.8583 0L0 4.5L4.8583 9L6 7.9425Z"/></svg></button>',next='<button class="tis-advantages__button tis-advantages__button--next" type="button" aria-label="Следующий слайд"><svg width="6" height="9" viewBox="0 0 6 9"><path d="M0 7.9425L3.7085 4.5L0 1.0575L1.1417 0L6 4.5L1.1417 9L0 7.9425Z"/></svg></button>';mount.innerHTML='<section class="tis-advantages"><div class="tis-advantages__container"><div class="tis-advantages__header"><h2 class="tis-advantages__title">Почему стоит выбрать именно вас</h2><div class="tis-advantages__nav">'+prev+next+'</div></div><div class="tis-advantages__viewport"><div class="tis-advantages__track"></div></div><div class="tis-advantages__nav tis-advantages__nav--mobile">'+prev+next+'</div></div></section>';var track=mount.querySelector(".tis-advantages__track"),viewport=mount.querySelector(".tis-advantages__viewport"),prevButtons=mount.querySelectorAll(".tis-advantages__button--prev"),nextButtons=mount.querySelectorAll(".tis-advantages__button--next"),length=slides.length,index=length,step=0,isDragging=false,startX=0,deltaX=0,startPosition=0,resizeTimer;function createSlide(slide,clone){var heading=clone?'<div class="tis-advantages__heading">'+slide.title+'</div>':'<h3 class="tis-advantages__heading">'+slide.title+'</h3>';return'<article class="tis-advantages__slide"'+(clone?' data-clone="'+clone+'" aria-hidden="true"':'')+'><div class="tis-advantages__background" style="background-image:url(\''+slide.image+'\')"></div><div class="tis-advantages__overlay"></div><div class="tis-advantages__content">'+heading+(slide.text?'<p class="tis-advantages__description">'+slide.text+'</p>':'')+'</div></article>'}function position(value){return-value*step}function move(value,animate){track.style.transition=animate?"transform .55s cubic-bezier(.22,1,.36,1)":"none";track.style.transform="translate3d("+position(value)+"px,0,0)"}function geometry(){step=viewport.getBoundingClientRect().width;if(step>0)move(index,false)}function rebuild(){track.innerHTML=slides.map(function(slide){return createSlide(slide,"left")}).join("")+slides.map(function(slide){return createSlide(slide,"")}).join("")+slides.map(function(slide){return createSlide(slide,"right")}).join("");index=length;requestAnimationFrame(geometry)}function normalize(){if(index>=length*2){index-=length;move(index,false);track.offsetHeight}else if(index<length){index+=length;move(index,false);track.offsetHeight}}function active(button){if(!button)return;button.classList.add("is-active");setTimeout(function(){button.classList.remove("is-active")},180)}function go(direction,button){if(isDragging||!step)return;normalize();active(button);index+=direction;move(index,true)}prevButtons.forEach(function(button){button.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();go(-1,button)})});nextButtons.forEach(function(button){button.addEventListener("click",function(event){event.preventDefault();event.stopPropagation();go(1,button)})});track.addEventListener("transitionend",function(event){if(event.target===track&&event.propertyName==="transform")normalize()});viewport.addEventListener("pointerdown",function(event){if(event.pointerType==="mouse"&&event.button!==0)return;normalize();isDragging=true;deltaX=0;startX=event.clientX;startPosition=position(index);viewport.classList.add("is-dragging");track.style.transition="none";if(viewport.setPointerCapture)viewport.setPointerCapture(event.pointerId)});viewport.addEventListener("pointermove",function(event){if(!isDragging)return;deltaX=event.clientX-startX;track.style.transform="translate3d("+(startPosition+deltaX)+"px,0,0)"});function finish(event){if(!isDragging)return;isDragging=false;viewport.classList.remove("is-dragging");if(event&&viewport.hasPointerCapture&&viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);var threshold=Math.min(90,step*.16);if(deltaX<-threshold)index++;else if(deltaX>threshold)index--;move(index,true)}viewport.addEventListener("pointerup",finish);viewport.addEventListener("pointercancel",finish);window.addEventListener("resize",function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(geometry,150)});if("ResizeObserver"in window)new ResizeObserver(geometry).observe(viewport);rebuild();setTimeout(geometry,300);window.addEventListener("load",geometry)}function whenNear(el,fn){if(!el)return;if(typeof IntersectionObserver==="undefined"){fn();return}var io=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){if(!entries[i].isIntersecting)continue;io.disconnect();fn();return}},{rootMargin:"200px 0px"});io.observe(el)}function boot(){var mount=document.getElementById("tis-advantages-slider");if(!mount||mount.dataset.ready==="1")return;whenNear(mount,init)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();
} catch (tisErr) { try { console.warn("[tis] advantages-slider.js", tisErr); } catch (e) {} }
try {
(function(){function init(){var logos=[{src:"https://static.tildacdn.com/tild3834-3932-4161-b865-373265613139/svg____-__TIS_LOGIST.svg",alt:"Партнёр 1"},{src:"https://static.tildacdn.com/tild6265-6437-4631-a266-656432653236/svg____-__TIS_LOGIST.svg",alt:"Партнёр 2"},{src:"https://static.tildacdn.com/tild3631-6433-4631-b433-356265373364/svg____-__TIS_LOGIST.svg",alt:"Партнёр 3"},{src:"https://static.tildacdn.com/tild6239-6635-4464-b939-663866366431/svg____-__TIS_LOGIST.svg",alt:"Партнёр 4"},{src:"https://static.tildacdn.com/tild3539-6231-4832-b863-363461663639/svg____-__TIS_LOGIST.svg",alt:"Партнёр 5"},{src:"https://static.tildacdn.com/tild3532-3731-4434-a139-366339333431/svg____-__TIS_LOGIST.svg",alt:"Партнёр 6"},{src:"https://static.tildacdn.com/tild3263-3166-4238-b232-303139303432/svg____-__TIS_LOGIST.svg",alt:"Партнёр 7"},{src:"https://static.tildacdn.com/tild6530-3236-4063-a338-316433613237/svg____-__TIS_LOGIST.svg",alt:"Партнёр 8"},{src:"https://static.tildacdn.com/tild6437-3563-4761-b537-356263616237/svg____-__TIS_LOGIST.svg",alt:"Партнёр 9"},{src:"https://static.tildacdn.com/tild3461-6466-4566-a364-646538303831/svg____-__TIS_LOGIST.svg",alt:"Партнёр 10"},{src:"https://static.tildacdn.com/tild6634-3531-4735-b964-616132633934/svg____-__TIS_LOGIST.svg",alt:"Партнёр 11"}],mount=document.getElementById("tis-partners-slider");if(!mount||mount.dataset.ready)return;mount.dataset.ready="1";function slide(logo,clone){return'<div class="tis-partners__slide"'+(clone?' data-clone="'+clone+'"':"")+'><div class="tis-partners__logo"><img src="'+logo.src+'" alt="'+logo.alt+'" draggable="false"></div></div>'}var prev='<button class="tis-partners__button tis-partners__button--prev" type="button" aria-label="Предыдущие партнёры"><svg width="6" height="9" viewBox="0 0 6 9" aria-hidden="true"><path d="M6 7.9425L2.2915 4.5L6 1.0575L4.8583 0L0 4.5L4.8583 9L6 7.9425Z"></path></svg></button>',next='<button class="tis-partners__button tis-partners__button--next" type="button" aria-label="Следующие партнёры"><svg width="6" height="9" viewBox="0 0 6 9" aria-hidden="true"><path d="M0 7.9425L3.7085 4.5L0 1.0575L1.1417 0L6 4.5L1.1417 9L0 7.9425Z"></path></svg></button>';mount.innerHTML='<section class="tis-partners"><div class="tis-partners__container"><div class="tis-partners__header"><h2 class="tis-partners__title">Партнеры</h2><div class="tis-partners__nav">'+prev+next+'</div></div><div class="tis-partners__viewport"><div class="tis-partners__track"></div></div><div class="tis-partners__nav tis-partners__nav--mobile">'+prev+next+"</div></div></section>";var track=mount.querySelector(".tis-partners__track"),viewport=mount.querySelector(".tis-partners__viewport"),prevButtons=mount.querySelectorAll(".tis-partners__button--prev"),nextButtons=mount.querySelectorAll(".tis-partners__button--next"),length=logos.length,index=length,step=0,dragging=false,startX=0,dragX=0,startPosition=0,resizeTimer;function slideGap(){var style=window.getComputedStyle(track);return parseFloat(style.columnGap||style.gap)||0}function position(value){return-value*step}function move(value,animate){track.style.transition=animate?"transform .45s cubic-bezier(.22,1,.36,1)":"none";track.style.transform="translate3d("+position(value)+"px,0,0)"}function geometry(){var first=track.querySelector(".tis-partners__slide");if(!first)return;step=first.getBoundingClientRect().width+slideGap();move(index,false)}function rebuild(){var left=logos.map(function(logo){return slide(logo,"left")}).join(""),original=logos.map(function(logo){return slide(logo,"")}).join(""),right=logos.map(function(logo){return slide(logo,"right")}).join("");track.innerHTML=left+original+right;index=length;requestAnimationFrame(geometry)}function active(button){button.classList.add("is-active");setTimeout(function(){button.classList.remove("is-active")},180)}function normalizeBeforeMove(direction){if(direction>0&&index>=length*2-1){index-=length;move(index,false);track.offsetHeight}else if(direction<0&&index<=length){index+=length;move(index,false);track.offsetHeight}}function go(direction,button){if(dragging)return;normalizeBeforeMove(direction);if(button)active(button);index+=direction;move(index,true)}prevButtons.forEach(function(button){button.addEventListener("click",function(){go(-1,button)})});nextButtons.forEach(function(button){button.addEventListener("click",function(){go(1,button)})});track.addEventListener("transitionend",function(event){if(event.propertyName!=="transform")return;if(index>=length*2){index-=length;move(index,false)}else if(index<length){index+=length;move(index,false)}});viewport.addEventListener("pointerdown",function(event){if(event.pointerType==="mouse"&&event.button!==0)return;dragging=true;dragX=0;startX=event.clientX;startPosition=position(index);viewport.classList.add("is-dragging");track.style.transition="none";if(viewport.setPointerCapture)viewport.setPointerCapture(event.pointerId)});viewport.addEventListener("pointermove",function(event){if(!dragging)return;dragX=event.clientX-startX;track.style.transform="translate3d("+(startPosition+dragX)+"px,0,0)"});function finish(event){if(!dragging)return;dragging=false;viewport.classList.remove("is-dragging");if(event&&viewport.hasPointerCapture&&viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);var threshold=Math.min(70,step*.25);if(dragX<-threshold)index++;else if(dragX>threshold)index--;move(index,true)}viewport.addEventListener("pointerup",finish);viewport.addEventListener("pointercancel",finish);window.addEventListener("resize",function(){clearTimeout(resizeTimer);resizeTimer=setTimeout(geometry,150)});if("ResizeObserver"in window)new ResizeObserver(function(){geometry()}).observe(viewport);rebuild();setTimeout(geometry,300);window.addEventListener("load",geometry)}function whenNear(el,fn){if(!el)return;if(typeof IntersectionObserver==="undefined"){fn();return}var io=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){if(!entries[i].isIntersecting)continue;io.disconnect();fn();return}},{rootMargin:"200px 0px"});io.observe(el)}function boot(){var mount=document.getElementById("tis-partners-slider");if(!mount||mount.dataset.ready)return;whenNear(mount,init)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot()})();
} catch (tisErr) { try { console.warn("[tis] partners-slider.js", tisErr); } catch (e) {} }
try {
(()=>{let o=false,a=false,b=null,m=null,w=null,r=null;const q=s=>document.querySelector(s),qa=s=>document.querySelectorAll(s),syncTitleSize=t=>{const x=t.querySelector(".t585__title");if(!x)return;const e=t.getAttribute("aria-expanded")==="true";if(e){if(!x.dataset.tisBaseSize)x.dataset.tisBaseSize=parseFloat(getComputedStyle(x).fontSize)||0;x.style.setProperty("font-size",(parseFloat(x.dataset.tisBaseSize)+1)+"px","important")}else{x.style.removeProperty("font-size");delete x.dataset.tisBaseSize}},watchTitles=()=>{qa(":is(#rec2467291741,#rec2489482341) .t585__trigger-button").forEach(t=>{syncTitleSize(t);new MutationObserver(()=>syncTitleSize(t)).observe(t,{attributes:true,attributeFilter:["aria-expanded"]})})},setText=e=>{const n=e.matches(".tn-atom")?e:e.querySelector(".tn-atom");if(n)n.textContent=o?"Свернуть":"Развернуть все";e.setAttribute("role","button");e.setAttribute("tabindex","0");e.setAttribute("aria-expanded",String(o))},prepare=()=>{b=q("#rec2489482341");m=q("#rec2467291741");if(!b)return false;if(b.parentElement.classList.contains("tis-faq-mask"))w=b.parentElement;else{w=document.createElement("div");w.className="tis-faq-mask";b.parentNode.insertBefore(w,b);w.appendChild(b)}if(!r&&"ResizeObserver"in window){r=new ResizeObserver(()=>{if(o&&!a&&w&&b)w.style.height=b.scrollHeight+"px"});r.observe(b)}return true},init=()=>{if(!prepare())return;o=false;a=false;w.classList.remove("tis-faq-mask-open");w.style.height="0px";b.setAttribute("aria-hidden","true");m&&m.classList.remove("tis-faq-main-open");qa(".open-faq-tis").forEach(setText)},open=()=>{if(a||!prepare())return;a=true;o=true;qa(".open-faq-tis").forEach(setText);m&&m.classList.add("tis-faq-main-open");b.setAttribute("aria-hidden","false");w.style.height="0px";w.classList.remove("tis-faq-mask-open");w.offsetHeight;requestAnimationFrame(()=>{w.classList.add("tis-faq-mask-open");w.style.height=b.scrollHeight+"px"});const end=e=>{if(e.target!==w||e.propertyName!=="height")return;w.removeEventListener("transitionend",end);a=false};w.addEventListener("transitionend",end)},close=()=>{if(a||!prepare())return;a=true;o=false;qa(".open-faq-tis").forEach(setText);w.style.height=w.getBoundingClientRect().height+"px";w.offsetHeight;requestAnimationFrame(()=>{w.classList.remove("tis-faq-mask-open");w.style.height="0px"});const end=e=>{if(e.target!==w||e.propertyName!=="height")return;w.removeEventListener("transitionend",end);b.setAttribute("aria-hidden","true");m&&m.classList.remove("tis-faq-main-open");a=false};w.addEventListener("transitionend",end)},toggle=()=>{o?close():open()};document.addEventListener("click",e=>{const t=e.target.closest(".open-faq-tis");if(!t)return;e.preventDefault();toggle()});document.addEventListener("keydown",e=>{const t=e.target.closest(".open-faq-tis");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();toggle()}});document.addEventListener("click",e=>{if(!o||!e.target.closest("#rec2489482341 .t585__trigger-button"))return;setTimeout(()=>{if(o&&!a&&w&&b)w.style.height=b.scrollHeight+"px"},80)});window.addEventListener("resize",()=>{if(o&&!a&&w&&b)w.style.height=b.scrollHeight+"px"});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();window.addEventListener("load",()=>{if(!q(".tis-faq-mask"))init()});setTimeout(()=>{if(!q(".tis-faq-mask"))init()},800)})();
} catch (tisErr) { try { console.warn("[tis] faq.js", tisErr); } catch (e) {} }
try {
(function(){function convertQuestionsToH3(){document.querySelectorAll(".t585 .t585__title,.t668 .t668__title").forEach(function(oldTitle){if(oldTitle.tagName==="H3"){oldTitle.classList.add("tis-faq-question-h3");return}var h3=document.createElement("h3");Array.prototype.forEach.call(oldTitle.attributes,function(attribute){h3.setAttribute(attribute.name,attribute.value)});h3.classList.add("tis-faq-question-h3");while(oldTitle.firstChild)h3.appendChild(oldTitle.firstChild);oldTitle.parentNode.replaceChild(h3,oldTitle)})}function init(){var roots=document.querySelectorAll("#rec2467291741,#rec2489482341,.t585,.t668");if(!roots.length)return;convertQuestionsToH3();if(!("MutationObserver"in window))return;var observer=new MutationObserver(convertQuestionsToH3);roots.forEach(function(root){observer.observe(root,{childList:true,subtree:true})});setTimeout(function(){convertQuestionsToH3();observer.disconnect()},3000)}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init()})();
} catch (tisErr) { try { console.warn("[tis] faq-titles.js", tisErr); } catch (e) {} }
try {
(function () {
"use strict";
var booted = false;
function onReady(fn) {
if (document.readyState === "loading") {
document.addEventListener("DOMContentLoaded", fn, { once: true });
} else {
fn();
}
}
function boot() {
if (booted) return;
booted = true;
document.documentElement.classList.add("tis-theme-ready");
document.dispatchEvent(new CustomEvent("tis:ready"));
}
onReady(boot);
})();
} catch (tisErr) { try { console.warn("[tis] tilda-bridge.js", tisErr); } catch (e) {} }
