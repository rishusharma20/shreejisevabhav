const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    let transporter;

    // Use Ethereal for testing if Gmail credentials are not provided
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "") {
        console.log("No SMTP_USER found. Using Ethereal Email for testing...");
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
    } else {
        // Use Gmail SMTP
        transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    const mailOptions = {
        from: `Shreeji Seva Bhav <${process.env.SMTP_USER || "noreply@shreejisevabhav.com"}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "") {
        console.log("==================================================");
        console.log("✉️  TEST EMAIL SENT! VIEW IT HERE:");
        console.log(nodemailer.getTestMessageUrl(info));
        console.log("==================================================");
    }
};

module.exports = sendEmail;
