import deepFreeze from 'deep-freeze';
import newAccount from '../../app/assets/javascripts/reducers/new_account';
import {
SET_NEW_ACCOUNT_EMAIL,
SET_NEW_ACCOUNT_USERNAME,
NEW_ACCOUNT_VALIDATING_USERNAME,
NEW_ACCOUNT_USERNAME_VALID,
NEW_ACCOUNT_USERNAME_INVALID,
NEW_ACCOUNT_REQUEST_SUBMITTED
 } from '../../app/assets/javascripts/constants';
import '../testHelper';


describe('new_accounts reducer', () => {
    test('returns initial state when no action or state is provided', () => {
        const newState = newAccount(undefined, { type: null });
        expect(newState.username).toBe('');
        expect(newState.email).toBe('');
    });

    test('set new Account email and verify the validity of the email when SET_NEW_ACCOUNT_EMAIL is dispatched', () => {
        const initialState = { username: '', email: '', emailValid: false };
        deepFreeze(initialState);
             const mockedAction = {
                 type: SET_NEW_ACCOUNT_EMAIL,
                 email: 'formasit@gmail.com'
             };
             const newState = newAccount(initialState, mockedAction);
             expect(newState.email).toEqual('formasit@gmail.com');
             expect(newState.emailValid).toBe(true);
     });

    test('Ensure email is valid', () => {
        const initialState = { username: '', email: '', emailValid: false };
        deepFreeze(initialState);
             const mockedAction = {
                 type: SET_NEW_ACCOUNT_EMAIL,
                 email: 'formasitgmail.com'
             };
             const newState = newAccount(initialState, mockedAction);
             expect(newState.email).toEqual('formasitgmail.com');
             expect(newState.emailValid).not.toBe(true);
     });

     test('set new Account username when SET_NEW_ACCOUNT_USERNAME is dispatched', () => {
        const initialState = { username: '', email: '', emailValid: false };
        deepFreeze(initialState);
        const mockedAction = {
            type: SET_NEW_ACCOUNT_USERNAME,
            username: 'Daniel Martin'
        };
        const newState = newAccount(initialState, mockedAction);
        expect(newState.username).toEqual('Daniel Martin');
        expect(newState.usernameValid).toBeUndefined();
     });
     test('validate new username when NEW_ACCOUNT_VALIDATING_USERNAME is dispatched', () => {
        const initialState = { username: 'Daniel Martin', email: 'daniel@mail.gm', emailValid: false };
        deepFreeze(initialState);
        let mockedAction = {
            type: NEW_ACCOUNT_VALIDATING_USERNAME,
        };
        let newState = newAccount(initialState, mockedAction);
        expect(newState.checking).toBe(true);
        expect(newState.error).toBeUndefined();

        deepFreeze(newState);
        mockedAction = {
            type: NEW_ACCOUNT_USERNAME_VALID,
        };

        newState = newAccount(initialState, mockedAction);
        expect(newState.checking).toBe(false);
        expect(newState.usernameValid).toBe(true);
     });

     test(' set error message for invalid username when NEW_ACCOUNT_USERNAME_INVALID is dispatched', () => {
        const initialState = { username: '', email: 'daniel@mail.gm', emailValid: false };
        deepFreeze(initialState);
        const mockedAction = {
            type: NEW_ACCOUNT_USERNAME_INVALID,
            error: 'Invalid Username'
        };

        const newState = newAccount(initialState, mockedAction);
        expect(newState.submitted).toBe(true);
     });

     test(' submit new account when NEW_ACCOUNT_REQUEST_SUBMITTED is dispatched', () => {
        const initialState = { username: 'Daniel Martin', email: 'daniel@mail.gm', emailValid: false };
        deepFreeze(initialState);
        const mockedAction = {
            type: NEW_ACCOUNT_REQUEST_SUBMITTED,
        };
        const newState = newAccount(initialState, mockedAction);
        expect(newState.submitted).toBe(true);
     });
});
