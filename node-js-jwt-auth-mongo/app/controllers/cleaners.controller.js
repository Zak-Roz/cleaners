const sharp = require('sharp');
const process = require('process');
const { Cleaner } = require('../models');
var { ObjectId } = require('mongodb');

exports.getAll = async (req, res) => {
  try {
    const cleaner = await Cleaner.find().sort({ created: -1 });
    if (!cleaner.length) {
      throw new Error('Ще немає хімчисток!');
    }
    return res.json(cleaner);
  } catch (err) {
    return res.send({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const cleaner = await Cleaner.findById(req.query.id);
    if (!cleaner) {
      throw new Error('Хімчистку не знайдено!');
    }
    return res.json(cleaner);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

exports.create = (req, res) => {
  try {
    const url = req.protocol + '://' + req.get('host');
    let services = JSON.parse(req.body.services);
    services.forEach((el) => {
      delete el.split;
    });
    const cleaner = new Cleaner({
      title: req.body.title,
      description: req.body.description,
      owner: ObjectId(req.body.user_id),
      services,
    });
    let imgInput = [];
    let imgOutput = [];
    req.file ? cleaner.images.push(req.file.path) 
      : req.files ? req.files.forEach((el) => {
        cleaner.images.push(url + `/${el.path}`);
        imgInput.push(`\\data\\${el.filename}`);
        imgOutput.push(`\\data\\thumbnail\\${el.filename}`);
      }) 
        : null;
    imgInput = imgInput.map((el) => `${process.cwd()}${el}`);
    imgOutput = imgOutput.map((el) => `${process.cwd()}${el}`);
    for(let i = 0; i < imgInput.length; i ++) {
      sharp(imgInput[i]).resize({ height: 100, width: 100 }).toFile(imgOutput[i]).then((el) => el);
    }
    cleaner.save();
    return res.status(200).send({ message: 'Хімчистку успішно створено!' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
