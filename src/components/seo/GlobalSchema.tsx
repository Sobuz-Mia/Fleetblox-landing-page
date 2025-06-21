"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { renderSchemaMarkup, buildSchemaData } from '@/utils/schema';

// Global Schema component that will handle schema markup across the site
export default function GlobalSchema() {
  const pathname = usePathname();
  const baseUrl = 'https://fleetblox.com';
  const url = `${baseUrl}${pathname}`;
  const isHomepage = pathname === '/';
  
  // Common schema data
  const websiteSchema = buildSchemaData({
    type: 'WebSite',
    url: baseUrl,
    title: 'FleetBlox - Advanced AI-Powered Fleet Management Solution',
    description: 'FleetBlox is an advanced AI-powered, cloud-based fleet connectivity solution that eliminates the need for traditional hardware.'
  });
  
  const organizationSchema = buildSchemaData({
    type: 'Organization',
    url: baseUrl
  });

  // Page-specific schema data
  let pageSpecificSchema = null;
  
  if (isHomepage) {
    pageSpecificSchema = buildSchemaData({
      type: 'Product',
      title: 'FleetBlox Fleet Management Solution',
      url: baseUrl
    });
  } else if (pathname?.startsWith('/products/')) {
    // Product pages
    const productName = pathname.split('/').pop()?.replace(/-/g, ' ') || '';
    pageSpecificSchema = buildSchemaData({
      type: 'Product',
      title: `FleetBlox ${productName} - Fleet Management Solution`,
      url: url
    });
  } else if (pathname?.startsWith('/solutions/')) {
    // Solution pages
    const solutionName = pathname.split('/').pop()?.replace(/-/g, ' ') || '';
    pageSpecificSchema = buildSchemaData({
      type: 'Product',
      title: `FleetBlox ${solutionName} Solution`,
      url: url
    });
  }
  
  // Add FAQ schema for pages that have FAQ sections
  const hasFAQs = pathname === '/' || pathname?.startsWith('/products/') || pathname === '/faq';
  const faqSchema = hasFAQs ? buildSchemaData({ type: 'FAQPage' }) : null;
  
  // Generate breadcrumbs data based on the current path
  let breadcrumbsSchema = null;
  if (pathname && pathname !== '/') {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
      const path = '/' + segments.slice(0, index + 1).join('/');
      const name = segment.replace(/-/g, ' ');
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        item: `${baseUrl}${path}`
      };
    });
    
    // Always add homepage as the first breadcrumb
    breadcrumbs.unshift({
      name: 'Home',
      item: baseUrl
    });
    
    breadcrumbsSchema = buildSchemaData({
      type: 'BreadcrumbList',
      breadcrumbs: breadcrumbs
    });
  }

  return (
    <>
      {renderSchemaMarkup(websiteSchema)}
      {renderSchemaMarkup(organizationSchema)}
      {pageSpecificSchema && renderSchemaMarkup(pageSpecificSchema)}
      {faqSchema && renderSchemaMarkup(faqSchema)}
      {breadcrumbsSchema && renderSchemaMarkup(breadcrumbsSchema)}
    </>
  );
}
