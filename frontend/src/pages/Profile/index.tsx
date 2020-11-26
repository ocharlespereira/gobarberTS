import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('E-mail obrigatório').email(),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // cadastro de novo usuário
        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso!',
          description: 'Você pode fazer o seu logon no Gobarber',
        });
      } catch (err) {
        // verifica se o erro é originado do Yup
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        // disparar um toast
        addToast({
          type: 'info',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Profile;
