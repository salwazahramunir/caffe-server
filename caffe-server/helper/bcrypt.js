let bcrypt = require('bcryptjs');

function hashPasswod(password) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePasswod(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashPasswod,
    comparePasswod
}