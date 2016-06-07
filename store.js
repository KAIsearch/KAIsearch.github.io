var items = [];
var listDatabase = new Array();
for (count =0;count<= items.length;count++){
  listDatabase[count]="";
}
var numDatabase=0;
var notifyComponents = function() {
  $(ListStore).trigger('storeHasChanged');
  for (count = 0; count<=items.length;count++){
    if (items[count].completed){
      listDatabase[count]=items[count].description;
    }
    else if (!items[count].completed)
    {
      listDatabase[count]="";
    }
    else {
      listDatabase[count]="";
    }
  }
};

var findItemById = function(id) {
  return items.filter(function(item) {
    return item.id === id;
  })[0];
},

ListStore = {

  getItems: function() {
    return items;
  },

  loadItems: function() {
    console.log("made the load items calls");
    var loadRequest = $.ajax({
      type: 'GET',
      url: "https://listalous.herokuapp.com/lists/MyGroceryList/"
    });

    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items;
      notifyComponents();
    });
  },
  // adding an item to the list
  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: "http://listalous.herokuapp.com/lists/MyGroceryList/items",
      data: { description: itemDescription, completed: false }
    });

    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer);
      notifyComponents();
    });
  },
  toggleCompleteness: function(itemId) {
    var item = findItemById(itemId);
    var currentCompletedValue = item.completed;


  var updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/MyGroceryList/items/" + itemId,
    data: { completed: !currentCompletedValue }
  });

   updateRequest.done(function(itemData) {
      item.completed = itemData.completed;
      notifyComponents();

    });
  },

  deleteItem: function(itemId) {
    var item = findItemById(itemId);

    var deleteRequest = $.ajax({
      type: 'DELETE',
      url: "https://listalous.herokuapp.com/lists/MyGroceryList/items/" + itemId,
    });
    deleteRequest.done(function(itemData){

    })

  }
};
