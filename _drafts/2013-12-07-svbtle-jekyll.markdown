---
layout: post
title: svbtle-jekyll
homepage: https://github.com/orlando/svbtle-jekyll
date: 2013-12-07 19:11:02
licence_link: https://github.com/orlando/svbtle-jekyll/blob/master/LICENSE.txt
---
# Svbtle Jekyll

A Jekyll blog with Svbtle theme.

## Generators

Since we need to setup some stuff in the post front matter, there's a post generator to make things easier

`rake posts:create`

it accepts the following params (order matters)

* **post_name**: your post name
* **category_name**: your category name
* **date**: date in ISO format (optional)

### Example

`rake posts:create "my new shiny post" code 2013-12-07`

this will create a file called `2013-12-07-my-new-shiny-post.markdown` in the `_posts` directory with the following content:

```
