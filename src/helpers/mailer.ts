import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// create hashed token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		// Looking to send emails in production? Check out our Email API/SMTP product!
		const transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.MAILTRAP_USER_ID,
				pass: process.env.MAILTRAP_USER_PASSWORD,
			},
		});

		const mailOptions = {
			from: "xyz@example.com",
			to: email,
			subject:
				emailType === "VERIFY" ? "Verify your email" : "Reset your password",
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				email === "VERIFY" ? "verify your email" : "reset your password"
			}</p>`,
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
