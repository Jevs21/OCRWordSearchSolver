$(document).ready(()=> {
    
    $("#generate_button").click(() => {
        $.ajax({
            method: 'get',
            url: '/generateMatrix',
            success: (data) => {
                console.log(data)
                createMatrix(data.matrix);
            }
        })
    });
});

function createMatrix(matrix) {
    let string = '';
    for(let row = 0; row < matrix.length; row++) {
        string += '<div class=\'row letter_row\'>';
        for(let col = 0; col < matrix[0].length; col++) {
            string += `<div class='letter'><span id='row_${row}_col_${col}'>${matrix[row][col].toUpperCase()}</span></div>`
        }
        string += '</div>'
    }
    $('#content_container').html(string);

    var my_css_class = { float : 'left', width: `${Math.floor(800 / matrix.length)}px` };

    $(".letter").css(my_css_class);

}