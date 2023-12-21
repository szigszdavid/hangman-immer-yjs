import { bind } from "immer-yjs";
import { getClients } from "./configuration";

export const initalRoundsState = {
  currentPlayerIndex: 0,
  currentStateID: -1,
  players: [],
};

let roundsBinder;

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

export function createRoundsBinder(yStore) {
  roundsBinder = bind(yStore);
}

export function initRoundsStore() {
  roundsBinder.update(() => {
    return deepClone(initalRoundsState);
  });
}

export function addEveryPlayer(playerData) {
  for (const client of getClients()) {
    addPlayer(client.id, playerData);
  }

  setCurrentPlayerIndex(Math.floor(Math.random() * roundsBinder.get().players.length));
}

export function addPlayer(clientId, playerData) {
  roundsBinder.update((draft) => {
    draft.players.push({
      id: roundsBinder.get().players.length,
      clientId: clientId,
      ...playerData,
    });
  });
}

export function deletePlayer(clientId) {
  // deleteClient(clientId);
  roundsBinder.update((draft) => {
    draft.players = draft.players.filter(
      (player) => player.clientId !== clientId
    );
  });
}

export function isCurrentPlayer() {
    console.log(roundsBinder.get().currentPlayerIndex, parseInt(JSON.parse(sessionStorage.getItem("playerId"))));
  return (
    roundsBinder.get().currentPlayerIndex ===
    roundsBinder.get().players
      .map((player) => player.clientId)
      .indexOf(parseInt(JSON.parse(sessionStorage.getItem("playerId"))))
  );
}

export function nextPlayer() {
    console.log(roundsBinder.get().players.length);
  setCurrentPlayerIndex(
    roundsBinder.get().players.length - 1 === roundsBinder.get().currentPlayerIndex
      ? 0
      : roundsBinder.get().currentPlayerIndex + 1
  );
}

export function setNextPlayer(player) {
  setCurrentPlayerIndex(
    roundsBinder.get().players.map((player) => player.clientId).indexOf(player)
  );
}

function setCurrentPlayerIndex(index) {
  roundsBinder.update((draft) => {
    draft.currentPlayerIndex = index;
  });
}
