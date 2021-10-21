let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Business Contact model and sort by name
let BusinessContact = require('../models/business-contact');

module.exports.displayContactList = (req, res, next) => {
    BusinessContact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('business-contact/list', {title: 'Business Contact List', ContactList: contactList, displayName: req.user ? req.user.displayName : ''});
        }
    }).sort({"name":1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('business-contact/add', {title: 'Add New Contact', displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = BusinessContact({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.create(newContact, (err, BusinessContact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/business-contact-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.findById(id, (err, contactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('business-contact/edit', {title: 'Edit Contact', businessContact: contactToEdit, displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = BusinessContact({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });

    BusinessContact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business contact list
            res.redirect('/business-contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the business contact list
             res.redirect('/business-contact-list');
        }
    });
}
