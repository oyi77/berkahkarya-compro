'use client';

import React from 'react';
import { trackAddToCart, trackInitiateCheckout } from '@/lib/tracking';

interface TrackedCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  productName: string;
  productId?: string;
  value?: number;
  currency?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * CTA Button with automatic AddToCart tracking
 * Use this for all external links (WhatsApp, SaaS, payment pages)
 */
export default function TrackedCTA({
  href,
  children,
  className,
  productName,
  productId,
  value,
  currency = 'IDR',
  variant = 'primary',
}: TrackedCTAProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Determine destination type
    let destinationType = 'external';
    if (href.includes('wa.me') || href.includes('whatsapp')) {
      destinationType = 'whatsapp';
    } else if (href.includes('t.me') || href.includes('telegram')) {
      destinationType = 'telegram';
    } else if (href.includes('aitradepulse')) {
      destinationType = 'saas_app';
    }

    // Track AddToCart for external links
    trackAddToCart({
      content_name: productName,
      content_id: productId || productName.toLowerCase().replace(/\s+/g, '-'),
      content_type: 'product',
      value: value,
      currency: currency,
      destination: destinationType,
      destination_url: href,
    });

    // If there's a value, also track InitiateCheckout
    if (value && value > 0) {
      trackInitiateCheckout({
        content_name: productName,
        content_id: productId,
        value: value,
        currency: currency,
      });
    }

    // Continue with navigation (don't prevent default)
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
