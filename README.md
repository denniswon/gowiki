Welcome to Metabuzz!

## Setting up your environment
### Mac OSX

1. Install [homebrew](https://brew.sh/)

2. Install [go](https://golang.org/doc/install)

3. Install dependencies:

    ```bash
    brew install redis postgres@12 memcached yarn
    brew services start postgres@12
    brew services start redis
    brew services start memcached

    curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin

    ```

4. Set up your IDE:

    - [Download & install VS Code](https://code.visualstudio.com/download)
    - Add the `golang.Go` extension
    - Open this folder (`gowiki`) in VS Code


See below for special instructions:
 - [Windows](#windows)
 - [Linux](#linux)

---
## Server

To start a local Go server:

  * cd backend && air

You can visit the site at http://localhost:5000 or https://localhost:5003 (with a self-signed ssl cert).

If you're trying to load the server on another machine (e.g. phone, Windows machine), you'll have to:

1. Start your server in static mode: `SERVE_STATIC=1 mix phx.server`
2. Run with an alternate host: `HOST=https://other.host:5003 yarn start`

---
## Windows

Install the following:
- [git](https://git-scm.com/download/win)
  - During installation make sure that 'Enable symbolic links' option is checked (by default its not)
  - Follow [this guide](https://github.com/git-for-windows/git/wiki/Symbolic-Links#allowing-non-administrators-to-create-symbolic-links) to allow non-administrator users to create symbolic links (that way you won't have to run git bash as administrator)
- [node](https://nodejs.org/en/download/)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable)
- [python 2](https://www.python.org/downloads/release/python-2715/)

Check out the project using Git Shell (if you haven't granted user 'SeCreateSymbolicLinkPrivilege', be sure to run as administrator to create symlinks). Make sure you use core.symlinks option, for example:

  ```bash
  $ git clone -c core.symlinks=true <URL>
  ```


With Git Bash (as Administrator), run:

```bash
cd desktop
npm install --global --production windows-build-tools
npm config set msvs_version 2013 --global
yarn
yarn start
```

## Linux
(tested with Ubuntu 20.04)

  1. Install Node

     [Instructions for your distro](https://nodejs.org/en/download/package-manager/)

  2. Install Go:

     [Instructions for your distro](https://golang.org/doc/install)

  3. Install Yarn

     [Instructions for your distro](https://classic.yarnpkg.com/en/docs/install)

  4. Install Redis, Memcache and PostgreSQL

      ```bash
      $ sudo apt-get install redis memcached postgresql
      ```

---
## Deployment

Two environments hooked up to git branches:
- origin/master - pushes to Dogfood
- origin/production - pushes to Production


### App Build / Release Process

- TODO

---
## Testing / Code Coverage

Run frontend tests:

- `yarn test --watch` to run all tests in watch mode. you can also run `yarn test` in a subpackage
- `yarn coverage` to test and generate coverage and open the report

Run backend tests:

- TODO

---

## Other Stuff:

### Yarn Workspace notes

Sometimes VS Code doesn't pick up your changes in a dependent package. Simply run `yarn` in the
root folder to propagate symlinks, close the files in VS Code and re-open them.
