const ValidatePassword = ({password}) => {
if(!password) return false;

// Minimum 8 characters
// At least one uppercase letter
// At least one lowercase letter
// At least one digit
// At least one special character

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;
return passwordRegex.test(password);
}
module.exports = ValidatePassword;