import React from 'react';
import { FiPower } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Header, HeaderContent, Profile } from './styles';

const Dashboard: React.FC = () => (
  <Container>
    <Header>
      <HeaderContent>
        <img src={logoImg} alt="Gobarber" />

        <Profile>
          <img
            src="https://avatars2.githubusercontent.com/u/54192694?s=460&u=a0ac6a9b16621a72fd3bfd6bba0c0081c2259d5b&v=4"
            alt="Charles Pereira"
          />
          <div>
            <span>Bem-vindo</span>
            <strong>Charles Pereira</strong>
          </div>
        </Profile>

        <button type="button">
          <FiPower />
        </button>
      </HeaderContent>
    </Header>
  </Container>
);

export default Dashboard;
