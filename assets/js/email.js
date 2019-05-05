function sendMail(contactForm) {
    var templateParams = {
        'from_name': contactForm.fullname.value,
        'from_email': contactForm.emailAddress.value,
        'project_request': contactForm.projectSummary.value
    };

    emailjs.send('default_service', 'sam', templateParams)

    .then(
        function(response) {
            console.log('Success!', response);
        },
        function(error) {
            console.log('There was an error', error);
        });

}


/* .then(function(response){
        alert('Email sent');
    },
    function(error) {
        console.log('Error',error);
    });*/
