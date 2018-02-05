var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
  {
     name: "Cloud's Rest", 
     image: "https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg",
     description: "In sed accumsan arcu. Etiam ultrices quam a leo aliquam consequat. Integer accumsan massa vitae viverra aliquet. Aliquam sit amet est sit amet nunc vulputate convallis in sit amet nulla. Pellentesque placerat nisl eget nunc ullamcorper, nec blandit ipsum lobortis. Pellentesque tincidunt dolor arcu, ut accumsan turpis egestas a. Sed congue dolor magna, lobortis mattis justo cursus id. Vivamus posuere odio elit, a placerat metus consequat vel. Sed non lorem pulvinar, luctus purus at, aliquet purus. Nullam convallis nulla ut diam mattis consectetur. Suspendisse potenti. Suspendisse potenti. Proin porttitor metus non sapien euismod gravida. Quisque sed eleifend est. Cras imperdiet eros in enim imperdiet, non suscipit nisl ullamcorper. Suspendisse potenti."
  },
  {
     name: "Desert Mesa", 
     image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
     description: "In sed accumsan arcu. Etiam ultrices quam a leo aliquam consequat. Integer accumsan massa vitae viverra aliquet. Aliquam sit amet est sit amet nunc vulputate convallis in sit amet nulla. Pellentesque placerat nisl eget nunc ullamcorper, nec blandit ipsum lobortis. Pellentesque tincidunt dolor arcu, ut accumsan turpis egestas a. Sed congue dolor magna, lobortis mattis justo cursus id. Vivamus posuere odio elit, a placerat metus consequat vel. Sed non lorem pulvinar, luctus purus at, aliquet purus. Nullam convallis nulla ut diam mattis consectetur. Suspendisse potenti. Suspendisse potenti. Proin porttitor metus non sapien euismod gravida. Quisque sed eleifend est. Cras imperdiet eros in enim imperdiet, non suscipit nisl ullamcorper. Suspendisse potenti."
  },
  {
     name: "Canyon Floor", 
     image: "https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg",
     description: "In sed accumsan arcu. Etiam ultrices quam a leo aliquam consequat. Integer accumsan massa vitae viverra aliquet. Aliquam sit amet est sit amet nunc vulputate convallis in sit amet nulla. Pellentesque placerat nisl eget nunc ullamcorper, nec blandit ipsum lobortis. Pellentesque tincidunt dolor arcu, ut accumsan turpis egestas a. Sed congue dolor magna, lobortis mattis justo cursus id. Vivamus posuere odio elit, a placerat metus consequat vel. Sed non lorem pulvinar, luctus purus at, aliquet purus. Nullam convallis nulla ut diam mattis consectetur. Suspendisse potenti. Suspendisse potenti. Proin porttitor metus non sapien euismod gravida. Quisque sed eleifend est. Cras imperdiet eros in enim imperdiet, non suscipit nisl ullamcorper. Suspendisse potenti."
  }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");
    //Add some campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
          } else {
          console.log("Added a new campground");
            //Add some comments
            Comment.remove({}, function(err){
              if(err){
                console.log(err);
              }
              Comment.create(
              {
                  text: "This place is great but I wish there was internet..",
                  author: "Homer"
              }, function(err, comment){
                  if(err) {
                    console.log(err);
                  } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log("Created a new comment.");
                  }
              });
            });
          }
        });
      });
    });
    
}

module.exports = seedDB;

