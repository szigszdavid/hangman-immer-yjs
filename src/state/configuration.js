import { bind } from "immer-yjs";

let configurationBinder

const sampleState = {
  synced: false,
  roomId: null,
  clients: [],
};

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

export function createConfigurationBinder(yStore) {
  configurationBinder = bind(yStore)
}

export function initConfigurationStore() {
  configurationBinder.update(() => {
    return deepClone(sampleState);
  })
}

export function addClient(clientID) {
  sessionStorage.setItem("playerId", JSON.stringify(clientID))
  configurationBinder.update((draft) => {
    draft.clients.push(clientID);
  });
}

export function getClients() {
  return configurationBinder.get().clients
}

export function getSynced() {
  return configurationBinder == undefined ? false : configurationBinder.get().synced
}