import { test, expect } from '@playwright/test';

test.describe('Nightstand App', () => {

  test('User Flow: Type thought and rest', async ({ page }) => {
    await page.goto('/rest');

    // Wait for initial animation to complete
    await page.waitForTimeout(2000); 

    // Verify key elements are visible with high contrast
    const heading = page.getByText('What is keeping you awake?');
    await expect(heading).toBeVisible();
    
    // Check input visibility using data-testid
    const input = page.getByTestId('thought-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type your burden here...');

    // Take screenshot of initial state to verify visibility
    await page.screenshot({ path: 'initial_state.png' });

    // Type thought
    await input.fill('Send the Q3 projection PDF to Sarah first thing, and apologize for the delay.');

    // Click rest button
    const restButton = page.getByTestId('rest-button');
    await expect(restButton).toBeVisible();
    await restButton.click();

    // Verify success state appears
    const successMessage = page.getByTestId('success-message');
    await expect(successMessage).toBeVisible({ timeout: 10000 });
    
    // Wait for success animation to settle
    await page.waitForTimeout(2000);
    
    // Verify input is gone
    await expect(input).not.toBeVisible();

    await page.screenshot({ path: 'evidence.png' });
  });

  test('Deep Link: Load with rested state', async ({ page }) => {
    // Test deep linking capability
    await page.goto('/rest?state=rested');
    
    // Wait for animation
    await page.waitForTimeout(2000);

    // Verify success message is visible immediately
    const successMessage = page.getByTestId('success-message');
    await expect(successMessage).toBeVisible();
    
    // Verify input is NOT visible
    const input = page.getByTestId('thought-input');
    await expect(input).not.toBeVisible();
    
    await page.screenshot({ path: 'deep_link_state.png' });
  });
});
