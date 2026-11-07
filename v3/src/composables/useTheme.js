import { computed, ref, watch } from "vue";

const STORAGE_KEY = "pk-theme";
const isDark = ref(false);
let started = false;

function prefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function readInitial() {
  if (typeof document === "undefined") return false;

  const attribute = document.documentElement.getAttribute("data-theme");
  if (attribute === "dark") return true;
  if (attribute === "light") return false;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
  } catch (error) {
    // Storage can be blocked; fall back to the OS preference.
  }

  return prefersDark();
}

function applyTheme(dark, persist) {
  if (typeof document === "undefined") return;

  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");

  const meta = document.getElementById("themeColor");
  if (meta) meta.setAttribute("content", dark ? "#0d0c09" : "#f1eee7");

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
    } catch (error) {
      // Persisting is a nicety, not a requirement.
    }
  }
}

/**
 * Single shared theme state. The inline script in index.html sets the initial
 * `data-theme` before first paint; this keeps Vue in sync with it.
 */
export function useTheme() {
  if (!started) {
    started = true;
    isDark.value = readInitial();
    applyTheme(isDark.value, false);
    watch(isDark, (dark) => applyTheme(dark, true));
  }

  return {
    isDark,
    toggle: () => {
      isDark.value = !isDark.value;
    },
    label: computed(() => (isDark.value ? "Light" : "Dark")),
    ariaLabel: computed(() =>
      isDark.value ? "Switch to light theme" : "Switch to dark theme"
    ),
  };
}
