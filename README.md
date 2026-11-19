# Nilo — online clothing store

A mobile-friendly bilingual (Arabic/English) clothing storefront for Egypt. It includes a sample unisex collection, product search and category filters, a persistent shopping bag, and a checkout form for cash-on-delivery orders.

## Run locally

This is a static website with no build step. Open `index.html` in a browser, or serve this folder with any static web server (for example, `python -m http.server 8000`).

## Current demo behavior

- Arabic RTL is the default; use the **EN** button to switch to English/LTR.
- Product and cart data are demo content. The cart is saved in browser local storage.
- Checkout records a demo order in that browser's local storage and shows a confirmation. It does **not** send an order to a store owner, arrange delivery, or process payment.
- Product photography is loaded from Unsplash; Google Fonts are loaded from Google Fonts.

## Before taking real orders

Replace the sample products, prices, photos, and size/color choices with your actual inventory. Connect checkout to a secure backend or a store platform, set up order notifications and delivery pricing, and test privacy, consent, and phone-number handling. Do not collect real customer orders using this static demo until that connection is in place.
