const nodemailer = require('nodemailer');

const sendMail = async (mail, auth) => {
    const maillist = Array.isArray(mail.email) ? mail.email : [mail.email];

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: auth.username,
            pass: auth.password
        }
    });
    const mailOptions = {
        from: mail.from,
        subject: mail.subject,
        text: mail.body
    };
    for (let i = 0; i < maillist.length; i++) {
        mailOptions.to = maillist[i];
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully', info);
    }
    
}


module.exports = {sendMail}