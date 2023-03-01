const { CourierClient } = require("@trycourier/courier");
const express = require("express");
const bodyParser = require('body-parser');
const admin = require("firebase-admin");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const serviceAccount = require("../enlear-notification-test-firebase-adminsdk-oss1q-a1152fd22e.json");
const courier = CourierClient({ authorizationToken: "pk_prod_TD78T8007J4M4ZJ51NCJH8G2YGB4" }); // get from the Courier UI

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendResetEmail = async (email, link) => {
    const response = await courier.send({
        message: {
            template: "191GE8ZPJEM4HKKPWXBPEDHKRY0M",
            to: {
                email: email,
            },
            routing: {
                method: "single",
                channels: ["email"],
            },
            data: {
                ResetPasswordLink: link
            }
        },
    });
    
    console.log(response);
}

app.post('/sendPasswordResetLink', (req, res) => {
    admin.auth()
        .generatePasswordResetLink(req.body.email)
        .then((link) => {
            sendResetEmail(req.body.email, JSON.stringify(link));
            res.send();
        })
        .catch((error) => {
            console.log('Error fetching user data:', error);
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});