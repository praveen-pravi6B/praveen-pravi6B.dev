/**
 * `v-reveal` — mirrors the mockup's [data-reveal] behaviour.
 *
 * The element gets the data-reveal attribute immediately (so the CSS hides it)
 * and is marked visible when it scrolls into view. Reduced-motion users skip
 * the animation entirely.
 */
export default {
  mounted(element) {
    element.setAttribute("data-reveal", "");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          element.classList.add("is-visible");
          observer.unobserve(element);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    observer.observe(element);
    element.__pkRevealObserver = observer;
  },

  unmounted(element) {
    if (element.__pkRevealObserver) {
      element.__pkRevealObserver.disconnect();
      delete element.__pkRevealObserver;
    }
  },
};
