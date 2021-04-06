import { Avatar, Button, IconButton } from "@material-ui/core";
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import styled from "styled-components"
import * as EmailValidator from 'email-validator';
import DropDown from "./DropDown";
import db, { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import firebase from 'firebase'
import SideBarChat from "./SideBarChat";
import { Fragment } from "react";


const Sidebar = () => {
	const [user] = useAuthState(auth);
	const useChatRef = db.collection('chats').where('users', 'array-contains', user.email);
	const [chatsSnapshot] = useCollection(useChatRef);
	const createChat = () => {
		const input = prompt("Enter your Friends Email Address:");
		if (!input) return null;
		if (EmailValidator.validate(input) && input !== user.email && !isChatExist(input)) {
			db.collection('chats').add({
				users: [user.email, input],
				timestamp: firebase.firestore.FieldValue.serverTimestamp()
			});
		} else alert("Invalid email address or chat already exist")
	}

	const isChatExist = (recipientEmail) => (!!chatsSnapshot?.docs.find(
		(chat) => chat.data().users.find(
			(user) => user === recipientEmail
		)?.length > 0
	))

	return (
		<Container>
			<Header>
				<div className="sidebar__headerLeft">
					<HeaderAvatar>
						<Avatar src={user.photoURL} alt={user.displayName} />
					</HeaderAvatar>
				</div>
				<HeaderRight>
					<HeaderIcon>
						<DonutLargeRoundedIcon />
					</HeaderIcon>
					<IconButton onClick={createChat}>
						<ChatIcon />
					</IconButton>
					<DropDown />
				</HeaderRight>
			</Header>
			<Search>
				<SearchIcon />
				<input type="text" placeholder="Search or start new chat" />
			</Search>
			<ChatList>
				{
					chatsSnapshot?.docs?.length ? (
						chatsSnapshot?.docs.map(chat => (
							<Fragment key={chat.id} >
								<SideBarChat id={chat.id} users={chat.data().users} />
								<ChatHr />
							</Fragment>
						))
					) : (
						<SideBarButton onClick={createChat}>Start a new chat</SideBarButton>
					)
				}
			</ChatList>
		</Container>
	);
}

export default Sidebar

const Container = styled.div`
    flex:0.3;
    height: 100vh;
    border-right: 0.5px solid var(--whatsapp-linegray);
    background-color: var(--background-default);
    max-width: 30%;
    min-width: 235px; 
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
	--ms-overflow-style: none;
	scrollbar-width: none;
	position: relative;

`;

const Header = styled.div`
    background-color: var(--whatsapp-graygreen);
    padding: 6px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--whatsapp-textgray);
`;

const HeaderAvatar = styled(IconButton)`
    width: 40px;
    height: 40px;
`;

const HeaderRight = styled.div`
    &&& {
        color: var(--whatsapp-icongray);
    }
    .MuiSvgIcon-root {
        font-size: 23px;
        color: var(--whatsapp-textgray);
    }
`;
const HeaderIcon = styled(IconButton)`
    margin: 0 13px;
`;

const Search = styled.div`
    margin: 7px 15px;
    padding: 5px 15px;
    border-radius: 30px;
    background-color: var(--whatsapp-activechatgray);
    display: flex;
    align-items: center;
    color: var(--whatsapp-icongray);
    input {
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--whatsapp-textgray);
        font-size: 14px;
        /* padding-left: 15px; */
    }
`;

const SideBarButton = styled(Button)`
    width: 100%;
    &&& {
        color: var(--whatsapp-textgray);
    }
`;

const ChatList = styled.div`
    border-top: 0.5px solid var(--whatsapp-linegray);
    height: 84.5vh;
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: var(--background-default);
`;

const ChatHr = styled.hr`
    border: none;
    border-bottom: 0.1px solid var(--whatsapp-linegray);
    width: 320px;
    margin-left: auto;
    margin-right: 13px;
    margin-top: 5px;
    margin-bottom: 5px;
`;