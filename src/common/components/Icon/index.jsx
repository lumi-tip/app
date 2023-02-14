/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import iconDic from '../../utils/iconDict.json';
// const iconDict = require('../common/utils/iconDict.json');

const Icon = ({
  icon, width, height, style, color, secondColor, fill, className, props, full, text,
}) => {
  if (typeof window === 'undefined' || !window) return '';
  const iconExists = iconDic.includes(icon);

  // eslint-disable-next-line no-console
  const Comp = loadable(() => import(`./set/${iconExists ? icon : 'info'}`).catch((err) => console.error(err)));
  return (
    <Comp
      className={className}
      width={width}
      height={height}
      style={{ ...style, minWidth: width, height }}
      color={color}
      secondColor={secondColor}
      fill={fill}
      full={full}
      text={text}
      {...props}
    />
  );
};
Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  secondColor: PropTypes.string,
  fill: PropTypes.string,
  full: PropTypes.bool,
  className: PropTypes.string,
  props: PropTypes.objectOf(PropTypes.any),
  style: PropTypes.shape({
    transform: PropTypes.string,
    transition: PropTypes.string,
  }),
  text: PropTypes.string,
};
Icon.defaultProps = {
  style: {},
  width: '100%',
  height: '100%',
  color: '',
  secondColor: '',
  fill: '',
  full: false,
  className: '',
  props: {},
  text: '',
};
export default Icon;