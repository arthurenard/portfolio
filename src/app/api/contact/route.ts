import { NextResponse } from 'next/server';
import { contactConfig } from '@/data/contactConfig';

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
      // Uncomment and install @sendgrid/mail to use SendGrid
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(config.sendgrid.apiKey);
      // const msg = {
      //   to: config.sendgrid.toEmail,
      //   from: config.sendgrid.fromEmail,
      //   subject: formattedSubject,
      //   text: textContent,
      //   html: htmlContent,
      // };
      // await sgMail.send(msg);
      console.log('SendGrid would send:', { to: config.sendgrid.toEmail, subject: formattedSubject });
      break;
      
    case 'mailgun':
      // Uncomment and install mailgun-js to use Mailgun
      // const mailgun = require('mailgun-js')({
      //   apiKey: config.mailgun.apiKey,
      //   domain: config.mailgun.domain,
      // });
      // const data = {
      //   from: config.mailgun.fromEmail,
      //   to: config.mailgun.toEmail,
      //   subject: formattedSubject,
      //   text: textContent,
      //   html: htmlContent,
      // };
      // await mailgun.messages().send(data);
      console.log('Mailgun would send:', { to: config.mailgun.toEmail, subject: formattedSubject });
      break;
      
    case 'aws-ses':
      // Uncomment and install aws-sdk to use AWS SES
      // const AWS = require('aws-sdk');
      // AWS.config.update({
      //   region: config.awsSes.region,
      //   accessKeyId: config.awsSes.accessKeyId,
      //   secretAccessKey: config.awsSes.secretAccessKey,
      // });
      // const ses = new AWS.SES({ apiVersion: '2010-12-01' });
      // const params = {
      //   Destination: {
      //     ToAddresses: [config.awsSes.toEmail],
      //   },
      //   Message: {
      //     Body: {
      //       Html: {
      //         Charset: 'UTF-8',
      //         Data: htmlContent,
      //       },
      //       Text: {
      //         Charset: 'UTF-8',
      //         Data: textContent,
      //       },
      //     },
      //     Subject: {
      //       Charset: 'UTF-8',
      //       Data: formattedSubject,
      //     },
      //   },
      //   Source: config.awsSes.fromEmail,
      // };
      // await ses.sendEmail(params).promise();
      console.log('AWS SES would send:', { to: config.awsSes.toEmail, subject: formattedSubject });
      break;
      
    case 'smtp':
      // Uncomment and install nodemailer to use SMTP
      // const nodemailer = require('nodemailer');
      // const transporter = nodemailer.createTransport({
      //   host: config.smtp.host,
      //   port: config.smtp.port,
      //   secure: config.smtp.secure,
      //   auth: {
      //     user: config.smtp.auth.user,
      //     pass: config.smtp.auth.pass,
      //   },
      // });
      // await transporter.sendMail({
      //   from: config.smtp.fromEmail,
      //   to: config.smtp.toEmail,
      //   subject: formattedSubject,
      //   text: textContent,
      //   html: htmlContent,
      // });
      console.log('SMTP would send:', { to: config.smtp.toEmail, subject: formattedSubject });
      break;
      
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
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: contactConfig.form.errorMessage },
      { status: 500 }
    );
  }
} 