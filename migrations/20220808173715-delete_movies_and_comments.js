module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('films').updateMany({ isDeleted: false }, { $set: { isDeleted: true }});
    await db.collection('comments').updateMany({ isDeleted: false }, { $set: { isDeleted: true }});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('films').updateMany({ isDeleted: true }, { $set: { isDeleted: false }});
    await db.collection('comments').updateMany({ isDeleted: true }, { $set: { isDeleted: false }});
  }
};
