//при откртии приложения что бы получали данные об пользователе

const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next();
    }
    try {
        //токен из заголовка авторизатион и отделим токен
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: 'Auth error'})
        }
        //раскадируем токен и получаем все данные
        const decoded = jwt.verify(token, config.get('secretKey'))
        //данные из токена
        req.user = decoded
        next();
    }catch (e) {
        return res.status(401).json({message: 'Auth error'})
    }
};