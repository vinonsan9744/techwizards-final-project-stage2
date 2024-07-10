const mongoose = require('mongoose');
const { Schema } = mongoose;

const HazardSchema = new Schema(
    {
        hazardId: {
            type: String,
            unique: true
        },
        hazardType: {
            type: String,
            required: true,
            enum: ['Elephant', 'Bull', 'Landslide'] // corrected 'Potancial Hazard' to 'Potential Hazard'
        },
        time: {
            type: Date,
           
        },
        locationName: {
            type: String,
            required: true,
            // enum: ['jaffna'] // need to change if there are predefined locations
        },
        description: {
            type: String,
            
        },
    },
    {
        timestamps: true
    }
);

// // Pre-save hook to validate uniqueness of hazardType and hazardLocation
// HazardSchema.pre('save', async function(next) {
//     try {
//         const existingHazard = await this.constructor.findOne({
//             hazardType: this.hazardType,
//             locationName: this.locationName
//         });

//         if (existingHazard) {
//             throw new Error(`Hazard of type ${this.hazardType} already exists for location ${this.locationName}`);
//         }

//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Pre-save hook to customize hazard ID generation
HazardSchema.pre('save', function(next) {
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



const Hazard = mongoose.model('Hazard', HazardSchema);

module.exports = Hazard;
