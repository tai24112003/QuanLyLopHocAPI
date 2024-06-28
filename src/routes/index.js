const express = require('express');

const adminRouter = require('./admin');
const subject = require('./subject');
const chapter = require('./chapter');
const user = require('./user');
const question = require('./question');
const setting = require('./setting')
const computer = require('./computer')
const class_sessions = require('./class_session')
const session_computer = require('./session_computer')
const room = require('./room')
const asset = require('./asset');

function setRoute(server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/user', user);

    server.use('/api/subject', subject);

    server.use('/api/chapter', chapter);

    server.use('/api/question', question);
    server.use('/api/setting', setting);

    server.use('/api/computer', computer);

    server.use('/api/class_session', class_sessions);

    server.use('/api/session_computer', session_computer);

    server.use('/api/room', room);

    server.use('/api/upload', asset);

}

module.exports = setRoute;
