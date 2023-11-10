import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding data');
  const jateDB = await openDB('jate',1);
  const tx = jateDB.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  try {
    // Explicitly set null as the key to allow auto-incrementing
    //const request = store.put(content, null);
    const request = store.put({id:1, value: content})
    const result = await request;
    console.log(result);
  } catch (error) {
    console.error('Error adding data:', error);
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>  {
  console.log('Getting data');
  const jateDB = await openDB('jate',1);
  const tx = jateDB.transaction('jate','readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log (result);
  return result?.value;
}


initdb();
