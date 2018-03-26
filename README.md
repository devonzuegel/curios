**Client:** Specific info about our frontend here: [`client/README.md`](client/README.md)
<br>
**Server:** Specific info about our backend here: `server/README.md` (TODO)

<!-- TOC -->

* [Development](#development)
* [Running tests](#running-tests)
* [Project organization](#project-organization)
  * [Client (frontend)](#client-frontend)
  * [Server (backend)](#server-backend)
* [A few "gotcha"s](#a-few-gotchas)

<!-- /TOC -->

## Development

Initializing the database (in `psql`):

```sql
drop database "curios-web-dev"; # If exists
create database "curios-web-dev";
```

Perform the migrations:

```bash
node_modules/.bin/sequelize db:migrate:undo:all
bin/migrate
bin/start-dev # Starts the server and client
```

## Running tests

Initializing the database (in `psql`):

```sql
drop database "curios-web-test";
create database "curios-web-test";
```

Migrate the db:

```bash
NODE_ENV=test node_modules/.bin/sequelize db:migrate:undo:all
NODE_ENV=test bin/migrate
```

Run the tests:

```bash
yarn test
```

## Project organization

If you're thinking about where to put a new piece of code, here is how we think about organization at a high level:

### Client (frontend)

* **components** are totally generic, stateless (or all state is self-contained) building blocks that can be used throughout the app
  * e.g. `<Button />` under [`src/components/Button`](client/src/components/Button/index.tsx#L13)
  * a good example of what I mean by "self-contained state" is a component like an `<Accordion />` which can be open or closed (in other words, stateful), but we can effectively pretend like it's stateless because it's just a cosmetic thing that doesn't affect other components. (We don't actually have an Accordion in the app, but [here's](https://springload.github.io/react-accessible-accordion/) an example of what I mean)
* **api functions** to interact with the api and define the interfaces for the expected responses. These functions should always return `Promise`s.
* **utility functions**
  * generic app utility functions should go under `src/utils` (e.g. `slugify` in [`src/utils/index.ts`](client/src/utils/index.ts#L152))
  * storybook utility functinos should go under `storybook/utils` (e.g. `action` in [`storybook/utils.ts`](client/storybook/utils.ts#L3))
  * page-specific utility functions should go under the page's directory (e.g. `notEmpty` in [`client/src/components/Form/utils.ts`](client/src/components/Form/utils.ts) for Authentication)
* **pages** have the application logic for a particular page
  * `PageName/stateless.tsx` contains the views for the page. They are comprised of components, and they should always be pure functions of the page's state.
  * `PageName/index.tsx` imports `./stateless` + whatever APIs are necessary from `~/api`
  * as our app gets more complex and more pieces of business logic are reusable, we will have to decide where to put those bigger blocks of code. A few thoughts: 1) They aren't "generic" in that they contain some business logic, so it sees inappropriate to put them under `components/`, but 2) they are reused in several pages, so it doesn't seem appropriate to put them under a specific page, either. 3) If they're shared by a bunch of related pages (which seems likely), the pages could go under a parent directory, similar to how we put a bunch of common utils under `pages/Authentication/utils`. Finally 4), we haven't run into this yet, so I'm not going to worry about it too much. Just something to keep in mind as we do move towards that future.
* the **app** itself ([`client/src/pages/index.tsx`](client/src/pages/index.tsx)), which pulls together all of the pages, apis, reducers, etc. This is "the glue".
* you can think of **Storybook** as an app all in itself. It's kind of like a styleguide, but for application logic and not just individual components/styles. Stories should import the views from `~/pages/PageName/stateless` and display the various possible states of that view.

### Server (backend)

There is less of a hierarchy in the server code and more categories of code:

* The entrypoint for our server is [`index.ts`](server/index.ts)
* The **api** directory contains routers, which are groupings of endpoints roughly organized by topic.
  * These endpoints are used by the frontend code here: [`client/src/api/index.ts`](client/src/api/index.ts)
  * e.g. The invitations router ([`server/api/invitations.ts`](server/api/invitations.ts)) contains endpoints that have to do with retrieving, creating, and updating invitations. The topics here aren't super strict, they are more to help find things quickly. Sometimes it's not clear where an endpoint belongs, (e.g. `/api/users/:inviterEthAddress/invitations`). In this case we just put it under the users router because you're retrieving the invitations _for a particular user_, but it just as easily could've ended up under the invitations router. Doesn't really matter as long as people can find it.
* The **config** directory includes any setup that happens upon initialization of the server. This doesn't change that much.
* The **delayedJobs** directory contains any code relevant to our jobs, which are run by Redis.
* We put all of our email sending logic + templates under **mail**.
* Persisted object interfaces are defined in **models**.
* Endpoints defined in the API depend on **services**. These services are agnostic to HTTP, which makes them more testable, composable, and easy to reason about.

## A few "gotcha"s

In development, the server runs at `localhost:5000` and serves the contents of `/build` for its frontend, and the client which proxies http requests _to_ the server runs at `localhost:3000` and autoreloads on changes. A few notes:

* The server is also supposed to autoreload on changes, but `nodemon` is a little broken at the moment. Will fix this at some point, but for now just type `rs` in the console and hit enter to reload the server after code changes.
* Because the server serves `/build` for its frontend, fronted changes won't reflect at `localhost:5000` the way the do at `localhost:3000`. (But server changes _will_ be reflected when you hit endpoints from `localhost:3000` because it proxies requests to `localhost:5000`.) At some point we'll invest resources to make this all consistent, but right now we have to live with it. The temporary solution is just to do all development at `localhost:3000` — if you do that, you can basically ignore this whole issue. The one place where you won't be able to avoid it is in the emails the development server sends you. Note that **any links in those emails will send you to `localhost:5000`**.
