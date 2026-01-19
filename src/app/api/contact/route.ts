import { NextResponse } from 'next/server';
import { contactConfig } from '@/data/contactConfig';

// Function to send email via Web3Forms
async function sendEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const config = contactConfig.web3forms;

  // Format the subject with the configured prefix
  const formattedSubject = `${contactConfig.form.subjectPrefix} ${data.subject}`;
  try {
    if (!config?.accessKey) {
      console.error('Web3Forms access key is not set');
      throw new Error('Email service is not properly configured');
    }

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: config.accessKey,
        name: data.name,
        email: data.email,
        subject: formattedSubject,
        message: data.message,
        replyto: data.email,
        from_name: data.name,
      }),
    });

    const responseBody = (await response.json().catch(() => null)) as
      | { success?: boolean; message?: string }
      | null;

    if (response.ok && responseBody?.success) {
      console.log('Web3Forms submission accepted');
      return true;
    }

    console.error('Web3Forms returned an error:', {
      status: response.status,
      body: responseBody,
    });
    throw new Error(responseBody?.message || 'Failed to send email');
  } catch (error: unknown) {
    console.error('Error sending email with Web3Forms:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error('Failed to send email: ' + errorMessage);
  }
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