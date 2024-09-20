var todos = [] ;
var formId = document.querySelector('#formId');
var listGroup = document.querySelector('.list-group');
var hideShow = document.querySelector('#hideShow');
 
 
// Not found
function notFound(){
  var notFound = document.querySelector('.notFound');
   if(todos?.length == 0){
	  notFound.style.display="block"; 
   } else {
	   notFound.style.display="none";
   }
}

// Create LI Element
function createElement(todoValue, index){
	 var li = document.createElement('li');
	 li.setAttribute('class', 'list-group-item');
	 li.addEventListener('click', function(e){
		if(todos[index]?.completed){
			 //alert("your task not yet complete?");
			li.classList.remove('sucess');
			todos[index].completed = false;
		} else {
			 //alert("Are you sure task has been completed?");
			 li.classList.add('sucess');
			 todos[index].completed = true;
		}
		 
		localStorage.setItem('todo', JSON.stringify(todos));
	 });
	 
	 li.textContent = todoValue;
	 var icon = document.createElement('i');
	 icon.setAttribute('class', 'fa fa-trash-o');
		
	 icon.addEventListener('click', function(event){
		 event.stopPropagation();
		 event.target.parentElement.remove();
		//todos.splice(index, 1);
		for(let i=index; i<todos.length; i++){
			todos[i] = todos[i+1];
		}
		todos.length = todos.length-1;
		notFound();
		localStorage.setItem('todo', JSON.stringify(todos));
		
	 });
	 
	 li.appendChild(icon);
	 return li;
}

// Rendor TodoList
function rendorList(todosList){
	   if(todosList?.length !==0){
		todosList?.forEach((todo, index)=>{
		var li = createElement(todo.value, index);
		listGroup.appendChild(li);
		if(todo.completed){
				li.classList.add('sucess');
			}
		});
	   }
		 
		
		
	    notFound();
}
 
// Check local storage data
let storedData = JSON.parse(localStorage.getItem('todo'));
if(storedData?.length !==0){
	todos = storedData;
    rendorList(todos);
} else {
 notFound();
}

// Form Submit 
formId.addEventListener("submit", function (e){
	   e.preventDefault();
	   var todoValue = formId.todo.value;
       if(todoValue == ''){
		  alert("Please enter todo name");  
	   } else {
         todos?.push({
		   value:todoValue,
		   completed:false,
	     });
		 hideShow.style.display = 'block';
		   setTimeout(()=>{
			  hideShow.style.display = 'none'; 
		   },2000);
	   }		   
	   notFound();
	   formId.todo.value = '';
	   localStorage.setItem('todo', JSON.stringify(todos));
	   if(todoValue !== ''){
		   var li = createElement(todoValue);
		   listGroup.appendChild(li); 
	   } 
  })
 

  
  
 
 
