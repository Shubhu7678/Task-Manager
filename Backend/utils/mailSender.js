import nodemailer from 'nodemailer';

export const mailSender = async (email, title, message) => { 

    try {
        
        let transporter = nodemailer.createTransport({

            host: process.env.MAIL_HOST,
            auth: {

                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }

        });

        let info = await transporter.sendMail({

            from: 'ShubhamAswal || New Project : Edtect',
            to: `${ email }`,
            subject: `${title }`,
            html : `${message}`,
        })

        console.log("Message sent: %s", info.messageId);

        return true;


    } catch (error) { 

        console.log("Error occured while sending mail in mailSender", error);
    }
}