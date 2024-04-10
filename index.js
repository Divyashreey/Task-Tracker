
const TableData = [
    { category: "Work", sub_category: "Meeting", duration: "1:11", task: "Meeting" },
    { category: "Work", sub_category: "Project", duration: "5:10", task: "Presesntation" },
    { category: "Work", sub_category: "Meeting", duration: "24:10", task: "Client-Searching" },
    { category: "PersonalWork", sub_category: "Meeting", duration: "15:20", task: "Playing" },
    { category: "PersonalWork", sub_category: "Project", duration: "20:58", task: "Well-Being" },
    { category: "Work", sub_category: "Meeting", duration: "42:12", task: "ClientMeeting" },
    { category: "PersonalWork", sub_category: "Meeting", duration: "12:20", task: "Task Scheduling" },
    { category: "PersonalWork", sub_category: "Meeting", duration: "11:40", task: "outdoor Games" },
    { category: "PersonalWork", sub_category: "Meeting", duration: "6:12", task: "outdoor Games" },
    { category: "Work", sub_category: "Meeting", duration: "7:15", task: "ClientMeeting" },
    { category: "Work", sub_category: "ClientMeeting", duration: "10:10", task: "Presentation" },
];

const tableBody = document.querySelector('#dataTable tbody');
const select = document.getElementById('filter');

function createTable(category) {
    tableBody.innerHTML = '';
    TableData.forEach((data, index) => {
        if (data.category === category || category === 'All') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.category}</td>
                <td>${data.sub_category}</td>
                <td>${data.duration}</td>
                <td>${data.task}</td>
            `;
            if (category === 'All') {
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'UPDATE';
                updateBtn.classList.add('update-btn'); 
                updateBtn.addEventListener('click', () => handleUpdate(index)); 
            
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'DELETE';
                deleteBtn.classList.add('delete-btn'); 
                deleteBtn.addEventListener('click', () => handleDelete(index));
            
                row.appendChild(updateBtn);
                row.appendChild(deleteBtn);
            }
            tableBody.appendChild(row);
        }
    });
}

function handleUpdate(index) {
    const newData = { 
        category: prompt("Enter new category") || TableData[index].category,
        sub_category: prompt("Enter new sub category") || TableData[index].sub_category,
        duration: prompt("Enter new duration") || TableData[index].duration,
        task: prompt("Enter new task") || TableData[index].task
    };
    TableData.splice(index, 1, newData);
    createTable(select.value);
}

function handleDelete(index) {
    TableData.splice(index, 1);
    createTable(select.value);
}

createTable(select.value);

select.addEventListener('change', function () {
    const selectedValue = this.value;
    createTable(selectedValue);
});


console.log("Stop Watch")
sec=0;
min=0;
hours=0;
isRunning=false;
function startStopButton(){
    if(!isRunning){
   
        interval=setInterval(()=>{
            sec++;
            if(sec>=60){
                sec=0;
                min++;
                if(min>=60){
                    hours++;
                    min=0;
                }
            }
        
        isRunning=true;
        document.getElementById('StopStartbutton').innerText='STOP';
        let formatTime=`${hours.toString().padStart(2,"0")}:${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
        document.querySelector(".stopwatch").innerText=formatTime;
        },1000);
    }else{
        isRunning=false;
        clearInterval(interval);
        document.getElementById("StopStartbutton").innerText="START";
    }
}

const resetTimer=()=>{
    clearInterval(interval)
    sec=0;
    min=0;
    hours=0;
    document.getElementById("StopStartbutton").innerText="START";
    let formatTime=`${hours.toString().padStart(2,"0")}:${min.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
    document.querySelector(".stopwatch").innerText=formatTime;
}


const form = document.querySelector('#taskForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const category = form.elements['category'].value;
    const subCategory = form.elements['subCategory'].value;
    const duration = form.elements['duration'].value;
    const task = form.elements['task'].value;
    const newData = {
        category: category,
        sub_category: subCategory,
        duration: duration,
        task: task
    };
    TableData.push(newData);
    createTable(select.value);
    form.reset();
});
