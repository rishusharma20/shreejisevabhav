/**
 * Mock Email Service for the MVP Phase.
 * In a real production environment, this would integrate with AWS SES, SendGrid, or Nodemailer.
 */
const sendEmailAsync = async (userEmail, subject, htmlContent) => {
    try {
        // Mock network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        console.log(`\n================= DIVINE MESSENGER (EMAIL) =================`);
        console.log(`To: ${userEmail}`);
        console.log(`Subject: ${subject}`);
        console.log(`Payload: ${htmlContent.substring(0, 50)}...`);
        console.log(`============================================================\n`);
        
        return true;
    } catch (error) {
        console.error("Failed to send email", error);
        return false;
    }
};

module.exports = {
    sendEmailAsync
};
