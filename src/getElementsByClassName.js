// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {

  var nodeList = [];
  function test(node) {
  	//checks current
      if (node.classList.contains(className)) { //classList is necessary for multiple class cases
        nodeList.push(node);
      }
    //iterates to next level, to next level, to next level...
      _(node.children).forEach(function(node) { //_.forEach is defined in underbar
        test(node);
      });
  }
  test(document.body);
  return nodeList;

  // var nodeList = [];
  // function test(node) {
  //   if (_(node.classList).contains(className)) { //if (_(node.classList).contains(className)) {
  //     nodeList.push(node);
  //   }
  //   _(node.childNodes).forEach(function(child) { //_(node.childNodes).forEach(function(child) {
  //     test(child);
  //   });
  // }
  // test(document.body);
  // return nodeList;
}


   // ***Here, split className on whitespace into an array **
   // var results = [];
   // function getClass(nodeList){
   //   var childList = nodeList.children;
   //   _forEach(childList, function(node) {
   //   //1st level body check
   //    // **Here, only include the element if Array#every is true,
   //    // **where you give Array#every a function that does your
   //    // classList.contains on the name for that iteration
   //    if(node.classList  && node.classList.contains(className)){
   //      results.push(node);
   //    }

   //    //has children, recurse
   //    if(node.children) {
   //      getClass(node);
   //    }
   //    else {
   //      getClass(node);
   //    }
   //  });
   // }
   // getClass(document.body);
   // return results;

//Helper forEach function to iterate over array like DOM objects
// var _forEach = function(collection, func) {
//  for(var i = 0; i < collection.length; i++) {
//    func(collection[i], i, collection);
//  }
// }
