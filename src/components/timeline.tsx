import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import { colors } from '../style';

export interface Props {
  collection: string[];
}

const styles = StyleSheet.create({
  container: {
    maxHeight: '100vh',
    minWidth: 74,
    backgroundColor: '#f8f7f0',
    display: 'flex',
    flexDirection: 'column'
  },
  item: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.grey
  }
});

const Timeline: React.StatelessComponent<Props> = ({ collection }) => (
  <div className={css(styles.container)}>
    {
      collection.map(label => (
        <div key={label} className={css(styles.item)}>{ label }</div>
      ))
    }
  </div>
);

export default Timeline;
