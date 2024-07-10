const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationModel = require('./LocationModel');

const WeatherSchema = new Schema(
    {
        
        WeatherID: {
            type:String,
            unique: true,
            match: [/^WID\d{3}$/, 'Weather_ID must match the format "AD###"']

        },
        temperature: {
            type: Number,
            required: true
        },
        windSpeed: {
            type: Number,
            required: true
        },
        precipitation: {
            type: Number,
            required: true
        },
        visibility: {
            type: String,
            required: true
        },
        current_location: {
            type: Schema.Types.ObjectId, 
            ref: 'Location'
        },
        next_location: {
            type: Schema.Types.ObjectId, 
            ref: 'Location'
        }
       
    },
   
    {
        timestamps: true
    }
);
// Function to generate AD_ID before saving
WeatherSchema.statics.generateWeatherID = async function() {
    const count = await this.countDocuments({});
    return `WID${(count + 1).toString().padStart(3, '0')}`;
  };





const Weather = mongoose.model('Weather', WeatherSchema);

module.exports = Weather;

