function userInformationHTML(userData) {
    return `<h2>${userData.name}
            <span class="small-name">
                (@<a href="${userData.html_url}" target="_blank">${userData.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${userData.html_url}" target="_blank">
                    <img src="${userData.avatar_url}" alt="${userData.login} Avatar" width="80px" height="80px" />
                </a>
            </div>
            <p>Followers: ${userData.followers} - Following: ${userData.following} <br> Repos: ${userData.public_repos}</p>
        </div>
    `
}


function fetchGitHubInformation(event) {
    var username = $('#gh-username').val(); //.val gets value in the text field

    if (!username) {
        $('#gh-user-data').html(`<h2>Please enter a Github username</h2>`);
        return;
    }

    $('#gh-user-data').html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..."/>
        </div>`
    );

    $.when(
            $.getJSON(`https://api.github.com/users/${username}`)
        ).then(
            function(response) {
                var userData = response;
                $("#gh-user-data").html(userInformationHTML(userData));
            },
            function(errorResponse) {
                if (errorResponse.status === 404) {
                    $("#gh-user-data").html(
                        `<h2>No info found for user ${username}</h2>`);
                }
                else {
                    console.log(errorResponse);
                    $("#gh-user-data").html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                }
            });
}
