import { init as initNavigation } from "./navigation.js";
import { init as initTheme } from "./module/darkmode.js";

function init() {
  initNavigation();
  initTheme();
}

init();
