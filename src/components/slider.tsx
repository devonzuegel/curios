import * as React from 'react';
import * as SlickSlider from 'react-slick';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Picture } from '../reducers/index';
import Right from '../icons/right';
import Left from '../icons/left';
import { colors } from '../style';

export interface Props {
  pictures: Picture[];
  onFullScreen?: React.ReactEventHandler<HTMLImageElement>;
}

export interface State {}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 300,
    overflowY: 'hidden',
    overflowX: 'auto',
    backgroundColor: colors.lightGrey
  },
  slider: {
    height: '100%'
  },
  controls: {
    position: 'absolute',
    display: 'flex',
    right: 10,
    bottom: 10
  },
  icon: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
    cursor: 'pointer',
    margin: 5,
    paddingTop: 2
  },
  image: {
    width: '100%',
    margin: 'auto',
    display: 'flex'
  }
});

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

class Slider extends React.Component<Props, State> {
  private slider: any;

  private onPrev = () => {
    this.slider.slickPrev();
  }

  private onNext = () => {
    this.slider.slickNext();
  }

  public render() {
    const { pictures, onFullScreen } = this.props;

    return (
      <div className={css(styles.container)}>
        <SlickSlider {...settings} className={css(styles.slider)} ref={c => this.slider = c }>
          {
            pictures.map((picture, index) => (
              <div className={css(styles.image)} key={index}>
                <img src={picture.url} style={{ margin: 'auto', maxHeight: 300 }} onClick={onFullScreen}/>
              </div>
            ))
          }
        </SlickSlider>
        <div className={css(styles.controls)}>
          <div className={css(styles.icon)} onClick={this.onPrev}>
            <Left size={20}/>
          </div>
          <div className={css(styles.icon)} onClick={this.onNext}>
            <Right size={20}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
