import React from 'react';
import { View, Input } from '@tarojs/components';
// import './trap-input.scss';

const TrapInput: React.FC<any> = ({ value }) => {
  return <Input className="trap-input" placeholder="请输入" value={value} />;
};
export default TrapInput;
