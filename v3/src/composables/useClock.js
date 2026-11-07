import { onBeforeUnmount, onMounted, ref } from "vue";

/** Local time in IST, refreshed twice a minute. */
export function useClock() {
  const time = ref("--:--");
  let timer;

  const update = () => {
    const formatted = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    time.value = `${formatted} IST`;
  };

  onMounted(() => {
    update();
    timer = window.setInterval(update, 30000);
  });

  onBeforeUnmount(() => {
    if (timer) window.clearInterval(timer);
  });

  return { time };
}
