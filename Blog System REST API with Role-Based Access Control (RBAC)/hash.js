const bcrypt = require("bcryptjs");

const password1 = "123456";
const password2 = "password123";

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePasswords(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

// Example usage
(async () => {
    const hashed1 = await hashPassword(password1);
    console.log(`Hashed password for "${password1}":`, hashed1);

    const hashed2 = await hashPassword(password2);
    console.log(`Hashed password for "${password2}":`, hashed2);

    const isMatch1 = await comparePasswords(password1, hashed1);
    console.log(`Does "${password1}" match its hash?`, isMatch1);

    const isMatch2 = await comparePasswords(password2, hashed2);
    console.log(`Does "${password2}" match its hash?`, isMatch2);
})();
