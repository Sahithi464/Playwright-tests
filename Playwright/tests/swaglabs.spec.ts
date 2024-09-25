import { test, expect } from '@playwright/test';

test.describe('Swag Labs Tests', () => {
  let page: any;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    // Navigate to the SauceDemo login page
    await page.goto('https://www.saucedemo.com/', { timeout: 60000 });

    // Log in to the application
    await page.fill('input#user-name', 'standard_user');
    await page.fill('input#password', 'secret_sauce');
    await page.click('input[type="submit"]');

    //Verify the page title

    const title = await page.title();
    console.log('Page Title:', title);
    expect(title).toBe('Swag Labs');

   
  });

test('Sorting order display for Z-A', async () => {

    await page.waitForSelector('.inventory_list');

    await page.selectOption('select[data-test="product-sort-container"]','za');

    await page.waitForTimeout(1000);

    const items = await page.locator('.inventory_item_name').allTextContents();

    const sortedItems = [...items].sort().reverse();

    expect(items).toEqual(sortedItems);

    console.log('Sorted items are ',items);

  
  });
  test('Price order high to low', async () => {
    await page.selectOption('select.product_sort_container', 'hilo');
    await page.waitForSelector('.inventory_item');
    const prices = await page.$$eval('.inventory_item_price', elements => 
      elements.map(el => parseFloat(el.textContent!.replace('$', '').trim()))
    );
    const sortedPrices = [...prices].sort((a, b) => b - a);
    
    expect(prices).toEqual(sortedPrices);

    console.log('Prices are', prices);


  });

  test('Add multiple items to cart and validate checkout', async () => {
    // Step 1: Add items to the cart
    const itemSelectors = [
      '.inventory_item:nth-child(1) .btn_inventory', // First item
      '.inventory_item:nth-child(2) .btn_inventory', // Second item
      '.inventory_item:nth-child(3) .btn_inventory'  // Third item
    ];

    for (const selector of itemSelectors) {
      await page.click(selector); // Click on "Add to cart" for each item
    }

    // Step 2: Navigate to the cart
    await page.click('.shopping_cart_link');
    await page.waitForSelector('.cart_list');

    // Step 3: Validate the items in the cart
    const cartItems = await page.locator('.cart_item .inventory_item_name').allTextContents();
    console.log('Items in cart:', cartItems);

    // Verify items in cart match those added
    const expectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']; // Update this array with actual item names
    expect(cartItems).toEqual(expectedItems);

    // Step 4: Proceed to checkout
    await page.click('#checkout');
    await page.waitForSelector('#first-name');
    
    // Fill out checkout information
    await page.fill('#first-name', 'Test');
    await page.fill('#last-name', 'User');
    await page.fill('#postal-code', '12345');
    await page.click('.submit-button');

    await page.click('#finish');


    // Step 5: Validate checkout completion
    await page.waitForSelector('.complete-header'); 
    const completionMessage = await page.textContent('.complete-header');
    expect(completionMessage).toContain('Thank you for your order!');
    console.log('Checkout completed successfully.');
  });


});
