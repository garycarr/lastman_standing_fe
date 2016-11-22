import Users from '../../javascript/models/login';
import { USER_CONSTANTS } from '../../javascript/common/constants';
import { LOGIN_STRINGS } from '../../javascript/common/strings';
import Commmon from '../common';

describe('Login model test', function () {

    it('Create login model and validate input', function () {
        let user = new Users();
        expect(user.get('username')).toBe('');
        expect(user.get('password')).toBe('');

        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER_CONSTANTS.USERNAME_MIN));
        // Still false without a password
        expect(user.isValid(true)).toBe(false);

        user.set('password', Commmon.generateString(USER_CONSTANTS.PASSWORD_MIN));
        // Now okay
        expect(user.isValid(true)).toBe(true);

        // Test boundaries
        // Username
        user.set('username', Commmon.generateString(USER_CONSTANTS.USERNAME_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER_CONSTANTS.USERNAME_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER_CONSTANTS.USERNAME_MAX));
        expect(user.isValid(true)).toBe(true);

        // Password
        user.set('password', Commmon.generateString(USER_CONSTANTS.PASSWORD_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('password', Commmon.generateString(USER_CONSTANTS.PASSWORD_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        // Okay again
        user.set('password', Commmon.generateString(USER_CONSTANTS.PASSWORD_MAX));
        expect(user.isValid(true)).toBe(true);
    });

    it('should test url', function () {
        let id = 'abc123',
            user = new Users();
        expect(user.url()).toBe(LOGIN_STRINGS.URL);
        user.set('id', id);
        expect(user.url()).toBe(`${LOGIN_STRINGS.URL}${id}`);
    });

});
