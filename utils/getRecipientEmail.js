const getRecipientEmail = (users, userloggedIn) => (
    users?.filter(recipientUser => recipientUser !== userloggedIn?.email)[0]
);

export default getRecipientEmail;