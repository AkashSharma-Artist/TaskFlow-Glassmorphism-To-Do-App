document.addEventListener('DOMContentLoaded',() => {
    // This means: Run the code only after the HTML is fully loaded.
    // Makes sure JavaScript doesn’t try to access HTML elements before they exist.


     const taskInput = document.getElementById
     ('task-input');
      const addTaskBtn = document.getElementById
     ('add-task-btn');
      const taskList = document.getElementById
     ('task-list');
      const emptyImage = document.querySelector
     ('.empty-image');
      const todosContainer = document.querySelector
     ('.todos-container');
     const progressBar = document.getElementById
     ('progress');
     const progressNumbers = document.getElementById
     ('numbers');

     // These lines grab references to HTML elements using their IDs or classes.
    // These will be used to read from, add to, or change parts of the page.



     const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.
        length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
     };

        //If no tasks exist:
        
        // Show the empty image
        
        // Shrink the container
        
        // If there are tasks:
        
        // Hide the image
        
        // Expand the task container
        
        // 👉 Uses:
        
        // .empty-image (image shown when there are no tasks)
        
        // .todos-container CSS styling






     const updateProgress = (checkCompletion = true) => {
          const totalTasks = taskList.children.length;
          const completedTasks = taskList.querySelectorAll('.checkbox:checked').length;

          //Calculates how many total and completed tasks are there.

          progressBar.style.width = totalTasks ? `${(completedTasks / totalTasks) * 100}%` : '0%';
          progressNumbers.textContent = `${completedTasks} / ${totalTasks}`;

          //Sets the width of the progress bar in percentage. Example: if 2 of 4 tasks are done, it's 50%.
          //Updates the circle number (like 2 / 5).

          if(checkCompletion && totalTasks > 0 && completedTasks == totalTasks){
            Confetti();
          }

          // If all tasks are completed, launch confetti animation.
          
          // 👉 Uses:
          
          // #progress → updates the progress bar width
          
          // #numbers → updates the count circle
     };




     const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
         text: li.querySelector('span').textContent,completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
     };

     //Converts all tasks into a list of { text, completed } objects.
     //Saves it to localStorage so it remains even after refreshing the page.




     const loadTaskFromLocalStorage = () => {
          const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
          savedTasks.forEach(({ text, completed }) => addTask(text, completed, false));
          toggleEmptyState();
          updateProgress();
     };

     //When the page loads:
    //Retrieves saved tasks from localStorage
    //Re-creates each task on the screen using addTask()
    //Refreshes empty image and progress bar




     const addTask = (text, completed = false, checkCompletion = true) => {
        //Adds a new task to the list.
        //You can pass:
        //
        //text (task name)
        //
        //completed (true if checkbox is checked)
        //
        //checkCompletion (whether to run confetti check)


        const taskText = text || taskInput.value.trim();
        if(!taskText){
            return;
        }  // Uses typed text from input or provided text. If empty, do nothing. or trim krke update hoga

        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />
        <span>${taskText}</span>
        <div class="task-buttons">
           <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
           <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        //Creates the task item with:

       // a checkbox
       
       // task text
       
       // edit and delete buttons

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');

        //Selects the checkbox and edit button for use.



        if (completed) {
           li.classList.add('completed');
           editBtn.disabled = true;
           editBtn.style.opacity = '0.5';
           editBtn.style.pointerEvents = 'none';
        }
        // If already completed:

       // Strike-through the task

       // Disable the edit button



        checkbox.addEventListener('change', () => {
             const isChecked = checkbox.checked;
             li.classList.toggle('completed', isChecked);
             editBtn.disabled = isChecked;
             editBtn.style.opacity = isChecked ? '0.5' : '1';
             editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
             updateProgress();
             saveTaskToLocalStorage();
        });

        //If checkbox is clicked:

        // Add/remove completed class (for strikethrough effect)
        
        // Disable/enable edit button
        
        // Update progress bar and storage




        editBtn.addEventListener('click', () => {
         if(!checkbox.checked){
            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            toggleEmptyState();
            updateProgress(false);
            saveTaskToLocalStorage();
         }
        });

        //When clicked:
        
        // Puts the task text back in the input
        
        // Removes the task (like “editing” it)
        
        // Refreshes everything




        li.querySelector('.delete-btn').addEventListener('click',() => {
         li.remove();
         toggleEmptyState();
         updateProgress();
         saveTaskToLocalStorage();
        })

        //Removes task completely

       //Updates UI and saves new state


        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress(checkCompletion);
        saveTaskToLocalStorage();
     }; 

        //Adds the task to the list

        // Clears the input
        
        // Refreshes UI and storage




     addTaskBtn.addEventListener('click', (e) => {
       e.preventDefault();  // Prevent form submission
       addTask();  // When you click the "+" button, it prevents the form from refreshing the page.
      });
     taskInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
         e.preventDefault();
            addTask();
        }
     }); // Pressing Enter in the input field adds the task (like the button)

      loadTaskFromLocalStorage();

});


//Uses the tsparticles library to show colorful confetti

//Triggered when all tasks are completed

const Confetti = () => {
   const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
