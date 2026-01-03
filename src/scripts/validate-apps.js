/**
 * Application Validator
 *
 * Run this script to check for common issues in your applications data.
 *
 * Usage: node src/scripts/validate-apps.js
 */

const fs = require('fs');
const path = require('path');

// Read and parse the applications file
function validateApplications() {
  console.log('🔍 Validating applications...\n');

  const appsPath = path.join(__dirname, '..', 'data', 'applications.ts');

  if (!fs.existsSync(appsPath)) {
    console.error('❌ Error: applications.ts not found!');
    process.exit(1);
  }

  const fileContent = fs.readFileSync(appsPath, 'utf8');

  // Extract the applications array using regex (simple parsing)
  const arrayMatch = fileContent.match(/export const applications.*?=\s*\[([\s\S]*)\];/);

  if (!arrayMatch) {
    console.error('❌ Error: Could not parse applications array!');
    process.exit(1);
  }

  let issues = [];
  let warnings = [];

  // Check for duplicate IDs
  const idPattern = /id:\s*['"]([^'"]+)['"]/g;
  const ids = [];
  let match;

  while ((match = idPattern.exec(fileContent)) !== null) {
    ids.push(match[1]);
  }

  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (duplicateIds.length > 0) {
    issues.push(`Duplicate IDs found: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  // Check for 'CHANGE_ME' IDs
  const changeMeIds = ids.filter(id => id === 'CHANGE_ME');
  if (changeMeIds.length > 0) {
    issues.push(`Found ${changeMeIds.length} app(s) with ID 'CHANGE_ME' - these need to be changed!`);
  }

  // Check for valid URLs
  const urlPattern = /url:\s*['"]([^'"]+)['"]/g;
  const urls = [];

  while ((match = urlPattern.exec(fileContent)) !== null) {
    urls.push(match[1]);
  }

  urls.forEach(url => {
    if (!url.match(/^(https?:\/\/|[a-z]+:\/\/)/i) && !url.startsWith('file:///')) {
      warnings.push(`Potentially invalid URL format: ${url}`);
    }
  });

  // Check for valid colors
  const colorPattern = /color:\s*['"]([^'"]+)['"]/g;
  const colors = [];

  while ((match = colorPattern.exec(fileContent)) !== null) {
    colors.push(match[1]);
  }

  colors.forEach(color => {
    if (!color.match(/^#[0-9a-fA-F]{6}$/)) {
      warnings.push(`Invalid color format (should be hex like #6366f1): ${color}`);
    }
  });

  // Check for valid types
  const validTypes = [
    'productivity',
    'development',
    'design',
    'communication',
    'media',
    'utility',
    'database',
    'analytics'
  ];

  const typePattern = /type:\s*['"]([^'"]+)['"]/g;
  const types = [];

  while ((match = typePattern.exec(fileContent)) !== null) {
    types.push(match[1]);
  }

  types.forEach(type => {
    if (!validTypes.includes(type)) {
      issues.push(`Invalid type: ${type}. Valid types are: ${validTypes.join(', ')}`);
    }
  });

  // Print results
  console.log(`📊 Found ${ids.length} applications\n`);

  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ All validations passed! Your applications look good.\n');
  } else {
    if (issues.length > 0) {
      console.log('❌ ISSUES FOUND:\n');
      issues.forEach((issue, i) => {
        console.log(`  ${i + 1}. ${issue}`);
      });
      console.log('');
    }

    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS:\n');
      warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
      console.log('');
    }
  }

  // Summary
  console.log('📈 SUMMARY:');
  console.log(`  Total apps: ${ids.length}`);
  console.log(`  Unique IDs: ${new Set(ids).size}`);
  console.log(`  Issues: ${issues.length}`);
  console.log(`  Warnings: ${warnings.length}`);
  console.log('');

  if (issues.length > 0) {
    console.log('⚠️  Please fix the issues above before deploying.\n');
    process.exit(1);
  }
}

validateApplications();
