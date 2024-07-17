"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Rest from "@/REST";
import Graphql from "@/GraphQL";

//const app = express();
// app.use(cors())

export default function Home() {
  return (
    <div>
      <Rest />
      <Graphql />
    </div>
  );
}
