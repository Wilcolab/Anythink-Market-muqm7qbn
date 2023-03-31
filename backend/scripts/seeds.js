//TODO: seeds script should come here, so we'll be able to put some data in our local env
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const connection = process.env.MONGODB_URI;
mongoose.connect(connection);

const User = require("../models/User");
const Item = require("../models/Item");
const Comment = require("../models/Comment");

async function seedDB() {

    const options = { upsert: true, new: true };
    for (let i = 0; i < 100; i++) {

        const user = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            hash: faker.internet.password(),
            bio: faker.lorem.paragraph(),
            image: faker.internet.avatar(),
            role: "user"
        };
        const createdUser = await User.findOneAndUpdate(
            user, {}, options
        );

        const item = {
            slug: faker.lorem.slug(),
            title: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            image: faker.image.imageUrl(),
            seller: createdUser
        };
        const createdItem = await Item.findOneAndUpdate(
            item, {}, options
        );

        if (!createdItem?.comments?.length) {
            let commentIds = [];
            for (let j = 0; j < randomIntFromInterval(0,10); j++) {
              const comment = new Comment({
                body: faker.lorem.paragraph(),
                seller: createdUser,
                item: createdItem,
              });
              await comment.save();
              commentIds.push(comment._id);
            }
            createdItem.comments = commentIds;
            await createdItem.save();
        }
    }
}

seedDB()
    .then(() => {
        console.log("Database seeded");
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });