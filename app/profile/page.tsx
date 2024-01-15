"use client";
import Button from "@/components/Button";
import Pupils from "@/components/Pupils";
import { Spinner } from "@/components/Spinner";
import { auth, database } from "@/config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
type RegPupilsTypes = {
  [x: string]: any;
}[];
const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const [pupils, setPupils] = useState<RegPupilsTypes>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) return router.push("/sign-in");

    async function getUserRegistration() {
      const collectionRef = collection(database, "pupils");
      const querySnapshot = query(
        collectionRef,
        where("user_id", "==", user?.uid)
      );
      const unsubscribe = onSnapshot(querySnapshot, (snapshots) => {
        const data = snapshots.docs.map((docs) => ({
          ...docs.data(),
          id: docs.id,
        }));
        setPupils(data);
      });

      return unsubscribe;
    }

    getUserRegistration();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!user) return router.push("/sign-in");
  }, [router, user]);

  if (pupils.length > 0)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <Button className="bg-lightBlue text-white hover:text-dark ">
          <Link href={"/register"} className="font-normal">
            Register your kids today at WellMax-Ristus School
          </Link>
        </Button>
      </div>
    );
  return (
    <section className="container">
      <h3 className="text-lightBlue font-semibold tex-3xl  md:tex-4xl py-3">
        List of your pupils
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:space-x-5 gap-4 items-center justify-center w-full">
        {pupils.map((pupil) => (
          <Pupils pupil={pupil} key={pupil.id} />
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;
