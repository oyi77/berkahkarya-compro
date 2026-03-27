'use client';

import React from 'react';
import { trackWhatsAppClick } from '@/lib/tracking';

interface WhatsAppCTAProps {
  phone: string;              // e.g., "6281234567890"
  message?: string;           // Pre-filled message
  intent: string;             // e.g., "Sales Inquiry", "Support"
  productName?: string;       // e.g., "AI Video Studio Growth"
  productValue?: number;      // e.g., 149000
  children: React.ReactNode;
  className?: string;
}

/**
 * WhatsApp CTA with full attribution tracking
 * 
 * Usage:
 * <WhatsAppCTA 
 *   phone="6281234567890"
 *   message="Halo, saya tertarik dengan AI Video Studio"
 *   intent="Product Inquiry"
 *   productName="AI Video Studio"
 *   productValue={149000}
 * >
 *   Chat via WhatsApp
 * </WhatsAppCTA>
 */
export default function WhatsAppCTA({
  phone,
  message,
  intent,
  productName,
  productValue,
  children,
  className,
}: WhatsAppCTAProps) {
  const waUrl = `https://wa.me/${phone}${message ? '?text=' + encodeURIComponent(message) : ''}`;

  const handleClick = () => {
    trackWhatsAppClick({
      intent,
      phone_number: phone,
      message,
      product_name: productName,
      product_value: productValue,
    });
  };

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
