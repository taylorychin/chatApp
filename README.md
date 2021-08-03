To sync your code:

git fetch --all
git reset --hard origin/main


# MERN-Stack Infrastructure
Clone this repo to provide the starter code for a comprehensive MERN-Stack project including token-based authentication.

reset commit history
So that you don't have a bunch of commits made by me, let's start a fresh local repo:
rm -rf .git
git init

Next, let's ensure that we've committed our code as it stands:
git add -A
git commit -m "MERN-Stack Infrastructure"

Refresh the Repo

Refreshing the repo should confirm that the repo is ready for cloning when needed!
5. Using mern-infrastructure to Create MERN-Stack Projects in the Future

Here's the process to create a new MERN-Stack project that starts with the infrastructure code:

    1. Clone the mern-infrastructure repo.
    2. Rename the newly mern-infrastructure folder to the name of your new project.
    3. Optionally, update the "name": "mern-infrastructure" in package.json.
    4. Create a new repo on your personal GH account.
    5. Copy the GH repo's URL.
    6. Update the remote's URL: git remote set-url origin <paste the copied url>
    7. Push for the first time: git push -u origin main
