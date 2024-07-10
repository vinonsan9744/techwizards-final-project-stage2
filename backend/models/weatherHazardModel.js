// weatherHazardModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


// Define the schema for weather hazard
const weatherHazardSchema = new mongoose.Schema({
    hazardId: {
        type: String,
        // required: true
    },
    weatherId: {
        type: String,
        // required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    hazardType: {
        type: String,
        required: true,
        enum: ['Elephant', 'Bull', 'Potential Hazard', 'Others'] // corrected 'Potancial Hazard' to 'Potential Hazard'

    },
    location: {
        type: String,
        required: true
    },
    time: {
        required:true,
        type: Date,
        default: Date.now
    }
});

// Function to generate AD_ID before saving
weatherHazardSchema.statics.generateweatherId = async function() {
    const count = await this.countDocuments({});
    return `WID${(count + 1).toString().padStart(3, '0')}`;
  };
  // Pre-save hook to generate AD_ID before saving
  weatherHazardSchema.pre('save', async function(next) {
    if (!this.weatherId) {
      try {
        this.weatherId = await this.constructor.generateweatherId();
      } catch (err) {
        return next(err);
      }
    }
});

// Pre-save hook to customize hazard ID generation
weatherHazardSchema.pre('save', function(next) {
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
            this.hazardId = `${firstLetter}${secondLetter}${paddedCount}`;
            next();
        })
        .catch(err => {
            next(err);
        });
});

// Create and export the model
const WeatherHazard = mongoose.model('WeatherHazard', weatherHazardSchema);
module.exports = WeatherHazard;
