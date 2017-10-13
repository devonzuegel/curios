import * as React from 'react';
import { Picture } from '../reducers/index';
import { StyleSheet, css } from 'aphrodite/no-important';
import * as SlickSlider from 'react-slick';
import { Cross } from '../icons/cross';

export interface Props {
  pictures?: Picture[];
  onDismissFullscreen: React.MouseEventHandler<HTMLElement>;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 1
  },
  slider: {
    width: '80%',
    height: '100%',
    margin: 'auto',
    display: 'flex'
  },
  imageContainer: {
    height: '100vh',
    display: 'flex !important',
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    opacity: 0.8
  }
});

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default class Fullscreen extends React.Component<Props, {}> {
  public render() {
    const { pictures, onDismissFullscreen } = this.props;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.crossContainer)}><Cross onClick={onDismissFullscreen}/></div>
        {
          pictures && (
            <SlickSlider {...settings} className={css(styles.slider)}>
              {
                pictures.map((picture, index) => (
                  <div className={css(styles.imageContainer)} key={index}>
                    <img src={picture.url}/>
                  </div>
                ))
              }
            </SlickSlider>
          )
        }
      </div>
    );
  }
}
