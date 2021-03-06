import React from 'react';
import {storiesOf} from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import README from './README.md';
import {beta_Button as Button} from '@workday/canvas-kit-react-button';
import './index.scss';
// @ts-ignore
import initializeIcons from '../../icon/css/lib/canvas-kit-css-icon';

interface PopupWrapperState {
  open: boolean;
}

class PopupWrapper extends React.Component<{}, PopupWrapperState> {
  state = {
    open: false,
  };

  public componentDidMount() {
    initializeIcons();
  }

  public componentDidUpdate() {
    initializeIcons();
  }

  public render() {
    const {open} = this.state;
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Button variant={Button.Variant.Delete} onClick={this.onOpenPopupClick}>
          Delete Item
        </Button>
        {open ? (
          <div
            className="wdc-popup wdc-popup-padding-s wdc-popup-animation-origin-top-center"
            style={{
              position: 'absolute',
              width: '400px',
              top: '40px',
            }}
            role="dialog"
            aria-labelledby="popup-heading"
          >
            <div className="wdc-popup-close">
              <button onClick={this.onCloseClick} className="wdc-btn-icon-plain" aria-label="Close">
                <i className="wdc-icon" data-icon="x" data-category="system" />
              </button>
            </div>
            <h3 className="wdc-popup-heading" id="popup-heading">
              Delete Item
            </h3>
            <div style={{marginBottom: '24px'}} className="wdc-popup-body">
              Are you sure you'd like to delete the item titled 'My Item'?
            </div>
            <Button
              style={{marginRight: '16px'}}
              onClick={this.onDeleteClick}
              variant={Button.Variant.Delete}
            >
              Delete
            </Button>
            <Button onClick={this.onCancelClick} variant={Button.Variant.Secondary}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    );
  }

  private onCloseClick = () => {
    this.setState({
      open: false,
    });
  };

  private onDeleteClick = () => {
    this.setState({
      open: false,
    });
  };

  private onCancelClick = () => {
    this.setState({
      open: false,
    });
  };

  private onOpenPopupClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    this.setState({
      open: !this.state.open,
    });
  };
}

storiesOf('CSS/Popup', module)
  .addDecorator(withReadme(README))
  .add('Default', () => (
    <div className="story">
      <PopupWrapper />
    </div>
  ));
