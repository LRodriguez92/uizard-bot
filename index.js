const {By, Key, Builder} = require('selenium-webdriver');

// create a function that goes to tempmail.email, clicks the button with the id of "js-btn-deleteEmail", and returns the email address text from the class "email-block__genEmail"
async function getEmailAddress() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://tempmail.email');
    // add delay to allow page to load
    await driver.sleep(3000);
    let emailAddress = await driver.findElement(By.className('email-block__genEmail')).getText();
    submitEmail(emailAddress);
    // closes window
    await driver.close();
}

// create a function that takes an email as a paramater, goes to https://uizard.io/autodesigner/e4150d96, pastes the email into the input field with the type of "email", and clicks the button with the type of "submit" 
async function submitEmail(email) {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://uizard.io/autodesigner/e4150d96');
    await driver.sleep(3000);
    await driver.findElement(By.className('sc-19mtrt6-0')).sendKeys(email);
    await driver.findElement(By.className('diPyXh')).click();
    await driver.sleep(5000);
    // quits program
    await driver.quit();
}


// create a function that calls the getEmailAddress function every 10 seconds until it runs 10 times
let counter = 0;
let interval = setInterval(function() {
    getEmailAddress();
    counter++;
    if (counter === 1178) {
        clearInterval(interval);
    }
}, 10000);
