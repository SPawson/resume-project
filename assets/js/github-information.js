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

function repoInformationHTML(repo) {

    var listItemsHTML = repo.map(function(repo) {
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>
            `
    });

    if (repo.length == 0) {
        return `
        <div class="clearfix repo-list">
            No Repositories found!
        </div>
        `;
    }
    else {
        return `<div class="clearfix repo-list">
                    <p><strong>Repo List:</strong></p>
                    <ul>
                        ${listItemsHTML.join('\n')}
                    </ul>
                </div>`
    }
}

function fetchGitHubInformation(event) {
    $('#gh-user-data').html('');
    $('#gh-repo-data').html('');

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
        $.getJSON(`https://api.github.com/users/${username}`), //first response
        $.getJSON(`https://api.github.com/users/${username}/repos`) //second response
    ).then(
        function(firstResponse, secondResponse) {
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
            }
            else if (errorResponse.status === 403) {
                var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000);
                
                
                $("#gh-user-data").html(
                    `<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            }
            else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

$(document).ready(fetchGitHubInformation);
