# ZeroWiki

ZeroWiki is a browser extension to load Wikipedia from one of the available Wikipedia mirrors, instead of wikipedia.org. Currently supported mirrors are:

* 0wikipedia.org (currently redirects to wiki-zero.com)
* wikizero.com
* wikiwand.com
* wikipedi0.org

If you know of a trustworthy Wikipedia mirror that you think should be listed here, please send me a pull request or open an issue so that I can manage it. Conversely, if you think one of the mirrors should not be trusted and/or if you have experienced anything that led you to think your privacy was being violated, please let me know as soon as possible so I can remove that mirror from this list.

## Download

You can currently download ZeroWiki from [Chrome Web Store](https://chrome.google.com/webstore/detail/zerowiki/cklaghejbnabhfdlaelhbjdepkfodkcj) and [Mozilla Add-ons](https://addons.mozilla.org/firefox/addon/zerowiki/). Other platforms will be listed here as they become available.

## Manual Installation

If ZeroWiki is not available for your browser, you can manually download this repository, run `./pack.sh`, and use the resulting ZeroWiki.zip file to add it as an extension to your browser if your browser supports extensions. It should work with most of the browsers since ZeroWiki is as simple an extension as it gets, however please let me know if it doesn't so I can try to make some arrangements.

## How It Works

ZeroWiki doesn't do anything fancy. It just redirects your requests to wikipedia.org to one of the Wikipedia mirrors of your choice. Please note that most of the mirrors available in ZeroWiki are owned by people and not companies (except for Wikiwand). If you do not trust any of these mirrors, then I suggest you not use this extension. Also, I suggest you not enter any private information (username, password etc.) on any of the pages fetched from any of these mirrors as they most probably do not have any privacy policies (again, except for Wikiwand).
