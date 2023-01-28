import React,{useState, useEffect} from 'react'
import { Avatar, IconButton } from "@material-ui/core";
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from './firebase';//this is our local firebase file not the module one 
import {useStateValue} from "./StateProvider"

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        // onSnapshot says imagine you had camera and took a picture of that database of that list the list of rooms inside of it thats called snapshot  snapshot is also listening for changes so any changes inside the snapshot also run the code
        // if we add change or delete anything it takes another snapshot and gives us the new snapshot its real time every time it gets updated it gets the latest snapshot
        //docs is referring to list of elements we have in database
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => 
                ({
                    id:doc.id,//unique id
                    data: doc.data()
                })
                ))
        ))
        // clean up work detach listener on unmount good practice always do it
        return () => {
            unsubscribe();
        }

    },[])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>


            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat" type="text" /> 
                </div>


            </div>
            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {/* implicitly return using () 
                key is used for performance in react
                */}
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
                

            </div>

        </div>
    )
}

export default Sidebar