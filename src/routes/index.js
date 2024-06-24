const express = require('express');

const adminRouter = require('./admin');
const customerRouter = require('./customer');
const colourRouter = require('./colour');
const sizeRouter = require('./size');
const categoryRouter = require('./category');
const productRouter = require('./product');
const product_variantRouter = require('./product_variant');
const order = require('./order');
const feedback = require('./feedback');
const subject = require('./subject');
const chapter = require('./chapter');
const user = require('./user');

function setRoute(server) {

    server.use('/api/admin', adminRouter);

    server.use('/api/user', user);

    server.use('/api/customer', customerRouter);

    server.use('/api/colour', colourRouter);

    server.use('/api/size', sizeRouter);

    server.use('/api/category', categoryRouter);

    server.use('/api/product', productRouter);

    server.use('/api/product-variant', product_variantRouter);

    server.use('/api/order', order);

    server.use('/api/feedback', feedback);
    
    server.use('/api/subject', subject);

    server.use('/api/chapter', chapter);



}

module.exports = setRoute;
