<p align="center">
  <img src="readme_resources/signature_banner.png" height="84">
</p>
<h3 align="center">Medium signatures, simplified.</h3>

Signature :writing_hand: is a browser extension (for Chrome and Firefox) that saves writers and editors of Medium.com time from having to copy and paste their blog's signature / sign-off by providing a native inline-tooltip button on Medium that pastes the signature in a single click of the button.

Take the following sign-off for example:

>Happy coding!
>
>– Quincy Larson, teacher at [freeCodeCamp](https://freecodecamp.org)
>
>If you get value out of these emails, please consider [supporting our nonprofit](https://donate.freecodecamp.org/).

Quincy Larson, the "teacher and guy who started it [freeCodeCamp]", used this at the end of all of his blog posts for a while. Rather than him needing to type that every time or copy and paste it from another blog post, Quincy would be able to just press the signature button on Medium and his sign-off would be pasted for him instantly.

Let's see how it works!

<div align="center">
  <img src="readme_resources/signature_demo.gif">
</div>

## Download
Click the badges below to download the latest version of *Signature* for your respective browser.

<p align="left">
  <a href="https://addons.mozilla.org/en-US/firefox/addon/medium-signature/">
    <img src="https://raw.githubusercontent.com/cedricium/RapidTabOpener/settings-page/res/ff_badge.png" width="33%"/>
  </a>
  <a href="https://chrome.google.com/webstore/detail/signature/hgabbjfneihcmbbcnbnfdnfdcbpodnhp">
    <img src="https://embedsignage.com/wp-content/uploads/2016/04/embed-signage-chromeos-web-store-button.png" width="33%"/>
  </a>
</p>


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

### Installing

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/cedricium/signature

# Go into the repository
$ cd signature/

# Install the dependencies
$ npm install
```

### Testing

#### Chrome:

1. Open Chrome and enter the following in the address bar: `chrome://extensions`
2. Enable "Developer mode"
3. Click the "Load Unpacked" button and select the `chrome/` directory
4. Signature will now be installed as an unpacked extension!

#### Firefox:

Using the command line:

```bash
$ web-ext start  # for testing on Firefox regular edition
# OR
$ web-ext run start-nightly  # for testing on Firefox Nightly
```

Manually loading Signature:

1. Open Firefox and enter the following in the address bar: `about:debugging`
2. Click the "Load Temporary Add-on" button and select the `manifest.json` file found in the `firefox/` directory of Signature
3. Signature will now be installed as a temporary add-on!


## Contributing

Your contributions are always welcome! See an issue you want to tackle or have an idea for a feature you'd like implemented? Just open a pull-request with a short explanation of the changes and I'd be happy to review it. :tada:


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- nib icon by Alax from the Noun Project
