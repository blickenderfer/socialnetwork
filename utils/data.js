// import models

const users = [
    /*objects with username and email*/
]
const thoughts = [
    /*thought text with username and user id*/
]
const reactions = [
    /*reaction body, username*/
]

async function seedData() {
    const userData = await User.insertMany(users)
    for (const thought of thoughts) {
        const userId = userData[Math.floor(Math.random() * userData.length)]
        thought.userId = userId
        const reaction = reactions[Math.floor(Math.random() * reactions.length)]
        thought.reactions = [reaction]
        const thoughtData = await Thought.insertOne(thought)
    }
}