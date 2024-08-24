import { Avatar, Button, Divider, Fab, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import SendIcon from "@mui/icons-material/Send";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FirebaseAuth, FireStoreDb } from "../config/firebase.config";
import { stringAvatar } from "../util/utils";
import UsersList from "./UsersList";

const Home = () => {

    const { receiverId } = useParams();

    const [users, setUsers] = useState([]);
    const [receiver, setReceiver] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState("");
    const user = FirebaseAuth.currentUser;

    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(collection(FireStoreDb, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => doc.data()));
            
            setReceiver({ username: "", userId: receiverId});
        })
        return unsub;
    }, []);

    useEffect(() => {
        if (receiver) {
            const collectionRef = collection(FireStoreDb, "users", user?.uid, "chatUsers", receiver?.userId, "messages");
            const unsub = onSnapshot(query(collectionRef, orderBy("timestamp")), (snapshot) => {
                setMessages(snapshot.docs.map((doc) => ({ id: doc.id, messages: doc.data() })));
            })
            return unsub;
        }
    }, [receiver?.userId]);

    const sendMessage = async () => {
        try {
            if (user && receiver) {
                await addDoc(
                    collection(
                        FireStoreDb,
                        "users",
                        user.uid,
                        "chatUsers",
                        receiver.userId,
                        "messages"
                    ),
                    {
                        username: user.displayName,
                        messageUserId: user.uid,
                        message: chatMessage,
                        timestamp: new Date(),
                    }
                );

                await addDoc(
                    collection(
                        FireStoreDb,
                        "users",
                        receiver.userId,
                        "chatUsers",
                        user.uid,
                        "messages"
                    ),
                    {
                        username: user.displayName,
                        messageUserId: user.uid,
                        message: chatMessage,
                        timestamp: new Date(),
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
        setChatMessage("");
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} style={{
                'width': '100%',
                'height': '100%'
            }}>
                <Grid item xs={3} style={{
                    borderRight: '1px solid #e0e0e0'
                }}>
                    <List>
                        <ListItem key="RemySharp">
                            <ListItemIcon>
                                <Avatar {...stringAvatar(user?.displayName)} />
                            </ListItemIcon>
                            <ListItemText primary={user?.displayName}></ListItemText>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    FirebaseAuth.signOut();
                                    navigate("/");
                                }}
                            >
                                Logout
                            </Button>
                        </ListItem>
                    </List>
                    <Divider />
                    <UsersList users={users} currentUserId={user?.uid} setReceiver={setReceiver} />
                </Grid>
                <Grid item xs={9}>
                    <List style={{
                        height: '70vh',
                        overflowY: 'auto'
                    }}>
                        {messages.map((m) => {
                            return (
                                <ListItem key={m.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText align={m?.messages.messageUserId === user?.uid ? "right" : "left"} primary={m.messages?.message}></ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText align={m?.messages.messageUserId === user?.uid ? "right" : "left"} secondary={m.messages?.timestamp.seconds}></ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            )
                        })}

                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth 
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)} />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add" onClick={sendMessage}><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default Home;