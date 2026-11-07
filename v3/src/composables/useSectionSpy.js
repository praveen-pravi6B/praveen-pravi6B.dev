import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Tracks which section is currently in the middle of the viewport so the rail
 * navigation can highlight it.
 */
export function useSectionSpy(ids) {
  const active = ref(ids[0]);
  let observer;

  onMounted(async () => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    // Wait a tick so every section is definitely in the DOM.
    await nextTick();

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
  });

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
  });

  return { active };
}
