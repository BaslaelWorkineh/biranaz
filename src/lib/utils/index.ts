import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDomain() {
    const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https" : "http"
    const domain = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "localhost:3000"
    
    return `${protocol}://${domain}`
  }
  export function getDomainName() {
    const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? "https" : "http"
    const domain = process.env.NEXT_PUBLIC_VERCEL_URL ? process.env.NEXT_PUBLIC_VERCEL_URL : "localhost:3000"
    
    return `${domain}`
  }


  export function slugify(text:string) {
    return text
      .toString()
      .normalize('NFD')                   // Change diacritics
      .replace(/[\u0300-\u036f]/g, '')     // Remove diacritics
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')               // Replace spaces with -
      .replace(/&/g, '-and-')              // Replace & with 'and'
      .replace(/[^\w-]+/g, '')             // Remove all non-word characters
      .replace(/--+/g, '-');               // Replace multiple - with single -
  }
  

  export function shortener(text:string, length:number) {
    if (!text) return ""
    return text.length > length ? text.substring(0, length) + "..." : text
  }