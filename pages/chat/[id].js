import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import db, { auth } from "../../config/firebase";

const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth);
    return (
        <Container>
            <Head>
                <title>Whatsapp clone</title>
            </Head>
            <Sidebar />
            {/* <ChatContainer> */}
            <ChatScreen user={user} chat={JSON.parse(chat)} messages={messages} />
            {/* </ChatContainer> */}
        </Container>
    )
}

export default Chat

export async function getServerSideProps(context) {
    const ref = db.collection('chats').doc(context.query.id);

    const messageRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    const messages = messageRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().toUTCString()
    }));

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }
    return {
        props: {
            messages: JSON.stringify(messages),
            chat: JSON.stringify(chat)
        }
    }
}

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    overflow: hidden !important;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    --ms-overflow-style : none;
`;

// const ChatContainer = styled.div`
//     flex: 0.7;
//     height: 100vh;
//     overflow-y: scroll;
//     min-width: 360px;
//     background:  linear-gradient(rgba(13, 20, 24, 0.93),rgba(13, 20, 24, 0.93)), url("https://web.whatsapp.com/img/bg-chat-tile-dark_9f39e76b5a0e039e53afc5d9d4bdd780.png") ;
//     scrollbar-width: none;
//     ::-webkit-scrollbar {
//         display: none;
//     }
//     --ms-overflow-style : none;
// `;
