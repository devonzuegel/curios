import * as React from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import SearchIcon from '../icons/search';

export interface Props {
  onChange: any; //tslint:disable-line
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: '100%',
    border: 'none',
    fontSize: 12,
    paddingLeft: 36,
    boxSizing: 'border-box',
    color: '#A9AEBF',
    fontWeight: 100,
    '::placeholder': {
      color: '#A9AEBF',
      fontWeight: 100
    }
  },
  wrapper: {
    position: 'relative',
    flex: 1
  },
  icon: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    margin: 'auto'
  }
});

const Search: React.StatelessComponent<Props> = ({ onChange }) => (
  <div className={css(styles.wrapper)}>
    <SearchIcon className={css(styles.icon)}/>
    <input
      className={css(styles.input)}
      onChange={onChange}
      placeholder="Search site"/>
  </div>
);

export default Search;
