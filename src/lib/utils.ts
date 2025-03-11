import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to only show the year
 * @param dateString - The date string to format (can be in various formats)
 * @returns A string containing only the year
 */
export function formatDateToYear(dateString: string): string {
  // If the string already contains only years (e.g., "2020 - 2021")
  if (/^\d{4}( - \d{4}| - Now)?$/.test(dateString)) {
    return dateString;
  }
  
  // If the string contains month names or day numbers
  try {
    // Try to parse the date
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      return date.getFullYear().toString();
    }
    
    // If we have a date range with month/day info (e.g., "Sep 2020 - Jun 2021")
    const yearRangeMatch = dateString.match(/\b(20\d{2})\b.*\b(20\d{2}|Now)\b/);
    if (yearRangeMatch) {
      return `${yearRangeMatch[1]} - ${yearRangeMatch[2]}`;
    }
    
    // If we just have a single year mentioned
    const singleYearMatch = dateString.match(/\b(20\d{2})\b/);
    if (singleYearMatch) {
      return singleYearMatch[1];
    }
  } catch (error) {
    console.error("Error formatting date:", error);
  }
  
  // Return the original string if we couldn't format it
  return dateString;
}
