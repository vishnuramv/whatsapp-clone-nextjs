import styled from "styled-components"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase'
import moment from "moment";

const Message = ({ user, message, email }) => {
    const [userLoggedIn] = useAuthState(auth);
    const isSender = email === userLoggedIn.email ? true : false;
    return (
        <>
            {
                isSender ? (
                    <Container sent>
                        <span className="chat__messageCorner"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span>
                        {/* <p className={`chat__name`}>{user}</p> */}
                        <p className="chat__messageText">
                            {message.message}
                        </p>
                        <p className="chat__time">{message.timestamp ? moment(message.timestamp).format('LT') : "..."}</p>
                    </Container >
                ) : (
                    <Container>
                        <span className="chat__messageCorner"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span>
                        {/* <p className={`chat__name`}>{user}</p> */}
                        <p className="chat__messageText">
                            {message.message}
                        </p>
                        <p className="chat__time">{message.timestamp ? moment(message.timestamp).format('LT') : "..."}</p>
                    </Container >
                )
            }
        </>
    )
}

export default Message

const Container = styled.div`
    position: relative;
    background-color: ${props => props.sent ? "#054740" : "#262D31"};
    padding: 7px 10px 5px 10px;
    border-radius: 5px;
    border-top-left-radius: ${props => props.sent ? "5px" : "0px"};
    border-top-right-radius: ${props => props.sent ? "0px" : "5px"};
    width: fit-content;
    max-width: 63%;
    margin-bottom: 15px;
    color: var(--whatsapp-headtextgray);
    margin-left: ${props => props.sent ? "auto" : 0};
    .chat__messageCorner {
        position: absolute;
        top: -2px;
        left: ${props => props.sent ? "unset" : "-8px"};
        color: ${props => props.sent ? "var(--whatsapp-chatsent)" : "var(--whatsapp-chatrecieved)"};
        transform: ${props => props.sent ? "scale(-1, 1)" : ""};
        -webkit-transform: ${props => props.sent ? "scale(-1, 1)" : ""};
        -moz-transform: ${props => props.sent ? "scale(-1, 1)" : ""};
        -o-transform: ${props => props.sent ? "scale(-1, 1)" : ""};
        right: ${props => props.sent ? "-8px !important" : "unset"};;

    }
    
    .chat__name {
        font-size: 14px;
        color: var(--whatsapp-textgray);
        font-weight: 500;
    }

    .chat__time {
        text-align: right;
        font-size: 12px;
        color: var(--whatsapp-textgray);
        margin-top: 2px;
    }

    .chat--blue {
        color: rgb(0, 0, 180);
    }

    .chat--yellow {
        color: rgb(168, 168, 2);
    }

    .chat--green {
        color: green;
    }

    .chat--orange {
        color: rgb(223, 145, 0);
    }

    .chat--peach {
        color: rgb(218, 66, 205);
    }
`;