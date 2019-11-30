$(document).ready(()=> {
    
    $("#generate_button").click(() => {
        $.ajax({
            method: 'get',
            url: '/generateMatrix',
            success: (data) => {
                console.log(data)
                createMatrix(data.matrix);
                createResults(data.results, data.matrix[0].length, data.matrix.length);
            }
        })
    });

    $("#upload_button").click(() => {
        processImage();
    });

});


function createResults(res, width, height) {
    // Set results contianer
    let string = `
    <div class='row'>
        <h2>${res.length} words found!</h2>
    </div>`;

    string += `<div class='row'><p>`
    let arr = [];
    for(let r of res) {
        arr.push(r.word);
    }
    arr.sort();
    for(let r of arr) {
        string += `<span class='word>${r}</span>, `;
    }
    string += `</p></div>`;
    $('#results_container').html(string);


    // Set coloured words
    var found_word_class = [
        { backgroundColor : 'rgb(255, 253, 140)' }, // yellow
        { backgroundColor : 'rgb(208, 255, 204)' }, // green
        { backgroundColor : 'rgb(204, 224, 255)' }, // blue
        { backgroundColor : 'rgb(255, 162, 148)' }, // red
        { backgroundColor : 'rgb(255, 199, 253)' }, // pink
        { backgroundColor : 'rgb(255, 195, 143)' }, // orange
        { backgroundColor : 'rgb(191, 255, 251)' } // cyan
    ];
    for(let r of res) {
        let color_ind = Math.floor(Math.random() * found_word_class.length); 
        //start ind is inclusive, end ind is not
        let start_row = r.loc.start.row;
        let start_col = r.loc.start.col;
        let end_row = r.loc.end.row;
        let end_col = r.loc.end.col;

        if(start_row - end_row != 0) {
            for(let row = start_row; row < end_row; row++) {
                let letter = $(`#row_${row}_col_${start_col}`);
                letter.css(found_word_class[color_ind]);
            }
        } else if (start_col - end_col != 0) {
            for(let col = start_col; col < end_col; col++) {
                let letter = $(`#row_${start_row}_col_${col}`);
                letter.css(found_word_class[color_ind]);
            }
        } else {
            console.log("Error in createResults");
        }
    }
}

function createMatrix(matrix) {
    let string = '';
    for(let row = 0; row < matrix.length; row++) {
        string += '<div class=\'row letter_row\'>';
        for(let col = 0; col < matrix[0].length; col++) {
            string += `<div id='row_${row}_col_${col}' class='letter'><span >${matrix[row][col].toUpperCase()}</span></div>`
        }
        string += '</div>'
    }
    $('#content_container').html(string);

    var my_css_class = { float : 'left', width: `${Math.floor(800 / matrix.length)}px` };

    $(".letter").css(my_css_class);

}



function processImage() {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    let subscriptionKey = '3799e9662dee4923a4b9211c94bdc9bb';
    let endpoint = 'https://wordsearchsolver.cognitiveservices.azure.com/';
    if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }
    
    var uriBase = endpoint + "vision/v2.1/read/core/asyncBatchAnalyze";

    // Display the image.
    var sourceImageUrl = "http://www.jordanevans.me/JEVS/WordSearchImages/test3.png";
    //var sourceImageUrl = "https://global.oup.com/us/companion.websites/9780199997961/images/ch07.jpg";

    // This operation requires two REST API calls. One to submit the image
    // for processing, the other to retrieve the text found in the image.
    //
    // Make the first REST API call to submit the image for processing.
    $.ajax({
        url: uriBase,

        // Request headers.
        beforeSend: function(jqXHR){
            jqXHR.setRequestHeader("Content-Type","application/json");
            jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })

    .done(function(data, textStatus, jqXHR) {
        // Note: The response may not be immediately available. Text
        // recognition is an asynchronous operation that can take a variable
        // amount of time depending on the length of the text you want to
        // recognize. You may need to wait or retry the GET operation.
        //
        // Wait ten seconds before making the second REST API call.
        setTimeout(function () {
            // "Operation-Location" in the response contains the URI
            // to retrieve the recognized text.
            var operationLocation = jqXHR.getResponseHeader("Operation-Location");

            // Make the second REST API call and get the response.
            $.ajax({
                url: operationLocation,

                // Request headers.
                beforeSend: function(jqXHR){
                    jqXHR.setRequestHeader("Content-Type","application/json");
                    jqXHR.setRequestHeader(
                        "Ocp-Apim-Subscription-Key", subscriptionKey);
                },

                type: "GET",
            })

            .done(function(data) {
                // Show formatted JSON on webpage.
                console.log("RESPONSE:");
                console.log(data.recognitionResults[0]);

                let unformatted_res = data.recognitionResults[0];
                let formatted_res = []

                for (let line of unformatted_res.lines) {
                    formatted_res.push(line.text.replace(/\s/g, '').toLowerCase());
                }

                $.ajax({
                    method: 'get',
                    url: '/generateMatrixFromImg',
                    data: {
                        result: formatted_res
                    },
                    success: (data) => {
                        createMatrix(data.matrix);
                        createResults(data.results, data.matrix[0].length, data.matrix.length);
                    }
                })
            })

            .fail(function(jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " :
                    errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ? "" :
                    (jQuery.parseJSON(jqXHR.responseText).message) ?
                        jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
                alert(errorString);
            });
        }, 5000);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
        // Put the JSON description into the text area.
        console.log(JSON.stringify(jqXHR, null, 2));

        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " :
            errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" :
            (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message :
                jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
};