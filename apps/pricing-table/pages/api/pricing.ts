import { Pricing } from '@driveflux-code-challenge/interfaces';
import db from '../../db';

export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    const data: Pricing[] = db.get('pricings').value();
    res.end(JSON.stringify(data));
    return;
  }

  if (req.method === 'PUT') {
    const { pricings } = req.body;
    db.set('pricings', pricings).write();
    res.end(JSON.stringify({ success: true }));
    return;
  }
}
