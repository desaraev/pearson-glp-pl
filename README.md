
[![Build Status](https://travis-ci.com/pearson-ux/pearson-glp-pl.svg?token=yRiZW31ciCX2AwmRD34E&branch=master)](https://travis-ci.com/pearson-ux/pearson-glp-pl)

# Pearson GLP Patternlab - v0.6
http://45.55.127.237/pearson-glp-pl/


## Pattern Lab & Elements Boilerplate
This setup will get you started with running a basic Pattern Lab integrated with elements.  Perfect for prototyping HTML and SCSS in an atomic environment. To get started, install all the necessary dependencies and load configuration folders and files.
1. Clone or download this repository.
2. ``` $ npm install ```


## Starting up
The below command uses browser-sync, gulp sass, and other build tools to automate your workflow.  After you run it, you will be able to edit the files and the project and browser will reload with the changes.

1. ``` $ gulp ```

## Editing the SCSS / Styling

1. Elements & Global styles are located in the pattern-lab > scss folder
2. Pattern specific SCSS should be placed in the same folder as the pattern and imported from style.scss


## Editing and creating patterns

1. Pattern creation is done in the pattern-lab > source > _patterns folder.  The files in here will compile and be distributed to the public folder.
2. Only work in the source folder, the public folder is cleaned and rebuilt on save.

For more information on patternlab
1. http://patternlab.io
2. http://patternlab.io/docs/index.html


## Automatic Deployment
We're using Travis CI to test for automatic deployment.
1. First you will want to create a new repo here https://github.com/pearson-ux
2. If you dont have permissions please contact greg.davis@pearson.com to request access.  
3. Add the project to the repo.  (its assumed that you know how to do this, if not please reach out to david.odey@pearson.com for help)
4. In github go into the repository and click Settings.
5. Navigate to and click 'Integrations and Services'
6. Choose 'Travis CI' and click 'Add Service'
7. Next, navigate to Travis page for private repos: https://travis-ci.com/profile and enable your project.  You may need to link your Github account to Travis, if you have not previously used it.  If you need help, please contact david.odey@pearson.com
8. Open deploy.js in the '_tasks' folder
9. find the following code:             `remotePath: '/home/webroot/pearson-glp-pl'` and change that to             `remotePath: '/home/webroot/your-project-url-here'`
10. Commit your files and push them to github.  
11. Your files will automatically build and deploy to: http://45.55.127.237/your-project-url-here



## Contributing
Anyone can contribute to this project.  To get started:
1. grab an issue from the issues queue.
2. branch off of the latest master and complete the task
3. when complete perform a pull request so the team can review.
4. after review we will merge it to master

All components must be accessible and reviewed by the group.

