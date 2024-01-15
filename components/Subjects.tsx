"use client";
import { database } from "@/config/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import Card from "./Card";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";

type SubjectsTypes = {
  [x: string]: any;
}[];
const Subjects = () => {
  const [subjects, setSubjects] = useState<SubjectsTypes>([]);
  useEffect(() => {
    async function getAllSubjects() {
      try {
        const collectionRef = collection(database, "subjects");
        const querySnapShot = query(collectionRef);

        const unsubscribe = onSnapshot(querySnapShot, (snapShots) => {
          const data = snapShots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setSubjects(data);
        });

        return unsubscribe;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }

    getAllSubjects();
  }, []);

  if (subjects.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <Spinner />
      </div>
    );

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-3 ">
      {subjects.map((sub) => (
        <Card key={sub.id}>
          <div className="w-full h-80 pt-2">
            <Image
              src={sub.imageUrl}
              width={200}
              height={200}
              alt={sub.name}
              priority
              className="w-full rounded-sm h-full object-cover"
            />
          </div>
          <h3 className="text-sm md:text-xl py-2 md:font-semibold text-blue">
            {sub.name}
          </h3>
          <p className="mt-2 md:text-md text-dark">{sub.description}</p>
          <Button className="mt-2 pr-6 py-1 border border-lightPink rounded-md bg-white text-lightBlue mx-auto hover:opacity-90">
            <Link href={"/register"} className="text-md text-blue">
              Regsiter
            </Link>
          </Button>
        </Card>
      ))}
    </section>
  );
};

export default Subjects;
