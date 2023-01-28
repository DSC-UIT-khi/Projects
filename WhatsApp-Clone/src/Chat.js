import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core"
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import db from './firebase'
import {useStateValue} from './StateProvider';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, settSeed] = useState("");
    const { roomId } = useParams();//this will give after the forard slash in url
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            // go to specifc document which has specifc room id
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) =>              setRoomName(snapshot.data().name)
            )
            //roomId parsed in url
            //order by time in ascending
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [roomId])//dependent on roomId

    useEffect(() => {
        settSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault(); //stop from refreshing
        console.log("You typed >>>", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            //wants to use timestamp of server london and detroit alag alag jaga hai
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        setInput("");
    }

    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                     {new Date(
                        messages[messages.length-1]?.timestamp?.toDate()).toUTCString()
                    }</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat__name">{message.name}</span>

                        {message.message}

                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>

                    </p>

                ))}


            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                {/* wrapped inside a form for enter functionality */}
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit">Send a Message</button>
                </form>
                <MicIcon />
            </div>

        </div>
    )
}

export default Chat
