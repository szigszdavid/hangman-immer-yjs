import { bind } from "immer-yjs";
import { useSyncExternalStore } from "use-sync-external-store/shim";

let gameBinder

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

export function useGameImmerYjs() {
  const selection = useSyncExternalStore(gameBinder.subscribe, gameBinder.get);
  return [selection, gameBinder.update];
}

export function creategameBinder(yStore) {
  gameBinder = bind(yStore)
}

export function initGameStore(initialGameState) {
  gameBinder.update(() => {
    return deepClone(initialGameState);
  })
}

