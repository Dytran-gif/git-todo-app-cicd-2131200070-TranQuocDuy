const { test, expect, _electron: electron } = require('@playwright/test');
const path = require('path');

test('Core user workflow - add, complete, delete todo', async () => {
    // Launch Electron app
    const app = await electron.launch({
        args: [path.join(__dirname, '../../main.js')]
    });

    const window = await app.firstWindow();
    await window.waitForLoadState('domcontentloaded');

    // --- ADD todo ---
    await window.fill('#todo-input', 'Test E2E item');
    await window.click('#add-todo-btn');

    // Verify item appears in list
    const todoItem = window.locator('.todo-item').first();
    await expect(todoItem).toBeVisible();
    await expect(todoItem.locator('.todo-text')).toHaveText('Test E2E item');

    // --- TOGGLE complete ---
    await todoItem.locator('input[type="checkbox"]').click();
    await expect(todoItem).toHaveClass(/completed/);

    // --- DELETE item ---
    // Hover để delete button hiện ra
    await todoItem.hover();
    await todoItem.locator('.delete-btn').click();

    // Verify item removed
    await expect(window.locator('.todo-item')).toHaveCount(0);

    await app.close();
});