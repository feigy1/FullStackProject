const mongoose = require('mongoose');

main().catch(err=>console.log("😢😢😢: "+err));

async function main(){
    await mongoose.connect('*****************', {
});
    console.log('connect to mongodb👍🏻');
}
module.exports = mongoose;

