import React from "react";

import { Avatar, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_HOME } from "../util/constant";
import { stringAvatar } from "../util/utils";

const UsersList = ({ users, currentUserId, setReceiver }) => {
    const { receiverId } = useParams();

    const navigate = useNavigate();
    const handleUser = (username, userId) => {
        setReceiver({ username, userId });
        navigate(`${ROUTE_HOME}/${userId}`);
    }
    
    return (
        <>
            <Grid item xs={12} style={{ padding: '10px' }}>
                <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
            </Grid>
            <Divider />
            <List>
                {users.map((user) => {
                    return (
                        <>
                            {user?.userId !== currentUserId ? (
                                <ListItem key={user?.userId}>
                                    <ListItemButton onClick={() => handleUser(user?.username, user?.userId)}
                                        selected={receiverId === user?.userId}>
                                        <ListItemIcon>
                                            <Avatar {...stringAvatar(user?.username)} />
                                        </ListItemIcon>
                                        <ListItemText primary={user?.username}>{user?.username}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            ) : null}
                        </>
                    )
                })}

            </List>
        </>

    )
}

export default UsersList;
