document.addEventListener('DOMContentLoaded', function() {
    let totalSeats = 40;
    let seatLeftCount = document.getElementById('seatLeftCount');
    let addedSeatCount = document.getElementById('addedSeat');
    let addedTicketdetails = document.getElementById('addedTicketdetails');
    let totalAmount = document.getElementById('totalAmount');
    let seatPrice = 550;

    function updateSeatsLeft() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let remainingSeats = totalSeats - selectedButtons.length;
        seatLeftCount.textContent = remainingSeats;
    }

    function updateSelectedSeatCount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        addedSeatCount.textContent = selectedButtons.length;
    }

    function calculateTotalAmount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let totalPrice = selectedButtons.length * seatPrice;
        return totalPrice;
    }

    function updateTotalAmount() {
        let totalPrice = calculateTotalAmount();
        totalAmount.textContent = totalPrice.toFixed(2);
    }

    function addSelectedSeatToTable(button) {
        let seatNumber = button.textContent;
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${seatNumber}</td>
        <td>Economy</td>
        <td>${seatPrice}</td>
      `;
        row.dataset.seatNumber = seatNumber;
        addedTicketdetails.appendChild(row);
    }

    function removeSelectedSeatFromTable(button) {
        let seatNumber = button.textContent;
        let rowToRemove = addedTicketdetails.querySelector(`tr[data-seat-number="${seatNumber}"]`);
        if (rowToRemove) {
            rowToRemove.remove();
        }
    }

    let seatButtons = document.querySelectorAll('.seat-inner-lists button');

    seatButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.classList.contains('selectedSeatBtn')) {
                button.classList.remove('selectedSeatBtn');
                removeSelectedSeatFromTable(button);
            } else {
                let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
                if (selectedButtons.length < 4) {
                    button.classList.add('selectedSeatBtn');
                    addSelectedSeatToTable(button);
                } else {
                    alert('You can only select 4 seats.');
                }
            }
            updateSeatsLeft();
            updateSelectedSeatCount();
            updateTotalAmount();
        });
    });

    updateSeatsLeft();
    updateSelectedSeatCount();
    updateTotalAmount();
});

document.addEventListener('DOMContentLoaded', function() {
    let seatPrice = 550;
    let couponCodes = {
        'NEW15': 0.15,
        'Couple 20': 0.20
    };

    function calculateTotalAmount() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let totalPrice = selectedButtons.length * seatPrice;
        return totalPrice;
    }

    function calculateDiscountedPrice(totalPrice, discount) {
        return totalPrice * (1 - discount);
    }

    function updateTotalAmount(discountedPrice) {
        let grandtotalAmount = document.getElementById('grandtotalAmount');
        grandtotalAmount.textContent = discountedPrice.toFixed(2);
    }

    function updateTotalDiscountAmount(discountAmount) {
        let totalDiscountAmount = document.getElementById('totaldiscount-amount');
        totalDiscountAmount.textContent = discountAmount.toFixed(2);
    }

    document.getElementById('applyCoupon').addEventListener('click', function() {
        let couponInput = document.getElementById('couponInput').value.trim();
        let discount = couponCodes[couponInput];
        if (discount !== undefined) {
            let totalPrice = calculateTotalAmount();
            let discountedPrice = calculateDiscountedPrice(totalPrice, discount);
            let discountAmount = totalPrice - discountedPrice;
            updateTotalAmount(discountedPrice);
            updateTotalDiscountAmount(discountAmount);
            document.getElementById('couponInput').value = '';
            document.getElementById('coupon-input-box').classList.add('disabledCouponBox');
            document.getElementById('copuponSuccessMessage').classList.add('success-show-message');
        } else {
            alert('Invalid coupon code, try "NEW15" or "Couple 20"');
        }
    });

    function updateApplyCouponButtonState() {
        let selectedButtons = document.querySelectorAll('.seat-inner-lists .selectedSeatBtn');
        let applyCouponButton = document.getElementById('applyCoupon');
        let couponInput = document.getElementById('couponInput');
        if (selectedButtons.length === 4) {
            applyCouponButton.removeAttribute('disabled');
            couponInput.removeAttribute('disabled');
        } else {
            applyCouponButton.setAttribute('disabled', 'disabled');
            couponInput.setAttribute('disabled', 'disabled');
        }
    }

    let seatButtons = document.querySelectorAll('.seat-inner-lists button');
    seatButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let totalPrice = calculateTotalAmount();
            updateTotalAmount(totalPrice);
            updateApplyCouponButtonState();
        });
    });

    updateApplyCouponButtonState();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('passengerForm');
    const seatButtons = document.querySelectorAll('.seat-inner-lists button');
    const popup = document.getElementById('popup');

    function isSeatSelected() {
        let isSelected = false;
        seatButtons.forEach(button => {
            if (button.classList.contains('selected')) {
                isSelected = true;
            }
        });
        return isSelected;
    }

    function handleSubmit(event) {
        if (!isSeatSelected()) {
            alert('Please select a seat before submitting the form.');
            event.preventDefault();
        } else {
            event.preventDefault();
            popup.style.display = 'flex';
            popup.classList.add('popup-activated');
        }
    }

    form.addEventListener('submit', handleSubmit);

    seatButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.classList.toggle('selected');
        });
    });

    const continueButton = document.querySelector('#popup .btn');
    continueButton.addEventListener('click', function() {
        popup.style.display = 'none';
        popup.classList.remove('popup-activated');
    });
});
