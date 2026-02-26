import { test, expect } from '@playwright/test';

test('Nightstand flow verification', async ({ page }) => {
  // 1. The user is lying in bed at 11:45 PM... (Context setup, we just go to the page)
  await page.goto('/rest');

  // Verify initial state
  await expect(page.getByText('What is keeping you awake?')).toBeVisible();
  
  // 3. In the single input field, the user types...
  const input = page.getByPlaceholder('Type your burden here...');
  await expect(input).toBeVisible();
  await input.fill('Send the Q3 projection PDF to Sarah first thing, and apologize for the delay.');

  // 4. The user taps the "Rest" action.
  // We can press Enter or click the text. Let's click the text to be explicit about "tapping".
  await page.getByText('Press Enter to rest').click();

  // 5. The text visually seals itself away into the drawer...
  // Verify the input is no longer visible (or fading out) and success message appears.
  // We wait for the success message.
  await expect(page.getByText('Your thought is secure. Rest now.')).toBeVisible({ timeout: 10000 });
  await expect(input).not.toBeVisible();

  // 6. Relieved... 7. At 9:00 AM... (We stop here as per instructions for visual verification)

  // Capture screenshot
  await page.screenshot({ path: 'evidence.png' });
});
