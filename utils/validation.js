'use strict'

module.exports = {
      emailIsValid: function (email) {
        return /^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      },
      passwordIsValid: function (password) {
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
      },
      PhonenumberValidate: function (phone) {
        return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
      }
}