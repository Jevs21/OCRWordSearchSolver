$(document).ready(()=> {
    
    $("#generate_button").click(() => {
        $.ajax({
            method: 'get',
            url: '/generateMatrix',
            success: (data) => {
                console.log(data)
            }
        })
    });

});