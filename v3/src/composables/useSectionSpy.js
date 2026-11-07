import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Tracks which section is currently in the middle of the viewport so the rail
 * navigation can highlight it. On routes without sections (the blog) the spy
 * reports no active item.
 */
export function useSectionSpy(ids, isEnabled = () => true) {
  const active = ref(ids[0] || "");
  let observer;

  async function refresh() {
    await nextTick();

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      !isEnabled()
    ) {
      active.value = "";
      return;
    }

    active.value = ids[0] || "";

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.value = entry.target.id;
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
  }

  onMounted(refresh);

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
  });

  return { active, refresh };
}
