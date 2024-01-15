"use client";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import Button from "@/components/Button";
import { Spinner } from "@/components/Spinner";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, database, storage } from "@/config/firebase";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SubjectForm = {
  name: string;
  description: string;
  imageUrl: string;
};
const DashBoard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const schema = yup.object({
    name: yup.string().required("this field is required"),
    description: yup.string().required("this field is required"),
    imageUrl: yup.string().required("this field is required"),
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    reset,
  } = useForm<SubjectForm>({
    resolver: yupResolver(schema),
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      const image = acceptedFiles[0];
      const imageRef = ref(storage, `subjects/${uuidv4()}`);
      await uploadBytes(imageRef, image);
      const url = await getDownloadURL(imageRef);
      setValue("imageUrl", url);
    },
    [setValue]
  );
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  const onSubmit = async (data: SubjectForm) => {
    try {
      const { description, name, imageUrl } = data;
      const collectRef = collection(database, "subjects");
      await addDoc(collectRef, { name, description, imageUrl });
      toast.promise(resolveAfter3Sec, {
        pending: "Please wait",
        error: "Something went wrong",
        success: "Subject added successfully",
      });
      reset();
    } catch (err) {}
  };

  useEffect(() => {
    if (user) return router.back();
  }, []); // eslint-disable-line
  return (
    <main className="container">
      <nav className="navbar">
        <li className="text-blue font-semibold underline">
          <Link href={"/dashboard/pupils"}>See registered pupils</Link>
        </li>
      </nav>
      <section className="flex flex-col justify-between items-center mt-7 gap-1 max-w-[500px] mx-auto">
        <h1 className="text-4xl py-3 text-lightBlue md:font-bold">
          Welcome, Admin
        </h1>

        <div className="shadow flex flex-col just-between items-center text-left w-full px-3 py-1 rounded-md pb-3">
          <h3 className="text-lightPink text-xl font-semibold">
            Add a Subject
          </h3>
          <form
            className="flex flex-col space-y-3 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label
                htmlFor="name"
                className="label-text label text-md text-lightBlue md:font-semibold"
              >
                Name of subject
              </label>
              <p className="text-error text-md">{errors.name?.message}</p>
              <input
                type="text"
                className="input input-primary focus:outline-none"
                {...register("name")}
              />
            </div>
            <div className="form-control">
              <label
                htmlFor="description"
                className="label-text label text-md text-lightBlue md:font-semibold"
              >
                Description
              </label>
              <p className="text-error text-md">
                {errors.description?.message}
              </p>

              <textarea
                className="textarea textarea-primary resize-none focus:outline-none"
                {...register("description")}
              ></textarea>
            </div>
            <p className="text-error text-md">{errors.imageUrl?.message}</p>

            <div
              className="file-input w-full mt-4 text-sm md:text-md  flex flex-row justify-start gap-3 items-center"
              {...getRootProps()}
            >
              {acceptedFiles.length === 0 && (
                <p className="bg-lightBlue text-white text-left w-1/2 h-full pt-3 pl-2">
                  Choose a file
                </p>
              )}

              <input
                {...getInputProps({
                  min: 1,
                  max: 1,
                  type: "file",
                  accept: "image/*",
                  size: 100,
                })}
              />
              {acceptedFiles.length > 0 ? (
                <p>{acceptedFiles[0]?.name}</p>
              ) : (
                <p>No file selected</p>
              )}
            </div>

            <Button
              className="text-white mt-5  border-2 bg-lightPink rounded-md hover:bg-darkPink hover:text-white w-full"
              type="submit"
            >
              {!isSubmitting ? "Add subject" : <Spinner />}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default DashBoard;
