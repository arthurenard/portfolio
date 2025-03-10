// Contact form configuration
export const contactConfig = {
  // Email service configuration
  emailService: {
    // Choose your email service: 'sendgrid', 'mailgun', 'aws-ses', 'smtp', 'none'
    // 'none' will just log the submissions to the console (useful for development)
    provider: 'sendgrid',
    
    // SendGrid configuration (if using SendGrid)
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY || '',
      fromEmail: 'arthurenard@icloud.com',
      toEmail: 'arthurenard@icloud.com',
    },
  },
  
  // Form settings
  form: {
    // Email subject prefix
    subjectPrefix: '[Portfolio Contact]',
    
    // Success message shown after form submission
    successMessage: "Thank you for your message! I'll get back to you as soon as possible.",
    
    // Error message shown if form submission fails
    errorMessage: "There was an error submitting your message. Please try again.",
    
    // Form fields configuration
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Your name',
        required: true,
      },
      email: {
        label: 'Email',
        placeholder: 'your.email@example.com',
        required: true,
      },
      subject: {
        label: 'Subject',
        placeholder: 'What would you like to discuss?',
        required: true,
      },
      message: {
        label: 'Message',
        placeholder: 'Your message here...',
        required: true,
        rows: 5,
      },
    },
    
    // Submit button text
    submitButtonText: 'Send Message',
    
    // Submit button loading text
    submitButtonLoadingText: 'Sending...',
  },
  
  // Rate limiting (to prevent spam)
  rateLimit: {
    // Maximum number of submissions allowed per IP address in the time window
    maxSubmissions: 5,
    
    // Time window in minutes
    timeWindow: 60,
  },
}; 