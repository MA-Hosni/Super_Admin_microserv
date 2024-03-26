import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';


function generateRandomString(length:any) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const sendEmail = async({email, userId}:any) => {
    try {
        // create a hashed token
        const code = await generateRandomString(6);

        await User.findByIdAndUpdate(userId,{otpCode: code, otpCodeExpire: Date.now() + 300000}) //5min tvalidi lacc


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9c6d5228fed7b7",
              pass: "e4c69358512981"
            }
          });
        
        const mailOptions = {
            from: 'medalihosni123456789@gmail.com',
            to: email,
            subject: "OTP Code",
            html: `<h3>Confirmation Code</h3><h1>Use this code to login:</h1><h1>${code}</h1>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}