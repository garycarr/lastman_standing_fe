import LoginView from '../../javascript/views/login';
import { LOGIN } from '../../javascript/common/strings';
import { USER } from '../../javascript/common/constants';
import Commmon from '../common';
import $ from 'jquery';

describe('Login view test', function () {

    beforeEach(function () {
        this.server = sinon.fakeServer.create({
            useFakeServer: true
        });
    });

    afterEach(function () {
        this.server.restore();
    });

    it('should find elements on page', function () {
        let loginView = new LoginView();
        loginView.render();
        expect(loginView.el.tagName.toLowerCase()).toBe('div');
        expect(loginView.$el.find('label[data-label-username]').text()).toBe(LOGIN.USERNAME);
        expect(loginView.$el.find('label[data-label-password]').text()).toBe(LOGIN.PASSWORD);
    });

    it('should fail validation for login', function () {
        let loginView = new LoginView();
        loginView.render();
        let spyPostLogin = sinon.spy(loginView, 'postLogin');

        // Initially the error messages should be hidden
        expect(loginView.$el.find('label[data-error-username]').attr('hidden')).toBe('hidden');
        expect(loginView.$el.find('label[data-error-password]').attr('hidden')).toBe('hidden');

        loginView.$el.find('#username').val(Commmon.generateString(USER.USERNAME_MIN));
        loginView.$el.find('#password').val(Commmon.generateString(USER.PASSWORD_MIN - 1)); // Password too short
        loginView.$el.find('#login-submit').click();

        expect(loginView.$el.find('label[data-error-password]').attr('hidden')).toBe(undefined);
        expect(loginView.$el.find('label[data-error-username]').attr('hidden')).toBe('hidden');
        expect(spyPostLogin.calledOnce).toBe(false);

        loginView.$el.find('#username').val(Commmon.generateString(USER.USERNAME_MIN - 1)); // username too short
        loginView.$el.find('#password').val(Commmon.generateString(USER.PASSWORD_MIN));
        loginView.$el.find('#login-submit').click();
        expect(loginView.$el.find('label[data-error-username]').attr('hidden')).toBe(undefined);
        expect(loginView.$el.find('label[data-error-password]').attr('hidden')).toBe('hidden');
        expect(spyPostLogin.calledOnce).toBe(false);

    });

    it('should pass validation for login and make a request', function () {
        let loginView = new LoginView(),
            password = 'abcdef',
            username = 'john';

        loginView.render();

        let stub = sinon.stub(loginView, 'postLogin', function () {});

        loginView.$el.find('#username').val(username);
        loginView.$el.find('#password').val(password); // Password too short
        loginView.$el.find('#login-submit').click();

        stub.restore();
        sinon.assert.calledOnce(stub);
        sinon.assert.calledWith(stub, { username:username, password:password });
    });

    it('should successfully login', function () {
        let id = '12b',
            loginView = new LoginView(),
            lowerCaseUsername = 'john',
            password = 'abcdef',
            upperCaseUsername = 'John';

        this.server.respondWith('POST', LOGIN.URL,
            [200, { 'Content-Type': 'application/json' },
                `{ "id": "${id}" }`]);

        loginView.render();

        let ajaxSpy = sinon.spy($, 'ajax');
        loginView.postLogin({ username: upperCaseUsername, password: password }, false);

        expect(ajaxSpy.calledOnce).toBe(true);
        expect(ajaxSpy.getCall(0).args[0].type).toBe('POST');
        expect(ajaxSpy.getCall(0).args[0].contentType).toBe('application/json');
        expect(ajaxSpy.getCall(0).args[0].dataType).toBe('json');
        expect(ajaxSpy.getCall(0).args[0].url).toBe(LOGIN.URL);
        let data = JSON.parse(ajaxSpy.getCall(0).args[0].data);
        expect(data.username).toBe(lowerCaseUsername);
        expect(data.password).toBe(password);
        ajaxSpy.restore();
        // TODO - actions after login
    });

    it('should fail to login', function () {
        let loginView = new LoginView(),
            password = 'wrong pass',
            username = 'john';

        this.server.respondWith('POST', LOGIN.URL,
            [404, { 'Content-Type': 'application/json' },
                '']);

        loginView.render();
        expect(loginView.$el.find('label[data-error-login]').attr('hidden')).toBe('hidden');
        let ajaxSpy = sinon.spy($, 'ajax');

        loginView.postLogin({ username: username, password: password }, false);

        expect(ajaxSpy.calledOnce).toBe(true);

        // Check login fail actions
        expect(loginView.$el.find('label[data-error-login]').attr('hidden')).toBe(undefined);

        ajaxSpy.restore();
    });
});
