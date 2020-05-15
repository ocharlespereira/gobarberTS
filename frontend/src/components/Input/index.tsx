import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons'
//typagem do proprio react-icons

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

//sempre converter a primeira letra de um component com maiuscula
//ex.: icon: Icon
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
