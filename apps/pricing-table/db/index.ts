import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('./apps/pricing-table/db/data.json');
const db = low(adapter);

export default db;
