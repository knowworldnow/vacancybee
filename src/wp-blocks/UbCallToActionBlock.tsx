import React from 'react';
import { gql } from '@apollo/client';

interface UbCallToActionBlockAttributes {
  ctaBackgroundColor: string;
  ctaBorderSize: number;
  ctaBorderColor: string;
  headFontSize: number;
  headColor: string;
  headAlign: string;
  ubCallToActionHeadlineText: string;
  contentFontSize: number;
  contentColor: string;
  contentAlign: string;
  ubCtaContentText: string;
  buttonColor: string;
  buttonWidth: number;
  url: string;
  buttonTextColor: string;
  buttonFontSize: number;
  ubCtaButtonText: string;
  addNofollow: boolean;
  openInNewTab: boolean;
}

interface UbCallToActionBlockProps {
  attributes: UbCallToActionBlockAttributes;
}

const UbCallToActionBlock: React.FC<UbCallToActionBlockProps> = ({ attributes }) => {
  const {
    ctaBackgroundColor,
    ctaBorderSize,
    ctaBorderColor,
    headFontSize,
    headColor,
    headAlign,
    ubCallToActionHeadlineText,
    contentFontSize,
    contentColor,
    contentAlign,
    ubCtaContentText,
    buttonColor,
    buttonWidth,
    url,
    buttonTextColor,
    buttonFontSize,
    ubCtaButtonText,
    addNofollow,
    openInNewTab,
  } = attributes;

  return (
    <div className="ub_call_to_action" style={{
      backgroundColor: ctaBackgroundColor,
      border: `${ctaBorderSize}px solid ${ctaBorderColor}`,
    }}>
      <div className="ub_call_to_action_headline">
        <p
          className="ub_call_to_action_headline_text"
          style={{
            fontSize: `${headFontSize}px`,
            color: headColor,
            textAlign: headAlign as any, // TypeScript might complain about this, you may need to adjust based on allowed values
          }}
        >
          {ubCallToActionHeadlineText}
        </p>
      </div>
      <div className="ub_call_to_action_content">
        <p
          className="ub_cta_content_text"
          style={{
            fontSize: `${contentFontSize}px`,
            color: contentColor,
            textAlign: contentAlign as any, // TypeScript might complain about this, you may need to adjust based on allowed values
          }}
        >
          {ubCtaContentText}
        </p>
      </div>
      <div className="ub_call_to_action_button">
        <a
          href={url}
          target={openInNewTab ? '_blank' : '_self'}
          rel={`${addNofollow ? 'nofollow ' : ''}noopener noreferrer`}
          className="wp-block-button ub_cta_button"
          style={{
            backgroundColor: buttonColor,
            width: `${buttonWidth}px`,
          }}
        >
          <p
            className="ub_cta_button_text"
            style={{
              color: buttonTextColor,
              fontSize: `${buttonFontSize}px`,
            }}
          >
            {ubCtaButtonText}
          </p>
        </a>
      </div>
    </div>
  );
};

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

export default UbCallToActionBlock;
