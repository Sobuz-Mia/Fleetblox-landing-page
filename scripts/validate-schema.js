#!/usr/bin/env node

/**
 * Schema.org Validator Script
 * 
 * This script helps validate the Schema.org implementation across pages.
 * It can be run with:
 * 
 * node scripts/validate-schema.js
 */

import https from 'https';

// List of pages to validate
const pagesToValidate = [
  '/', 
  '/products/documents-management',
  '/solutions/remote-scalability',
  '/industries/auto-dealerships'
];

const baseUrl = 'https://fleetblox.com';

function extractSchemaFromHtml(html) {
  const schemaRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  const schemas = [];
  
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const schema = JSON.parse(match[1]);
      schemas.push(schema);
    } catch (e) {
      console.error('Error parsing schema:', e);
    }
  }
  
  return schemas;
}

function validateSchemaForPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const schemas = extractSchemaFromHtml(data);
        resolve({ url, schemas, statusCode: response.statusCode });
      });
      
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function validateAllPages() {
  console.log('🔍 Validating Schema.org implementation across FleetBlox pages...\n');
  
  const results = [];
  
  for (const page of pagesToValidate) {
    const pageUrl = `${baseUrl}${page}`;
    try {
      console.log(`Checking ${pageUrl}...`);
      const result = await validateSchemaForPage(pageUrl);
      results.push(result);
      
      console.log(`✅ Found ${result.schemas.length} schema objects`);
      result.schemas.forEach((schema, index) => {
        console.log(`  - Schema ${index + 1}: ${schema['@type']}`);
      });
      console.log('');
      
    } catch (error) {
      console.error(`❌ Error validating ${pageUrl}:`, error.message);
    }
  }
  
  console.log('\n📊 Schema.org Implementation Summary:');
  results.forEach(result => {
    console.log(`${result.url}: ${result.schemas.length} schemas`);
  });
  
  console.log('\n💡 To fully validate your schema, use these online tools:');
  console.log('- Google Rich Results Test: https://search.google.com/test/rich-results');
  console.log('- Schema.org Validator: https://validator.schema.org/');
}

validateAllPages().catch(console.error);
