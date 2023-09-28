import nodemailer from 'nodemailer'
 
export const sendEmail = async ({to, subject, text, html}: any) => {
    try {
        const transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.auth_user,
                pass: process.env.auth_password,
            },
        })

        await transporter.sendMail({
            from: "",
            to: to,
            subject,
            text,
            html,
        })
    } catch (error: any) {
        return error
        
    }
}