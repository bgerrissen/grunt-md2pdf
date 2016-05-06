# grunt-md2pdf

> A simple plugin to converts markdown file(s) to pdf.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-md2pdf
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-md2pdf');
```

## The "md2pdf" task

### Overview
In your project's Gruntfile, add a section named `md2pdf` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  md2pdf: {
    make: {
      options: {
        // configuration options
      },
      'TARGET_DESTINATION.PDF': [
        'FIRST_FILE.MD',
        'SECOND_FILE.MD'
      ]
    }
  },
});
```

### Options

#### options.toc
Type: `boolean`
Default value: false

Whether or not to include a table of contents.

#### options.tocDepth
Type: `Number`
Default value: null

How many levels deep the table of contents could be.

#### options.tocTitle
Type: `String`
Default value: 'Table of contents'

Title to display above table of contents.

#### options.stylesheet
Type: `String`
Default value: PATH_TO_PLUGIN_STYLESHEET

CSS styling, defaults to a file included in the plugin that breaks `<h1>` tags to a new page in the PDF.

#### options.titlePage
Type: `String`
Default value: null

Path to a markdown/html title page. Will be wrapped in a `<div>` with className "title-page".


### Usage Examples

#### Default Options
In this example, we generate 2 pdf's for documentation with different styling each.

```js
grunt.initConfig({
  md2pdf: {
    options:{
      toc: true,
      tocDepth: 2,
      stylesheet: 'documentation/css/branding.css'
    },
    documentation_1: [
      'documentation/docs1/chapter1.md',
      'documentation/docs1/chapter2.md',
      'documentation/docs1/chapter3.md'
    ],
    documentation_2: {
      options:{
        stylesheet: 'documentation/css/other_branding.css'
      },
      'documentation/docs2/chapter1.md',
      'documentation/docs2/chapter2.md',
      'documentation/docs2/chapter3.md',
      'documentation/docs2/chapter4.md'
    }
  },
});
```

## CSS

The default styling included is quite simple:

```css
h1 {
    page-break-before:always;
}
h1.toc, .title-page h1 {
    page-break-before: avoid;
}
.break-page, .title-page {
    page-break-after:always;
}

.toc ul {
    list-style: none;
    padding: 0;
}
.toc ul ul {
    padding: 0 0 0 20px;
}

.title-page {
    text-align: center;
}
```

## Important notes:

- html-to-pdf makes use of a java library, that means you need java installed to use this plugin.

## Roadmap:

- 0.4.0 Code refactoring, better error management and prevent silent IO fails.
- 0.5.0 Replace html-to-pdf for a working PhantomJS solution (currently anchor links are broken in PhantomJS pdf renderer).

## Dependencies:

- [html-to-pdf](https://github.com/ChaosEvoker/html-to-pdf)
- [marked](https://github.com/chjj/marked)
- [marked-toc](https://github.com/jonschlinkert/marked-toc)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality.
Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.3.0 Title page support
- 0.2.3
- 0.2.2
- 0.2.1
- 0.2.0 Image support
- 0.1.0
