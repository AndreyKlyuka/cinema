let hall = document.getElementById("hall");

let seats = document.getElementsByClassName("seat")


const row = [8, 10, 12, 12, 12, 12, 12];    // array of hall
let hallMapArr = [];                        // 3dimension array of hall
let selectedSeatsArr = [];                  //  save all selected seat


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
                    price : '5'
                }
            );
        }
    
        hallMap += '<div class="row">' + hallRow + '</div>' ;
        hallMapArr.push(hallRowArr);
    });
    
    hall.innerHTML = hallMap;               //заполнение блока hall
}

function addSeatsToBuy() {                  // сделать так чтобы функция не срабатывала для купленных мест
    for (let seat of seats) {
        seat.addEventListener("click", function() {
            let hallRowNum = seat.getAttribute('data-row');
            let hallSeatNum = seat.getAttribute('data-seat');
    
            seat.classList.toggle('hall-info__legend-color_selected');
            seat.classList.toggle('hall-info__legend-color_free');
    
            if (seat.classList.contains('hall-info__legend-color_free')){
                hallMapArr[hallRowNum-1][hallSeatNum-1].state = 'free';
            }

            if (seat.classList.contains('hall-info__legend-color_selected')){
                hallMapArr[hallRowNum-1][hallSeatNum-1].state = 'selected';
            }

            showSelectedSeats(hallRowNum, hallSeatNum);
            countSeatsPrice();

            // console.log(hallMapArr);
            console.log(selectedSeatsArr)
        })
    }
}

function showSelectedSeats(hallRowNum, hallSeatNum) {
    // show or hide the seat, user clicked, in the "selected seats" field at left


    let selectedSeat = document.querySelector('.film-info__seat_js');
    let selectedSeatContainer = document.querySelector('.film-info__seat');

    selectedSeatsArr.push(hallMapArr[hallRowNum-1][hallSeatNum-1]);
    selectedSeatsArr = selectedSeatsArr.filter(element => element.state == 'selected')

    selectedSeatContainer.innerHTML = '';

    for (let seat of selectedSeatsArr) {
        // console.log(seat.seat, seat.row);
        // console.log(seat)

        selectedSeat.children[0].children[1].children[0].innerHTML = seat.row;
        selectedSeat.children[0].children[0].children[0].innerHTML = seat.seat;
        selectedSeatContainer.innerHTML += selectedSeat.innerHTML;
        
    }
    // console.log(selectedSeatContainer);

}

function countSeatsPrice() {
    let totalCost = 0;

    let finalCost = document.querySelector('.film-info__cost');

    for (let seat of selectedSeatsArr) {
        totalCost += +seat.price;
    }

    finalCost.innerHTML = `${totalCost} $`
}


fillHall();
addSeatsToBuy();


