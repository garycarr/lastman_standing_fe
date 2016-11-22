import LoginView from '../../javascript/views/login';
import { LOGIN } from '../../javascript/common/strings';
import $ from 'jquery';

describe('Login view test', function () {

    beforeEach(function () {
        this.server = sinon.fakeServer.create({
            useFakeServer: true
        });
        // this.server.autoRespond = true;
    });

    afterEach(function () {
        this.server.restore();
    });

    it('should find elements on page', function () {
        let loginView = new LoginView();
        loginView.render();
        expect(loginView.el.tagName.toLowerCase()).toBe('div');
        expect(loginView.$el.find('label[for=username]').text()).toBe(LOGIN.USERNAME);
        expect(loginView.$el.find('label[for=password]').text()).toBe(LOGIN.PASSWORD);
    });

    it('should fail validation for login', function () {
        let loginView = new LoginView();
        loginView.render();
        let spyPostLogin = sinon.spy(loginView, 'postLogin');

        loginView.$el.find('#username').val('John');
        loginView.$el.find('#password').val('a'); // Password too short
        loginView.$el.find('#login-submit').click();
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

    it('Save new model to server', function () {
        let id = '12b',
            loginView = new LoginView(),
            password = 'abcdef',
            upperCaseUsername = 'John',
            lowerCaseUsername = 'john';

        this.server.respondWith('POST', 'api/book/',
            [200, { 'Content-Type': 'application/json' },
                `{ "id": "${id}" }`]);

        loginView.render();

        let ajaxSpy = sinon.spy($, 'ajax');
        loginView.postLogin({ username: upperCaseUsername, password: password });

        expect(ajaxSpy.calledOnce).toBe(true);
        expect(ajaxSpy.getCall(0).args[0].type).toBe('POST');
        expect(ajaxSpy.getCall(0).args[0].contentType).toBe('application/json');
        expect(ajaxSpy.getCall(0).args[0].dataType).toBe('json');
        expect(ajaxSpy.getCall(0).args[0].url).toBe('api/user/');
        let data = JSON.parse(ajaxSpy.getCall(0).args[0].data);
        expect(data.username).toBe(lowerCaseUsername);
        expect(data.password).toBe(password);
    });
});
