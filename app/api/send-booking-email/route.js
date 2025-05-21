import sgMail from "@sendgrid/mail";

// Use Node.js runtime instead of Edge
export const runtime = "nodejs";

export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "mobile",
      "company",
      "serviceRequired",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `${field} is required`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Check if required environment variables are set
    if (!process.env.SENDGRID_API_KEY) {
      console.error("Missing SENDGRID_API_KEY environment variable");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email service not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Set default values for email if env vars aren't present
    const fromEmail =
      process.env.SENDGRID_FROM_EMAIL || "noreply@zenitdigital.se";
    const adminEmail =
      process.env.SENDGRID_ADMIN_EMAIL || "admin@zenitdigital.se";

    // Initialize SendGrid with API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Format the customer email
    const customerEmail = {
      to: formData.email,
      from: fromEmail,
      subject: "Your Booking Request - Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Booking Request Confirmation</h2>
          <p>Hello ${formData.firstName},</p>
          <p>Thank you for your booking request. We've received your information and a member of our team will contact you shortly.</p>
          
          <h3 style="margin-top: 20px;">Your Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Name:</strong> ${formData.firstName} ${
        formData.lastName
      }</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Mobile:</strong> ${formData.mobile}</li>
            <li><strong>Company:</strong> ${formData.company}</li>
            <li><strong>Job Title:</strong> ${formData.serviceRequired}</li>
            ${
              formData.comments
                ? `<li><strong>Comments:</strong> ${formData.comments}</li>`
                : ""
            }
          </ul>
          
          <p style="margin-top: 20px;">Best regards,</p>
          <p>The Zenit Digital Team</p>
        </div>
      `,
    };

    // Format the admin notification email
    const adminNotificationEmail = {
      to: adminEmail,
      from: fromEmail,
      subject: "New Booking Request Received",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Booking Request Received</h2>
          <p>A new booking request has been submitted:</p>
          
          <h3 style="margin-top: 20px;">Contact Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Name:</strong> ${formData.firstName} ${
        formData.lastName
      }</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Mobile:</strong> ${formData.mobile}</li>
            <li><strong>Company:</strong> ${formData.company}</li>
            <li><strong>Service Required:</strong> ${formData.serviceRequired}</li>
            ${
              formData.comments
                ? `<li><strong>Comments:</strong> ${formData.comments}</li>`
                : ""
            }
          </ul>
        </div>
      `,
    };

    try {
      // Send the emails
      await Promise.all([
        sgMail.send(customerEmail),
        sgMail.send(adminNotificationEmail),
      ]);

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (emailError) {
      console.error("SendGrid error:", emailError);

      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to send email",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Server error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
