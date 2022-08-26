//*********************************************** */
//COLOR CODING TIME SLOT ELEMENTS

//Array of objects for each time slot, need id reference and hour slot begins
var idArray = [{id:'#eight',hr:8},{id:'#nine',hr:9},{id:'#ten',hr:10},
{id:'#eleven',hr:11},{id:'#twelve',hr:12},{id:'#one',hr:13},{id:'#two',hr:14},
{id:'#three',hr:15},{id:'#four',hr:16},{id:'#five',hr:17}];



var colorCode = function (objectArray) {
    var timeNow = moment().hour();
    for (let i = 0; i < objectArray.length; i++){
        if (objectArray[i].hr < timeNow) {
            //remove green background
            document.querySelector(objectArray[i].id).classList.remove('bg-success');
            //add grey background
            document.querySelector(objectArray[i].id).classList.add('bg-secondary');
        }
        else if (objectArray[i].hr = timeNow) {
            //remove green background
            document.querySelector(objectArray[i].id).classList.remove('bg-success');
            // add red background
            document.querySelector(objectArray[i].id).classList.add('bg-danger');
            
        }
    }
};

colorCode(idArray);

//************************************************************** */


//***************************************************** */
// Save, load, and event handlers

var scheduleArray = [{id:'#eight', slotText: 'Add Task'},{id:'#nine',slotText :'Add Task'},{id:'#ten',slotText : 'Add Task'},
{id:'#eleven',slotText: 'Add Task'},{id:'#twelve',slotText: 'Add Task'},{id:'#one',slotText: 'Add Task'},{id:'#two',slotText: 'Add Task'},
{id:'#three',slotText: 'Add Task'},{id:'#four',slotText: 'Add Task'},{id:'#five',slotText: 'Add Task'}];

var saveSchedule = function (id) {
    id = "#"+id;
    var textEl = $(id).children();
    var ntext = textEl.text();
    for(let i = 0; i < scheduleArray.length;i++) {
        if (scheduleArray[i].id === id) {
            scheduleArray[i].slotText = ntext;
        }
    }

    localStorage.setItem("schedule", JSON.stringify(scheduleArray));
    
};

var loadSchedule = function(){
    var schedule = localStorage.getItem("schedule");
    schedule = JSON.parse(schedule);
    // string from array
    var loadText;
    //html p el
    var textEl;
    if (schedule === null) {
        return false;
    }
    for (let i = 0; i < scheduleArray.length;i++) {
        if (scheduleArray[i].id === schedule[i].id) {
            scheduleArray[i].slotText = schedule[i].slotText;
        }
        loadText = scheduleArray[i].slotText;
        textEl = $(scheduleArray[i].id).children();
        textEl.text(loadText);
    }
    
}



//gridHandler for entire table of forms listener
var gridHandler = function(event) {
    event.preventDefault();
    var pEl = $(this).children("p");
    var oldText = pEl
        .text()
        .trim();
    var newInput = $("<input>")
        .attr("type","text")
        .val(oldText);
    
    pEl.replaceWith(newInput);
    newInput.trigger("focus");


};



//Edit Task
$(".container").on("click", ".col-8", gridHandler);

//Save Task
$(".container").submit(function (event) {
    event.preventDefault();

    //find input el
    var formEl = $(event.target);
    var inputDiv = formEl.children("div .col-8");
    var inputEl = inputDiv.children("input");

    //new input text
    var inputText = inputEl.val();
    var newP = $("<p>").text(inputText);

    inputEl.replaceWith(newP);

    //save in local storage
    var divId = inputDiv.attr("id");
    saveSchedule(divId);

});


loadSchedule();

