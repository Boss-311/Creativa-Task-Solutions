const AppDataSource = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {

    async register(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const userRepo = AppDataSource.getRepository("User");

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = userRepo.create({
                username,
                email,
                password: hashedPassword,
                role: "user"
            });

            await userRepo.save(user);
            return res.status(201).json({ message: "تم تسجيل الحساب بنجاح! تقدر تسجل دخول دلوقتي." });
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userRepo = AppDataSource.getRepository("User");
            
            const user = await userRepo.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: "البريد الإلكتروني غير مسجل!" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "كلمة المرور غير صحيحة!" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role }, 
                process.env.JWT_SECRET || "my_super_secret_key_123", 
                { expiresIn: "1d" }
            );

            return res.status(200).json({
                message: "تم تسجيل الدخول بنجاح!",
                token,
                user: { id: user.id, username: user.username, email: user.email }
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();