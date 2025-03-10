import { NextResponse } from 'next/server';
import { contactConfig } from '@/data/contactConfig';
// Import SendGrid if provider is sendgrid
import sgMail from '@sendgrid/mail';

// Function to send email based on the configured provider
async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const config = contactConfig.emailService;
  
  // Format the subject with the configured prefix
  const formattedSubject = `${contactConfig.form.subjectPrefix} ${data.subject}`;
  
  // Format the message content
  const textContent = `
    Name: ${data.name}
    Email: ${data.email}
    Message: ${data.message}
  `;
  
  const htmlContent = `
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Message:</strong> ${data.message}</p>
  `;
  
  // Send email based on the configured provider
  switch (config.provider) {
    case 'sendgrid':
      try {
        // Check if API key is set
        if (!config.sendgrid.apiKey) {
          console.error('SendGrid API key is not set');
          throw new Error('Email service is not properly configured');
        }
        
        // Set the API key
        sgMail.setApiKey(config.sendgrid.apiKey);
        
        // Create the message
        const msg = {
          to: config.sendgrid.toEmail,
          from: config.sendgrid.fromEmail,
          subject: formattedSubject,
          text: textContent,
          html: htmlContent,
        };
        
        console.log('Attempting to send email with SendGrid:', {
          to: msg.to,
          from: msg.from,
          subject: msg.subject
        });
        
        // Send the email
        const response = await sgMail.send(msg);
        console.log('SendGrid API response:', response[0].statusCode);
        
        if (response[0].statusCode >= 200 && response[0].statusCode < 300) {
          console.log('Email sent successfully');
          return true;
        } else {
          console.error('SendGrid returned non-success status code:', response[0].statusCode);
          throw new Error('Failed to send email');
        }
      } catch (error: unknown) {
        console.error('Error sending email with SendGrid:', error);
        if (error && typeof error === 'object' && 'response' in error && error.response) {
          const response = error.response as { body?: { errors?: Array<{ message: string }> } };
          console.error('SendGrid API error response:', response.body);
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        throw new Error('Failed to send email: ' + errorMessage);
      }

      
    case 'none':
    default:
      // Just log the data for development
      console.log('Contact form submission:', {
        name: data.name,
        email: data.email,
        subject: formattedSubject,
        message: data.message,
        textContent,
        htmlContent
      });
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      break;
  }
  
  return true;
}

// Simple in-memory rate limiting (replace with a proper solution in production)
const submissions = new Map<string, { count: number, timestamp: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = contactConfig.rateLimit.timeWindow * 60 * 1000;
  
  if (submissions.has(ip)) {
    const submission = submissions.get(ip)!;
    
    // Reset if outside time window
    if (now - submission.timestamp > windowMs) {
      submissions.set(ip, { count: 1, timestamp: now });
      return true;
    }
    
    // Check if over limit
    if (submission.count >= contactConfig.rateLimit.maxSubmissions) {
      return false;
    }
    
    // Increment count
    submission.count += 1;
    submissions.set(ip, submission);
    return true;
  }
  
  // First submission
  submissions.set(ip, { count: 1, timestamp: now });
  return true;
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    // In production, you'd get this from request headers or server environment
    const ip = '127.0.0.1'; // Placeholder
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    const data = await request.json();
    console.log('Received form submission:', data);
    
    // Validate the data
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Send the email
    await sendEmail(data);
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error processing contact form:', error);
    const errorMessage = error instanceof Error ? error.message : contactConfig.form.errorMessage;
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 