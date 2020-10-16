import { Pricing } from '@driveflux-code-challenge/interfaces';
import Joi from 'joi';
import db from '../../db';

const requiredString = Joi.string().required();
const requiredNumberUnderMillion = Joi.number().required().less(1000000);

const schema = Joi.array().items(
  Joi.object().keys({
    id: requiredString,
    label: requiredString,
    lite: requiredNumberUnderMillion.label('Lite'),
    standard: requiredNumberUnderMillion.label('Standard'),
    unlimited: requiredNumberUnderMillion.label('Unlimited'),
  })
);

export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const data: Pricing[] = db.get('pricings').value();
    res.json(data);
    return;
  }

  if (req.method === 'PUT') {
    const { pricings } = req.body;

    const { error } = schema.validate(
      pricings.map(({ lite, standard, unlimited, id, label }: Pricing) => ({
        id,
        label,
        lite: parseFloat(lite),
        standard: parseFloat(standard),
        unlimited: parseFloat(unlimited),
      }))
    );

    if (error) {
      const { details } = error;
      const { message, path } = details[0];
      const [row, field] = path;

      res.statusCode = 400;
      res.json({ message, row, field });
      return;
    }

    db.set('pricings', pricings).write();
    res.json({ success: true });
  }
}
