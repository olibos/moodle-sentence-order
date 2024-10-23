import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import Sortable from 'sortablejs';

/**
 * A web component that displays shuffled words from its text content,
 * allowing users to rearrange them back into the correct order.
 */
@customElement('moodle-sentence')
export class MoodleSentence extends LitElement {
  @query('.container')
  container!: HTMLDivElement

  #words: string[] = [];

  #correctVersion = '';

  static shuffleArray(array: string[]) {
    switch (array.length) {
      case 0: return [];
      case 1: return [array[0]];
      case 2: return [array[1], array[0]];
    }
    const shuffledArray = [...array];

    const MAX_ATTEMPTS = 100;
    let attempts = 0;
    do {
      attempts++;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
    } while (attempts < MAX_ATTEMPTS && MoodleSentence.arraysEqual(array, shuffledArray));

    return shuffledArray;
  }

  static arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  render() {
    if (this.#words.length === 0) {
      const text = this.textContent?.trim();
      if (!text) return html`No text provided.`;
      const words = text.split(/\s+/g);
      this.#correctVersion = words.join(' ');
      this.#words = MoodleSentence.shuffleArray(words);
    }

    return html`
      <div class="container" translate="no">${this.#words.map(word => html`<span>${word}</span>`)}</div>
    `;
  }

  static styles = css`
  :host{
    display: block;
    --background-color: #fff;
    --text-color: #000;
  }
  
  @media (prefers-color-scheme: dark) {
    :host {
      --background-color: #383333;
      --text-color: #fff;
    }

    .container.correct span{
      --text-color: #383333;
    }
  }

  
  .container.correct span {
    --background-color: #1fb33c;
    --text-color: #fff;
  }  
  .container span {
    transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    display: inline-block;
    margin:calc(1rem / 4) calc(1rem / 8);
    background: var(--background-color);
    color:var(--text-color);
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    padding: calc(1rem / 4) 1rem;
    cursor: move;
  }`;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    // Select the container div
    const words = this.#words;
    const correctVersion = this.#correctVersion;
    const container = this.container;
    new Sortable(this.container, {
      swapThreshold: 1,
      animation: 150,
      onEnd(event) {
        const { newIndex, oldIndex } = event;
        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
        const [word] = words.splice(oldIndex, 1);
        words.splice(newIndex, 0, word)
        container.classList.toggle('correct', correctVersion === words.join(' '));
      }
    });
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'moodle-sentence': MoodleSentence
  }
}
