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

  shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

  render() {
    if (this.#words.length === 0) {
      const text = this.textContent?.trim();
      if (!text) return html`No text provided.`;
      const words = text.split(/\s+/g);
      this.#correctVersion = words.join(' ');
      this.#words = this.shuffleArray(words);
    }

    return html`
      <div class="container" translate="no">${this.#words.map(word => html`<span>${word}</span>`)}</div>
    `;
  }

  static styles = css`
  :host{
    display: block;
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
    --background-color: #c6efce;
  }  
  .container span {
    transition: background-color 0.5s ease-in-out;
    display: inline-block;
    margin:calc(1rem / 4) calc(1rem / 8);
    background: var(--background-color, #fff);
    color:var(--text-color, #000);
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
        const {newIndex, oldIndex} = event;
        if (typeof oldIndex !== 'number' || typeof newIndex !== 'number') return;
        const [word] = words.splice(oldIndex, 1);
        words.splice(newIndex, 0, word)
        if (correctVersion === words.join(' ')) {
          container.classList.add('correct');
        }else{
          container.classList.remove('correct');
        }
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'moodle-sentence': MoodleSentence
  }
}
