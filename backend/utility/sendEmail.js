import nodemailer from 'nodemailer'
export const sendEmail=async(Option)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.SMTP_SERVICE,
        auth:{user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        },
       })
         const mailOption={
            from:process.env.SMTP_MAIL,
            to:Option.email,
            subject:Option.subject,
            text:Option.message
        }
    await transporter.sendMail(mailOption)
}
