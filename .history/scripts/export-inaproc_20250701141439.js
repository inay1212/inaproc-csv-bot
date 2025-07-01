// scripts/export-inaproc.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://data-pdn.inaproc.id/public/page/id/888', { waitUntil: 'networkidle' });

  // Tunggu dropdown tahun muncul, lalu pilih "2024"
  await page.waitForSelector('#select2-year-container');
  await page.click('#select2-year-container');
  await page.click('li.select2-results__option:has-text("2024")');

  // Tunggu tombol export muncul
  await page.waitForTimeout(2000);
  await page.click('button:has-text("Export")');

  // Tunggu file terdownload (harus aktifkan download folder)
  const download = await page.waitForEvent('download');
  const filePath = path.join('downloads', 'inaproc_2024.csv');
  await download.saveAs(filePath);

  console.log(`CSV saved to ${filePath}`);
  await browser.close();
})();
