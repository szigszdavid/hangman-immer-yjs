import { useState } from "react"

export default function CreateRoomView({ createRoom, joinRoom }) {
    const [roomId, setRoomId] = useState(Math.floor(Math.random() * 1000000))

    return (
        <>
            <input type="number" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <div>
                <button onClick={() => createRoom(roomId)}>Create</button>
                <button onClick={() => joinRoom(roomId)}>Join</button>
            </div>
        </>
    )
}