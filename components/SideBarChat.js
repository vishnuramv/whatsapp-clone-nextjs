import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from "styled-components"
import db, { auth } from '../config/firebase'
import getRecipientEmail from '../utils/getRecipientEmail'


const SideBarChat = ({ id, users }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', recipientEmail));
    const recipient = recipientSnapshot?.docs?.[0]?.data()

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }
    return (
        <Container onClick={enterChat} >
            <SidebarAvatar>
                <Avatar src={recipient?.dpURL} alt={recipient?.userName} className="sidebarChat__avatarImg" />
            </SidebarAvatar>
            <ChatInfo>
                <h3>{recipient?.userName ? (recipient?.userName?.length < 20 ? recipient?.userName : recipient?.userName?.substring(0, 15) + "...") : (recipientEmail?.length < 30 ? recipientEmail : recipientEmail?.substring(0, 28) + "...")}</h3>
                <p>{recipient?.userName}</p>
            </ChatInfo>
        </Container>
    )
}

export default SideBarChat

const Container = styled.div`
    padding: 10px 15px;
    display: flex;
    align-items: center;
    color: var(--whatsapp-textgray);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: var(--whatsapp-hovergray);
    }
`;

const SidebarAvatar = styled.div`
    padding-right: 15px;
    .sidebarChat__avatarImg {
        width: 47px !important;
        height: 47px !important;
    }
`;

const ChatInfo = styled.div`
    width: 100%;
    h3 {
        color: var(--whatsapp-headtextgray);
        margin-bottom: 5px;
        font-weight: 400;
    }
`;