import React from 'react';
import { gql } from '@apollo/client';

export default function UbCallToActionBlock(props) {
  console.log(props.attributes);
  return <div>UbCallToActionBlock</div>;
}

UbCallToActionBlock.displayName = 'UbCallToActionBlock';

UbCallToActionBlock.fragments = {
  key: `UbCallToActionBlockFragment`,
  entry: gql`
    fragment UbCallToActionBlockFragment on UbCallToActionBlock {
      attributes {
        ctaBackgroundColor
        ctaBorderSize
        ctaBorderColor
        headFontSize
        headColor
        headAlign
        ubCallToActionHeadlineText
        contentFontSize
        contentColor
        contentAlign
        ubCtaContentText
        buttonColor
        buttonWidth
        url
        buttonTextColor
        buttonFontSize
        ubCtaButtonText
        addNofollow
        openInNewTab
      }
    }
  `,
};
