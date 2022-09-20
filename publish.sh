vite build
git add .
git commit -m "build: new"
npm version patch
git add .
git commit -m "versioning: update"
git push
npm publish
