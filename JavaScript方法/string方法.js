var message = 'Alex';

// 大写化
var upperName = message.toUpperCase();

// 小写化
var lowerName = message.toLowerCase();

var person = {
    firstName: "Bill",
    lastName : "Gates",
    id       : 648,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
  };


