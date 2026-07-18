const Order = require("../../models/Order.model");

/**
 * Generates structured JSON Invoice Data.
 * In the future, this can easily be passed into puppeteer or pdfkit to generate a physical PDF.
 */
const generateInvoiceData = async (orderId, userId) => {
    // Populate user and address details
    const order = await Order.findOne({ _id: orderId, userId })
        .populate("userId", "name email phone")
        .populate("addressId", "name phone houseNo street city state country pincode");

    if (!order) {
        return null;
    }

    return {
        companyDetails: {
            name: "Shreeji Seva Bhav",
            address: "Vrindavan, Uttar Pradesh, India",
            email: "support@shreejisevabhav.com"
        },
        invoiceDetails: {
            invoiceNumber: order.invoiceNumber,
            orderNumber: order.orderNumber,
            date: order.createdAt,
            paymentMethod: order.paymentMethod,
            status: order.orderStatus
        },
        customerDetails: {
            name: order.userId.name,
            email: order.userId.email,
            phone: order.userId.phone
        },
        shippingAddress: order.addressId,
        items: order.products.map(p => ({
            name: p.productName,
            variant: p.variantSize,
            quantity: p.quantity,
            unitPrice: p.priceAtPurchase,
            totalPrice: (p.priceAtPurchase - p.discountAtPurchase) * p.quantity
        })),
        summary: {
            subtotal: order.subtotal,
            discount: order.discount,
            couponDiscount: order.couponDiscount,
            shippingCharges: order.shippingCharges,
            grandTotal: order.totalAmount
        },
        message: "Thank you for being part of the Divine Journey."
    };
};

module.exports = {
    generateInvoiceData
};
