// const waitForSync = (websocketProvider) =>
//   new Promise((resolve, reject) => {
//     const timerId = setTimeout(() => reject("timeout"), 5000);
//     websocketProvider.on("sync", (isSynced) => {
//       if (isSynced) {
//         clearTimeout(timerId);
//         resolve();
//       }
//     });
//   });
// const createSyncedStore = async (room, configuration, game, rounds) => {
//   try {
//     const ydoc = new Doc();
//     const websocketProvider = new WebsocketProvider(
//       "ws://localhost:1234",
//       room,
//       ydoc
//     );
//     await waitForSync(websocketProvider);
//     const yConfiguration = ydoc.getMap("configuration");
//     const yGame = ydoc.getMap("game");
//     bind(configuration, yConfiguration);
//     bind(game, yGame);
//     if (rounds !== undefined) {
//       const yRounds = ydoc.getMap("rounds");
//       bind(rounds, yRounds);
//     }
//     console.log(ydoc);
//     return { clientId: ydoc.clientID };
//   } catch (e) {
//     console.error(e);
//   }
// };

import { useState, useEffect } from "react";
import { initConfigurationStore, addClient, createConfigurationBinder, getClients, getSynced } from "../state/configuration";
import CreateRoomView from "./CreateRoomView";
import { Doc } from "yjs";
import { WebsocketProvider } from "y-websocket";
import React from "react";
import { creategameBinder, initGameStore } from "../state/game";

const waitForSync = (websocketProvider) =>
  new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject("timeout"), 5000);
    websocketProvider.on("sync", (isSynced) => {
      if (isSynced) {
        clearTimeout(timerId);
        resolve();
      }
    });
  });
const createSyncedStore = async (room) => {
  try {
    const ydoc = new Doc();
    const websocketProvider = new WebsocketProvider(
      "ws://localhost:1234",
      room,
      ydoc
    );
    await waitForSync(websocketProvider);
    const yConfiguration = ydoc.getMap("configuration");
    const yGame = ydoc.getMap("game");
    createConfigurationBinder(yConfiguration)
    creategameBinder(yGame)
    return { clientId: ydoc.clientID };
  } catch (e) {
    console.error(e);
  }
};

export default function ImmerMultiplayerComponent(props) {
  const [roomId, setRoomId] = useState(null);
  const [clientId, setClientId] = useState(null);

  const synced = getSynced()

  const handleCreate = async (id) => {
    let { clientId } = await createSyncedStore(id);
    setRoomId(id);

    if (getClients() === undefined) {
      setClientId(clientId);
      initConfigurationStore();
      initGameStore(props.initialGameState)
      addClient(clientId);
    } else {
      alert(
        "This room is already created! Change the name to an unused roomname or try to join to the prevoius."
      );
    }
  };

  const handleJoin = async (id) => {
    let { clientId } = await createSyncedStore(id);
    setRoomId(id);

    if (getClients() !== undefined) {
      setClientId(clientId);
      addClient(clientId);
    } else if (getClients() === undefined) {
      alert(
        "This room is not created yet! If you click on CREATE NEW ROOM you will create it."
      );
    }
  };

  useEffect(() => {
    if (clientId && synced) {
      addClient(clientId);
    }
  }, [clientId, synced]);

  useEffect(() => {
    if (clientId && synced) {
      addClient(clientId);
    }
  }, [synced, clientId]);

  return (
    <>
      {roomId === null ? (
        <CreateRoomView
          createRoom={(id) => handleCreate(id)}
          joinRoom={(id) => handleJoin(id)}
        />
      ) : (
        <>
          <h1>{clientId}</h1>
          <p>{getClients()}</p>
          {React.Children.map(props.children, (child) =>
            React.cloneElement(child, child.props)
          )}
        </>
      )}
    </>
  );
}
