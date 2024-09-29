import { onUnmounted, ref, watch } from "vue";
import { liveQuery } from "dexie";


export default function useLiveQuery(
  querier,
  deps,
  options,
) {
  const value = ref();
  const observable = liveQuery(querier);
  let subscription = observable.subscribe({
    next: (val) => {
      value.value = val;
    },
    error: options?.onError,
  });

  watch(deps, () => {
    subscription.unsubscribe();
    subscription = observable.subscribe({
      next: (val) => {
        value.value = val;
      },
      error: options?.onError,
    });
  });

  onUnmounted(() => {
    subscription.unsubscribe();
  });
  return value
}
