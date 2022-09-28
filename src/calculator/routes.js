const express = require('express');
const credibilidad = require('./service');

//const  validationResult = require('express-validator');
/* import {
  calculateTextCredibility,
  socialCredibility,
  twitterUserCredibility,
  calculateTweetCredibility,
  scrapperTwitterUserCredibility,
  scrapedSocialCredibility,
  scrapedtweetCredibility
} from './service';
import { validationResult } from 'express-validator';
import { validate, errorMapper } from './validation';
import { asyncWrap } from '../utils'; */

const router = express.Router();

router.get('/plain-text', async function (req, res) {
  try {
    const rows = await credibilidad.calculateTextCredibility(
      {
        text: String(req.query.text),
        lang: req.query.lang
      },
      {
        weightBadWords: req.query.weightBadWords,
        weightMisspelling: req.query.weightMisspelling,
        weightSpam: req.query.weightSpam
      }
      );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
