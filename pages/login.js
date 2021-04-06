import { Button } from '@material-ui/core'
import Head from 'next/head'
import styled from "styled-components"
import { auth, provider } from '../config/firebase';

const Login = () => {
    const signIn = () => {
        // e.preventDefault();
        auth.signInWithPopup(provider)
            // .then(result => {
            // auth.onAuthStateChanged((authUser) => {
            //     console.log("AuthUser:", authUser);
            //     dispatch({
            //         type: actionTypes.SET_USER,
            //         user: authUser,
            //     });
            // });
            // })
            .catch(error => alert(error.message));
    };
    return (
        <Container>
            <LoginContainer>
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="WhatsApp" />
                <div className="login__text">
                    <h1>Welcome To WhatsApp 🚀🔥</h1>
                </div>
                <Button onClick={signIn} className="login__button" >Sign In with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #00AF9C;
    max-width: 100vw;
    width: 100vw;
    overflow: hidden;
`;

const LoginContainer = styled.div`
    color: white;
    text-align: center;
    padding: 40px;
    width: 40%;
    background-color: var(--background-default);
    border-radius: 5px;
    box-shadow: 0 0px 30px rgba(0, 0, 0, 0.466);
    .login__text {
        margin-bottom: 30px;
    }
    .MuiButton-root {
        color: var(--background-default) !important;
        text-transform: inherit;
        font-size: 18px;
        font-weight: 900;
        background-color: #00AF9C;
        padding: 10px 20px;
    }
    .MuiButton-root:hover {
        background-color: #00bda7 !important;
    }
`;

const Logo = styled.img`
    width: 100px;
    object-fit: contain;
    margin-bottom: 40px;
`;