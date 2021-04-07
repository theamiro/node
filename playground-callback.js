console.log("Before")
getUser(1, displayUser)
console.log("After")

function getUser(id, callback) {
	setTimeout(() => {
		console.log("Reading user from DB")
		callback({id: id, username: "Amiro"})
	}, 2000)
}
function getRepos(username, callback) {
	setTimeout(() => {
		callback(["repo1", "repo2", "repo3"])
	}, 2000)
}
function getCommits(repo, callback) {
	setTimeout(() => {
		callback(["commit1", "commit2", "commit3"])
	}, 2000)
}

function displayCommits(commits) {
	console.log(commits)
}

function displayRepos(repos) {
	console.log(repos)
	getCommits(repos[0], displayCommits)
}

function displayUser(user) {
	console.log(user)
	getRepos(user.username, displayRepos)
}
