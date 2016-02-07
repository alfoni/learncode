import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import CodeExample from '../CodeExample';
import styles from './styles.css';

@Cerebral({
  descriptions: ['course', 'descriptions'],
  tooltipTimeout: ['course', 'tooltip', 'timeout'],
  visibleTooltip: ['course', 'tooltip', 'visible']
})
class DescriptionToolTip extends React.Component {
  constructor(props) {
    super(props);
  }
  positionTooltipWrapper(e, description) {
    const tooltipWrapper = this.refs[description];
    const marginToDescriptionName = 5;
    tooltipWrapper.style.marginLeft = (e.target.offsetWidth + marginToDescriptionName) + 'px';
  }
  onTagNameMouseOver(e, description) {
    this.positionTooltipWrapper(e, description);
    this.props.signals.course.tagNameMouseOver({
      timeout: setTimeout(() => {
        this.props.signals.course.descriptionHovered({
          tooltip: description
        });
      }, 500)
    });
  }
  onTagNameMouseOut() {
    clearTimeout(this.props.tooltipTimeout);
    this.props.signals.course.tagNameMouseOut();
  }
  getDescription(descriptionWord) {
    return this.props.descriptions.find((description) => {
      return description.tagName === descriptionWord;
    });
  }
  replaceTagsWithDescriptions(text) {
    const tags = text.match(/\$\{(.*?)\}/g);
    let currentTagIndex = 0;

    const textWithReplacedTags = text.replace(/\$\{(.*?)\}/g, () => {
      return '§?§';
    }).split(' ');

    return textWithReplacedTags.map((word, index) => {
      const isReplacedTag = word === '§?§';
      const tag = tags[currentTagIndex];

      if (isReplacedTag && tag) {
        const tagContent = tag.substr(2, tag.length - 3);
        const description = this.getDescription(tagContent);
        const isUrl = tagContent.split(':').length > 1;
        currentTagIndex++;

        if (isUrl) {
          return this.renderURL(tagContent, index);
        } else if (description) {
          return this.renderDescriptionWord(description, index);
        }
      }

      return ' ' + word + ' ';
    });
  }
  renderDescriptionWord(description, index) {
    return (
      <span key={index}>
        <span ref={description.tagName} className={this.props.visibleTooltip === description.tagName ? styles.tooltipWrapper : styles.hide}>
          <b className={styles.tooltipHeader}>{description.tagName}</b>
          <p>{description.description}</p>
          <div className={styles.codeWrapper}>
            <CodeExample description={description}/>
          </div>
        </span>
        <span
          className={styles.tagName}
          onMouseOver={(e) => this.onTagNameMouseOver(e, description.tagName)}
          onMouseOut={() => this.onTagNameMouseOut()}>{description.tagName}</span>
      </span>
    );
  }
  renderURL(tagContent, index) {
    console.log();
    const url = 'http://' + tagContent.split('http://')[1]; // Cannot split on ':' due to URL containing ':'
    const text = tagContent.split(':')[1];
    console.log('text', text);
    console.log('url', url);

    return (
      <a className={styles.url} href={url} key={index} target="_blank">{text}</a>
    );
  }
  render() {
    const description = this.replaceTagsWithDescriptions(this.props.children);

    return (
      <span>{description}</span>
    );
  }
}

export default DescriptionToolTip;
