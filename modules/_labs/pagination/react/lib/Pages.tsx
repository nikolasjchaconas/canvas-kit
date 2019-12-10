/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {IconButton} from '@workday/canvas-kit-react-button';
import canvas from '@workday/canvas-kit-react-core';
import _ from 'lodash';
import React, {useRef} from 'react';

interface PagesProps {
  numPages: number;
  currentPage: number;
  onPageClick: (page: number) => void;
  mobile: boolean;
}

interface PaginationButtonProps {
  page: number;
  onPageClick: (page: number) => void;
  active?: boolean;
}

const noPointerEvents = css({
  pointerEvents: 'none',
});

const activeStyling = css(noPointerEvents, {
  color: canvas.colors.frenchVanilla100,
});

const Ellipse = () => (
  <IconButton
    key={'ellipse'}
    aria-label={`Navigation Ellipse`}
    variant={IconButton.Variant.Square}
    size={IconButton.Size.Small}
    tabIndex={-1}
    css={noPointerEvents}
  >
    ...
  </IconButton>
);

const Pages: React.FC<PagesProps> = props => {
  const {numPages, currentPage, onPageClick, mobile} = props;
  const lastPage = useRef<number>(0);

  let pagesToDisplay = 5;
  let start = 1;

  if (mobile) {
    start = currentPage;
    if (currentPage >= numPages - 1) {
      start = Math.max(numPages - 2, 1);
      pagesToDisplay = 3;
    } else {
      pagesToDisplay = 1;
    }
  } else {
    const midwayAndMorePages = currentPage > 2 && numPages > pagesToDisplay;
    if (midwayAndMorePages) {
      const oneOfLastThreePages = currentPage >= numPages - 3;
      if (oneOfLastThreePages) {
        start = numPages - 4;
      } else {
        start = currentPage - 2;
      }
    }
  }

  const end = Math.min(start + pagesToDisplay, numPages + 1);
  const pages = _.range(start, end);

  const less = end === numPages + 1 && numPages > pagesToDisplay && !mobile;
  const more = end < numPages;

  if (less) {
    pages.unshift(1);
  }
  if (more) {
    pages.push(numPages);
  }
  const onClick = (page: number) => {
    lastPage.current = currentPage;
    onPageClick(page);
  };
  const buttons = pages.map((page, index) => (
    <PaginationButton onPageClick={onClick} page={page} key={page} active={page === currentPage} />
  ));

  if (less) {
    buttons.splice(1, 0, <Ellipse />);
  }
  if (more) {
    buttons.splice(buttons.length - 1, 0, <Ellipse />);
  }

  return <React.Fragment>{buttons}</React.Fragment>;
};

const PaginationButton: React.FC<PaginationButtonProps> = props => (
  <IconButton
    data-testid={`paginationButton${props.active ? 'Active' : props.page}`}
    aria-label={`${props.active ? 'Selected, ' : ''}Page ${props.page}`}
    aria-pressed={undefined}
    variant={props.active ? IconButton.Variant.SquareFilled : IconButton.Variant.Square}
    size={IconButton.Size.Small}
    onClick={_ => props.onPageClick(props.page)}
    toggled={props.active}
    css={props.active ? activeStyling : ''}
  >
    {props.page}
  </IconButton>
);

export default Pages;
