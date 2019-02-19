# Suabochica

Project with the content that I want to share in my personal webpage. There, you will find posts of different topics that are related to me. I hope that you like it.

## Requirements
This project use JavaScript and Ruby. So the next package are required:

    - Ruby
    - Gem
    - Bundler
    - Node
    - Npm

## Installation
First, you should install the Ruby gems, To achieve that, please run:

    bundle install

Second, you should install the `npm` packages. Please run:

    npm install

> ## Installation issues.
> `Warning: You need to have Ruby and Haml installed and in your PATH for this task to work.`
> If you get this error, is because you don´t have the gems specified in the `Gemfile` installed in your machine. Please review this step.

## Development Environment
The project use `grunt` as task runner. To mount the development environment please execute:

    grunt dev

## Build
With `grunt` a task was configured to create the build of the website. :

    grunt build

## Netlify
This project uses Netifly to manage continuous integration in the content updates of the website. Review the `netlify.toml` file to know the repository setup.

## Windows Setup
To run this project in windows OS the next programs are required:
- [RubyInstaller](https://rubyinstaller.org/downloads/) to install ruby on Windows
- [Java](https://www.java.com/en/download/manual.jsp) to run the yui compressor nodejs module

To install the gems you should use the next command:

    ruby -S gem install {gem}