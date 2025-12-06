# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Portfolio'
copyright = '2025, Navaneet'
author = 'Navaneet'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "myst_parser",
    "sphinx_external_toc",
    'sphinxcontrib.youtube',
    'sphinx.ext.mathjax',


]

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']

myst_enable_extensions = [
    "amsmath",
    "dollarmath",
    "html_admonition",
    "html_image",
    "colon_fence",
    "deflist",
    "fieldlist",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist"
]





# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "sphinx_book_theme"
html_static_path = ['_static']
templates_path = ["_templates"]


external_toc_path = "_toc.yml"  # Optional, default is _toc.yml

html_css_files = [
    'css/custom.css',
]

html_js_files = [
    'js/scroll-video.js',
    'js/custom.js',
    'js/video-section.js',
]


# Assuming your `conf.py` has a sibling folder called `_static` with these files
html_theme_options = {
    "use_sidenotes": True,
    "home_page_in_toc": True,
    "logo": {
        "text": "Navaneet",
    },
    "icon_links": [
        {
            "name": "GitHub",
            "url": "https://github.com/sainavaneet",
            "icon": "fab fa-github",
            "type": "fontawesome",
        },
        {
            "name": "LinkedIn",
            "url": "https://www.linkedin.com/in/sainavaneet76/",
            "icon": "fab fa-linkedin",
            "type": "fontawesome",
        },
    ],
}
