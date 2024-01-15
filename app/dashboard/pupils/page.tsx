"use client";
import Card from "@/components/Card";
import Pupils from "@/components/Pupils";
import { Spinner } from "@/components/Spinner";
import { auth, database } from "@/config/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type RegPupilsTypes = {
  [x: string]: any;
}[];
const PupilsPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [regPupls, setRegPupls] = useState<RegPupilsTypes>([]);

  useEffect(() => {
    async function getALlPupils() {
      try {
        const colletionRef = collection(database, "pupils");
        const querySnapshot = query(colletionRef);
        const unsubscribe = onSnapshot(querySnapshot, (snapshots) => {
          const data = snapshots.docs.map((docs) => ({
            ...docs.data(),
            id: docs.id,
          }));
          setRegPupls(data);
        });

        return unsubscribe;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }

    getALlPupils();
  }, []);
  useEffect(() => {
    if (loading) return;

    if (user) return router.back();
  }, []); // eslint-disable-line

  if (regPupls.length === 0)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <Spinner />
      </div>
    );
  return (
    <section className="container">
      <h3 className="text-lightBlue font-semibold tex-3xl  md:tex-4xl py-3">
        List of registered pupils
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:space-x-5 gap-4 items-center justify-center w-full">
        {regPupls.map((pupil) => (
          <Pupils pupil={pupil} key={pupil.id} />
        ))}
      </div>
    </section>
  );
};

export default PupilsPage;
