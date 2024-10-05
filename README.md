# Moodle Sentence Challenge Custom Element

This project provides a custom web element `<moodle-sentence>`, designed to challenge students to correctly order sentences. It's an interactive tool aimed at helping teachers create engaging learning activities.

## Features

- Easily customizable by embedding sentences inside the custom element.
- Shuffles the words of the given sentence, prompting the student to reorder them correctly.
- Simple to integrate into any HTML page or Learning Management Systems (e.g., Moodle).

## Usage

Here's an example of how to use the custom element:

```html
<moodle-sentence>
  Il n'est jamais trop tard pour bien faire!
</moodle-sentence>
```

### How It Works

1. Embed the `<moodle-sentence>` tag with the sentence you want students to reorder.
2. The custom element will automatically shuffle the words.
3. Students will be presented with the shuffled sentence and can drag or click to reorder the words.
4. Once all words are reordered correctly, they will receive confirmation of success.

### Installation

Simply include the custom element on any web page or within a Learning Management System that supports custom HTML elements.

```html
<script src="path-to-your-moodle-sentence-element.js"></script>
```

Ensure you have the necessary JavaScript and styling files linked, and then use the `<moodle-sentence>` tag as shown above.

### Contributing

Feel free to contribute by submitting issues, feature requests, or pull requests on the GitHub repository.

### License

This project is licensed under the MIT License.