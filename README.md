# resume-builder

Writing resumes is hard, messing with margins in word processors is tedious. I think better in CSS than in Microsoft Word, and I'd rather keep all my data in a pared-down format like YAML. I built this resume builder for myself — but I hope you enjoy using it too!

- Write YAML in provided text editor, see resume update live!
- Print to save a PDF
- View estimated printer margins

The app is a static site built with Ember.js, hosted on GitHub Pages. If you'd like to do more customization, fork this repository and take a look at [`app/templates/components/resume-layout.hbs`](app/templates/components/resume-layout.hbs) or [`app/styles/app.scss`](app/styles/app.scss) to get started.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd resume-builder`
* `yarn install`

## Running / Development

* `ember serve`
* Visit [http://localhost:4200/resume-builder/](http://localhost:4200/resume-builder/) (note: the trailing slash is important!)

### Building & Deploying

The app is "deployed" by pushing built Ember assets to the `gh-pages` branch so that they can be served by GitHub Pages. After making changes to the app, deploy them with:

* `ember deploy production`

Note: this will make a copy of the repository on your computer, called `deploy-resume-builder`; scripts will run in that repository to create a new commit and push it to the correct branch on GitHub.


