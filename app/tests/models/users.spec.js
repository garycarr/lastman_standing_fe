import Users from '../../javascript/models/users';
import { USER } from '../../javascript/common/constants';
import Commmon from '../common';

describe('Users model test', function () {

    it('Create users model and validate input', function () {
        let user = new Users();
        expect(user.get('username')).toBe('');
        expect(user.get('password')).toBe('');

        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER.USERNAME_MIN));
        // Still false without a password
        expect(user.isValid(true)).toBe(false);

        user.set('password', Commmon.generateString(USER.PASSWORD_MIN));
        // Now okay
        expect(user.isValid(true)).toBe(true);

        // Test boundaries
        // Username
        user.set('username', Commmon.generateString(USER.USERNAME_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER.USERNAME_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        user.set('username', Commmon.generateString(USER.USERNAME_MAX));
        expect(user.isValid(true)).toBe(true);

        // Password
        user.set('password', Commmon.generateString(USER.PASSWORD_MIN - 1));
        expect(user.isValid(true)).toBe(false);

        user.set('password', Commmon.generateString(USER.PASSWORD_MAX + 1));
        expect(user.isValid(true)).toBe(false);

        // Okay again
        user.set('password', Commmon.generateString(USER.PASSWORD_MAX));
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
