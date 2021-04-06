import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components"
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import MicIcon from '@material-ui/icons/Mic';
import { useEffect, useRef, useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import db from "../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import firebase from 'firebase';
import TimeAgo from 'timeago-react';

const ChatScreen = ({ user, chat, messages }) => {
    const router = useRouter();
    const [input, setInput] = useState("");
    // const [recipient, setRecipient] = useState();

    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'));

    const recipientEmail = getRecipientEmail(chat.users, user);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [messagesSnapshot, messages]);


    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message key={message.id} user={message.data().userName} email={message.data().user} message={{ ...message.data(), timestamp: message.data()?.timestamp?.toDate().toUTCString() }} />
            ));
        } else {
            return JSON.parse(messages).map(message => (
                <Message key={message.id} user={message.userName} email={message.user} message={{ ...message, timestamp: message.timestamp }} />
            ));
        }

    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            dpURL: user.photoURL,
            userName: user.displayName
        })
        setInput("");
    };

    return (
        <Container>
            <Header className="chat__header">
                <HeaderLeft className="chat__headerLeft">
                    <HeaderAvatar className="chat__headerAvatar">
                        {recipient ? (
                            <Avatar src={recipient?.dpURL} alt={recipient?.userName} />
                        ) : (
                            <Avatar />
                        )}
                    </HeaderAvatar>
                    <ChatInfo className="chat__Info">
                        <h3>{recipient?.userName ? (recipient?.userName?.length < 20 ? recipient?.userName : recipient?.userName?.substring(0, 15) + "...") : (recipientEmail?.length < 30 ? recipientEmail : recipientEmail?.substring(0, 28) + "...")}</h3>
                        <p>last seen {recipient?.lastSeen.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : ("unavailable")}</p>
                    </ChatInfo>
                </HeaderLeft>
                <HeaderRight className="chat__headerRight">
                    <HeaderIcon className="chat__headerIcon">
                        <SearchIcon />
                    </HeaderIcon>
                    <HeaderIcon className="chat__headerIcon">
                        <MoreVertIcon />
                    </HeaderIcon>
                </HeaderRight>
            </Header>
            <ChatBody>
                {showMessages()}
                {/* {messages?.map(({ message, displayName, email, timestamp }) => (
                    <div className={`chat__message ${user.email === email && 'chat__messageSent'}`}>
                        <span className="chat__messageCorner"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span>
                        <p className={`chat__name`}>{displayName}</p>
                        <p className="chat__messageText">
                            {message}
                        </p>
                        <p className="chat__time">{new Date(timestamp?.toDate()).toUTCString().slice(5, 22)}</p>
                    </div>
                ))} */}
                <div ref={messagesEndRef} />
            </ChatBody>
            <Footer>
                <FooterLeft>
                    <IconButton className="chat__footerIcon">
                        <EmojiEmotionsOutlinedIcon />
                    </IconButton>
                    <IconButton className="chat__footerIcon chat__fileIcon">
                        <AttachFileOutlinedIcon />
                    </IconButton>
                </FooterLeft>
                <ChatInput>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button hidden disabled={!input} onClick={sendMessage} type="submit" >send</button>
                </ChatInput>
                <FooterRight>
                    <IconButton className="chat__footerIcon">
                        <MicIcon />
                    </IconButton>
                </FooterRight>
            </Footer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
    flex: 0.7;
    height: 100vh;
    overflow-y: scroll;
    min-width: 360px;
    background:  linear-gradient(rgba(13, 20, 24, 0.93),rgba(13, 20, 24, 0.93)), url("https://web.whatsapp.com/img/bg-chat-tile-dark_9f39e76b5a0e039e53afc5d9d4bdd780.png") ;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    --ms-overflow-style : none;
`;

const Header = styled.div`
    background-color: var(--whatsapp-graygreen);
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--whatsapp-headtextgray);
    box-shadow: 0 1px 3px rgba(var(--shadow-rgb),.4);
    position: sticky;
    top: 0;
    z-index: 100;
`;

const HeaderLeft = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const HeaderRight = styled.div`
    .MuiSvgIcon-root {
        font-size: 25px;
        color: var(--whatsapp-icongray) !important;
    }
`;

const HeaderAvatar = styled(IconButton)`
    margin-right: 15px !important;
    width: 49px;
    height: 49px;
`;

const ChatInfo = styled.div`
    h3 {
        margin-bottom: 3px;
        font-weight: 400;
        font-size: 17px;
    }
    p {
        color: var(--whatsapp-textgray);
        font-size: 14px;
    }
`;

const HeaderIcon = styled(IconButton)`
    margin: 0 12px;
`;

const ChatBody = styled.div`
    margin: 0 5% 5% 5%;
    padding: 20px 40px;
`;

const Footer = styled.div`
    background-color: #1e2428;
    width: 70vw;
    padding: 10px;
    display: flex;
    align-items: center;
    color: var(--whatsapp-headtextgray);
    position: fixed;
    bottom: 0;
    box-shadow: 0 -1px 3px rgba(var(--shadow-rgb),.3);
    .MuiSvgIcon-root {
        font-size: 30px !important;
        color: rgb(156, 156, 156) !important;
    }
    .chat__footerIcon {
        margin: 0 0px !important;
        width: 40px !important;
        height: 40px !important;
    }
`;

const FooterLeft = styled.div`
    display: flex;
    align-items: center;
    .chat__fileIcon {
        transform: rotate(50deg) !important;
        margin-right: 10px !important;
    }
`;

const FooterRight = styled.div`
`;

const ChatInput = styled.form`
    flex: 1;
    width: 100%;
    /* margin: 0 15px; */
    border-radius: 30px;
    background-color: #33383b;
    color: var(--whatsapp-icongray);
    input {
        width: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 11px 15px;
        color: rgb(241,241,242);
        font-size: 14px;
    }
    button {
        display: none;
    }
`;