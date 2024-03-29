require("dotenv").config({path:"../../../.env"});
const nodemailer = require("nodemailer");




async function sendMail(data) {

    const mailer = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
   
    let flag =true
    let content =
        '<h3 style="color:#165c9e;">Contact Query</h3><b>From : ' +
        data.name +
        "</b><br><b>Email Address : " +
        data.email +
        "</b><br>" +
        "<p>" +
        data.content +
        "</p>";

    let mailOptions = {
        from: "ctautomation2020@gmail.com",
        to: data.email,
        subject: data.subject,
        html: content,
    };

    let result = new Promise((resolve, reject) => {
        mailer.sendMail(mailOptions, (err, data) => {
            if (err) {
                reject(
                    new Error({
                        status: "Error",
                        description: "Mail not sent. Please try again later.",
                    })
                    
                );
            } else {
                resolve({
                    status: "Success",
                    description:
                        "Mail sent successfully. We'll respond back soon.",
                });
            }
        });
        
    }).catch((err) => {
        return false
    });
    return result
}

module.exports={
    sendMail
}
