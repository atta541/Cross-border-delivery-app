require('dotenv').config({ path: '../.env' });  // This is correct

const bcrypt = require('bcryptjs');

module.exports = {
  async up(db, client) {
    console.log("Starting Superadmin insertion or update...");

    const firstName = process.env.SUPERADMIN_FIRST_NAME;  
    const lastName = process.env.SUPERADMIN_LAST_NAME;    
    const email = process.env.SUPERADMIN_EMAIL;  
    const password = process.env.SUPERADMIN_PASSWORD;

    // Check if required environment variables are set
    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required environment variables');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Hashing password for ${email}`);

    // Check if a user with the superadmin role exists
    const existingUser = await db.collection('users').findOne({ role: 'superadmin' });

    if (existingUser) {
      // If a superadmin exists, update their details
      console.log('Superadmin exists. Updating user details...');

      await db.collection('users').updateOne(
        { role: 'superadmin' },
        { 
          $set: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: hashedPassword
          }
        }
      );
      console.log('Superadmin details updated');
    } else {
      // If no superadmin exists, insert a new superadmin
      console.log('Superadmin does not exist. Inserting new superadmin...');

      const result = await db.collection('users').insertOne({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
        role: ['superadmin'],
      });

      console.log('Superadmin inserted:', result);
    }
  },

  async down(db, client) {
    const email = process.env.SUPERADMIN_EMAIL;
    if (!email) {
      console.log('Superadmin email not found in environment variables.');
      return;
    }

    // Delete superadmin user based on email
    const result = await db.collection('users').deleteOne({ email });
    if (result.deletedCount > 0) {
      console.log('Superadmin deleted');
    } else {
      console.log('Superadmin not found');
    }
  }
};
