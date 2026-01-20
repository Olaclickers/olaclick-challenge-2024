import { test, expect } from '@playwright/test';

test.describe('Orders Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display orders list', async ({ page }) => {
    // Wait for orders to load
    await page.waitForSelector('[data-testid="orders-list"]');
    
    // Check if orders are displayed
    const orderItems = await page.$$('[data-testid="order-item"]');
    expect(orderItems.length).toBeGreaterThan(0);
  });

  test('should create a new order', async ({ page }) => {
    await page.goto('/create-order');
    
    // Fill out order form
    await page.fill('[data-testid="customer-name"]', 'Test Customer');
    await page.fill('[data-testid="total-price"]', '50.00');
    await page.selectOption('[data-testid="order-status"]', 'initiated');
    
    await page.click('[data-testid="submit-order"]');
    
    // Verify order creation
    await page.waitForSelector('[data-testid="order-created-success"]');
  });
});