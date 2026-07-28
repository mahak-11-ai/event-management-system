const Event = require('../model/event.model.js');
const cloudinary = require('../config/cloudinary.js')
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' });
    res.json({
      success: true,
      length: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, location, date, capacity } = req.body;

    //NOte handle the banner url here
    console.log(req.file);
    console.log("Body:", req.body);
console.log("File:", req.file);

const result = await cloudinary.uploader.upload(req.file.path , {
  folder : "nexus-Events"
})
console.log(result)

    const event = await Event.create({
      title,
      description,
      category,
      location,
      date,
      capacity,
      bannerUrl : result.secure_url
    });

    res.status(201).json({
      success: true,
      message:
        'Event Created Successfully , It will be visible  after the admin approval',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};