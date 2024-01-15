"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import regImage from "@/assets/svg/reg.svg";
import Image from "next/image";
import { classesOptions } from "@/constants/register";
import Button from "@/components/Button";
import { IoMdPersonAdd } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Spinner } from "@/components/Spinner";
import Modal from "@/components/Modal";

type RegsiterForm = {
  name: string;
  class: string;
  subjects: {
    mathematics: string;
    english: string;
    sciences: string;
  };
};

const schema = yup.object({
  name: yup.string().required("this field is required"),
  class: yup.string().required("this field is required"),
});
const Regsiter = () => {
  const [user, loading] = useAuthState(auth);
  const [regData, setRegData] = useState<RegsiterForm[]>([]);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<RegsiterForm>({
    resolver: yupResolver<any>(schema),
  });

  const appendRegForm = () => {
    const value = getValues();
    if (
      !value.subjects.english &&
      !value.subjects.mathematics &&
      !value.subjects.sciences
    ) {
      setError("subjects.english", {
        message: "At least one subject is required",
      });
      return;
    }

    setRegData((current) => [...current, value]);
    reset();
  };
  const onSubmit = async (data: RegsiterForm) => {
    const collectionRef = collection(database, "pupils");
    regData.push(data);
    reset();
    try {
      regData.forEach(async (data) => {
        const response = await addDoc(collectionRef, {
          ...data,
          user_id: user?.uid,
          time: serverTimestamp(),
        });
      });

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          regData,
        }),
      });
      setIsSubmitSuccessful(true);
      setRegData([]);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user) return router.push("/sign-in");
  }, []); // eslint-disable-line
  useEffect(() => {
    if (!user) return router.push("/sign-in");
  }, [router, user]);
  if (isSubmitSuccessful) return <Modal />;
  return (
    <section className="container px-2 flex justify-between items-end space-x-10 md:w-[900px] py-4">
      <form
        className="flex flex-col justify-between items-center w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full space-y-2">
          <div className="w-full space-y-2">
            <div className="form-group my-2 w-full">
              <label htmlFor="name">Name</label>
              <p className="text-sm text-pink-500 py-2">
                {errors.name?.message}
              </p>
              <div className="input_field w-ull">
                <input type="text" {...register("name")} className="w-full" />
              </div>
            </div>
            <div className="form-group w-full">
              <label htmlFor="class">Class</label>
              <p className="text-sm text-pink-500 py-2">
                {errors.class?.message}
              </p>

              <select
                {...register("class")}
                className="select w-full border-blue mb-2 bg-transparent space-y-3"
              >
                {classesOptions.map((opt) => (
                  <option
                    value={opt.value}
                    key={opt.value}
                    className="py-3 text-blue block my-2"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="form-control">
                <p className="label label-text text-lightBlue">Subject</p>
                <p className="text-sm text-pink-500 py-2">
                  {errors.subjects?.english?.message}
                </p>
                <label className="label cursor-pointer">
                  <span className="label-text">English</span>
                  <input
                    {...register("subjects.english")}
                    type="checkbox"
                    value={"english"}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Mathematics</span>
                  <input
                    {...register("subjects.mathematics")}
                    type="checkbox"
                    value={"mathematics"}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Sciences</span>
                  <input
                    {...register("subjects.sciences")}
                    type="checkbox"
                    value={"sciences"}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {isDirty && (
          <Button
            onClick={() => appendRegForm()}
            className="btn btn-outline"
            type="button"
          >
            <span>Add Another</span>
            <IoMdPersonAdd />
          </Button>
        )}

        <Button
          disabled={isSubmitting}
          className={`text-white mt-5  border-2 ${
            !isSubmitting && "bg-lightPink"
          } rounded-md hover:bg-darkPink hover:text-white w-full`}
          type="submit"
        >
          {isSubmitting ? <Spinner /> : "Register"}
        </Button>
      </form>

      <div className="hidden md:block w-full">
        <Image
          src={regImage}
          width={100}
          height={100}
          alt="Sign In Image"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Regsiter;
