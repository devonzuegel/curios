This is a living document. It's changing all of the time, because Curios's web app is evolving constantly, and because Devon certainly didn't think to include the answers to every possible question you might have. So if the answer isn't in here, it doesn't necessarily mean that you should already know it! It might mean that we haven't thought to document it yet or that we haven't come across it yet — that's a great opportunity for you to figure out what the answer is and include it in here. :)

## Table of Contents

<!-- TOC -->

* [Table of Contents](#table-of-contents)
* [Set up](#set-up)
* [Available Scripts](#available-scripts)
  * [`yarn start:dev`](#yarn-startdev)
  * [`yarn start`](#yarn-start)
  * [`yarn test`](#yarn-test)
  * [`yarn run build`](#yarn-run-build)
  * [Note on `post` and `pre` scripts](#note-on-post-and-pre-scripts)
* [Frontend stack](#frontend-stack)
  * [Useful resources](#useful-resources)
* [Deployment](#deployment)
* [Running Tests](#running-tests)
  * [Principles and Testing Hierarchy](#principles-and-testing-hierarchy)
  * [Unit Tests](#unit-tests)
    * [Filename Conventions](#filename-conventions)
    * [Command Line Interface](#command-line-interface)
    * [Testing Components](#testing-components)
    * [Focusing and Excluding Tests](#focusing-and-excluding-tests)
    * [Coverage Reporting](#coverage-reporting)
  * [Continuous Integration](#continuous-integration)
  * [On your own environment](#on-your-own-environment) - [Windows (cmd.exe)](#windows-cmdexe) - [Linux, macOS (Bash)](#linux-macos-bash)
  * [Notes on `jsdom`](#notes-on-jsdom)
  * [Snapshot Testing](#snapshot-testing)
* [Formatting Code Automatically](#formatting-code-automatically)
* [Installing Dependencies](#installing-dependencies)
* [Importing a Component](#importing-a-component)
  * [`Button.ts`](#buttonts)
  * [`DangerButton.ts`](#dangerbuttonts)
  * [Code splitting with React Router](#code-splitting-with-react-router)
* [Adding a Stylesheet](#adding-a-stylesheet)
* [Post-Processing CSS](#post-processing-css)
* [Adding Images, Fonts, and Files](#adding-images-fonts-and-files)
* [Using the `public` Folder](#using-the-public-folder)
  * [Changing the HTML](#changing-the-html)
  * [Adding Assets Outside of the Module System](#adding-assets-outside-of-the-module-system)
  * [When to Use the `public` Folder](#when-to-use-the-public-folder)
* [Using Global Variables](#using-global-variables)
* [Adding Custom Environment Variables](#adding-custom-environment-variables)
  * [Referencing Environment Variables in the HTML](#referencing-environment-variables-in-the-html)
  * [Adding Temporary Environment Variables In Your Shell](#adding-temporary-environment-variables-in-your-shell)
    * [Windows (cmd.exe)](#windows-cmdexe-1)
    * [Linux, macOS (Bash)](#linux-macos-bash-1)
  * [Adding Development Environment Variables In `.env`](#adding-development-environment-variables-in-env)
* [Developing Components in Isolation](#developing-components-in-isolation)
* [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)

<!-- /TOC -->

## Set up

1. Clone the repository, then `cd` into the new `curios-web` directory.
2. Run `yarn` to install all the dependencies. (You may need to install `yarn` first: `brew install yarn`.)
3. Install [`serve`](https://github.com/zeit/serve) globally: `yarn global add serve`
4. Install Java: `brew cask install java`
5. Install watchman (to run `jest` continuously in watch mode): `brew install watchman`

For your text editor, I highly recommend VS Code. Its support for Typescript and Javascript is phenomenal. You set it up by following the directions here: https://code.visualstudio.com/docs/setup/mac.

## Available Scripts

The following list may not be comprehensive, though it describes the most important scripts. (The full, up-to-date list of available scripts is in [`package.json`](package.json) under `scripts`.)

### `yarn start:dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn start`

Runs the app in production mode.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### Note on `post` and `pre` scripts

These run before and after a given script. So if you define the script `foobar`, you can also have `prefoobar` and `postfoobar`. Then when you run `yarn foobar`, Yarn will look for these hooks and run them accordingly. These are good for things like setup and teardown of tests, for example.

## Frontend stack

This is a brief glossary of the frontend stack we use in this `curios-web` project. It is not exhaustive, but it should give you a high level understanding of how the various tools and frameworks we use work together. If you have more detailed questions about a particular piece, other parts of this README probably go into greater depth. If you don't find

| Name            | What?                                                                                                                                            | Where                                                                | Learn More                                                                                                                    | Tutorial                                                                                             |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Typescript      | Typed Javascript, transpiled by Webpack to Javascript                                                                                            | `src/` contains most of the Typescript                               | [TypeScript](https://www.typescriptlang.org/)                                                                                 | [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) |
| Yarn            | Better package manager for Javascript projects; a better `npm`; the general wrappers around our whole development flow                           | `package.json` defines all the scripts this can run                  | [YarnPKG](https://yarnpkg.com/en/)                                                                                            |                                                                                                      |
| Webpack         | Compiles/bundles all of our modules (including transpiling all the `.ts` and `tsx` files to Javascript)                                          | `config/weback.config.*.js`                                          | [Webpack](https://webpack.js.org/)                                                                                            | [Weback+React+TS Helloworld](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)      |
| React           | Manages all the `html`/`js` components. We will be writing `tsx` (Typescript) files, not the normal `jsx` files                                  | `src/components/`, `src/pages/`                                      | [Normal React](https://reactjs.org/) [Changes introduced by using TSX](https://www.typescriptlang.org/docs/handbook/jsx.html) | [React](https://reactjs.org/tutorial/tutorial.html)                                                  |
| ReactDom        | The glue that plugs React to the DOM. Generally you don't care about this too much                                                               | n/a                                                                  |                                                                                                                               |                                                                                                      |
| Redux           | State management for React. This does not directly interact with the server, but it is populated with intermediate state from or for the server. | src/redux/\*                                                         | [React Redux](https://redux.js.org/docs/basics/UsageWithReact.html)                                                           |                                                                                                      |
| CSSNext/PostCSS | Next version of CSS. New features/syntax for CSS. This is transpiled by Webpack to CSS for backward compatibility                                | `src/global.css`, `src/variables.css`, `src/components/\*/index.css` | [CSSNext](http://cssnext.io/) and [How we do post CSS processing](#post-processing-css)                                       |                                                                                                      |
| CSS Modules     | Allows you to modularly pull in CSS in to react components. Webpack does the actual pulling in of the CSS in the right way                       | src/components/\*/index.css                                          | [Adding a Stylesheet](#adding-a-stylesheet)                                                                                   |                                                                                                      |
| Jest            | Test framework, which you can run with `yarn test`                                                                                               |                                                                      |                                                                                                                               |                                                                                                      |
| Storybook       | Allows you to develop individual components in isolation                                                                                         | src/stories/\*                                                       | [Developing Components](#developing-components-in-isolation)                                                                  |                                                                                                      |
| Nightwatch      | Runs our functional tests (FTs)                                                                                                                  |                                                                      | [Functional Tests](#functional-tests)                                                                                         |                                                                                                      |

### Useful resources

**React**

* why React? — https://medium.freecodecamp.org/yes-react-is-taking-over-front-end-development-the-question-is-why-40837af8ab76
  * unidirectional data flow
  * stateless components that are a function of props passed to them
  * declarative
* treating a component's internal state just like a React store — https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
  * I touched upon this briefly at the end... it's an advanced concept, so I recommend gaining comfort with React's API before diving into this concept

**Redux**

* https://code-cartoons.com/a-cartoon-intro-to-readux-3afb775501a6
* we put as little into Redux stores as possible, basically only for things that have to be in global/application state
  * How to choose between Redux's store and React's state? https://github.com/reactjs/redux/issues/1287
  * https://stackoverflow.com/questions/35328056/react-redux-should-all-component-states-be-kept-in-redux-store
  * this is more an art than a science
  * https://medium.com/modern-user-interfaces/how-we-redux-part-4-reducers-and-stores-f4a0ebcdc22a

**ES6 Promises**

* https://kosamari.com/notes/the-promise-of-a-burger-party

## Deployment

This clientside app is deployed to staging at at:
https://curios-web--staging.herokuapp.com/

This clientside app is deployed to prod at at:
https://curios-web--live.herokuapp.com/

## Running Tests

### Principles and Testing Hierarchy

There is a broad spectrum of component testing techniques. They range from a “smoke test” verifying that a component renders without throwing, to shallow rendering and testing some of the output, to full rendering and testing component lifecycle and state changes.

The boundaries between each of these types of tests is blurry, but here's a list of test types, ranging from roughly least to most expensive and least to most comprehensive (note that "comprehensive" isn't a positive term necessarily, it just describes how big of a chunk of the app we're testing):

* [**unit tests (UTs)**](#unit-tests) exercise individual functions or components
  * should not depend on external state (e.g. no network calls)
  * co-located with the implementation
  * this includes tests for things like `components`, `reducers`, `utils`
* **integration tests (ITs)** exercise groups of components together
  * this is a kind of "in between" category... they're more like FTs than UTs, just a composition of units rather than a single unit, so sometimes the "unit tests" category refers to these as well
  * this includes tests for things like `pages`, `stories`
  * co-located with the implementation
* [**functional tests (FTs)**](#functional-tests) test the app from the perspective of a user
  * clicking around the site
  * depends on a real DB / the real API
  * we use [Sauce Labs](https://saucelabs.com/beta/dashboard) to record these test runs

Different projects choose different testing tradeoffs based on how often components change, and how much logic they contain.

We should have lots of UTs, because they run cheap and they're easy to write/update. We should have as few FTs as possible, because they're expensive to run, write, and change.

![](https://watirmelon.files.wordpress.com/2011/06/automatedtestingpyramid.png)

### Unit Tests

We use [Jest](https://facebook.github.io/jest/) to run our unit tests.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

#### Filename Conventions

Jest will look for test files with the `.test.ts` suffix, which can be located at any depth under the `src` top level folder. Our convention is to put the test files next to the code they are testing so that relative imports appear shorter. For example, if `App.test.ts` and `App.ts` are in the same folder, the test just needs to `import App from './App'` instead of a long relative path. Colocation also helps find tests more quickly in larger projects.

#### Command Line Interface

When you run `yarn test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `yarn start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs. You can learn the commands from the “Watch Usage” note that the watcher prints after every run:

![Jest watch mode](http://facebook.github.io/jest/img/blog/15-watch.gif)

#### Testing Components

```js
import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
```

This test mounts a component and makes sure that it didn’t throw during rendering. Tests like this provide a lot value with very little effort so they are great as a starting point, and this is the test you will find in `src/App.test.js`.

When you encounter bugs caused by changing components, you will gain a deeper insight into which parts of them are worth testing in your application. This might be a good time to introduce more specific tests asserting specific expected output or behavior.

If you’d like to test components in isolation from the child components they render, use the [`shallow()` rendering API](http://airbnb.io/enzyme/docs/api/shallow.html) from [Enzyme](http://airbnb.io/enzyme/). To install it, run:

```sh
yarn add enzyme react-test-renderer
```

You can write a smoke test with it too:

```js
import * as React from 'react'
import {shallow} from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App />)
})
```

Unlike the previous smoke test using `ReactDOM.render()`, this test only renders `<App>` and doesn’t go deeper. For example, even if `<App>` itself renders a `<Button>` that throws, this test will pass. Shallow rendering is great for isolated unit tests, but you may still want to create some full rendering tests to ensure the components integrate correctly. Enzyme supports [full rendering with `mount()`](http://airbnb.io/enzyme/docs/api/mount.html), and you can also use it for testing state changes and component lifecycle.

You can read the [Enzyme documentation](http://airbnb.io/enzyme/) for more testing techniques. Enzyme documentation uses Chai and Sinon for assertions but you don’t have to use them because Jest provides built-in `expect()` and `jest.fn()` for spies.

Here is an example from Enzyme documentation that asserts specific output, rewritten to use Jest matchers:

```js
import * as React from 'react'
import {shallow} from 'enzyme'
import App from './App'

it('renders welcome message', () => {
  const wrapper = shallow(<App />)
  const welcome = <h2>Welcome to React</h2>
  // expect(wrapper.contains(welcome)).to.equal(true)
  expect(wrapper.contains(welcome)).toEqual(true)
})
```

All Jest matchers are [extensively documented here](http://facebook.github.io/jest/docs/expect.html).<br>
Nevertheless you can use a third-party assertion library like [Chai](http://chaijs.com/) if you want to, as described below.

Additionally, you might find [jest-enzyme](https://github.com/blainekasten/enzyme-matchers) helpful to simplify your tests with readable matchers. The above `contains` code can be written simpler with jest-enzyme.

```js
expect(wrapper).toContainReact(welcome)
```

To enable this, install `jest-enzyme`:

```sh
yarn add jest-enzyme
```

Import it in [`src/setupTests.js`](#initializing-test-environment) to make its matchers available in every test:

```js
import 'jest-enzyme'
```

#### Focusing and Excluding Tests

You can replace `it()` with `xit()` to temporarily exclude a test from being executed.

Similarly, `fit()` lets you focus on a specific test without running any other tests.

#### Coverage Reporting

Jest has an integrated coverage reporter that works well with ES6 and requires no configuration.

Run `yarn test -- --coverage` (note extra `--` in the middle) to include a coverage report like this:

![coverage report](http://i.imgur.com/5bFhnTS.png)

Note that tests run much slower with coverage so it is recommended to run it separately from your normal workflow.

### Continuous Integration

We use Circle for our CI.

By default `yarn test` runs the watcher with interactive CLI. However, **you can force it to run tests once and finish the process** by setting an environment variable called `CI`.

When creating a build of your application with `yarn run build` linter warnings are not checked by default. Like `yarn test`, you can force the build to perform a linter warning check by setting the environment variable `CI`. If any warnings are encountered then the build fails.

Popular CI servers (including Circle, which is what we use) already set the environment variable `CI` by default, but you can do this yourself too:

### On your own environment

##### Windows (cmd.exe)

```cmd
set CI=true && yarn test
```

```cmd
set CI=true && yarn run build
```

(Note: the lack of whitespace is intentional.)

##### Linux, macOS (Bash)

```bash
CI=true yarn test
```

```bash
CI=true yarn run build
```

The test command will force Jest to run tests once instead of launching the watcher.

> If you find yourself doing this often in development, please [file an issue](https://github.com/facebookincubator/create-react-app/issues/new) to tell us about your use case because we want to make watcher the best experience and are open to changing how it works to accommodate more workflows.

The build command will check for linter warnings and fail if any are found.

### Notes on `jsdom`

Here is a list of APIs that **need [jsdom](https://github.com/tmpvar/jsdom)**:

* Any browser globals like `window` and `document`
* [`ReactDOM.render()`](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render)
* [`TestUtils.renderIntoDocument()`](https://facebook.github.io/react/docs/test-utils.html#renderintodocument) ([a shortcut](https://github.com/facebook/react/blob/34761cf9a252964abfaab6faf74d473ad95d1f21/src/test/ReactTestUtils.js#L83-L91) for the above)
* [`mount()`](http://airbnb.io/enzyme/docs/api/mount.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

In contrast, **jsdom is not needed** for the following APIs:

* [`TestUtils.createRenderer()`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) (shallow rendering)
* [`shallow()`](http://airbnb.io/enzyme/docs/api/shallow.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

Finally, jsdom is also not needed for [snapshot testing](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html).

### Snapshot Testing

Snapshot testing is a feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output. There are some gotchas with Snapshot testing (e.g. if you automatically update the saved snapshot when the implementation is wrong, your tests will begin asserting _incorrect_ behavior), so before you get started be sure to [read more about snapshot testing.](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html)

As of December 6 2017, we don't have any Snapshot tests yet, but as our app becomes more complex it will be a super useful tool.

## Formatting Code Automatically

Prettier formats our code whenever we make a commit in git. Prettier is an opinionated code formatter with support for JavaScript, CSS and JSON. With Prettier you can format the code you write automatically to ensure a code style within your project. See the [Prettier's GitHub page](https://github.com/prettier/prettier) for more information, and look at this [page to see it in action](https://prettier.github.io/prettier/).

## Installing Dependencies

Install new dependencies with `yarn`:

```sh
yarn add my-new-dependency
```

To learn more about the benefits of `yarn` over `yarn`, [this post](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/) is a good introduction.

## Importing a Component

This project setup supports ES6 modules thanks to Babel.<br>
While you can still use `require()` and `module.exports`, we encourage you to use [`import` and `export`](http://exploringjs.com/es6/ch_modules.html) instead.

For example:

### `Button.ts`

```ts
import * as React from 'react'

class Button extends React.Component {
  render() {
    // ...
  }
}

export default Button // Don’t forget to use export default!
```

### `DangerButton.ts`

```ts
import * as React from 'react'
import Button from './Button' // Import a component from another file

class DangerButton extends React.Component {
  render() {
    return <Button color="red" />
  }
}

export default DangerButton
```

Stick to using default imports and exports when a module only exports a single thing (for example, a component). That’s what you get when you use `export default Button` and `import Button from './Button'`.

Named exports are useful for utility modules that export several functions. A module may have at most one default export and as many named exports as you like.

Learn more about ES6 modules:

* [When to use the curly braces?](http://stackoverflow.com/questions/36795819/react-native-es-6-when-should-i-use-curly-braces-for-import/36796281#36796281)
* [Exploring ES6: Modules](http://exploringjs.com/es6/ch_modules.html)
* [Understanding ES6: Modules](https://leanpub.com/understandinges6/read#leanpub-auto-encapsulating-code-with-modules)

### Code splitting with React Router

Check out [this tutorial](http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html) on how to use code splitting with React Router. You can find the companion GitHub repository [here](https://github.com/AnomalyInnovations/serverless-stack-demo-client/tree/code-splitting-in-create-react-app).

This app doesn't currently support code splitting, but we may add it in later for performance and/or for obscuring API endpoints.

## Adding a Stylesheet

This project setup uses [Webpack](https://webpack.js.org/) for handling all assets. Webpack offers a custom way of “extending” the concept of `import` beyond JavaScript. To express that a Typescript file depends on a CSS file, you need to **import the CSS into the Typescript file**:

`Button/index.css`:

```css
.button {
  padding: 20px;
}
```

`Button/index.tsx`:

```tsx
import * as React from 'react'
const styles = require('./index.css')

class Button extends React.Component {
  render() {
    // You can use them as regular CSS styles
    return <div className={styles.button} />
  }
}
```

If you log the contents of the `styles` variable, you'll see that it looks something like:

```ts
{
  "button": "index__button___3cj18"
}
```

This is what is called a "CSS module". It effectively namespaces our CSS classes, so if somewhere else we happen to have a class with the same name we won't be unpleasantly surprised with a style clash. Scoping class names to the file from which their imported is a huge win, and you can learn more about it [here](http://andrewhfarmer.com/what-are-css-modules/).

## Post-Processing CSS

We use `post-css` to do post-processing on our CSS. This includes autoprefixing, import handling, and CSSNext features. You can dig into the details for this more in the Webpack configs:

* [`config/webpack.config.dev.js`](config/webpack.config.dev.js)
* [`config/webpack.config.prod.js`](config/webpack.config.prod.js)

## Adding Images, Fonts, and Files

With Webpack, using static assets like images and fonts works similarly to CSS.

You can **`import` a file right in a JavaScript module**. This tells Webpack to include that file in the bundle. Unlike CSS imports, importing a file gives you a string value. This value is the final path you can reference in your code, e.g. as the `src` attribute of an image or the `href` of a link to a PDF.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. SVG files are excluded due to [#1153](https://github.com/facebookincubator/create-react-app/issues/1153).

Here is an example:

```tsx
import * as React from 'react'
import logo from './logo.png' // Tell Webpack this JS file uses this image

console.log(logo) // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />
}

export default Header
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack finds all relative module references in CSS (they start with `./`) and replaces them with the final paths from the compiled bundle. If you make a typo or accidentally delete an important file, you will see a compilation error, just like when you import a non-existent JavaScript module. The final filenames in the compiled bundle are generated by Webpack from content hashes. If the file content changes in the future, Webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.

Please be advised that this is also a custom feature of Webpack.

**It is not required for React** but many people enjoy it (and React Native uses a similar mechanism for images).<br>
An alternative way of handling static assets is described in the next section.

## Using the `public` Folder

> Note: this feature is available with `react-scripts@0.5.0` and higher.

### Changing the HTML

The `public` folder contains the HTML file so you can tweak it, for example, to [set the page title](#changing-the-page-title).
The `<script>` tag with the compiled code will be added to it automatically during the build process.

### Adding Assets Outside of the Module System

You can also add other assets to the `public` folder.

Note that we normally encourage you to `import` assets in JavaScript files instead.
For example, see the sections on [adding a stylesheet](#adding-a-stylesheet) and [adding images and fonts](#adding-images-fonts-and-files).
This mechanism provides a number of benefits:

* Scripts and stylesheets get minified and bundled together to avoid extra network requests.
* Missing files cause compilation errors instead of 404 errors for your users.
* Result filenames include content hashes so you don’t need to worry about browsers caching their old versions.

However there is an **escape hatch** that you can use to add an asset outside of the module system.

If you put a file into the `public` folder, it will **not** be processed by Webpack. Instead it will be copied into the build folder untouched. To reference assets in the `public` folder, you need to use a special variable called `PUBLIC_URL`.

Inside `main.html`, you can use it like this:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.png">
```

Only files inside the `public` folder will be accessible by `%PUBLIC_URL%` prefix. If you need to use a file from `src` or `node_modules`, you’ll have to copy it there to explicitly specify your intention to make this file a part of the build.

When you run `yarn run build`, Create React App will substitute `%PUBLIC_URL%` with a correct absolute path so your project works even if you use client-side routing or host it at a non-root URL.

In JavaScript code, you can use `process.env.PUBLIC_URL` for similar purposes:

```js
render() {
  // Note: this is an escape hatch and should be used sparingly!
  // Normally you should use `import` for getting asset URLs
  // as described in “Adding Images and Fonts” above this section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />
}
```

Keep in mind the downsides of this approach:

* None of the files in `public` folder get post-processed or minified.
* Missing files will not be called at compilation time, and will cause 404 errors for your users.
* Result filenames won’t include content hashes so you’ll need to add query arguments or rename them every time they change.

### When to Use the `public` Folder

Normally you should import [stylesheets](#adding-a-stylesheet), [images, and fonts](#adding-images-fonts-and-files) from JavaScript.
The `public` folder is useful as a workaround for a number of less common cases:

* You need a file with a specific name in the build output, such as [`manifest.webmanifest`](https://developer.mozilla.org/en-US/docs/Web/Manifest).
* You have thousands of images and need to dynamically reference their paths.
* You want to include a small script like [`pace.js`](http://github.hubspot.com/pace/docs/welcome/) outside of the bundled code.
* Some library may be incompatible with Webpack and you have no other option but to include it as a `<script>` tag.

Note that if you add a `<script>` that declares global variables, you also need to read the next section on using them.

## Using Global Variables

When you include a script in the HTML file that defines global variables and try to use one of these variables in the code, the linter will complain because it cannot see the definition of the variable.

You can avoid this by reading the global variable explicitly from the `window` object, for example:

```js
const = window.$
```

This makes it obvious you are using a global variable intentionally rather than because of a typo.

Alternatively, you can force the linter to ignore any line by adding `// eslint-disable-line` after it.

## Adding Custom Environment Variables

> Note: this feature is available with `react-scripts@0.2.3` and higher.

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`.

**The environment variables are embedded during the build time**. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. To read them at runtime, you would need to load HTML into memory on the server and replace placeholders in runtime, just like [described here](#injecting-data-from-the-server-into-the-page). Alternatively you can rebuild the app on the server anytime you change them.

> Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.

There is also a special built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`. When you run `yarn start`, it is always equal to `'development'`, when you run `yarn test` it is always equal to `'test'`, and when you run `yarn run build` to make a production bundle, it is always equal to `'production'`. **You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

These environment variables can be useful for displaying information conditionally based on where the project is
deployed or consuming sensitive data that lives outside of version control.

First, you need to have environment variables defined. For example, let’s say you wanted to consume a secret defined
in the environment inside a `<form>`:

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  )
}
```

During the build, `process.env.REACT_APP_SECRET_CODE` will be replaced with the current value of the `REACT_APP_SECRET_CODE` environment variable. Remember that the `NODE_ENV` variable will be set for you automatically.

When you load the app in the browser and inspect the `<input>`, you will see its value set to `abcdef`, and the bold text will show the environment provided when using `yarn start`:

```html
<div>
  <small>You are running this application in <b>development</b> mode.</small>
  <form>
    <input type="hidden" value="abcdef" />
  </form>
</div>
```

The above form is looking for a variable called `REACT_APP_SECRET_CODE` from the environment. In order to consume this
value, we need to have it defined in the environment. This can be done using two ways: either in your shell or in
a `.env` file. Both of these ways are described in the next few sections.

Having access to the `NODE_ENV` is also useful for performing actions conditionally:

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable()
}
```

When you compile the app with `yarn run build`, the minification step will strip out this condition, and the resulting bundle will be smaller.

### Referencing Environment Variables in the HTML

> Note: this feature is available with `react-scripts@0.9.0` and higher.

You can also access the environment variables starting with `REACT_APP_` in the `public/main.html`. For example:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

Note that the caveats from the above section apply:

* Apart from a few built-in variables (`NODE_ENV` and `PUBLIC_URL`), variable names must start with `REACT_APP_` to work.
* The environment variables are injected at build time. If you need to inject them at runtime, [follow this approach instead](#generating-dynamic-meta-tags-on-the-server).

### Adding Temporary Environment Variables In Your Shell

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the
life of the shell session.

#### Windows (cmd.exe)

```cmd
set REACT_APP_SECRET_CODE=abcdef && yarn start
```

(Note: the lack of whitespace is intentional.)

#### Linux, macOS (Bash)

```bash
REACT_APP_SECRET_CODE=abcdef yarn start
```

### Adding Development Environment Variables In `.env`

To define environment variables for local development, create a file called `.env` in the root of your project like so:

```
SESSION_SECRET=foobar
```

`.env` **should not be** checked into source control.

Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

## Developing Components in Isolation

Usually, in an app, you have a lot of UI components, and each of them has many different states.

For an example, a simple button component could have following states:

* In a regular state, with a text label.
* In the disabled mode.
* In a loading state.

Usually, it’s hard to see these states without running a sample app or some examples.

We use [Storybook](https://storybook.js.org) ([source](https://github.com/storybooks/storybook)) let you develop components and see all their states in isolation from your app. You can read [Storybook's Getting Started docs](https://github.com/storybooks/storybook#getting-started) to get up-and-running.

![Storybook for React Demo](http://i.imgur.com/7CIAWpB.gif)

Eventually, we might deploy our Storybook as a static app. This way, everyone in your team can view and review different states of UI components without starting a backend server or creating an account in your app.

To get the storybook server running do:

```
yarn i -g @storybook/cli
yarn run storybook
```

## Supported Language Features and Polyfills

This project supports a superset of the latest JavaScript standard.<br>
In addition to [ES6](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [Exponentiation Operator](https://github.com/rwaldron/exponentiation-operator) (ES2016).
* [Async/await](https://github.com/tc39/ecmascript-asyncawait) (ES2017).
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 3 proposal)
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (stage 2 proposal).
* [TSX](https://facebook.github.io/react/docs/introducing-jsx.html) syntax.

Learn more about [different proposal stages](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-).

If you use any other ES6+ features that need **runtime support** (such as `Array.from()` or `Symbol`), make sure you are including the appropriate polyfills manually, or that the browsers you are targeting already support them.

---

This project was modified from [Create React App](https://github.com/facebookincubator/create-react-app).
