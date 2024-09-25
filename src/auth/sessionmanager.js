// var merge = require('utils-merge');
import * as merge from 'utils-merge';

class SessionManager {
    constructor(options, serializeUser) {
        if (typeof options == 'function') {
            serializeUser = options;
            options = undefined;
        }
        options = options || {};

        this._key = options.key || 'passport';
        this._serializeUser = serializeUser;
    }

    
    logIn(req, user, options, cb) {
        if (typeof options == 'function') {
            cb = options;
            options = {};
        }
        options = options || {};

        if (!req.session) { return cb(new Error('Login sessions require session support. Did you forget to use `express-session` middleware?')); }

        var self = this;
        var prevSession = req.session;

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(
            function (err) {
                if (err) {
                    return cb(err);
                }

                self._serializeUser(user, req, function (err, obj) {
                    if (err) {
                        return cb(err);
                    }
                    if (options.keepSessionInfo) {
                        merge(req.session, prevSession);
                    }
                    if (!req.session[self._key]) {
                        req.session[self._key] = {};
                    }
                    // store user information in session, typically a user id
                    req.session[self._key].user = obj;
                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                        if (err) {
                            return cb(err);
                        }
                        cb();
                    });
                });
            }
        );
    }
    logOut(req, options, cb) {
    }
}




module.exports = SessionManager;