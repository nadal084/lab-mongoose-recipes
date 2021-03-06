const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const RecipeSchema = new Schema({

title:{type:String, required: true},
    level:{type:String, enum:["Easy Peasy","Amateur Chef","Ultra-Pro Chef"], 
    ingredients:{type: Array},
    cuisine:{type:String},
    dish : {type:String,enum:["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
    image:{type:Image, default:"https://images.media-allrecipes.com/images/75131.jpg"},
    duration:{type:Number,min:0},
    creator:{type:String},
    created:{type:Date,default:new Date().toLocaleDateString()}
});



const recipe = mongoose.model('recipe', RecipeSchema);

let newRecipe = { title: 'Bandeja-Paisa', level: 'Easy Peasy',cousine:"Colombian",duration:3};
data.push(newRecipe);

mongoose.connect('mongodb://localhost/recipeApp',{ useNewUrlParser: true })
  .then(() => {
   return recipe.collection.remove();
  })
  .then(() => {
    console.log('Connected to Mongo!')
    return recipe.insertMany(data);
  })
  .then(()=>{
    return recipe.update({title:"Rigatoni alla Genovese"},{duration:100})
  })
  .then(()=>{
    return recipe.deleteOne({title:"Carrot Cake"})
  })
  .then(() => {
    return recipe.find();
  })
  .then(recipe => {
    console.log("mirar aqui")
    console.log(recipe);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
});

