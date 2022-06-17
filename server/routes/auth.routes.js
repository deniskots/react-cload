const Router = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult, check} = require('express-validator');
const router = new Router;
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File');





/*достаем пароль и эмейл с боди реквест
* сравниваем емайл и если он совпадает возращаем статус и говорим что уже такой есть
* иначе создаем новый,хешируем пароль и сохраняем*/

router.post('/registration',
    [
        check('email').isEmail(),
        check('password').isLength({min: 3, max: 8})
    ],
    async (req, res) => {
        try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: 'Uncorrect request', errors})
        }
        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({message: 'User with this email ${email} already exist'})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword})
        await user.save()
        await fileService.createDir(new File({user:user.id, name: ''}))
        return res.json({message: 'User was created'})
    } catch (e) {
        console.log(e)
        res.send({message: 'Server error'})
    }

}
);

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: 'User is not found'})
            }

            //cравнение закодированого и обычного пароля
            const isPassValid = bcrypt.compareSync(password, user.password);
            if(!isPassValid) {
                return res.status(400).json({message: 'Invalid password'});
            }
            //создаем обьект с помощ.функции(где 1 параметр- обьект с данными который хотим поместить в токен,
            // 2- секретный ключ для щифрования токена
            // 3- обьект- время существ токена
            //и после создания отправлякм обратно на кдлиент
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
                }
            )
        } catch (e) {
            console.log(e)

            res.send({message: 'Server error'})
        }

    }
);

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            //получаем юзера по айдт который достаем из токена
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: "1h"})
            return res.json({
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        password: user.password,
                        diskSpace: user.diskSpace,
                        usedSpace: user.usedSpace,
                        avatar: user.avatar,
                    }
                })

        } catch (e) {
            res.send({message: 'Server error'})
        }

    }
);
module.exports = router;