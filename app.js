const hall = document.getElementById("hall");
const seats = document.getElementsByClassName("seat");
const selectedSeatContainer = document.querySelector('.film-info__seat');


const row = [8, 10, 12, 12, 12, 12, 12];    // array which fill hall
let hallMapArr = [];                        // 3dimension array of whole hall
let selectedSeatsArr = [];                  // save all selected seat
let totalCost = 0;                          // total price for selected seats


function fillHall() {
    let hallMap = '';                       // seats map
    row.forEach(function(el,index) {
        hallRow = '';   
        hallRowArr = []; 
        
        for (let i = 1; i <= el; i++) {
            hallRow += '<div class="seat hall-info__legend-color_free" data-row="' +
            (index+1) + '" data-seat="' +
            i + '">&nbsp;</div>';
    
            hallRowArr.push(
                {
                    row : index+1,
                    seat : i,
                    state : 'free',
                    price : 5
                }
            );
        }
    
        hallMap += '<div class="row">' + hallRow + '</div>' ;
        hallMapArr.push(hallRowArr);
    });
    
    hall.innerHTML = hallMap;               //заполнение блока hall
}

function addSeatsToBuy() {
    // add listener for each seat


    for (let seat of seats) {
        seat.addEventListener("click", seatCallback(seat));
    }
}

function seatCallback(place) {
    // return callback for addSeatsToBuy();
    // this callback help :
    //      - put a parameter to the callback for listener
    //      - remove listener if seat have been taken


    const cb = function() {
        if (place.classList.contains('hall-info__legend-color_taken')) {
            place.removeEventListener("click", cb);
            return;
        }
        seatEvent(place);
    }
    return cb;
}

function seatEvent(place) {
    // event for addSeatsToBuy();
    // this event : 
    //      - swtich classes to view state of seats
    //      - fill 'state' field in hallMapArr to current state(free or selected)
    //      - call showSelectedSeats(); and countSeatsPrice();


    let hallRowNum = place.getAttribute('data-row');
    let hallSeatNum = place.getAttribute('data-seat');

    place.classList.toggle('hall-info__legend-color_selected');
    place.classList.toggle('hall-info__legend-color_free');

    if (place.classList.contains('hall-info__legend-color_free')){
        hallMapArr[hallRowNum-1][hallSeatNum-1].state = 'free';
    }

    if (place.classList.contains('hall-info__legend-color_selected')){
        hallMapArr[hallRowNum-1][hallSeatNum-1].state = 'selected';
    }

    showSelectedSeats(hallRowNum, hallSeatNum);
    countSeatsPrice();
}

function showSelectedSeats(hallRowNum, hallSeatNum) {
    // show or hide the seat, user clicked, in the "selected seats" field at left


    let selectedSeat = document.querySelector('.film-info__seat_js');

    selectedSeatsArr.push(hallMapArr[hallRowNum-1][hallSeatNum-1]);
    selectedSeatsArr = selectedSeatsArr.filter(element => element.state == 'selected');
    
    if (selectedSeatsArr.length >= 6)
        {
            selectedSeatContainer.setAttribute("style", "overflow-y: scroll;height: 400px;");
        }
    else {
        selectedSeatContainer.setAttribute("style", "overflow-y: visible;");
    }

    
    selectedSeatContainer.innerHTML = '';

    for (let seat of selectedSeatsArr) {
        // console.log(seat.seat, seat.row);
        // console.log(seat)
        // console.log(selectedSeatsArr)

        selectedSeat.children[0].children[1].children[0].innerHTML = seat.row;
        selectedSeat.children[0].children[0].children[0].innerHTML = seat.seat;
        selectedSeatContainer.innerHTML += selectedSeat.innerHTML;
        
    }

    selectedSeatContainer.scrollTop = selectedSeatContainer.scrollHeight;

}

function countSeatsPrice() {
    //count and show total price of selected seats


    totalCost = 0;

    let finalCost = document.querySelector('.film-info__cost');

    for (let seat of selectedSeatsArr) {
        totalCost += +seat.price;
    }

    if (selectedSeatsArr.length == 0) {
        totalCost = 0;
    }

    finalCost.innerHTML = `${totalCost} $`
}

function buySelectedSeats() {
    // add listener for buy button which
    //      - change 'state' field in hallMapArr
    //      - change class to taken
    //      - refill selectedSeatContainer, selectedSeatArr and show price


    let button = document.querySelector('.film-info__button');

    button.addEventListener('click', function() {
        for (let seat of selectedSeatsArr) {
            seat.state = 'taken';

            for (let seat of seats) {
                if (seat.classList.contains('hall-info__legend-color_selected'))
                {
                    seat.classList.remove('hall-info__legend-color_selected');
                    seat.classList.add('hall-info__legend-color_taken');
                }
            }
            
        }
        
        selectedSeatContainer.innerHTML = '';
        selectedSeatsArr = selectedSeatsArr.filter(element => element.state == 'selected');
        countSeatsPrice();      
    })
    
}


fillHall();
addSeatsToBuy();
buySelectedSeats();


