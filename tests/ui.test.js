const { expect, test } = require('playwright/test');


test('Verify "All Books" link is visible', async ({page}) => {

    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login" button is visible', async ({page}) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const loginButtonIsVisible = await loginButton.isVisible();
    expect(loginButtonIsVisible).toBe(true);
});

test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterVisible = await registerButton.isVisible();
    expect(isRegisterVisible).toBeTruthy();
  });
  
test('Verify "All Books" link is visible for logged-in users', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isBooksVisible = await allBooksLink.isVisible();
    expect(isBooksVisible).toBe(true);
});

test('Verify "My Books" button is visible for logged-in users', async ({ page }) => {
    // Navigate to the login page and perform login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
    // Wait for the "My Books" link to be available
    const myBooksLink = await page.$('a[href="/profile"]');
    
    // Check visibility of "My Books" link after login
    const isMyBooksVisible = await myBooksLink.isVisible();
    
    // Assertion to verify visibility of "My Books" link
    expect(isMyBooksVisible).toBe(true);
});


test('Verify "Add Book" link is visible for logged-in users', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    

    const addBookLink = await page.$('a[href="/create"]');
    const isAddBookVisible = await addBookLink.isVisible();

    expect(isAddBookVisible).toBe(true);
});
  

test('Verify user\'s email address is visible for logged-in users', async ({ page }) => {
    // Navigate to the login page and perform login
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    
    // Check visibility of user's email address after login
    
    const userEmail = await page.$('#user');
    const isUserEmailVisible = await userEmail.isVisible();
    
    // Assertion to verify visibility of the user's email address
    expect(isUserEmailVisible).toBe(true);
});
  

test('Submit form with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login'); // Change this URL to the expected landing page after successful login
 
});


test('Submit form with empty input fields', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login'); //

});


test('Submit form with empty email input field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Email is required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});
  
test('Submit form with empty password input field', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog =>{
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Password is required!');
        await dialog.accept();
    });

    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login');
});

// test('Submit form with valid credentials for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="email"]', 'newemail@example.com');
//     await page.fill('input[name="password"]', 'newpassword');
//     await page.fill('input[name="confirmPassword"]', 'newpassword');
//     await page.click('input[type="submit"]');
//     await page.waitForNavigation(); // Assuming successful registration redirects to a new page
//     expect(page.url()).toBe('http://localhost:3000/redirectAfterRegistration'); // Change to the expected redirection URL after successful registration
// });
  
// test('Submit form with empty input fields for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.click('input[type="submit"]');
//     const dialog = await page.waitForEvent('dialog');
//     expect(dialog.type()).toContain('alert');
//     expect(dialog.message()).toContain('All fields are required!');
//     await dialog.accept();
//     expect(page.url()).toBe('http://localhost:3000/register');
//   });
  
// test('Submit form with empty email input field for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="password"]', 'validPassword');
//     await page.fill('input[name="confirmPassword"]', 'validPassword');
//     await page.click('input[type="submit"]');
//     const dialog = await page.waitForEvent('dialog');
//     expect(dialog.type()).toContain('alert');
//     expect(dialog.message()).toContain('Email is required!');
//     await dialog.accept();
//     expect(page.url()).toBe('http://localhost:3000/register');
//   });
  
//   test('Submit form with empty password input field for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="email"]', 'validEmail@example.com');
//     await page.click('input[type="submit"]');
//     const dialog = await page.waitForEvent('dialog');
//     expect(dialog.type()).toContain('alert');
//     expect(dialog.message()).toContain('Password is required!');
//     await dialog.accept();
//     expect(page.url()).toBe('http://localhost:3000/register');
//   });

//   test('Submit form with empty confirm password input field for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="email"]', 'validEmail@example.com');
//     await page.fill('input[name="password"]', 'validPassword');
//     await page.click('input[type="submit"]');
//     const dialog = await page.waitForEvent('dialog');
//     expect(dialog.type()).toContain('alert');
//     expect(dialog.message()).toContain('Confirm password is required!');
//     await dialog.accept();
//     expect(page.url()).toBe('http://localhost:3000/register');
//   });

  
//   test('Submit form with different passwords for registration', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="email"]', 'validEmail@example.com');
//     await page.fill('input[name="password"]', 'password1');
//     await page.fill('input[name="confirmPassword"]', 'password2');
//     await page.click('input[type="submit"]');
//     const dialog = await page.waitForEvent('dialog');
//     expect(dialog.type()).toContain('alert');
//     expect(dialog.message()).toContain('Passwords do not match!');
//     await dialog.accept();
//     expect(page.url()).toBe('http://localhost:3000/register');
//   });

  
