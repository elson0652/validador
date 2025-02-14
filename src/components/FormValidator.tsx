import React, { useState } from 'react';
import FormInput from './FormInput';

type FormFields = 'nombre' | 'email' | 'password' | 'confirmPassword' | 'fechaNacimiento' | 'cantidad';

const FormValidator: React.FC = () => {
const [formData, setFormData] = useState<Record<FormFields, string>>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    cantidad: ''
    });

const [errors, setErrors] = useState<Record<FormFields, string>>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: '',
    cantidad: ''
    });

  const validateField = (name: string, value: string) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value) error = 'El nombre es obligatorio';
        break;
      case 'email':
        if (!value) {
          error = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'El correo electrónico no es válido';
        }
        break;
      case 'password':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (value.length < 8) {
          error = 'La contraseña debe tener al menos 8 caracteres';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          error = 'Las contraseñas no coinciden';
        }
        break;
      case 'fechaNacimiento':
        if (!value) {
          error = 'La fecha de nacimiento es obligatoria';
        } else if (new Date(value) > new Date()) {
          error = 'La fecha de nacimiento no puede ser en el futuro';
        }
        break;
      case 'cantidad':
        if (!value) {
          error = 'La cantidad es obligatoria';
        } else if (isNaN(Number(value))) {
          error = 'La cantidad debe ser un número';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(formData).forEach((key) => {
        validateField(key as FormFields, formData[key as FormFields]);
        if (errors[key as FormFields]) isValid = false;
    });

    if (isValid) {
      alert('Formulario enviado con éxito');
    } else {
      alert('Por favor, corrige los errores en el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        label="Nombre"
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        error={errors.nombre}
      />
      <FormInput
        label="Correo Electrónico"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        label="Contraseña"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <FormInput
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <FormInput
        label="Fecha de Nacimiento"
        type="date"
        name="fechaNacimiento"
        value={formData.fechaNacimiento}
        onChange={handleChange}
        error={errors.fechaNacimiento}
      />
      <FormInput
        label="Cantidad"
        type="text"
        name="cantidad"
        value={formData.cantidad}
        onChange={handleChange}
        error={errors.cantidad}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default FormValidator;