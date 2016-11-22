import Users from '../../javascript/models/users';
import { USER } from '../../javascript/common/constants';

function generateString (length) {
    let string = '';
    while (string.length < length) {
        string += 'a';
    }
    return string;
}

describe('Users model test', function () {

    it('Create users model and validate input', function () {
        let user = new Users();
        expect(user.get('username')).toBe('');
        expect(user.get('password')).toBe('');

        expect(user.isValid(true)).toBe(false);

        user.set('username', generateString(USER.USERNAME_MIN));
        // Still false without a password
        expect(user.isValid(true)).toBe(false);

        user.set('password', generateString(USER.PASSWORD_MIN));
        // Now okay
        expect(user.isValid(true)).toBe(true);

        // Test boundaries
        // Username
        user.set('username', generateString(USER.USERNAME_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', generateString(USER.USERNAME_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', generateString(USER.USERNAME_MAX));
        expect(user.isValid(true)).toBe(true);

        // Password
        user.set('password', generateString(USER.PASSWORD_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('password', generateString(USER.PASSWORD_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        // Okay again
        user.set('password', generateString(USER.PASSWORD_MAX));
        expect(user.isValid(true)).toBe(true);
    });

    it('should test url', function () {
        let id = 'abc123',
            user = new Users();
        expect(user.url()).toBe('api/user/');
        user.set('id', id);
        expect(user.url()).toBe(`api/user/${id}`);
    });

});
