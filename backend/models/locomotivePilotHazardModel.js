// locomotivePilotHazardModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
// const LocomotivePilot = require('./locomotivePilotModel');

// Define the schema for locomotive pilot hazard
const locomotivePilotHazardSchema = new mongoose.Schema({
    hazardID: {
        type: String,
        unique: true,


    },
    locomotivePilotID: {
        type: String,
        required: false,
        match: [/^LID\d{3}$/, 'locomotivePilotID must match the format "LID###"']

    },
    locationName: {
        type: String,
        required: true
    },
    hazardType: {
        type: String,
        required: true,
        enum: ['Elephant', 'Bull', 'Landslide'] // corrected 'Potancial Hazard' to 'Potential Hazard'
        
    },
    time: {
        type: Date,
        // default: Date.now,
        required:true
    },
    createdAt: { // Field to store the document creation time
        type: Date,
        default: Date.now,
        expires: 1800 // TTL index: documents expire 1800 seconds after their creation
    },
    description: {
        type: String,
        
    },

   
});
// Pre-save hook to customize hazard ID generation
locomotivePilotHazardSchema.pre('save', function(next) {
    if (!this.isNew) {
        return next();
    }

    // Generate hazard ID based on the first two letters of the hazard type
    const firstLetter = this.hazardType.charAt(0).toUpperCase();
    const secondLetter = this.hazardType.charAt(1).toUpperCase();
    
    // Count the number of hazards of the same type
    this.constructor.countDocuments({ hazardType: this.hazardType })
        .then(count => {
            const paddedCount = (count + 1).toString().padStart(3, '0');
            this.hazardID = `${firstLetter}${secondLetter}${paddedCount}`;
            next();
        })
        .catch(err => {
            next(err);
        });
});



// Create and export the model
const LocomotivePilotHazard = mongoose.model('LocomotivePilotHazard', locomotivePilotHazardSchema);
module.exports = LocomotivePilotHazard;
