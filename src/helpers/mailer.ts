import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hashed token
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpire: Date.now() + 86400000}) //24h tvalidi lacc
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,{forgotPasswordToken: hashedToken, forgotPasswordTokenExpire: Date.now() + 300000}) //5 min bch tbadel mdp
        }

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
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "recover/passwordreset"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "recover/passwordreset"}?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
        
    } catch (error:any) {
        throw new Error(error.message);
    }
}