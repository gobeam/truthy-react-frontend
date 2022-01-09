# Contributing to Transcriptase
We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Any contributions you make will be under the MIT Software License
In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issues](https://github.com/gobeam/truthy-react-frontend/issues)

Documentation
-------------

If you contribute anything that changes the behavior of the application, 
document it in the follow places as applicable:
* the code itself, through clear comments and unit tests
* [README](README.md)

This includes new features, additional variants of behavior, and breaking 
changes.

Testing
-------

Proper test are encouraged.

Issues
------

For creating an issue:
* **Bugs:** please be as thorough as possible, with steps to recreate the issue 
  and any other relevant information.
* **Feature Requests:** please include functionality and use cases.  If this is 
  an extension of a current feature, please include whether or not this would 
  be a breaking change or how to extend the feature with backwards 
  compatibility.
* **Security Vulnerability:** please report it at 
  https://my.xfinity.com/vulnerabilityreport and contact the [maintainers](MAINTAINERS.md).

If you wish to work on an issue, please assign it to yourself.  If you have any
questions regarding implementation, feel free to ask clarifying questions on 
the issue itself.

Pull Requests
-------------

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

Since the `main` branch is what people actually use in production, we have a
`dev` branch that unstable changes get merged into first. Only when we
consider that stable we merge it into the `main` branch and release the
changes for real.

Adhering to the following process is the best way to get your work
included in the project:

1.  [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork, and configure the remotes:

    ```bash
    # Clone your fork of the repo into the current directory
    git clone https://github.com/<your-username>/truthy-react-frontend.git
    # Navigate to the newly cloned directory
    cd truthy-react-frontend
    # Assign the original repo to a remote called "upstream"
    git remote add upstream https://github.com/gobeam/truthy-react-frontend.git
    ```

2.  If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout dev
    git pull upstream dev
    ```

3.  Create a new topic branch (off the `dev` branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

4.  Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/about-git-rebase/) feature to tidy up your commits before making them public.

5.  Locally merge (or rebase) the upstream dev branch into your topic branch:

    ```bash
    git pull [--rebase] upstream dev
    ```

6.  Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

7.  [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project
owners to license your work under the terms of the [MIT License](https://github.com/gobeam/truthy-react-frontend/blob/main/LICENSE.md).