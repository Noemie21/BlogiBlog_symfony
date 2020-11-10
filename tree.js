TODO = new Error();
// stockage en tant que tableau

var zamor_array = [
  {"name":"Jack", "age": 91, "sex": "m", "parent":null},
  {"name":"Olivier", "age": 61, "sex": "m", "parent":"Jack"},
  {"name":"Pascal", "age": 61, "sex": "m", "parent":"Jack"},
  {"name":"Angélique", "age": 17, "sex": "f", "parent":"Olivier"},
  {"name":"Charlotte", "age": 26, "sex": "f", "parent":"Olivier"},
  {"name":"Julien", "age": 35, "sex": "m", "parent":"Pascal"},
  {"name":"Caroline", "age": 32, "sex": "f", "parent":"Pascal"},
  {"name":"Barnabé", "age": 2, "sex": "m", "parent":"Julien"},
  {"name":"Robinson", "age": 1, "sex": "m", "parent":"Julien"},
  {"name":"Constance", "age": 1, "sex": "f", "parent":"Caroline"},
];

//console.log(zamor_array);

//Exo 1:
function find_person(family, name){
  persons = family.filter(p => p.name == name)
  
  if(persons.length == 0){
    throw new Error('Not found');
  }
  found = persons[0]; 
  return found;
  
}
// console.log(
//   find_person(zamor_array, "Robinson")
// )
//{"age": 1, "sex": "m"}


//Exo 2:
function list_by_sex(family, sex){
  //en utilisant filter (enlève des éléments) 
  //et map (transforme chaque élément)
  return family.filter(p => p.sex == sex)
               .map(p => p.name)
               ;
}
// console.log(
//   list_by_sex(zamor_array, 'f')
// )
//["Angélique", "Charlotte", "Caroline", "Constance"]


// console.log(
//   list_by_sex(zamor_array, 'f')
//           .map(pn => find_person(zamor_array, pn))
// );


//Exo 3:
function list_ascendance(family, name){
  var ascendance = [];

  do{
    var person = find_person(family, name);
    var parent_name = person.parent;

    if (parent_name == null) break;

    var parent = find_person(family, parent_name);
    ascendance.push(parent.name);
    name = parent.name;
  }while(parent.name != null);
  return ascendance;
}
// console.log(
//   list_ascendance(zamor_array, "Caroline")
// )
//["Jack", "Pascal"]

//Exo 3bis:
function list_descendance(family, name){
  return [];
}
// console.log(
//   list_descendance(zamor_array, "Pascal")
// )
//["Julien", "Caroline", "Barnabé", "Robinson", "Constance"]

//as tree

var zamor_object =
 {"name":"Jack", "age": 91, "sex": "m", 
    "children": [
      {"name":"Olivier", "age": 61, "sex": "m", 
        "children": [
          {"name":"Angélique", "age": 17, "sex": "f", "children": []},
          {"name":"Charlotte", "age": 26, "sex": "f", "children": []},
        ]},
      {"name":"Pascal",  "age": 61, "sex": "m", 
        "children": [
            {"name":"Julien", "age": 35, "sex": "m", 
              "children": [
                {"name":"Barnabé", "age": 2, "sex": "m", "children": []},
                {"name":"Robinson", "age": 1, "sex": "m", "children": []},
              ]},
            {"name":"Caroline", "age": 32, "sex": "f", 
              "children": [
                {"name":"Constance", "age": 1, "sex": "f", "children": []},
            ]},
        ]},
    ]
  };

console.log(zamor_object);

function Queue(){

  this.queue = [];

  Queue.prototype.ajouter = function(item){
    this.queue.push(item);
  }

  Queue.prototype.suivant = function(){
    return this.queue.shift();
  }

  Queue.prototype.empty = function(){
    return (this.queue.length == 0)
  }

}


q = new Queue();
q.ajouter("Michel")
q.ajouter("Claudine")
q.ajouter("Patrick")
q.suivant()
a = q.suivant()
console.log(a);


function Tree(tree_object){
  this._root = tree_object;

  Tree.prototype.traverse = function(callback){

    (function recursive(currentNode, accuParents){
      for (var i = 0; i < currentNode.children.length; i++) {
        recursive(currentNode.children[i],
                  [currentNode].concat(accuParents)
                )
      }
      callback(currentNode, accuParents)
    })(this._root, []);
  }

}


var zamor_tree = new Tree(zamor_object);
zamor_tree.traverse(function(p, acc){
  
})

function find_person(tree, name){

  persons = [];
  zamor_tree.traverse(function(p, acc){
    if(p.name == name){
      persons.push(p);
    }
  });

  if(persons.length == 0){
    throw new Error('Not found');
  }
  found = persons[0]; 
  return found;

}

console.log(find_person(zamor_tree, "Robinson"));

function list_by_sex(tree, sex){
  persons = [];
  zamor_tree.traverse(function(p, acc){
    if(p.sex == sex){
      persons.push(p);
    }
  });

  return persons.map(p => p.name);

}
console.log(list_by_sex(zamor_tree, 'f'));

function list_ascendance(tree, name){

  persons = [];
  ascendance = null;
  zamor_tree.traverse(function(p, acc){
    if(p.name == name){
      persons.push(p)
      ascendance = acc;
    }
  })
  return ascendance.map(p => p.name);
}
console.log(list_ascendance(zamor_tree, "Caroline"));




