const nodemailer = require('nodemailer');
const ejs = require('ejs');

class emailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            },
        });
    }

    sendWelcomeEmail(user) {
        let that = this;
        ejs.renderFile('./emails/' + "welcome.ejs", { user: user }, function (err, html) {
            if (err) {
                console.log(err);
            } else {
                that.transporter.sendMail({
                    from: '"Timeboxer" <no-reply@time-boxer.com>',
                    to: user.email,
                    subject: "Timeboxer: Verify your email",
                    html: html,
                }).then(info => {
                    //console.log("Message sent: %s", info.messageId);
                });
            }
        });
    }
}

module.exports = new emailService();
