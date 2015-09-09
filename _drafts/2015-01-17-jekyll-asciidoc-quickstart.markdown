---
layout: post
title: jekyll-asciidoc-quickstart
homepage: https://github.com/asciidoctor/jekyll-asciidoc-quickstart
date: 2015-01-17 15:48:28
licence_link: https://github.com/asciidoctor/jekyll-asciidoc-quickstart/blob/master/LICENSE
---
= Jekyll AsciiDoc Quickstart
:toc:

The Jekyll AsciiDoc Quickstart project is a leg-up in starting your own website hosted on Github with content based in AsciiDoc.  This project combines the power of AsciiDoc with a beautiful CSS framework and blog-ready template on top of Github's existing publishing infrastructure.

== Directions

The goal of this procedure set is to configure a Travis CI job to listen for commits on the _master_ branch, automatically run the Jekyll build, and push the generated content to the _gh-pages_ branch.

=== {counter:directions}. Install Minimum Jekyll Requirements

You must install some software to execute commands in subsequent procedures. The Requirements on the http://jekyllrb.com/docs/installation/[Jekyll Installation] page describe how to install both ruby and rubygems.

For yum-based package managers, the command to run is:

  $ sudo yum install ruby rubygems

=== {counter:directions}. Install Travis Gem

When you install rubygems, you can use the gem internal package management system to install the Travis CI gem. This gem contains--among other things--a command-line tool for easily encrypting GitHub tokens.

Run the following command to install the Travis gem:

  $ gem install travis

=== {counter:directions}. Fork this Repository and Clone

To create your own copy of this repository, start by clicking the fork button in the upper right corner of the Github page.

Next, open a command line window and make a clone of your new repository:

  $ git clone https://github.com/YOUR-USERNAME/jekyll-asciidoc-quickstart

=== {counter:directions}. Enable Travis CI

Travis CI is configured initially through a browser.

To activate Travis CI for the Repository:

. Open https://travis-ci.org and create an account.
. Open your https://travis-ci.org/profile/[profile page] on Travis.
. Find the Jekyll repository, and turn on the switch.
. Click on repository settings (next to the switch) and enable “Build only if .travis.yml is present.”

=== {counter:directions}. Generate a GitHub Personal Access Token

Once the repository is activated in Travis, you need a GitHub token to pass into the Travis keytool.

To generate a new personal access token on GitHub:

. Open https://github.com/settings/tokens/new.
. Select the scope _public_repository_, and add a terse description.
. Confirm and save the settings.

=== {counter:directions}. Encrypt the GitHub Token for Travis CI

With the GitHub token created, you can now pass it to the Travis command-line tool, which adds the encrypted value to a file in your repository.

To encrypt the token and add it to the `.travis.yml` file in your cloned repository:

. Move into the same directory as `env.global`.
. Run the following command, replacing `<token>` with the GitHub token from the previous step.

  $ travis encrypt GH_TOKEN=<token> --add env.global

. Verify the script added the `secure` global environment variable to `.travis.yml`:
+
[source, yaml]
