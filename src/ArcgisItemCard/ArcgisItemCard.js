import PropTypes from 'prop-types';
import React from 'react';
import {
  StyledItemCard,
  StyledItemCardContent,
  StyledItemCardImageWrap,
  StyledCardItemTitle,
  StyledCardItemMetrics,
  StyledCardItemText,
  StyledCardItemIconLabelText
} from './ArcgisItemCard-styled';

import AccountIcon from '../icons/AccountIcon';
import CalendarBlankIcon from '../icons/CalendarBlankIcon';

const ArcgisItemCard = ({
  item,
  showThumbnail,
  dateFormatter,
  maxDescriptionLength,
  ...other
}) => {
  let imageEl;
  if (showThumbnail) {
    const imageSource = `https://arcgis.com/sharing/rest/content/items/${
      item.id
    }/info/${item.thumbnail}`;
    imageEl = <StyledItemCardImageWrap imageSource={imageSource} />;
  }

  function _dateFormatter(date) {
    if (dateFormatter) {
      return dateFormatter(date);
    }

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const language =
      navigator.userLanguage ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.systemLanguage;
    return new Date(date).toLocaleDateString(language, dateOptions);
  }

  function _textShortener(text = '', maxLength) {
    let suffix = '';
    if (text.length > maxLength || text.length > maxDescriptionLength) {
      suffix = '...';
    }
    return text.substr(0, maxLength || maxDescriptionLength) + suffix;
  }

  return (
    <StyledItemCard wide {...other}>
      {imageEl}
      <StyledItemCardContent>
        <StyledCardItemTitle title={item.title}>
          {_textShortener(item.title, 70)}
        </StyledCardItemTitle>
        <StyledCardItemMetrics>
          <StyledCardItemIconLabelText>
            <AccountIcon />
            <span>{item.owner}</span>
          </StyledCardItemIconLabelText>
          <StyledCardItemIconLabelText>
            <CalendarBlankIcon />
            <span>{_dateFormatter(item.created)}</span>
          </StyledCardItemIconLabelText>
        </StyledCardItemMetrics>
        <StyledCardItemText title={item.snippet}>
          {_textShortener(item.snippet)}
        </StyledCardItemText>
      </StyledItemCardContent>
    </StyledItemCard>
  );
};

ArcgisItemCard.propTypes = {
  /** The ArcGIS item used to populate the ui */
  item: PropTypes.object,
  /** Whether the card should show a thumbnail or not */
  showThumbnail: PropTypes.bool,
  /** A function that can be provided to customize the formatting of dates */
  dateFormatter: PropTypes.func,
  /** Number of characters to use before truncating the description text */
  maxDescriptionLength: PropTypes.number
};

ArcgisItemCard.defaultProps = {
  showThumbnail: true,
  maxDescriptionLength: 90
};

export default ArcgisItemCard;
