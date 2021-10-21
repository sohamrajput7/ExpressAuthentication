/**
  * app.css
  * Soham Rajput
  * 301180583
  * Oct 3, 2021
  */

// IIFE -- Immediately Invoked Function Expression
(function(){

  function Start()
  {
      console.log("App Started...");

      // prompts the user before deleting database entry
      let deleteButtons = document.querySelectorAll('.delete-button');
      
      for(button of deleteButtons)
      {
          button.addEventListener('click', (event)=>{
              if(!confirm("Are you sure you want to delete this entry?")) 
              {
                  event.preventDefault();
                  window.location.assign('/book-list');
              }
          });
      }
  }

  window.addEventListener("load", Start);

})();