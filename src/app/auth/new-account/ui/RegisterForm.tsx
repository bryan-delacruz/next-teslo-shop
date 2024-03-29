"use client"

import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password } = data

    console.log({ name, email, password });

  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      {
        errors.name?.type === "required" && (<span className="text-red-500">* El nombre es obligatorio</span>)
      }

      <label htmlFor="name">Nombre completo</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        autoFocus
        {...register("name", { required: true })} />

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />


      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        {...register("password", { required: true })} />

      <button

        className="btn-primary">
        Crear cuenta
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center">
        Ingresar
      </Link>

    </form>
  )
}
