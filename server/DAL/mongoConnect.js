const mongoose = require('mongoose');

main().catch(err=>console.log("😢😢😢: "+err));

async function main(){
    await mongoose.connect('mongodb+srv://feigy:PHHDH@cluster.yk4cq.mongodb.net/GiveHand?retryWrites=true&w=majority&appName=cluster', {
});
    console.log('connect to mongodb👍🏻');
}
module.exports = mongoose;

