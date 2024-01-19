const apiUrl = 'https://api.github.com/users/';

let currentPage = 1;
let reposPerPage = 10;
let totalRepos = 0;

function fetchRepositories() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    const url = `${apiUrl}${username}/repos?per_page=${reposPerPage}&page=${currentPage}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching repositories: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            displayRepositories(data);
            updatePaginationButtons();
        })
        .catch(error => {
            console.error(error);
            alert('Error fetching repositories. Please check the username and try again.');
        });
}

function displayRepositories(repositories) {
    const repositoriesDiv = document.getElementById('repositories');
    repositoriesDiv.innerHTML = '';

    repositories.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.innerHTML = `<strong>${repo.name}</strong>: ${repo.description || 'No description'}`;
        repositoriesDiv.appendChild(repoDiv);
    });

    totalRepos = repositories.length;
}

function updatePaginationButtons() {
    const paginationButtonsDiv = document.getElementById('pagination-buttons');
    paginationButtonsDiv.innerHTML = '';

    const totalPages = Math.ceil(totalRepos / reposPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('page-button');
        button.textContent = i;
        button.addEventListener('click', () => changePage(i));
        paginationButtonsDiv.appendChild(button);
    }
}

function changePage(page) {
    currentPage = page;
    fetchRepositories();
}

function changeReposPerPage() {
    reposPerPage = parseInt(document.getElementById('reposPerPage').value);
    currentPage = 1;
    fetchRepositories();
}
