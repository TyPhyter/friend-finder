const express = require('express');
let router = express.Router();
let friends = require('../data/friends.js');

//routes mounted on /api

router.get('/friends', (req, res) => {
    //returns entire friend array as json object
    res.json(friends);
});

router.post('/friends', (req, res) => {
    //handle survey posts
    //handle compatibility
    let newFriend = req.body;

    let compatibilityScore;
    let compatibilityScoresArray = [];
    friends.forEach((friend) => {
        let scoreDifferences = [];
        for(let i = 0; i < 10; i++) {
            scoreDifferences.push(Math.abs(friend.scores[i] - newFriend.scores[i]));
        }
        //sum the score differences
        compatibilityScore = scoreDifferences.reduce((a, b) => a + b, 0);
        //add the score to the array
        compatibilityScoresArray.push(compatibilityScore);
        
    });
    //find the lowest score in the array and save its index
        //this index is the index of the most compatible user
    let lowestIndex = 0;
    let lowestScore = compatibilityScoresArray[0];
    //already setting index 0 as lowest, no need to check against it
    //so start at i=1
    for(let i = 1; i < compatibilityScoresArray.length; i++){
        if(compatibilityScoresArray[i] < lowestScore){
            lowestIndex = i;
            lowestScore = compatibilityScoresArray[i];
        }
    }
    //add submission to array of friends
    friends.push(newFriend);
    //return most compatible friend data
    res.json(friends[lowestIndex]);
});

module.exports = router;