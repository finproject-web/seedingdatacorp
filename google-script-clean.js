// Google Apps Script for Form Submission - SERVER SIDE ONLY
// Deploy this script in Google Apps Script and get the deployment URL
// DO NOT copy browser JavaScript code here!

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

// Test function - run this manually to test the script
function testScript() {
  try {
    // Simulate the parameters object directly
    const params = {
      loanAmount: '10000',
      zipCode: '12345',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '5551234567',
      address: '123 Test St',
      city: 'Test City',
      state: 'CA',
      bankName: 'Test Bank',
      routingNumber: '123456789',
      creditScore: '650-700',
      employmentStatus: 'Full-time',
      income: '5000',
      tcpaConsent: 'on',
      ip: '127.0.0.1',
      userAgent: 'Test Browser'
    };
    
    // Log the test parameters
    Logger.log('Test parameters: ' + JSON.stringify(params));
    
    // Create email content directly
    const subject = 'TEST - New Loan Application - Test User';
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background: #3498db; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
          <h1 style="margin: 0; font-size: 24px;">TEST - New Loan Application Received</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">SeedingData Corp - Test Email</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c3e50; margin-top: 0;">Test Application Details</h3>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>IP Address:</strong> 127.0.0.1</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Loan Information</h3>
          <p><strong>Loan Amount Needed:</strong> $${params.loanAmount}</p>
          <p><strong>ZIP Code:</strong> ${params.zipCode}</p>
          <p><strong>Credit Score Range:</strong> ${params.creditScore}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Personal Information</h3>
          <p><strong>Name:</strong> ${params.firstName} ${params.lastName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${params.email}">${params.email}</a></p>
          <p><strong>Phone Number:</strong> <a href="tel:${params.phone}">${params.phone}</a></p>
        </div>
        
        <div style="background: #ff6b35; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 30px;">
          <h3 style="margin: 0 0 10px 0;">Test Successful!</h3>
          <p style="margin: 0;">This is a test email from Google Apps Script.</p>
        </div>
      </div>
    `;
    
    // Send test email
    MailApp.sendEmail({
      to: 'tyronlincolnn@gmail.com',
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Test email sent successfully!');
    
  } catch (error) {
    Logger.log('Test error: ' + error.toString());
  }
}

function handleRequest(e) {
  try {
    // Check if event object exists
    if (!e) {
      Logger.log('Error: Event object is undefined');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No event data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get form data from POST request
    const params = e.parameters || e.parameter || {};
    
    // Log the received parameters for debugging
    Logger.log('Received parameters: ' + JSON.stringify(params));
    
    // Check if parameters exist
    if (!params || Object.keys(params).length === 0) {
      Logger.log('Error: No parameters received');
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'No form data received'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Simple test check
    if (params.action === 'test') {
      Logger.log('Simple test received: ' + params.message);
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Test received: ' + params.message
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Extract form fields
    const loanAmount = params.loanAmount || 'Not provided';
    const zipCode = params.zipCode || 'Not provided';
    const firstName = params.firstName || 'Not provided';
    const lastName = params.lastName || 'Not provided';
    const email = params.email || 'Not provided';
    const phone = params.phone || 'Not provided';
    const address = params.address || 'Not provided';
    const city = params.city || 'Not provided';
    const state = params.state || 'Not provided';
    const bankName = params.bankName || 'Not provided';
    const routingNumber = params.routingNumber || 'Not provided';
    const creditScore = params.creditScore || 'Not provided';
    const employmentStatus = params.employmentStatus || 'Not provided';
    const income = params.income || 'Not provided';
    const tcpaConsent = params.tcpaConsent || 'Not provided';
    
    // Get user's IP and timestamp
    const timestamp = new Date().toLocaleString();
    const ip = e.parameters.ip || 'Not detected';
    const userAgent = e.parameters.userAgent || 'Not detected';
    
    // Create email content
    const subject = 'New Customer Application - ' + firstName + ' ' + lastName;
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="background: #3498db; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px;">
          <h1 style="margin: 0; font-size: 24px;">New Loan Application Received</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">SeedingData Corp - Lead Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c3e50; margin-top: 0;">Application Details</h3>
          <p><strong>Submitted:</strong> ${timestamp}</p>
          <p><strong>IP Address:</strong> ${ip}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Loan Information</h3>
          <p><strong>Loan Amount Needed:</strong> $${loanAmount}</p>
          <p><strong>ZIP Code:</strong> ${zipCode}</p>
          <p><strong>Credit Score Range:</strong> ${creditScore}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Personal Information</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Address Information</h3>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>State:</strong> ${state}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Financial Information</h3>
          <p><strong>Monthly Income:</strong> $${income}</p>
          <p><strong>Employment Status:</strong> ${employmentStatus}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Banking Information</h3>
          <p><strong>Bank Name:</strong> ${bankName}</p>
          <p><strong>Bank Routing Number:</strong> ${routingNumber}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Legal Consent</h3>
          <p><strong>TCPA Consent:</strong> ${tcpaConsent === 'on' ? 'Yes - User agreed to receive calls/texts' : 'No consent provided'}</p>
        </div>
        
        <div style="background: #ff6b35; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-top: 30px;">
          <h3 style="margin: 0 0 10px 0;">Next Steps</h3>
          <p style="margin: 0;">Contact the applicant within 24 hours to discuss loan options.</p>
          <p style="margin: 5px 0 0 0;">Phone: ${phone} | Email: ${email}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was generated by SeedingData Corp Lead Management System</p>
          <p>Timestamp: ${timestamp} | User Agent: ${userAgent}</p>
        </div>
      </div>
    `;
    
    // DEBUG: Log data instead of sending emails for testing
    Logger.log('=== DEBUG: Form Data Received ===');
    Logger.log('Loan Amount: ' + loanAmount);
    Logger.log('First Name: ' + firstName);
    Logger.log('Last Name: ' + lastName);
    Logger.log('Email: ' + email);
    Logger.log('Phone: ' + phone);
    Logger.log('Address: ' + address);
    Logger.log('City: ' + city);
    Logger.log('State: ' + state);
    Logger.log('Bank Name: ' + bankName);
    Logger.log('Routing Number: ' + routingNumber);
    Logger.log('Credit Score: ' + creditScore);
    Logger.log('Employment: ' + employmentStatus);
    Logger.log('Income: ' + income);
    Logger.log('TCPA Consent: ' + tcpaConsent);
    Logger.log('=== END DEBUG ===');
    
    // Send email to you with error handling
    try {
      Logger.log('Attempting to send email to: tyronlincolnn@gmail.com');
      
      // Try primary email first
      MailApp.sendEmail({
        to: 'tyronlincolnn@gmail.com',
        subject: subject,
        htmlBody: htmlBody,
        replyTo: email,
        name: 'SeedingData Corp'
      });
      Logger.log('Primary email sent successfully!');
      
    } catch (primaryError) {
      Logger.log('Primary email failed: ' + primaryError.toString());
      Logger.log('Trying backup email...');
      
      // Try backup email if primary fails
      try {
        MailApp.sendEmail({
          to: 'Kevinross@seedingdata.com', // Backup email
          subject: 'BACKUP: ' + subject,
          htmlBody: htmlBody,
          replyTo: email,
          name: 'SeedingData Corp'
        });
        Logger.log('Backup email sent successfully!');
      } catch (backupError) {
        Logger.log('Backup email also failed: ' + backupError.toString());
        throw backupError;
      }
    }
      Logger.log('Email sent successfully!');
      
      // Send confirmation to user (optional)
      if (email && email !== 'Not provided') {
        const userSubject = 'Your Loan Application - SeedingData Corp';
        const userBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Thank You for Your Application!</h2>
            <p>Dear ${firstName},</p>
            <p>We have received your loan application for $${loanAmount}. Our lending partners will review your information and contact you within 24 hours to discuss your options.</p>
            <p><strong>Application Details:</strong></p>
            <ul>
              <li>Loan Amount: $${loanAmount}</li>
              <li>Submitted: ${timestamp}</li>
            </ul>
            <p>If you have any questions, please contact us at support@seedingdata.com or call (470) 243-4061.</p>
            <p>Best regards,<br>SeedingData Corp Team</p>
          </div>
        `;
        
        MailApp.sendEmail({
          to: email,
          subject: userSubject,
          htmlBody: userBody
        });
        Logger.log('User confirmation email sent successfully!');
      }
      
    } catch (emailError) {
      Logger.log('Email sending error: ' + emailError.toString());
      Logger.log('Error details: ' + emailError.message);
      Logger.log('Error stack: ' + emailError.stack);
      
      // Return error response but still log data
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Email sending failed: ' + emailError.toString()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Application submitted successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    Logger.log('Error processing form submission: ' + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Error processing application'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
