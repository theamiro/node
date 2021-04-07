console.log("Before")
getUser(1)
	.then((user) => getRepos(user.username))
	.then((repo) => getCommits(repo[0]))
	.then((commits) => console.log(commits))
	.catch((err) => console.log("Error:", err))

console.log("After")

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading user from DB")
			resolve({id: id, username: "Amiro"})
		}, 2000)
	})
}
function getRepos(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Contacting Github API")
			resolve(["repo1", "repo2", "repo3"])
		}, 2000)
	})
}
function getCommits(repo) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Fetching Repo Commits")
			// resolve(["commit1", "commit2", "commit3"])
			reject(new Error("Error fetching commits for the said repository"))
		}, 2000)
	})
}
