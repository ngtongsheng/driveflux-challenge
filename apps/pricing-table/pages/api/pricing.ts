import { Pricing } from '@driveflux-code-challenge/interfaces';
import Joi from 'joi';
import db from '../../db';

const requiredString = Joi.string().required();
const requiredStringWithNumber = requiredString.regex(/^\d+$/);

const schema = Joi.array().items(
  Joi.object().keys({
    id: requiredString,
    label: requiredString,
    lite: requiredStringWithNumber,
    standard: requiredStringWithNumber,
    unlimited: requiredStringWithNumber,
  })
);

export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const data: Pricing[] = db.get('pricings').value();
    res.end(JSON.stringify(data));
    return;
  }

  if (req.method === 'PUT') {
    const { pricings } = req.body;
    const { error } = schema.validate(pricings);

    if (error) {
      res.statusCode = 400;
      res.end(JSON.stringify(error));
      return;
    }

    db.set('pricings', pricings).write();
    res.end(JSON.stringify({ success: true }));
  }
}
