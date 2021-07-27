# Suzy's Calculator 

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).

## How to Build and Run

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build and run the minified production build run:

```bash
yarn build
cd build
<browser-cmd> index.html
```

To run the tests, do:

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running
tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

## Design and coding decisions

Based on the criteria for this project I did my best to write the app so as to
strike a balance between keeping it as simple as the nature of project required
and displaying competency with requirements of larger projects (reusable
components, etc.). On the one hand, "a little duplication is better than the
wrong abstraction" (from _Clean Code_, I think??), and on the other hand, well,
you're obviously not hiring me to write calculator apps for little Suzy so you
want to see if I can break the code up into abstractions that make sense. So I made
a couple conscious choices (and very many unconscious ones, probably) along the
way:

### File structure:

Generally I think functions and variables that go together probably belong in
the same file together. Every team probably does this differently. Once a
function or object gets used in two different places, then it should be in its
own module. So in a real-world project, the operators array could be in its own
module, imported by App.js. Components.js, on the other hand, is an example of
the sort of components that might get reused, so I put them in their own file,
even though strict they're only getting called in App.js for now.
In this context, that probably adds unnecessary complexity and goes against
YAGNI, but in the real world these sorts of things go in a utility module
usually.

### More components vs. long jsx

I could have written something like:

```js
// App.js

 ...

return 
  <div>
    <Screens/>
    <Buttons/>
  </div>

// Screens component

return 
  <div>
    <Display/>
    <OperatorDisplay/>
    <Display/>
  </div>

// Buttons component

return 
  <div>
    <ClearButtons/>
    <NumberButtons/>
    <OperatorButtons/>
    <CalculateButton/>
  </div>
```

... you get the picture. We're three levels of abstraction deep and still just prop drilling and no functional DOM nodes to be found. It makes for shorter functions but way too many layers of abstraction, which renders the code less communicative in the end.

The jsx returned by the <App/> component is long (which _might_ be a smell), but it's still pretty DRY. Maybe the two "clear" buttons could be abstracted into a reusable component, especially if we wanted to eventually add more types of clear like clearDisp1, clearDisp2, clearResult, etc. etc.

## TODO

Given infinite time to work on this, I would have added the following features:

- [ ] more graceful/useful error handling (e.g. display an error message to the user on click "Calculate" with empty inputs)
- [ ] add a hook to clearAll if a number button gets pressed first after the Calculate button (like a normal calculator does)
- [ ] run calculate on press enter in either one of the displays - simple as onSumbmit attribute in the input element, i think
- [ ] change display to landscape on window.height < window.width
- [ ] make operator buttons look good for arbitrary number of operations (using :last-child:nth-child pseudo selectors)
- [ ] correct html `<head>` w proper meta-data
