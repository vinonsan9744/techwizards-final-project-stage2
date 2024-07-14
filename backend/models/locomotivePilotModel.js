// locomotivePilotModel.js

const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;


// Function to generate a random password
function generatepassword(length = 8) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';
    const bytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        password += charset[bytes[i] % charset.length];
    }
    return password;
}

// Define the schema for locomotive pilot
const locomotivePilotSchema = new mongoose.Schema({
    locomotivePilotID: {
        type: String,
        unique: true,
        match: [/^LID\d{3}$/, 'LD_ID must match the format "LID###"']
        
    },
    locomotiveName: {
        type: String,

        required: true,

    },
    locomotiveEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: false,
        unique: false
    },
    locomotivePhoneNo: {
        type: String,
        unique: true,
        required: true,
        match: [/^\d+$/, 'Phone number must contain only numeric characters'],
        validate: {
            validator: function(value) {
                return /^(07)/.test(value);
            },
            message: 'Phone number must start with "07"'
        },

        minlength: 10,
        maxlength: 10

    }
}, {
    timestamps: true
});


// Function to check if a phone number already exists
locomotivePilotSchema.statics.checkDuplicatePhone = async function(phoneNo) {
    const existingPilot = await this.findOne({ locomotivePhoneNo: phoneNo });
    return !!existingPilot; // Returns true if phone number exists, false otherwise
};

// Function to check if an email already exists
locomotivePilotSchema.statics.checkDuplicateEmail = async function(email) {
    const existingPilot = await this.findOne({ locomotiveEmail: email });
    return !!existingPilot; // Returns true if email exists, false otherwise
};

// Function to generate locomotivePilotID before saving
locomotivePilotSchema.statics.generatelocomotivePilotID = async function() {
    const count = await this.countDocuments({});
    return 'LID' + (count + 1).toString().padStart(3, '0');
};

// Pre-save hook to generate locomotivePilotID and check for duplicates before saving
locomotivePilotSchema.pre('save', async function(next) {
    if (!this.locomotivePilotID) {
        try {
            this.locomotivePilotID = await this.constructor.generatelocomotivePilotID();
        } catch (err) {
            return next(err);
        }
    }

    const isDuplicatePhone = await this.constructor.checkDuplicatePhone(this.locomotivePhoneNo);
    if (isDuplicatePhone) {
        const error = new Error('Phone number already exists.');
        return next(error);
    }

    const isDuplicateEmail = await this.constructor.checkDuplicateEmail(this.locomotiveEmail);
    if (isDuplicateEmail) {
        const error = new Error('Email address already exists.');
        return next(error);
    }

    // Generate a password if not provided
    if (!this.password) {
        this.password = generatepassword();
    }

    next();
});

// Create and export the model
const LocomotivePilot = mongoose.model('LocomotivePilot', locomotivePilotSchema);
module.exports = LocomotivePilot;