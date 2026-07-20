const getBaseTemplate = (title, subtitle, content) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #FFFBF4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            border: 1px solid rgba(212, 168, 83, 0.3);
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(212, 168, 83, 0.15);
        }
        .header {
            background: linear-gradient(135deg, #FFF5E6, #FFEED4);
            padding: 40px 20px;
            text-align: center;
            border-bottom: 2px solid #D4A853;
        }
        .header h1 {
            color: #5C1A1A;
            font-size: 28px;
            margin: 0;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .header p {
            color: #8B6F4E;
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-top: 10px;
            font-weight: bold;
        }
        .content {
            padding: 40px 30px;
            color: #3D2E24;
            line-height: 1.6;
        }
        .content h2 {
            color: #5C1A1A;
            margin-bottom: 20px;
            text-align: center;
        }
        .content p {
            margin-bottom: 20px;
            font-size: 15px;
            text-align: center;
        }
        .order-details {
            background-color: #FFFBF4;
            padding: 20px;
            border-radius: 8px;
            border: 1px dashed #D4A853;
            margin: 20px 0;
            text-align: center;
        }
        .btn-container {
            text-align: center;
            margin: 35px 0;
        }
        .btn {
            background: linear-gradient(135deg, #D4A853, #E8850A);
            color: #ffffff !important;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(212, 168, 83, 0.3);
        }
        .footer {
            background-color: #FFFBF4;
            padding: 20px;
            text-align: center;
            border-top: 1px solid rgba(212, 168, 83, 0.15);
            color: #8B6F4E;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Shreeji Seva Bhav</h1>
            <p>Divine Clothing & Jewellery</p>
        </div>
        <div class="content">
            <h2>${title}</h2>
            <p style="font-weight: bold; color: #D4A853;">${subtitle}</p>
            ${content}
        </div>
        <div class="footer">
            <p>May Thakurji bless you with joy and devotion.</p>
            <p>&copy; ${new Date().getFullYear()} Shreeji Seva Bhav. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

const getOrderStatusEmail = (order, status) => {
    let title = "";
    let subtitle = "";
    let message = "";

    const orderNumber = order.orderNumber || order._id;
    const trackUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/track-my-seva`;

    switch (status) {
        case "UNDER_VERIFICATION":
            title = "Payment Submitted";
            subtitle = "We are verifying your transaction";
            message = `
                <p>Radhe Radhe,</p>
                <p>Thank you for submitting your payment for Order <strong>#${orderNumber}</strong>. We are currently verifying the UTR number provided.</p>
                <p>Once verified, your order will be confirmed and we will begin preparing your divine offerings.</p>
            `;
            break;
        case "PAYMENT_APPROVED":
            title = "Order Confirmed!";
            subtitle = "Your payment was successful";
            message = `
                <p>Radhe Radhe,</p>
                <p>Wonderful news! Your payment for Order <strong>#${orderNumber}</strong> has been successfully verified.</p>
                <p>Your order is now confirmed. We will notify you as soon as we start preparing your offerings.</p>
            `;
            break;
        case "PREPARING":
            title = "Preparing Your Seva";
            subtitle = "We are gathering your offerings";
            message = `
                <p>Radhe Radhe,</p>
                <p>We have started preparing the items for your Order <strong>#${orderNumber}</strong> with love and devotion.</p>
                <p>We will let you know once it moves to packaging.</p>
            `;
            break;
        case "PACKAGING":
            title = "Packaging Your Seva";
            subtitle = "Securely packing your offerings";
            message = `
                <p>Radhe Radhe,</p>
                <p>Your beautiful items for Order <strong>#${orderNumber}</strong> are currently being packaged securely to ensure they reach you safely.</p>
            `;
            break;
        case "SHIPPED":
            title = "Order Shipped";
            subtitle = "Your offerings are on their way!";
            message = `
                <p>Radhe Radhe,</p>
                <p>Great news! Your Order <strong>#${orderNumber}</strong> has been shipped and is on its way to you.</p>
                <p>You can track the live status on our website.</p>
            `;
            break;
        case "OUT_FOR_DELIVERY":
            title = "Out for Delivery";
            subtitle = "Arriving very soon";
            message = `
                <p>Radhe Radhe,</p>
                <p>Get ready! Your Order <strong>#${orderNumber}</strong> is currently out for delivery and will be arriving very soon.</p>
                <p>Please make sure someone is available to receive these divine offerings.</p>
            `;
            break;
        case "DELIVERED":
            title = "Order Delivered";
            subtitle = "Your offerings have arrived";
            message = `
                <p>Radhe Radhe,</p>
                <p>Your Order <strong>#${orderNumber}</strong> has been successfully delivered. We hope these divine offerings bring joy and devotion to your home.</p>
                <p>Thank you for choosing Shreeji Seva Bhav.</p>
            `;
            break;
        default:
            title = "Order Update";
            subtitle = `Status: ${status}`;
            message = `
                <p>Radhe Radhe,</p>
                <p>The status of your Order <strong>#${orderNumber}</strong> has been updated to <strong>${status}</strong>.</p>
            `;
    }

    const content = `
        ${message}
        <div class="order-details">
            <p style="margin: 0; font-size: 13px; color: #8B6F4E; text-transform: uppercase; letter-spacing: 1px;">Order Number</p>
            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #5C1A1A;">#${orderNumber}</p>
        </div>
        <div class="btn-container">
            <a href="${trackUrl}" class="btn">Track My Seva</a>
        </div>
    `;

    return {
        subject: `Shreeji Seva Bhav - ${title}`,
        html: getBaseTemplate(title, subtitle, content),
        text: `Radhe Radhe, Your order #${orderNumber} status is now: ${status}. Track it at ${trackUrl}`
    };
};

module.exports = {
    getOrderStatusEmail
};
