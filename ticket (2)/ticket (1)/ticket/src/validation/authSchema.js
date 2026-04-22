import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('Email zorunlu'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre zorunlu'),
});