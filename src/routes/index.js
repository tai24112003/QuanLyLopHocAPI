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
const Choice = require('./choice');
const commonContent = require('./common_content');
const Class = require('./class');
const class_subject = require('./class_subject');
const class_student = require('./class_student');
const student = require('./student');

function setRoute(server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/user', user);

    server.use('/api/subject', subject);

    server.use('/api/chapter', chapter);

    server.use('/api/question', question);

    server.use('/api/common-content', commonContent);

    server.use('/api/choice', Choice);

    server.use('/api/setting', setting);

    server.use('/api/computer', computer);

    server.use('/api/class_session', class_sessions);

    server.use('/api/session_computer', session_computer);

    server.use('/api/room', room);

    server.use('/api/upload', asset);

    server.use('/api/class', Class);

    server.use('/api/student', student);

    server.use('/api/class_subject', class_subject);

    server.use('/api/class_student', class_student);



}

module.exports = setRoute;
